<script setup lang="ts">
import { useRoute } from 'vue-router'

import AppBreadcrumb, { type IBreadcrumb } from '@/components/app-breadcrumb.vue'

const route = useRoute()

const breadcrumbs: IBreadcrumb[] = [
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Master',
    path: '/master'
  },
  {
    name: 'Allocations',
    path: '/master/allocations'
  },
  {
    name: `${route.params.id}`,
    path: `/master/allocations/${route.params.id}`
  },
  {
    name: 'Edit'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
