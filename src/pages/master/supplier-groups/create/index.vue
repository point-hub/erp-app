<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useCreateSupplierGroupApi } from './create.api'
import { useForm } from './form'

const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const createSupplierGroupsApi = useCreateSupplierGroupApi()

onMounted(async () => {
  if (!authStore.permission?.master?.suppliers?.create) {
    router.push('/unauthorized')
  }
})

const onSave = async () => {
  if (!authStore.permission?.master?.suppliers?.create) {
    router.push('/unauthorized')
  }
  const response = await createSupplierGroupsApi.send(form.data, form.errors)
  if (response?.inserted_id) router.push('/master/supplier-groups')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-if="authStore.permission?.master?.suppliers?.create"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <base-card class="py-4!" v-if="authStore.permission?.master?.suppliers?.create">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
