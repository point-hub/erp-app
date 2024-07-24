<script setup lang="ts">
import AppMenu from '@/components/app-menu.vue'

const breadcrumbs = [
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Manufacture'
  }
]

const menus = [
  {
    name: 'Machines',
    path: '/manufacture/machines',
    icon: 'i-far-conveyor-belt'
  },
  {
    name: 'Formulas',
    path: '/manufacture/formulas',
    icon: 'i-far-file-check'
  },
  {
    name: 'Processes',
    path: '/manufacture/processes',
    icon: 'i-far-arrow-progress'
  }
]
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" :menus="menus" />
</template>
