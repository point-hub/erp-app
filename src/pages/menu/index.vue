<script setup lang="ts">
import { onMounted, ref } from 'vue'

import AppMenu from '@/components/app-menu.vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const breadcrumbs = [
  {
    name: 'Menu'
  }
]

const menus = ref([
  {
    name: 'Home',
    path: '/',
    icon: 'i-far-house'
  }
])

onMounted(() => {
  if (authStore.permission?.master?.menu) {
    menus.value.push({
      name: 'Master',
      path: '/master',
      icon: 'i-far-database'
    })
  }
  if (authStore.permission?.purchasing?.menu) {
    menus.value.push({
      name: 'Purchasing',
      path: '/purchasing',
      icon: 'i-far-cart-arrow-down'
    })
  }
  // if (authStore.permission?.sales?.menu) {
  //   menus.value.push({
  //     name: 'Sales',
  //     path: '/sales',
  //     icon: 'i-far-cart-arrow-up'
  //   })
  // }
  // if (authStore.permission?.finance?.menu) {
  //   menus.value.push({
  //     name: 'Finance',
  //     path: '/finance',
  //     icon: 'i-far-money-check-dollar-pen'
  //   })
  // }
  if (authStore.permission?.manufacture?.menu) {
    menus.value.push({
      name: 'Manufacture',
      path: '/manufacture',
      icon: 'i-far-conveyor-belt-arm'
    })
  }
  // if (authStore.permission?.inventory?.menu) {
  //   menus.value.push({
  //     name: 'Inventory',
  //     path: '/inventory',
  //     icon: 'i-far-boxes-stacked'
  //   })
  // }
  // if (authStore.permission?.accounting?.menu) {
  //   menus.value.push({
  //     name: 'Accounting',
  //     path: '/accounting',
  //     icon: 'i-far-book'
  //   })
  // }
})
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
