<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useCreateChartOfAccountApi } from './create-chart-of-account.api'
import { useForm } from './form'

const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const createChartOfAccountApi = useCreateChartOfAccountApi()

onMounted(async () => {
  if (!authStore.permission?.master?.chart_of_accounts?.create) {
    router.push('/unauthorized')
  }
})

const onSave = async () => {
  if (!authStore.permission?.master?.branches?.create) {
    router.push('/unauthorized')
  }
  const response = await createChartOfAccountApi.send(form.data, form.errors)
  if (response?.inserted_id) router.push('/master/chart-of-accounts')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-model:type_id="form.data.type_id"
      v-model:category_id="form.data.category_id"
      v-model:number="form.data.number"
      v-model:name="form.data.name"
      v-model:subledger="form.data.subledger"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
