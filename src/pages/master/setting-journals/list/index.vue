<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardTable from './card-table.vue'

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  if (!authStore.permission?.master?.branches?.read) {
    router.push('/unauthorized')
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />
    <card-table />
  </div>
</template>
