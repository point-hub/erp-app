<script setup lang="ts">
import { type IDetail } from './form'

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
            <th>Price</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Allocation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in details" :key="index" class="relative">
            <td>{{ index + 1 }}</td>
            <td>{{ detail.item.label }}</td>
            <td>{{ detail.quantity }}</td>
            <td>{{ detail.price }}</td>
            <td>{{ detail.discount }}</td>
            <td>{{ detail.total }}</td>
            <td>{{ detail.allocation.label }}</td>
            <td></td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
