<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'
import { useToastStore } from '@/stores/toast.store'

import DeleteModal from '../components/delete/delete-modal.vue'
import RejectModal from '../components/reject/reject-modal.vue'
import RequestDeleteModal from '../components/request-delete/delete-modal.vue'
import type { IForm } from './form'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const deleteModalRef = ref()
const rejectModalRef = ref()
const requestDeleteModalRef = ref()

const data = defineModel<IForm>('data', { required: true })
const { toastRef } = useToastStore()
const onDelete = () => {
  if (data.value.has_invoice) {
    toastRef.toast(`Delete failed, already has invoice`, { color: 'danger' })
  } else {
    deleteModalRef.value.toggleModal(true, {
      id: route.params.id.toString(),
      form_number: data.value.form_number
    })
  }
}

const onDeleted = async () => {
  router.push('/purchasing/receive-orders')
}

const onRejected = async () => {
  router.push('/purchasing/receive-orders')
}

const onRequestDelete = async () => {
  router.push('/purchasing/receive-orders')
}
</script>

<template>
  <base-card class="py-4!">
    <div class="flex flex-wrap gap-2">
      <router-link v-if="authStore.permission?.purchasing?.receive_orders?.create"
        :to="`/purchasing/receive-orders/create`">
        <base-button color="info" size="sm">
          <base-icon icon="i-far-square-plus" /> Create
        </base-button>
      </router-link>

      <router-link v-if="authStore.permission?.purchasing?.receive_orders?.update && !data.is_deleted"
        :to="`/purchasing/receive-orders/${route.params.id}/edit`">
        <base-button color="info" size="sm">
          <base-icon icon="i-far-pen-to-square" /> Edit
        </base-button>
      </router-link>

      <!-- <router-link
        v-if="authStore.permission?.purchasing?.receive_orders?.update"
        :to="`/purchasing/receive-orders/${route.params.id}/edit`"
      >
        <base-button color="info" size="sm">
          <base-icon icon="i-far-file-xmark" /> Revision
        </base-button>
      </router-link> -->

      <base-button v-if="authStore.permission?.purchasing?.receive_orders?.delete && !data.is_deleted" color="danger"
        size="sm" @click="onDelete">
        <base-icon icon="i-far-trash" /> Delete
      </base-button>
    </div>
    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
    <reject-modal ref="rejectModalRef" @rejected="onRejected" />
    <request-delete-modal ref="requestDeleteModalRef" @deleted="onRequestDelete" />
  </base-card>
</template>
