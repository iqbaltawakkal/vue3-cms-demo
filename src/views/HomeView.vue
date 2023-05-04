<template>
  <div class="max-w-5xl mx-auto pt-14">
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-2xl font-semibold">Products</h1>
      <button @click="$router.push('/form')" class="btn btn-sm text-white normal-case">
        Add campaign
      </button>
    </div>

    <table class="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Event</th>
          <th>Product</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in entries" :key="item.sys.id">
          <th>{{ item.name }}</th>
          <td>{{ item.event }}</td>
          <td>
            <a
              @click="onClickProducts(item.productsCollection.items)"
              class="text-blue-600 underline cursor-pointer"
            >
              {{ item.productsCollection.items.length }} item(s)
            </a>
          </td>
          <td class="text-right">
            <div class="tooltip tooltip-left mr-4 cursor-pointer" data-tip="view"><IconEye /></div>
          </td>
        </tr>
      </tbody>
      <Spinner v-if="isLoading" />
    </table>
  </div>
  <ModalProduct v-model="isModalProduct" />
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import useContent from '@/utils/useContent'
import { useProduct } from '@/stores/product'

const productStore = useProduct()
const entries = ref([])
const isModalProduct = ref(false)
const isLoading = ref(false)
const { contentUrl, queryAllCampaign } = useContent()

onMounted(() => {
  fetchCampaigns()
})

function onClickProducts(item) {
  productStore.mutate({ key: 'items', value: item })
  isModalProduct.value = true
}

async function fetchCampaigns() {
  try {
    isLoading.value = true
    const { data } = await axios.post(contentUrl, {
      query: queryAllCampaign
    })

    entries.value = data.data.campaignCollection.items
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}
</script>
