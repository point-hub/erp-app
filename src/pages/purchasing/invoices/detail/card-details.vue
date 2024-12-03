<script setup lang="ts">
import { useFormatNumber } from '@/composable/format-number'

import type { TaxType } from '../interface'
import { type IDetail } from './form'

const { formatNumber } = useFormatNumber()

const details = defineModel<IDetail[]>('details', { required: true })
const subtotal = defineModel<number>('subtotal', { default: 0 })
const discount = defineModel<number>('discount', { default: 0 })
const tax_base = defineModel<number>('tax_base', { default: 0 })
const tax_type = defineModel<TaxType>('tax_type')
const tax = defineModel<number>('tax', { default: 0 })
const total = defineModel<number>('total', { default: 0 })
</script>

<template>
  <base-card>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1">#</th>
            <th>Item</th>
            <th class="text-right border-x">Quantity</th>
            <th class="text-right">Price</th>
            <th class="text-right">Discount</th>
            <th class="text-right">Total</th>
            <th>Allocation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in details" :key="index" class="relative">
            <td>{{ index + 1 }}</td>
            <td>{{ detail.item.label }}</td>
            <td class="text-right">
              {{ formatNumber(detail.quantity) }}
            </td>
            <td class="text-right">{{ formatNumber(detail.price) }}</td>
            <td class="text-right">{{ formatNumber(detail.discount) }}</td>
            <td class="text-right">{{ formatNumber(detail.total) }}</td>
            <td>{{ detail.allocation.label }}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="font-bold uppercase text-right">Subtotal</td>
            <td class="text-right">{{ formatNumber(subtotal) }}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="font-bold uppercase text-right">Discount</td>
            <td class="text-right">{{ formatNumber(discount) }}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="font-bold uppercase text-right">Tax Base</td>
            <td class="text-right">{{ formatNumber(tax_base) }}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="font-bold uppercase text-right">
              <div class="flex flex-row gap-2 justify-end items-center">
                <span v-if="tax_type !== 'non'" class="font-normal text-xs">
                  {{ tax_type }} 11%
                </span>
                <span>Tax</span>
              </div>
            </td>
            <td class="text-right">{{ formatNumber(tax) }}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="font-bold uppercase text-right">Total</td>
            <td class="text-right">{{ formatNumber(total) }}</td>
            <td></td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
