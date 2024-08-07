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
    path: '/master/users',
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
    path: '/master/warehouses',
    icon: 'i-far-warehouse'
  },
  {
    name: 'Allocation Groups',
    path: '/master/allocation-groups',
    icon: 'i-far-files'
  },
  {
    name: 'Allocations',
    path: '/master/customers',
    icon: 'i-far-file'
  },
  {
    name: 'Supplier Groups',
    path: '/master/supplier-groups',
    icon: 'i-far-files'
  },
  {
    name: 'Suppliers',
    path: '/master/suppliers',
    icon: 'i-far-user-group-simple'
  },
  {
    name: 'Customer Groups',
    path: '/master/customer-groups',
    icon: 'i-far-files'
  },
  {
    name: 'Item Categories',
    path: '/master/item-categories',
    icon: 'i-far-files'
  }
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
]
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" :menus="menus" />
</template>
