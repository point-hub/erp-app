<script setup lang="ts">
import { useFormatNumber } from '@/composable/format-number'

import { type IDetail } from './form'

const { formatNumber } = useFormatNumber()

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
            <th class="text-right border-x">Quantity Order</th>
            <th class="text-right">Quantity Received</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in details" :key="index" class="relative">
            <td>{{ index + 1 }}</td>
            <td>{{ detail.item.label }}</td>
            <td class="text-right">
              {{ formatNumber(detail.quantity_order) }}
            </td>
            <td class="text-right">
              {{ formatNumber(detail.quantity) }}
            </td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
  <base-card>
    <div>
      <h1>Purchase Order -> Receive Order</h1>
      <p>Track remaining quantity from purchase request to purchase order</p>
    </div>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1">#</th>
            <th class="w-50%">Item</th>
            <th class="text-right w-1">Quantity Order</th>
            <th class="text-right w-1">Quantity Received</th>
            <th class="text-right w-1">Quantity Remaining</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in details" :key="index" class="relative">
            <td>{{ index + 1 }}</td>
            <td>{{ detail.item.label }}</td>
            <td class="text-right">{{ formatNumber(detail.quantity_order) }}</td>
            <td class="text-right">
              {{ formatNumber(detail.quantity) }}
            </td>
            <td class="text-right">
              {{ formatNumber(detail.quantity_order - detail.quantity) }}
            </td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
