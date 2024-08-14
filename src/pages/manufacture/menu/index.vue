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
    name: 'Manufacture'
  }
]

const menus = ref<any[]>([])

onMounted(() => {
  if (authStore?.permission?.manufacture?.machines?.read) {
    menus.value.push({
      name: 'Machines',
      path: '/manufacture/machines',
      icon: 'i-far-conveyor-belt'
    })
  }
  if (authStore?.permission?.manufacture?.processes?.read) {
    menus.value.push({
      name: 'Processes',
      path: '/manufacture/processes',
      icon: 'i-far-arrow-progress'
    })
  }
  // if (authStore?.permission?.manufacture?.formulas?.read) {
  //   menus.value.push({
  //     name: 'Formulas',
  //     path: '/manufacture/formulas',
  //     icon: 'i-far-file-check'
  //   })
  // }
  // if (authStore?.permission?.manufacture?.processing?.read) {
  //   menus.value.push({
  //     name: 'Processing',
  //     path: '/manufacture/processing',
  //     icon: 'i-far-conveyor-belt-boxes'
  //   })
  // }
})
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
