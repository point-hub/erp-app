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
    name: '1'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
