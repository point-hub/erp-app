<script setup lang="ts">
import AppMenu from '@/components/app-menu.vue'

const breadcrumbs = [
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Inventory'
  }
]

const menus = [
  {
    name: 'Stock Correction',
    path: '/inventory/inventory-audits',
    icon: 'i-far-conveyor-belt'
  },
  {
    name: 'Inventory Audit',
    path: '/inventory/stock-corrections',
    icon: 'i-far-file-check'
  }
]
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" :menus="menus" />
</template>
