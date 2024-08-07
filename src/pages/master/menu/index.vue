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
  },
  {
    name: 'Warehouses',
    path: '/master/customers',
    icon: 'i-far-warehouse'
  },
  {
    name: 'Allocation Groups',
    path: '/master/allocation-groups',
    icon: 'i-far-files'
  },
  {
    name: 'Supplier Groups',
    path: '/master/supplier-groups',
    icon: 'i-far-files'
  },
  {
    name: 'Customer Groups',
    path: '/master/customer-groups',
    icon: 'i-far-files'
  }
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
