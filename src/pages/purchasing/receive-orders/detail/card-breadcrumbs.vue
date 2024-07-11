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
    name: 'Receive Orders',
    path: '/purchasing/receive-orders'
  },
  {
    name: '1'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
