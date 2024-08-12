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
    name: 'Purchasing'
  }
]

const menus = ref<any[]>([])

onMounted(() => {
  if (authStore?.permission?.purchasing?.purchase_requests?.read) {
    menus.value.push({
      name: 'Purchase Requests',
      path: '/purchasing/purchase-requests',
      icon: 'i-far-file-import'
    })
  }
  if (authStore?.permission?.purchasing?.purchase_orders?.read) {
    menus.value.push({
      name: 'Purchase Orders',
      path: '/purchasing/purchase-orders',
      icon: 'i-far-file-pen'
    })
  }
  if (authStore?.permission?.purchasing?.down_payments?.read) {
    menus.value.push({
      name: 'Down Payments',
      path: '/purchasing/down-payments',
      icon: 'i-far-file-invoice-dollar'
    })
  }
  if (authStore?.permission?.purchasing?.receive_orders?.read) {
    menus.value.push({
      name: 'Receive Orders',
      path: '/purchasing/receive-orders',
      icon: 'i-far-file-vector'
    })
  }
  if (authStore?.permission?.purchasing?.invoices?.read) {
    menus.value.push({
      name: 'Invoices',
      path: '/purchasing/invoices',
      icon: 'i-far-file-invoice'
    })
  }
  if (authStore?.permission?.purchasing?.payment_orders?.read) {
    menus.value.push({
      name: 'Payment Orders',
      path: '/purchasing/payment-orders',
      icon: 'i-far-file-invoice-dollar'
    })
  }
})
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
