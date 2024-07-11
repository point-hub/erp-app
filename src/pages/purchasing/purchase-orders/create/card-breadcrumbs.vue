<script setup lang="ts">
import AppBreadcrumb from '@/components/app-breadcrumb.vue'
const breadcrumbs = [
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Purchasing',
    path: '/purchasing'
  },
  {
    name: 'Purchase Orders',
    path: '/purchasing/purchase-orders'
  },
  {
    name: 'Create'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
