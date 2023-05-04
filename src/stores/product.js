import { defineStore } from 'pinia'

export const useProduct = defineStore({
  id: 'product',
  state: () => ({
    items: []
  }),
  actions: {
    mutate({ key, value }) {
      this[key] = value
    }
  }
})
