<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import DeleteModal from '../components/delete-modal.vue'
import CardAction from './card-action.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetBranchApi } from './get-branch.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getBranchApi = useGetBranchApi()
const deleteModalRef = ref()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  if (!authStore.permission?.master?.branches?.read) {
    router.push('/unauthorized')
  }

  const response = await getBranchApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.code = response.code
    form.data.name = response.name
    form.data.address = response.address
    form.data.phone = response.phone
  }
})

const onDeleted = async () => {
  router.push('/master/branches')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-action v-if="authStore.permission?.master?.branches?.read" />

    <card-form
      v-if="authStore.permission?.master?.branches?.read"
      :form-id="route.params.id.toString()"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:address="form.data.address"
      v-model:phone="form.data.phone"
    />

    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
  </div>
</template>
