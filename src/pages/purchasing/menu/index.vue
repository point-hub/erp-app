<script setup lang="ts">
import AppMenu from '@/components/app-menu.vue'

const breadcrumbs = [
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Purchasing'
  }
]

const menus = [
  {
    name: 'Purchase Requests',
    path: '/purchasing/purchase-requests',
    icon: 'i-far-file-import'
  },
  {
    name: 'Purchase Orders',
    path: '/purchasing/purchase-orders',
    icon: 'i-far-file-pen'
  },
  {
    name: 'Downpayments',
    path: '/purchasing/downpayments',
    icon: 'i-far-file-invoice-dollar'
  },
  {
    name: 'Receive Orders',
    path: '/purchasing/receive-orders',
    icon: 'i-far-file-vector'
  },
  {
    name: 'Invoices',
    path: '/purchasing/invoices',
    icon: 'i-far-file-invoice'
  },
  {
    name: 'Payment Orders',
    path: '/purchasing/payment-orders',
    icon: 'i-far-file-invoice-dollar'
  }
]
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" :menus="menus" />
</template>
