<template>
  <div class="max-w-5xl mx-auto pt-14">
    <div class="max-w-xl" :class="{ 'pointer-events-none': isLoading }">
      <h1 class="text-2xl font-semibold mb-10">Create campaign</h1>
      <Alert v-if="errorMessage" :message="errorMessage" />
      <form @submit.prevent="submit">
        <label class="label">
          <span class="label-text">Campaign name</span>
        </label>
        <input
          type="text"
          required
          v-model="form.name"
          placeholder="(Ex. may discount)"
          class="input input-bordered w-full"
        />

        <label class="label">
          <span class="label-text">Event</span>
        </label>
        <input v-model="form.event" required type="text" class="input input-bordered w-full" />

        <label class="label">
          <span class="label-text">Type</span>
        </label>
        <select required v-model="form.type" class="select select-bordered font-normal">
          <option disabled selected>Pick one</option>
          <option>Cashback</option>
          <option>Discount</option>
        </select>

        <label class="label">
          <span class="label-text">Action</span>
        </label>
        <input v-model="form.action" type="text" class="input input-bordered w-full" />

        <label class="label">
          <span class="label-text">Coupon</span>
        </label>
        <input
          v-model="form.coupon"
          maxlength="6"
          type="text"
          placeholder="6 digit coupon"
          class="input input-bordered w-full uppercase placeholder:normal-case"
        />

        <label class="label">
          <span class="label-text">Products</span>
        </label>

        <label
          v-for="product in products"
          :key="product.sys.id"
          class="flex items-center gap-4 mb-4"
        >
          <input
            v-model="form.products"
            :value="product.sys.id"
            type="checkbox"
            checked="checked"
            class="checkbox checkbox-sm"
          />
          <span class="label-text">{{ product.name }}</span>
        </label>

        <div class="flex gap-2 mt-16 items-center justify-end">
          <button @click="$router.push('/')" class="btn btn-ghost normal-case">Cancel</button>
          <button type="submit" class="btn normal-case text-white">
            <Spinner v-if="isLoading" />
            <p v-else>Submit</p>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import useContent from '@/utils/useContent'

const { manageUrl, manageApiKey, queryAllProduct, contentUrl } = useContent()
const form = ref({
  name: '',
  type: '',
  event: '',
  action: '',
  coupon: '',
  products: []
})

const mapFields = computed(() => {
  return {
    fields: {
      name: {
        'en-US': form.value.name
      },
      event: {
        'en-US': form.value.event
      },
      type: {
        'en-US': form.value.type
      },
      action: {
        'en-US': form.value.action
      },
      coupon: {
        'en-US': form.value.coupon
      },
      products: {
        'en-US': form.value.products.map((e) => {
          return {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: e
            }
          }
        })
      }
    }
  }
})

const isLoading = ref(false)
const errorMessage = ref('')
async function submit() {
  if (!form.value.products.length) {
    errorMessage.value = 'please select at least 1 product'
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
    return
  }
  try {
    isLoading.value = true
    const { data } = await axios.post(manageUrl, mapFields.value, {
      headers: {
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        Authorization: `Bearer ${manageApiKey}`,
        'X-Contentful-Content-Type': 'campaign'
      }
    })
    await publish(data.sys.id)
  } catch (e) {
    errorMessage.value = 'something went wrong'
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
  } finally {
    isLoading.value = false
  }
}

const router = useRouter()
async function publish(id) {
  try {
    await axios.put(
      `${manageUrl}/${id}/published`,
      {},
      {
        headers: {
          Authorization: `Bearer ${manageApiKey}`,
          'X-Contentful-Version': 1
        }
      }
    )
  } catch (e) {
    console.log(e)
  } finally {
    router.push('/')
  }
}

const products = ref([])
async function fetchProducts() {
  try {
    isLoading.value = true
    const { data } = await axios.post(contentUrl, {
      query: queryAllProduct
    })

    products.value = data.data.productCollection.items
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>
