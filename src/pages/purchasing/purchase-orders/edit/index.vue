<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'
import { useToastStore } from '@/stores/toast.store'

import CardApproval from './card-approval.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardDetails from './card-details.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useRetrievePurchaseOrderApi } from './retrieve.api'
import { useUpdatePurchaseOrderApi } from './update.api'

const updatePurchaseOrderApi = useUpdatePurchaseOrderApi()
const { toastRef } = useToastStore()
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

  form.data = response
  form.data.revised_count += 1
  form.data.items = response.items
  isLoading.value = false
})

const isSaving = ref(false)

const onSave = async () => {
  // state saving start
  isSaving.value = true
  // check permission
  if (!authStore.permission?.purchasing?.purchase_orders?.update) {
    router.push('/unauthorized')
    isSaving.value = false
    return
  }
  if (form.data.details.length === 0) {
    toastRef.toast('Items is required', {
      color: 'danger'
    })
    isSaving.value = false
    return
  }
  // api call
  const response = await updatePurchaseOrderApi.send(form.data, form.errors)
  if (response?.inserted_id) router.push('/purchasing/purchase-orders/' + response.inserted_id)
  // state saving end
  isSaving.value = false
}
</script>

<template>
  <div v-if="isLoading" class="w-full h-full flex justify-center items-center text-2xl gap-2">
    <base-loader />
  </div>
  <div v-else class="flex flex-col gap-4">
    <card-breadcrumbs />

    <base-alert v-if="!form.data.branch" color="danger" icon="danger" title="Alert">
      You don't have access to any branch, please
      <router-link :to="`/master/users/${authStore._id}/edit`" class="text-blue-300">
        edit your user
      </router-link>
      and add branch in your user. Or contact your Administrator if you don't have permission to
      edit user data
    </base-alert>

    <card-form
      v-model:form_number="form.data.form_number"
      v-model:purchase_request="form.data.purchase_request"
      v-model:revised_count="form.data.revised_count"
      v-model:branch="form.data.branch"
      v-model:options="authStore.branches"
      v-model:created_date="form.data.created_date"
      v-model:required_date="form.data.required_date"
      v-model:required_down_payment="form.data.required_down_payment"
      :errors="form.errors"
    />

    <card-details
      v-model:details="form.data.details"
      v-model:subtotal="form.data.subtotal"
      v-model:discount="form.data.discount"
      v-model:tax_base="form.data.tax_base"
      v-model:tax_type="form.data.tax_type"
      v-model:tax="form.data.tax"
      v-model:total="form.data.total"
      :errors="form.errors"
    />

    <card-approval
      v-model:approval_to="form.data.approval_to"
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
