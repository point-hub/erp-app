<script setup lang="ts">
import { isEmpty } from '@point-hub/js-utils'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardApproval from './card-approval.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import CardItems from './card-items.vue'
import { useCreatePurchaseRequestApi } from './create.api'
import { useForm } from './form'

const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const createPurchaseRequestApi = useCreatePurchaseRequestApi()

onMounted(async () => {
  if (!authStore.permission?.purchasing?.purchase_requests?.create) {
    router.push('/unauthorized')
  }

  if (!isEmpty(authStore.default_branch)) {
    form.data.branch = authStore.default_branch
  } else if (authStore.branches.length) {
    form.data.branch = authStore.branches[0]
  }
})

const onSave = async () => {
  if (!authStore.permission?.purchasing?.purchase_requests?.create) {
    router.push('/unauthorized')
  }
  const response = await createPurchaseRequestApi.send(form.data, form.errors)
  if (response?.inserted_id) router.push('/purchasing/purchase-requests')
}
</script>

<template>
  <div class="flex flex-col gap-4">
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
      v-model:required_date="form.data.required_date"
      :errors="form.errors"
    />

    <card-items v-model:items="form.data.items" :errors="form.errors" />

    <card-approval
      v-model:approval_to="form.data.approval_to"
      v-model:notes="form.data.notes"
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
