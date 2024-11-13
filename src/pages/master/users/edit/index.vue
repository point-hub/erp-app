<script setup lang="ts">
import { AxiosError } from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

import CardBranches from './card-branches.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import CardWarehouses from './card-warehouses.vue'
import { useForm } from './form'

const route = useRoute()
const router = useRouter()
const { toastRef } = useToastStore()
const isLoading = ref(false)

const form = reactive(useForm())
const formId = ref()

onMounted(async () => {
  isLoading.value = true

  const response = (await axios.get(`/v1/master/users/${route.params.id}`)).data

  formId.value = response._id
  form.data.role_id = response.role._id
  form.data.role = response.role
  form.data.name = response.name
  form.data.username = response.username
  form.data.email = response.email
  form.data.default_branch = response.default_branch._id
  form.data.default_warehouse = response.default_warehouse._id
  form.data.branches = response.branches.map((obj: { _id: string }) => obj._id)
  form.data.warehouses = response.warehouses.map((obj: { _id: string }) => obj._id)

  isLoading.value = false
})

const onUpdate = async () => {
  try {
    const response = await axios.patch(`/v1/master/users/${route.params.id}`, form.data)
    if (response.status === 200) {
      toastRef.toast('Update success', { color: 'success' })
      router.push('/master/users')
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const listErrors: string[] = []
      const formErrors = error?.response?.data?.errors
      if (formErrors) {
        for (const key in formErrors) {
          form.errors[key] = formErrors[key]
          listErrors.push(formErrors[key])
        }
      }
      toastRef.toast(error.response?.data.message, {
        lists: listErrors.flat(),
        color: 'danger'
      })
    }
  }
}
</script>

<template>
  <base-card v-if="isLoading">
    <base-loader />
  </base-card>
  <div v-else class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      :form-id="route.params.id.toString()"
      v-model:role_id="form.data.role_id"
      v-model:role="form.data.role"
      v-model:name="form.data.name"
      v-model:username="form.data.username"
      v-model:email="form.data.email"
    />

    <card-branches
      v-model:default_branch="form.data.default_branch"
      v-model:branches="form.data.branches"
      :errors="form.errors"
    />

    <card-warehouses
      v-model:default_warehouse="form.data.default_warehouse"
      v-model:warehouses="form.data.warehouses"
      :errors="form.errors"
    />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onUpdate()">Update</base-button>
      </div>
    </base-card>
  </div>
</template>
