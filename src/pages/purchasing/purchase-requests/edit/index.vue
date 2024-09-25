<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

// import CardApproval from './card-approval.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
// import CardForm from './card-form.vue'
// import CardItems from './card-items.vue'
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
  form.data.rev += 1
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

    <base-alert v-if="!form.data.branch" color="danger" icon="danger" title="Alert">
      You don't have access to any branch, please
      <router-link :to="`/master/users/${authStore._id}/edit`" class="text-blue-300">
        edit your user
      </router-link>
      and add branch in your user. Or contact your Administrator if you don't have permission to
      edit user data
    </base-alert>

    <!-- <card-form
      v-model:form_number="form.data.form_number"
      v-model:rev="form.data.rev"
      v-model:branch="form.data.branch"
      v-model:options="authStore.branches"
      v-model:created_date="form.data.created_date"
      v-model:required_date="form.data.required_date"
      :errors="form.errors"
    /> -->
    <!-- 
    <card-items v-model:items="form.data.items" :errors="form.errors" />

    <card-approval
      v-model:approval_to="form.data.approval_to"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    /> -->

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
