<script setup lang="ts">
import AppMenu from '@/components/app-menu.vue'

const breadcrumbs = [
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Sales'
  }
]

const menus = [
  {
    name: 'Sales Requests',
    path: '/sales/sales-quotations',
    icon: 'i-far-file-pen'
  },
  {
    name: 'Sales Orders',
    path: '/sales/sales-orders',
    icon: 'i-far-file-pen'
  },
  {
    name: 'Downpayments',
    path: '/sales/downpayments',
    icon: 'i-far-file-invoice-dollar'
  },
  {
    name: 'Delivery Orders',
    path: '/sales/delivery-orders',
    icon: 'i-far-file-vector'
  },
  {
    name: 'Delivery Notes',
    path: '/sales/delivery-notes',
    icon: 'i-far-file-vector'
  },
  {
    name: 'Invoices',
    path: '/sales/invoices',
    icon: 'i-far-file-invoice'
  },
  {
    name: 'Payment Collections',
    path: '/sales/payment-collections',
    icon: 'i-far-file-invoice-dollar'
  }
]
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" :menus="menus" />
</template>
