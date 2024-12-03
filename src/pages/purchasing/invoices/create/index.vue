<script setup lang="ts">
import { isEmpty } from '@point-hub/js-utils'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'
import { useToastStore } from '@/stores/toast.store'

import CardApproval from './card-approval.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardDetails from './card-details.vue'
import CardForm from './card-form.vue'
import { useCreatePurchaseInvoiceApi } from './create.api'
import { useForm } from './form'

const { toastRef } = useToastStore()
const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const isLoading = ref(false)
const isSaving = ref(false)
const createPurchaseInvoiceApi = useCreatePurchaseInvoiceApi()

watch(
  () => form.data.purchase_order,
  () => {
    form.data.supplier = form.data.purchase_order?.supplier
    form.data.details = form.data.purchase_order
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        JSON.parse(JSON.stringify(form.data.purchase_order?.details as any))
      : []
    form.data.details = form.data.details?.map((detail) => {
      return {
        ...detail
      }
    })
  }
)

onMounted(async () => {
  // state loading start
  isLoading.value = true
  if (!authStore.permission?.purchasing?.invoices?.create) {
    router.push('/unauthorized')
  }

  // set branch requirement
  if (!isEmpty(authStore.default_branch)) {
    form.data.branch = authStore.default_branch
  } else if (authStore.branches.length) {
    form.data.branch = authStore.branches[0]
  }
  // state loading end
  isLoading.value = false
})

const onSave = async () => {
  // state saving start
  isSaving.value = true
  // check permission
  if (!authStore.permission?.purchasing?.invoices?.create) {
    router.push('/unauthorized')
    isSaving.value = false
    return
  }
  if (form.data.details?.length === 0) {
    toastRef.toast('Items is required', {
      color: 'danger'
    })
    isSaving.value = false
    return
  }
  // api call
  const response = await createPurchaseInvoiceApi.send(form.data, form.errors)
  if (response?.inserted_id) router.push('/purchasing/invoices/' + response.inserted_id)
  // state saving end
  isSaving.value = false
}
</script>

<template>
  <div v-if="isLoading" class="page-loader">
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
      v-model:branch="form.data.branch"
      v-model:options="authStore.branches"
      v-model:supplier="form.data.supplier"
      v-model:purchase_order="form.data.purchase_order"
      :errors="form.errors"
    />

    <card-details
      v-if="form.data.purchase_order"
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
      v-if="form.data.purchase_order"
      v-model:approval_to="form.data.approval_to"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <base-card class="py-4!" v-if="form.data.purchase_order">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()" :disabled="isSaving">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
