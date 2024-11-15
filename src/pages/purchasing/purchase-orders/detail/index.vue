<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardApproval from './card-approval.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardDetails from './card-details.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useRetrievePurchaseOrderApi } from './retrieve.api'

const route = useRoute()
const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const isLoading = ref(false)
const retrievePurchaseOrderApi = useRetrievePurchaseOrderApi()

onMounted(async () => {
  isLoading.value = true
  if (!authStore.permission?.purchasing?.purchase_orders?.read) {
    router.push('/unauthorized')
  }

  const response = await retrievePurchaseOrderApi.send(route.params.id.toString())

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const branches = authStore.branches.map((item: any) => item._id)
  if (!branches.includes(response.branch._id)) {
    router.push('/unauthorized')
  }

  form.data = response
  form.data.items = response.items
  isLoading.value = false
})
</script>

<template>
  <div v-if="isLoading" class="w-full h-full flex justify-center items-center text-2xl gap-2">
    <base-loader />
  </div>
  <div v-else class="flex flex-col gap-4">
    <card-breadcrumbs />

    <base-card
      bg-color="red"
      title-color="white"
      body-color="white"
      class="py-4!"
      v-if="form.data.approval_status === 'rejected'"
    >
      <div class="flex items-center gap-2">
        <base-icon icon="i-fas-file-xmark"></base-icon>
        <p>
          This Form is <span class="font-extrabold">REJECTED</span> by
          {{ form.data.approval_to.label }} because
          {{ form.data.rejected_reason }}
        </p>
      </div>
    </base-card>

    <base-card
      bg-color="green"
      title-color="white"
      body-color="white"
      class="py-4!"
      v-if="form.data.approval_status === 'approved'"
    >
      <div class="flex items-center gap-2">
        <base-icon icon="i-fas-file-check"></base-icon>
        <p>
          This Form is <span class="font-extrabold">APPROVED</span> by
          {{ form.data.approval_to.label }}
        </p>
      </div>
    </base-card>

    <base-card
      bg-color="red"
      title-color="white"
      body-color="white"
      class="py-4!"
      v-if="form.data.is_deleted"
    >
      <div>
        This Form is DELETED by {{ form.data.deleted_by.label }} because
        {{ form.data.deleted_reason }}
      </div>
    </base-card>

    <card-action :data="form.data" />

    <card-form
      :form_number="form.data.form_number"
      :revised_count="form.data.revised_count"
      :branch="form.data.branch.label"
      :created_date="form.data.created_date"
      :required_date="form.data.required_date"
    />

    <card-details v-model:details="form.data.details" />

    <card-approval
      :created_by="form.data.created_by.label"
      :approval_to="form.data.approval_to?.label"
      :notes="form.data.notes"
    />
  </div>
</template>

<style scoped lang="postcss"></style>
