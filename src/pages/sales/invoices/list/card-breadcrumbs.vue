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
    name: 'Invoices'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
