<script setup lang="ts">
import { onMounted, ref } from 'vue'

import AppMenu from '@/components/app-menu.vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const breadcrumbs = [
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Inventory'
  }
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menus = ref<any[]>([])

onMounted(() => {
  // if (authStore?.permission?.inventory?.inventory_audits?.read) {
  //   menus.value.push({
  //     name: 'Inventory Audits',
  //     path: '/inventory/inventory-audits',
  //     icon: 'i-far-file'
  //   })
  // }
  // if (authStore?.permission?.inventory?.inventory_usages?.read) {
  //   menus.value.push({
  //     name: 'Inventory Usages',
  //     path: '/inventory/inventory-usages',
  //     icon: 'i-far-file'
  //   })
  // }
  // if (authStore?.permission?.inventory?.stock_corrections?.read) {
  //   menus.value.push({
  //     name: 'Stock Corrections',
  //     path: '/inventory/stock-corrections',
  //     icon: 'i-far-file'
  //   })
  // }
  // if (authStore?.permission?.inventory?.transfer_items?.read) {
  //   menus.value.push({
  //     name: 'Transfer Items',
  //     path: '/inventory/transfer-items',
  //     icon: 'i-far-file'
  //   })
  // }
  // if (authStore?.permission?.inventory?.receive_items?.read) {
  //   menus.value.push({
  //     name: 'Receive Items',
  //     path: '/inventory/receive-items',
  //     icon: 'i-far-file'
  //   })
  // }
  if (authStore?.permission?.inventory?.inventory_report?.read) {
    menus.value.push({
      name: 'Inventory Report',
      path: '/inventory/inventory-report',
      icon: 'i-far-file'
    })
  }
  if (authStore?.permission?.inventory?.inventory_value_report?.read) {
    menus.value.push({
      name: 'Inventory Value Report',
      path: '/inventory/inventory-value-report',
      icon: 'i-far-file'
    })
  }
})
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
