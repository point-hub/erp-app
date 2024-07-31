<script setup lang="ts">
import AppBreadcrumb from '@/components/app-breadcrumb.vue'
const breadcrumbs = [
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Inventory',
    path: '/inventory'
  },
  {
    name: 'Stock Corrections',
    path: '/master/stock-corrections'
  },
  {
    name: '1'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
