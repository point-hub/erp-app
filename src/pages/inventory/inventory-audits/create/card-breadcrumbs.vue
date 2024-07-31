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
    name: 'Inventory Audits',
    path: '/master/inventory-audits'
  },
  {
    name: 'Create'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
