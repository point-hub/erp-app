<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useCountersApi } from '@/api/counters.api'
import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useCreateBranchApi } from './create-branch.api'
import { useForm } from './form'

const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const countersApi = useCountersApi()
const createBranchesApi = useCreateBranchApi()

onMounted(async () => {
  if (!authStore.permission?.master?.branches?.create) {
    router.push('/unauthorized')
  }
  const code = await countersApi.getCode('branches')
  if (code) form.data.code = code
})

const onSave = async () => {
  if (!authStore.permission?.master?.branches?.create) {
    router.push('/unauthorized')
  }
  const response = await createBranchesApi.send(form.data, form.errors)
  if (response?.inserted_id) router.push('/master/branches')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-if="authStore.permission?.master?.branches?.create"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:address="form.data.address"
      v-model:phone="form.data.phone"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <base-card class="py-4!" v-if="authStore.permission?.master?.branches?.create">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
