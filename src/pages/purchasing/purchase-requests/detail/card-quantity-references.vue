<script setup lang="ts">
import { type IDetail } from './form'

const details = defineModel<IDetail[]>('details', { required: true })
</script>

<template>
  <base-card>
    <div>
      <h1>Purchase Request -> Purchase Order</h1>
      <p>Track remaining quantity from purchase request to purchase order</p>
    </div>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1">#</th>
            <th class="w-50%">Item</th>
            <th class="text-right w-1">Qty Request</th>
            <th class="text-right w-1">Qty Order</th>
            <th class="text-right w-1">Qty Pending</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in details" :key="index" class="relative">
            <td>{{ index + 1 }}</td>
            <td>{{ detail.item.label }}</td>
            <td class="text-right">{{ detail.quantity }}</td>
            <td class="text-right">{{ detail.quantity - detail.quantity_pending }}</td>
            <td class="text-right">{{ detail.quantity_pending }}</td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
