<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardTable from './card-table.vue'

const authStore = useAuthStore()
const router = useRouter()
const isLoading = ref(false)

onMounted(() => {
  isLoading.value = true

  if (!authStore.permission?.master?.allocations?.read) {
    router.push('/unauthorized')
  }

  isLoading.value = false
})
</script>

<template>
  <div v-if="isLoading" class="w-full h-full flex justify-center items-center text-2xl gap-2">
    <base-loader />
  </div>
  <div v-else class="flex flex-col gap-4">
    <card-breadcrumbs />
    <card-table v-if="authStore.permission?.master?.allocations?.read" />
  </div>
</template>

<style scoped lang="postcss"></style>
