<script setup lang="ts">
import AllocationChoosen from '@/pages/master/allocations/components/choosen/choosen.vue'
import ItemChoosen from '@/pages/master/items/components/choosen/choosen.vue'

import type { IFormError } from './form'

interface IDetail {
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
const details = defineModel<IDetail[]>('details', { required: true })
</script>

<template>
  <base-card>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1">#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Notes</th>
            <th>Allocation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in details" :key="index" class="relative">
            <td>
              <base-button class="px-0!">{{ index + 1 }}</base-button>
            </td>
            <td>
              <base-input disabled v-model="item.item.label" border="full" />
            </td>
            <td>
              <base-input-number
                border="full"
                v-model="item.quantity"
                :errors="errors?.[`details.${index}.quantity`]"
              />
            </td>
            <td>
              <base-input
                border="full"
                v-model="item.notes"
                :errors="errors?.[`details.${index}.notes`]"
              />
            </td>
            <td><allocation-choosen v-model:selected="item.allocation" border="full" /></td>
            <td></td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
