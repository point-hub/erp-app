<script setup lang="ts">
import { onMounted } from 'vue'

import ItemChoosen from '@/pages/master/items/components/choosen/choosen.vue'

interface IItem {
  item: {
    _id: string
    label: string
    code: string
    name: string
    unit: string
  }
  quantity: number
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
    quantity: 0
  })
}

const clearAll = () => {
  items.value = []
}

const removeItem = (index: number) => {
  items.value.splice(index, 1)
}

onMounted(() => {
  clearAll()
  addMore()
})
</script>

<template>
  <base-card>
    <template #header>Raw Materials</template>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1">#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index" class="relative">
            <td>
              <base-button class="px-0!">{{ index + 1 }}</base-button>
            </td>
            <td>
              <item-choosen title="Item" v-model:selected="item.item" border="full" />
            </td>
            <td><base-input-number :decimalLength="2" border="full" v-model="item.quantity" /></td>
            <td>
              <base-button class="px-0! mt-1" @click="removeItem(index)">
                <base-icon icon="i-far-trash" />
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
