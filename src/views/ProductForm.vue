<template>
  <div class="max-w-5xl mx-auto pt-14">
    <div class="max-w-xl" :class="{ 'pointer-events-none': isLoading }">
      <h1 class="text-2xl font-semibold mb-10">Create campaign</h1>
      <form @submit.prevent="submit">
        <label class="label">
          <span class="label-text">Campaign name</span>
        </label>
        <input
          type="text"
          v-model="form.name"
          placeholder="(Ex. may discount)"
          class="input input-bordered w-full"
        />

        <label class="label">
          <span class="label-text">Event</span>
        </label>
        <input v-model="form.event" type="text" class="input input-bordered w-full" />

        <label class="label">
          <span class="label-text">Type</span>
        </label>
        <select v-model="form.type" class="select select-bordered font-normal">
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
import { ref } from 'vue'
import useContent from '@/utils/useContent'

const { manageUrl, manageApiKey } = useContent()
const form = ref({
  name: '',
  type: '',
  event: '',
  action: '',
  coupon: '',
  products: []
})

const isLoading = ref(false)
async function submit() {
  try {
    isLoading.value = true
    const { data } = await axios.post(
      manageUrl,
      {
        fields: {
          name: {
            'en-US': 'campaign 11'
          },
          event: {
            'en-US': 'discount 5'
          },
          type: {
            'en-US': 'disco3unt'
          },
          action: {
            'en-US': '-'
          },
          coupon: {
            'en-US': '2314'
          },
          products: {
            'en-US': [
              {
                sys: {
                  type: 'Link',
                  linkType: 'Entry',
                  id: '67cQWZzChF5kL4J1vMfeAj'
                }
              },
              {
                sys: {
                  type: 'Link',
                  linkType: 'Entry',
                  id: '5UL95pNWZbO82UFp2LKo5j'
                }
              }
            ]
          }
        }
      },
      {
        headers: {
          'Content-Type': 'application/vnd.contentful.management.v1+json',
          Authorization: `Bearer ${manageApiKey}`,
          'X-Contentful-Content-Type': 'campaign'
        }
      }
    )
    await publish(data.sys.id)
  } catch (e) {
    console.log(e)
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
</script>
