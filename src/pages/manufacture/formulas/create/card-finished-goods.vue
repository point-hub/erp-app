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

const items = defineModel<IItem[]>('items', {
  default: [
    {
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
    }
  ]
})

const selected = ref()
</script>

<template>
  <base-card>
    <template #header>Finished Goods</template>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1">#</th>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index" class="relative">
            <td>
              <base-button class="px-0!">{{ index + 1 }}</base-button>
            </td>
            <td>
              <item-choosen title="Item" v-model:selected="selected" border="full" />
            </td>
            <td><base-input-number border="full" v-model="item.quantity" /></td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
