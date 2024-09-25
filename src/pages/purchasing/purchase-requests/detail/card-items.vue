<script setup lang="ts">
import { type IItem } from './form'

const items = defineModel<IItem[]>('items', { required: true })
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
            <td>{{ index + 1 }}</td>
            <td>{{ item.item.label }}</td>
            <td>{{ item.notes }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.allocation.label }}</td>
            <td></td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
