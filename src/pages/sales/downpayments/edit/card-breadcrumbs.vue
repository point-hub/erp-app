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
    name: 'Downpayments',
    path: '/sales/downpayments'
  },
  {
    name: '1',
    path: '/sales/downpayments/1'
  },
  {
    name: 'Edit'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
