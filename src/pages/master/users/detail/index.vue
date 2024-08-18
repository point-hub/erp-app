<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import axios from '@/axios'
import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardBranches from './card-branches.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import CardWarehouses from './card-warehouses.vue'
import { useForm } from './form'

const route = useRoute()

const form = reactive(useForm())

const formId = ref()
const authStore = useAuthStore()

onMounted(async () => {
  const response = (await axios.get(`/v1/master/users/${route.params.id}`)).data
  formId.value = response._id
  form.data.role = `[${response.role.code}] ${response.role.name}`
  form.data.name = response.name
  form.data.username = response.username
  form.data.email = response.email
  form.data.default_branch = response.default_branch
  form.data.default_warehouse = response.default_warehouse
  form.data.branches = response.branches
  form.data.warehouses = response.warehouses
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-action v-if="authStore.permission?.master?.users?.read" :data="form.data" />

    <card-form
      :form-id="route.params.id.toString()"
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
  </div>
</template>
