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
    name: 'Purchase Requests',
    path: '/purchasing/purchase-requests'
  },
  {
    name: '1',
    path: '/purchasing/purchase-requests/1'
  },
  {
    name: 'Edit'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
