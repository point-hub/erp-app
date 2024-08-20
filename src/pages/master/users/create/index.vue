<script setup lang="ts">
import { AxiosError } from 'axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

import CardBranches from './card-branches.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import CardWarehouses from './card-warehouses.vue'
import { useForm } from './form'

const router = useRouter()
const { toastRef } = useToastStore()
const form = reactive(useForm())

const onSave = async () => {
  try {
    const response = await axios.post('/v1/master/auth/signup', form.data)
    if (response.status === 201) {
      toastRef.toast('Create success', { color: 'success' })
      router.push('/master/users')
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
      v-model:role_id="form.data.role_id"
      v-model:name="form.data.name"
      v-model:username="form.data.username"
      v-model:email="form.data.email"
      v-model:password="form.data.password"
      :errors="form.errors"
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
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
