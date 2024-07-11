<script setup lang="ts">
import AppBreadcrumb from '@/components/app-breadcrumb.vue'
const breadcrumbs = [
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Finance',
    path: '/finance'
  },
  {
    name: 'Bank Payments',
    path: '/finance/bank-payments'
  },
  {
    name: '1',
    path: '/finance/bank-payments/1'
  },
  {
    name: 'Edit'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
