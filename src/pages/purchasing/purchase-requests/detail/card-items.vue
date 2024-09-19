<script setup lang="ts">
import { onMounted } from 'vue'

import AllocationChoosen from '@/pages/master/allocations/components/choosen/choosen.vue'
import ItemChoosen from '@/pages/master/items/components/choosen/choosen.vue'

import type { IFormError } from './form'

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

const errors = defineModel<IFormError>('errors')
const items = defineModel<IItem[]>('items', { required: true })

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

onMounted(() => {})
</script>

<template>
  <base-card>
    <div class="flex flex-col gap-4">
      <base-table>
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
              <base-button class="px-0!">{{ index + 1 }}</base-button>
            </td>
            <td>
              <item-choosen
                title="Item"
                v-model:selected="item.item"
                border="full"
                :errors="errors?.[`items.${index}.item._id`]"
              />
            </td>
            <td>
              <base-input
                border="full"
                v-model="item.notes"
                :errors="errors?.[`items.${index}.notes`]"
              />
            </td>
            <td>
              <base-input-number
                border="full"
                v-model="item.quantity"
                :errors="errors?.[`items.${index}.quantity`]"
              />
            </td>
            <td><allocation-choosen v-model:selected="item.allocation" border="full" /></td>
            <td>
              <base-button class="px-0! mt-1" @click="removeItem(index)">
                <base-icon icon="i-far-trash" class="bg-red text-slate-100"></base-icon>
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
