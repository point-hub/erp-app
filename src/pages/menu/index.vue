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

onMounted(() => {
  if (authStore.permission.master.menu) {
    menus.value.push({
      name: 'Master',
      path: '/master',
      icon: 'i-far-database'
    })
  }
})
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
