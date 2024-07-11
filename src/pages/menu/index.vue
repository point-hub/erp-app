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
    icon: 'i-far-lock'
  },
  {
    name: 'Purchasing',
    path: '/purchasing',
    icon: 'i-far-lock'
  },
  {
    name: 'Finance',
    path: '/finance',
    icon: 'i-far-lock'
  }
]
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" :menus="menus" />
</template>
