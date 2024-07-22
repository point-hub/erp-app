<script setup lang="ts">
import AppBreadcrumb from '@/components/app-breadcrumb.vue'
const breadcrumbs = [
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Sales',
    path: '/sales'
  },
  {
    name: 'Payment Collections',
    path: '/sales/payment-collections'
  },
  {
    name: '1'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
