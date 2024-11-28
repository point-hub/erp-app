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
    name: 'Master'
  }
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menus = ref<any[]>([])

onMounted(() => {
  if (authStore?.permission?.master?.users?.read) {
    menus.value.push({
      name: 'Users',
      path: '/master/users',
      icon: 'i-far-users'
    })
  }
  if (authStore?.permission?.master?.roles?.read) {
    menus.value.push({
      name: 'Roles',
      path: '/master/roles',
      icon: 'i-far-id-badge'
    })
  }
  if (authStore?.permission?.master?.branches?.read) {
    menus.value.push({
      name: 'Branches',
      path: '/master/branches',
      icon: 'i-far-sitemap'
    })
  }
  if (authStore?.permission?.master?.warehouses?.read) {
    menus.value.push({
      name: 'Warehouses',
      path: '/master/warehouses',
      icon: 'i-far-warehouse'
    })
  }
  if (authStore?.permission?.master?.chart_of_accounts?.read) {
    menus.value.push({
      name: 'Chart of Account',
      path: '/master/chart-of-accounts',
      icon: 'i-far-book'
    })
  }
  if (authStore?.permission?.master?.setting_journals?.read) {
    menus.value.push({
      name: 'Setting Journals',
      path: '/master/setting-journals',
      icon: 'i-far-notebook'
    })
  }
  if (authStore?.permission?.master?.allocations?.read) {
    menus.value.push({
      name: 'Allocation Groups',
      path: '/master/allocation-groups',
      icon: 'i-far-notes'
    })
    menus.value.push({
      name: 'Allocations',
      path: '/master/allocations',
      icon: 'i-far-note'
    })
  }
  if (authStore?.permission?.master?.suppliers?.read) {
    menus.value.push({
      name: 'Supplier Groups',
      path: '/master/supplier-groups',
      icon: 'i-far-files'
    })
    menus.value.push({
      name: 'Suppliers',
      path: '/master/suppliers',
      icon: 'i-far-user-group-simple'
    })
  }
  if (authStore?.permission?.master?.customers?.read) {
    menus.value.push({
      name: 'Customer Groups',
      path: '/master/customer-groups',
      icon: 'i-far-files'
    })
    menus.value.push({
      name: 'Customers',
      path: '/master/customers',
      icon: 'i-far-user-group-crown'
    })
  }
  if (authStore?.permission?.master?.items?.read) {
    menus.value.push({
      name: 'Item Categories',
      path: '/master/item-categories',
      icon: 'i-far-tags'
    })
    menus.value.push({
      name: 'Items',
      path: '/master/items',
      icon: 'i-far-boxes-stacked'
    })
  }
})
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
