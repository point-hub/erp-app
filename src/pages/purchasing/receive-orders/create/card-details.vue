<script setup lang="ts">
import type { IDetail } from '../interface'
import type { IFormError } from './form'

const errors = defineModel<IFormError>('errors', { required: true })
const details = defineModel<IDetail[]>('details')
</script>

<template>
  <base-card>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1">#</th>
            <th>Item</th>
            <th>Quantity Order</th>
            <th>Quantity Received</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in details" :key="index" class="relative">
            <td>
              <base-button class="px-0!">{{ index + 1 }}</base-button>
            </td>
            <td>
              <base-input disabled v-model="detail.item.label" border="full"></base-input>
            </td>
            <td>
              <base-input-number
                border="full"
                disabled
                v-model="detail.quantity_order"
                :decimalLength="2"
                :errors="errors?.[`details.${index}.quantity_order`]"
              />
            </td>
            <td>
              <base-input-number
                border="full"
                v-model="detail.quantity"
                :decimalLength="2"
                :errors="errors?.[`details.${index}.quantity`]"
              />
            </td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
