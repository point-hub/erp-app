<script setup lang="ts">
import { AxiosError } from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'

const route = useRoute()
const router = useRouter()
const { toastRef } = useToastStore()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  const response = (await axios.get(`/v1/suppliers/${route.params.id}`)).data
  formId.value = response._id
  form.data.supplier_group_id = response.supplier_group._id
  form.data.supplier_group = response.supplier_group
  form.data.code = response.code
  form.data.name = response.name
})

const onUpdate = async () => {
  try {
    const response = await axios.patch(`/v1/suppliers/${route.params.id}`, form.data)
    if (response.status === 200) {
      toastRef.toast('Update success', { lists: [], color: 'success' })
      router.push('/master/suppliers')
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      var listErrors: string[] = []
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
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      :form-id="route.params.id.toString()"
      v-model:supplier_group_id="form.data.supplier_group_id"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
    />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onUpdate()">Update</base-button>
      </div>
    </base-card>
  </div>
</template>
