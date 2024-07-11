<script setup lang="ts">
import AppMenu from '@/components/app-menu.vue'

const breadcrumbs = [
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Master'
  }
]

const menus = [
  {
    name: 'Payment Orders',
    path: '/finance/payment-orders',
    icon: 'i-far-file'
  },
  {
    name: 'Cash Advances',
    path: '/finance/cash-advances',
    icon: 'i-far-file'
  },
  {
    name: 'Cash Payments',
    path: '/finance/cash-payments',
    icon: 'i-far-file'
  },
  {
    name: 'Bank Payments',
    path: '/finance/bank-payments',
    icon: 'i-far-file'
  },
  {
    name: 'Cash Report',
    path: '/finance/cash-report',
    icon: 'i-far-file'
  },
  {
    name: 'Bank Report',
    path: '/finance/bank-report',
    icon: 'i-far-file'
  }
]
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" :menus="menus" />
</template>
