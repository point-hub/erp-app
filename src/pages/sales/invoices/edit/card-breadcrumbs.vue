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
    name: 'Invoices',
    path: '/sales/invoices'
  },
  {
    name: '1',
    path: '/sales/invoices/1'
  },
  {
    name: 'Edit'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
