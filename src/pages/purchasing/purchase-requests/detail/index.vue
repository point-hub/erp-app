<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

// import CardAction from './card-action.vue'
// import CardApproval from './card-approval.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
// import CardDetails from './card-details.vue'
// import CardForm from './card-form.vue'
import { useForm } from './form'
import { useRetrievePurchaseRequestApi } from './retrieve.api'

const route = useRoute()
const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const isLoading = ref(false)
const retrievePurchaseRequestApi = useRetrievePurchaseRequestApi()

onMounted(async () => {
  isLoading.value = true
  if (!authStore.permission?.purchasing?.purchase_requests?.read) {
    router.push('/unauthorized')
  }

  const response = await retrievePurchaseRequestApi.send(route.params.id.toString())

  form.data = response
  form.data.items = response.items
  isLoading.value = false
})

const onSave = async () => {}
</script>

<template>
  <div v-if="isLoading" class="w-full h-full flex justify-center items-center text-2xl gap-2">
    <base-loader />
  </div>
  <div v-else class="flex flex-col gap-4">
    <card-breadcrumbs />

    <!-- <card-action :data="form.data" /> -->

    <!-- <pre><code>{{ form.data }}</code></pre> -->
    <!-- 
    <card-form
      :form_number="form.data.form_number"
      :rev="form.data.rev"
      :branch="form.data.branch.label"
      :created_date="form.data.created_date"
      :required_date="form.data.required_date"
    /> -->

    <!-- <card-details v-model:details="form.data.details" :errors="form.errors" /> -->

    <!-- <card-approval
      :created_by="form.data.created_by.label"
      :approval_to="form.data.approval_to?.label"
      :notes="form.data.notes"
    /> -->

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
