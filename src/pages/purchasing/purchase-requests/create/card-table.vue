<script setup lang="ts">
import { onMounted, ref } from 'vue'

import ItemChoosen from '@/pages/master/items/components/choosen/choosen.vue'

interface IItem {
  item: {
    _id: string
    label: string
    code: string
    name: string
    unit: string
  }
  notes: string
  quantity: number
  allocation: {
    _id: string
    label: string
    code: string
    name: string
  }
}

const items = defineModel<IItem[]>('items', { default: [] })

const addMore = () => {
  items.value.push({
    item: {
      _id: '',
      label: '',
      code: '',
      name: '',
      unit: ''
    },
    notes: '',
    quantity: 0,
    allocation: {
      _id: '',
      label: '',
      code: '',
      name: ''
    }
  })
}

const clearAll = () => {
  items.value = []
}

const removeItem = (index: number) => {
  items.value.splice(index, 1)
}

const selected = ref()

onMounted(() => {
  clearAll()
  addMore()
})
</script>

<template>
  <base-card>
    <div class="flex flex-col gap-4">
      <base-table class="pb-40">
        <thead>
          <tr>
            <th class="w-1">#</th>
            <th>Item</th>
            <th>Notes</th>
            <th>Quantity</th>
            <th>Allocation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index" class="relative">
            <td>
              <span>{{ index + 1 }}</span>
            </td>
            <td>
              <item-choosen title="Item" v-model:selected="selected" border="full" />
            </td>
            <td><base-input border="full" v-model="item.notes" /></td>
            <td><base-input-number border="full" v-model="item.quantity" /></td>
            <td></td>
            <td>
              <base-button class="px-1!" @click="removeItem(index)">
                <base-icon icon="i-far-trash"></base-icon>
              </base-button>
            </td>
          </tr>
        </tbody>
      </base-table>
      <div class="flex gap-2">
        <base-button @click="addMore" shape="sharp" color="primary" size="xs">Add More</base-button>
        <base-button @click="clearAll" shape="sharp" color="danger" size="xs">
          Clear All
        </base-button>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
