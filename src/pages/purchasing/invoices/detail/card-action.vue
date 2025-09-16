<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import DeleteModal from '../components/delete/delete-modal.vue'
import RequestDeleteModal from '../components/request-delete/delete-modal.vue'
import type { IForm } from './form'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const deleteModalRef = ref()
const requestDeleteModalRef = ref()

const data = defineModel<IForm>('data', { required: true })

const onDeleted = async () => {
  router.push('/purchasing/invoices')
}

const onRequestDelete = async () => {
  router.push('/purchasing/invoices')
}

const exportPdf = () => {
  window.print()
}
</script>

<template>
  <base-card class="py-4!">
    <div class="flex flex-wrap gap-2">
      <router-link v-if="authStore.permission?.purchasing?.invoices?.create" :to="`/purchasing/invoices/create`">
        <base-button color="info" size="sm">
          <base-icon icon="i-far-square-plus" /> Create
        </base-button>
      </router-link>

      <base-button @click="exportPdf" color="info" size="sm">
        <base-icon icon="i-far-square-plus" /> Export PDF
      </base-button>

      <!-- <router-link
        v-if="authStore.permission?.purchasing?.invoices?.update && !data.is_deleted"
        :to="`/purchasing/invoices/${route.params.id}/edit`"
      >
        <base-button color="info" size="sm">
          <base-icon icon="i-far-pen-to-square" /> Edit
        </base-button>
      </router-link> -->

      <!-- <router-link
        v-if="authStore.permission?.purchasing?.invoices?.update"
        :to="`/purchasing/invoices/${route.params.id}/edit`"
      >
        <base-button color="info" size="sm">
          <base-icon icon="i-far-file-xmark" /> Revision
        </base-button>
      </router-link> -->

      <!-- <base-button v-if="authStore.permission?.purchasing?.invoices?.delete && !data.is_deleted" color="danger"
        size="sm" @click="
          deleteModalRef.toggleModal(true, {
            id: route.params.id.toString(),
            form_number: data.form_number
          })
          ">
        <base-icon icon="i-far-trash" /> Delete
      </base-button> -->

    </div>
    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
    <request-delete-modal ref="requestDeleteModalRef" @deleted="onRequestDelete" />
  </base-card>
</template>
