<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardTable from './card-table.vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (!authStore.permission?.master?.roles?.read) {
    router.push('/unauthorized')
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />
    <card-table v-if="authStore.permission?.master?.roles?.read" />
  </div>
</template>

<style scoped lang="postcss"></style>
