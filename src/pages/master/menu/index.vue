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
    name: 'Users',
    path: '/master/customers',
    icon: 'i-far-users'
  },
  {
    name: 'Roles',
    path: '/master/roles',
    icon: 'i-far-id-badge'
  },
  {
    name: 'Branches',
    path: '/master/branches',
    icon: 'i-far-sitemap'
  }
  // {
  //   name: 'Warehouses',
  //   path: '/master/customers',
  //   icon: 'i-far-warehouse'
  // },
  // {
  //   name: 'Allocations',
  //   path: '/master/customers',
  //   icon: 'i-far-file'
  // },
  // {
  //   name: 'Items',
  //   path: '/master/customers',
  //   icon: 'i-far-boxes-stacked'
  // },
  // {
  //   name: 'Customers',
  //   path: '/master/customers',
  //   icon: 'i-far-user-group-crown'
  // },
  // {
  //   name: 'Suppliers',
  //   path: '/master/suppliers',
  //   icon: 'i-far-user-group-simple'
  // }
]
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" :menus="menus" />
</template>
