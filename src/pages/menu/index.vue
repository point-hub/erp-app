<script setup lang="ts">
import AppMenu from '@/components/app-menu.vue'

const breadcrumbs = [
  {
    name: 'Menu'
  }
]

const menus = [
  {
    name: 'Home',
    path: '/',
    icon: 'i-far-house'
  },
  {
    name: 'Master',
    path: '/master',
    icon: 'i-far-database'
  }
  // {
  //   name: 'Purchasing',
  //   path: '/purchasing',
  //   icon: 'i-far-cart-arrow-down'
  // },
  // {
  //   name: 'Sales',
  //   path: '/sales',
  //   icon: 'i-far-cart-arrow-up'
  // },
  // {
  //   name: 'Finance',
  //   path: '/finance',
  //   icon: 'i-far-money-check-dollar-pen'
  // },
  // {
  //   name: 'Manufacture',
  //   path: '/manufacture',
  //   icon: 'i-far-conveyor-belt-arm'
  // }
]
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" :menus="menus" />
</template>
