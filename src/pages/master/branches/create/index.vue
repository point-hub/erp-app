<script setup lang="ts">
import { AxiosError } from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'

const router = useRouter()
const { toastRef } = useToastStore()
const form = reactive(useForm())

const showApiKeyModal = ref(false)
const toggleApiKeyModal = (value: boolean) => {
  let newValue = !showApiKeyModal.value
  if (value === true) newValue = true
  if (value === false) newValue = false
  showApiKeyModal.value = newValue
}

const counter = ref(0)
onMounted(async () => {
  const response = await axios.get('/v1/counters', {
    params: {
      filter: {
        name: 'branch-code'
      }
    }
  })

  if (response.status === 200) {
    counter.value += Number(response.data.data[0].count) + 1
    form.data.code = `BR${counter.value.toString().padStart(4, '0')}`
  }
})

const onSave = async () => {
  try {
    const response = await axios.post('/v1/branches', form.data)
    if (response.status === 201) {
      toastRef.toast('Create success', { color: 'success' })
      toggleApiKeyModal(true)
      router.push('/master/branches')
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
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:address="form.data.address"
      v-model:phone="form.data.phone"
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
