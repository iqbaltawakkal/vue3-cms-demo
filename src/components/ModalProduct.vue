<template>
  <div
    class="modal backdrop-blur-sm"
    :class="{ 'modal-open': modelValue }"
    @click="$emit('update:modelValue', false)"
  >
    <div class="modal-box rounded-[10px]">
      <p>list of products</p>
      <p v-for="item in items" :key="item">
        {{ item }}
      </p>
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
