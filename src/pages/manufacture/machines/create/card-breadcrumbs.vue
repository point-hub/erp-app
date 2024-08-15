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
    name: 'Machines',
    path: '/manufacture/machines'
  },
  {
    name: 'Create'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
