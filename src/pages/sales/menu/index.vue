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
    name: 'Sales'
  }
]

const menus = ref<any[]>([])

onMounted(() => {
  if (authStore?.permission?.sales?.sales_quotations?.read) {
    menus.value.push({
      name: 'Sales Requests',
      path: '/sales/sales-quotations',
      icon: 'i-far-file-pen'
    })
  }
  if (authStore?.permission?.sales?.sales_orders?.read) {
    menus.value.push({
      name: 'Sales Orders',
      path: '/sales/sales-orders',
      icon: 'i-far-file-pen'
    })
  }
  if (authStore?.permission?.sales?.down_payments?.read) {
    menus.value.push({
      name: 'Down Payments',
      path: '/sales/down-payments',
      icon: 'i-far-file-invoice-dollar'
    })
  }
  if (authStore?.permission?.sales?.delivery_orders?.read) {
    menus.value.push({
      name: 'Delivery Orders',
      path: '/sales/delivery-orders',
      icon: 'i-far-file-vector'
    })
  }
  if (authStore?.permission?.sales?.delivery_notes?.read) {
    menus.value.push({
      name: 'Delivery Notes',
      path: '/sales/delivery-notes',
      icon: 'i-far-file-vector'
    })
  }
  if (authStore?.permission?.sales?.invoices?.read) {
    menus.value.push({
      name: 'Invoices',
      path: '/sales/invoices',
      icon: 'i-far-file-invoice'
    })
  }
  if (authStore?.permission?.sales?.payment_collections?.read) {
    menus.value.push({
      name: 'Payment Collections',
      path: '/sales/payment-collections',
      icon: 'i-far-file-invoice-dollar'
    })
  }
})
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
