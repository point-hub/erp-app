// stores/useCheckedStore.ts
import { defineStore } from 'pinia'

export const useCheckedStore = defineStore('checked', {
  state: () => ({
    items: [] as { _id: string; [key: string]: any }[]
  }),
  actions: {
    toggleItem(item: { _id: string; [key: string]: any }) {
      const exists = this.items.find((i) => i._id === item._id)
      if (exists) {
        // remove if already exists
        this.items = this.items.filter((i) => i._id !== item._id)
      } else {
        // push if not exists
        this.items.push(item)
      }
    }
  }
})
