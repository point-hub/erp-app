<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useCreateMachineApi } from './create-machine.api'
import { useForm } from './form'
import { useGetCountersApi } from './get-counters.api'

const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const createMachinesApi = useCreateMachineApi()
const getCountersApi = useGetCountersApi()

onMounted(async () => {
  if (!authStore.permission?.manufacture?.machines?.create) {
    router.push('/unauthorized')
  }

  const response = await getCountersApi.send('machines')

  if (response?.code) form.data.code = response.code
})

const onSave = async () => {
  if (!authStore.permission?.manufacture?.machines?.create) {
    router.push('/unauthorized')
  }

  const response = await createMachinesApi.send(form.data, form.errors)

  if (response?.inserted_id) router.push('/manufacture/machines')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-if="authStore.permission?.manufacture?.machines?.create"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <base-card class="py-4!" v-if="authStore.permission?.manufacture?.machines?.create">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
