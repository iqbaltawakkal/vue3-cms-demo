<template>
  <div
    class="modal backdrop-blur-sm"
    :class="{ 'modal-open': modelValue }"
    @click="$emit('update:modelValue', false)"
  >
    <div class="modal-box rounded-[10px]">
      <p class="font-semibold text-lg mb-4">{{ items.length }} Product(s)</p>

      <div v-for="item in items" class="border-b py-4" :key="item">
        <div class="flex gap-6 items-center">
          <div class="avatar">
            <div class="w-16 rounded-full">
              <img :src="item.picture.url" />
            </div>
          </div>
          <div>
            <p>{{ item.name }}</p>
            <p class="text-sm text-gray-600">Available</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
import { computed } from 'vue'
import { useProduct } from '@/stores/product'
const productStore = useProduct()
const items = computed(() => productStore.items)
</script>
