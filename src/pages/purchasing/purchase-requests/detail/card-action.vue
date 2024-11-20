<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'
import { useToastStore } from '@/stores/toast.store'

import DeleteModal from '../components/delete/delete-modal.vue'
import RejectModal from '../components/reject/reject-modal.vue'
import RequestDeleteModal from '../components/request-delete/delete-modal.vue'
import { useApproveApi } from './approve.api'
import type { IForm } from './form'

const { toastRef } = useToastStore()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const deleteModalRef = ref()
const rejectModalRef = ref()
const requestDeleteModalRef = ref()

const loadingState = ref(false)

const onApprove = async () => {
  // prevent calling twice use loading state
  if (loadingState.value) return
  // start loading state
  loadingState.value = true

  // start api call
  const approveApi = useApproveApi()
  const responseApprove = await approveApi.send(data.value._id)
  if (!responseApprove) {
    loadingState.value = false
    return
  }

  toastRef.toast(`Approve Purchase Request "${data.value.form_number}" success`, {
    color: 'success'
  })

  // stop loading state
  loadingState.value = false

  router.push('/purchasing/purchase-requests')
}

const data = defineModel<IForm>('data', { required: true })

const onDeleted = async () => {
  router.push('/purchasing/purchase-requests')
}

const onRejected = async () => {
  router.push('/purchasing/purchase-requests')
}

const onRequestDelete = async () => {
  router.push('/purchasing/purchase-requests')
}
</script>

<template>
  <base-card class="py-4!">
    <div class="flex flex-wrap gap-2">
      <router-link
        v-if="authStore.permission?.purchasing?.purchase_requests?.create"
        :to="`/purchasing/purchase-requests/create`"
      >
        <base-button color="info" size="sm">
          <base-icon icon="i-far-square-plus" /> Create
        </base-button>
      </router-link>

      <router-link
        v-if="authStore.permission?.purchasing?.purchase_requests?.update && !data.is_deleted"
        :to="`/purchasing/purchase-requests/${route.params.id}/edit`"
      >
        <base-button color="info" size="sm">
          <base-icon icon="i-far-pen-to-square" /> Edit
        </base-button>
      </router-link>

      <!-- <router-link
        v-if="authStore.permission?.purchasing?.purchase_requests?.update"
        :to="`/purchasing/purchase-requests/${route.params.id}/edit`"
      >
        <base-button color="info" size="sm">
          <base-icon icon="i-far-file-xmark" /> Revision
        </base-button>
      </router-link> -->

      <base-button
        v-if="authStore.permission?.purchasing?.purchase_requests?.delete && !data.is_deleted"
        color="danger"
        size="sm"
        @click="
          deleteModalRef.toggleModal(true, {
            id: route.params.id.toString(),
            form_number: data.form_number
          })
        "
      >
        <base-icon icon="i-far-trash" /> Delete
      </base-button>

      <base-button
        v-if="
          authStore.permission?.purchasing?.purchase_requests?.approval &&
          data.approval_to._id === authStore._id &&
          data.approval_status === 'pending' &&
          !data.is_deleted
        "
        color="success"
        size="sm"
        @click="onApprove"
      >
        <base-icon icon="i-far-user-check" /> Approve Form
      </base-button>

      <base-button
        v-if="
          authStore.permission?.purchasing?.purchase_requests?.approval &&
          data.approval_to._id === authStore._id &&
          data.approval_status === 'pending' &&
          !data.is_deleted
        "
        color="danger"
        size="sm"
        @click="
          rejectModalRef.toggleModal(true, {
            id: route.params.id.toString(),
            form_number: data.form_number
          })
        "
      >
        <base-icon icon="i-far-user-xmark" /> Reject Form
      </base-button>
    </div>
    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
    <reject-modal ref="rejectModalRef" @rejected="onRejected" />
    <request-delete-modal ref="requestDeleteModalRef" @deleted="onRequestDelete" />
  </base-card>
</template>
