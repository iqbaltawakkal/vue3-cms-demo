<template>
  <div class="max-w-5xl mx-auto pt-14">
    <div class="flex justify-center mt-12" v-if="isLoading">
      <Spinner additionalClass="text-black w-12 h-12" />
    </div>

    <div class="flex flex-col gap-8" v-else>
      <h1 class="font-semibold text-2xl">{{ campaign?.name }}</h1>

      <div class="flex flex-col">
        <p class="text-sm font-semibold">Type</p>
        <p>{{ campaign?.type }}</p>
      </div>

      <div class="flex flex-col">
        <p class="text-sm font-semibold">Event</p>
        <p>{{ campaign?.event }}</p>
      </div>

      <div class="flex flex-col">
        <p class="text-sm font-semibold">Coupon</p>
        <p>{{ campaign?.coupon }}</p>
      </div>

      <div class="flex flex-col gap-4">
        <p class="text-sm font-semibold">Products</p>
        <div class="flex gap-4">
          <div
            v-for="item in campaign?.productsCollection.items"
            :key="item.name"
            class="card card-compact w-60 bg-base-100 shadow-xl"
          >
            <figure>
              <img :src="item.picture.url" alt="Shoes" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">{{ item.name }}</h2>
              <p>Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-right mt-10">
      <button class="btn btn-ghost"><router-link to="/">back</router-link></button>
    </div>
  </div>
</template>

<script setup>
import useContent from '@/utils/useContent'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const { contentUrl, queryCampaign } = useContent()
const isLoading = ref(false)
const campaign = ref(null)
const route = useRoute()

onMounted(() => {
  fetchCampaign()
})

async function fetchCampaign() {
  try {
    isLoading.value = true
    const { data } = await axios.post(contentUrl, {
      query: queryCampaign(route.params.id)
    })
    campaign.value = data.data.campaign
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}
</script>
