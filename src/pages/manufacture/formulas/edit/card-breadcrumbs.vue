<script setup lang="ts">
import AppBreadcrumb from '@/components/app-breadcrumb.vue'
const breadcrumbs = [
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Manufacture',
    path: '/manufacture'
  },
  {
    name: 'Formulas',
    path: '/manufacture/bank-payments'
  },
  {
    name: '1',
    path: '/manufacture/bank-payments/1'
  },
  {
    name: 'Edit'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
