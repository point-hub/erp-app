<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardChartOfAccount from './card-chart-of-account.vue'
import CardDna from './card-dna.vue'
import CardForm from './card-form.vue'
import { useCreateItemApi } from './create.api'
import { useForm } from './form'

const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const createItemsApi = useCreateItemApi()

onMounted(async () => {
  if (!authStore.permission?.master?.items?.create) {
    router.push('/unauthorized')
  }
})

const onSave = async () => {
  if (!authStore.permission?.master?.items?.create) {
    router.push('/unauthorized')
  }
  const response = await createItemsApi.send(form.data, form.errors)
  if (response?.inserted_id) router.push('/master/items')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-if="authStore.permission?.master?.items?.create"
      v-model:category_id="form.data.category_id"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:unit="form.data.unit"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <card-chart-of-account
      v-model:chart_of_account_id="form.data.chart_of_account_id"
      :errors="form.errors"
    />

    <card-dna
      v-model:have_production_number="form.data.have_production_number"
      v-model:have_an_expiry_date="form.data.have_an_expiry_date"
      :errors="form.errors"
    />

    <base-card class="py-4!" v-if="authStore.permission?.master?.items?.create">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
