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
const type = ref<{ _id: string; name: string }>()
const category = ref<{ _id: string; name: string }>()

onMounted(async () => {
  const response = (await axios.get(`/v1/master/chart-of-accounts/${route.params.id}`)).data
  formId.value = response._id
  form.data.type_id = response.type._id
  form.data.category_id = response.category._id
  form.data.number = response.number.toString()
  form.data.name = response.name
  form.data.subledger = response.subledger
  form.data.notes = response.notes
  type.value = response.type
  category.value = response.category
})

const onUpdate = async () => {
  try {
    const response = await axios.patch(`/v1/master/chart-of-accounts/${route.params.id}`, form.data)
    if (response.status === 200) {
      toastRef.toast('Update success', { color: 'success' })
      router.push('/master/chart-of-accounts')
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
      v-model:type_id="form.data.type_id"
      v-model:category_id="form.data.category_id"
      v-model:number="form.data.number"
      v-model:name="form.data.name"
      v-model:subledger="form.data.subledger"
      v-model:notes="form.data.notes"
      v-model:type="type"
      v-model:category="category"
    />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onUpdate()">Update</base-button>
      </div>
    </base-card>
  </div>
</template>
