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
    name: 'Purchasing',
    path: '/purchasing'
  },
  {
    name: 'Purchase Requests',
    path: '/purchasing/purchase-requests'
  },
  {
    name: `${route.params.id}`,
    path: `/purchasing/purchase-requests/${route.params.id}`
  },
  {
    name: 'Edit'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
