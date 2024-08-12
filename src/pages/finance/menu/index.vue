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
    name: 'Finance'
  }
]

const menus = ref<any[]>([])

onMounted(() => {
  if (authStore?.permission?.finance?.payment_orders?.read) {
    menus.value.push({
      name: 'Payment Orders',
      path: '/finance/payment-orders',
      icon: 'i-far-file'
    })
  }
  if (authStore?.permission?.finance?.cash_advances?.read) {
    menus.value.push({
      name: 'Cash Advances',
      path: '/finance/cash-advances',
      icon: 'i-far-file'
    })
  }
  if (authStore?.permission?.finance?.cash_payments?.read) {
    menus.value.push({
      name: 'Cash Payments',
      path: '/finance/cash-payments',
      icon: 'i-far-file'
    })
    menus.value.push({
      name: 'Cash Report',
      path: '/finance/cash-report',
      icon: 'i-far-file'
    })
  }
  if (authStore?.permission?.finance?.bank_payments?.read) {
    menus.value.push({
      name: 'Bank Payments',
      path: '/finance/bank-payments',
      icon: 'i-far-file'
    })
    menus.value.push({
      name: 'Bank Report',
      path: '/finance/bank-report',
      icon: 'i-far-file'
    })
  }
  if (authStore?.permission?.finance?.allocation_report?.read) {
    menus.value.push({
      name: 'Allocation Report',
      path: '/finance/allocation-report',
      icon: 'i-far-file'
    })
  }
})
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
