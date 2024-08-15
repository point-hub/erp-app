<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import DeleteModal from '../components/delete-modal.vue'
import type { IForm } from './form'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const deleteModalRef = ref()

const data = defineModel<IForm>('data')

const onDeleted = async () => {
  router.push('/manufacture/machines')
}
</script>

<template>
  <base-card class="py-4!">
    <div class="flex gap-2">
      <router-link
        v-if="authStore.permission?.manufacture?.machines?.create"
        :to="`/manufacture/machines/create`"
      >
        <base-button color="info" size="sm">Create</base-button>
      </router-link>

      <router-link
        v-if="authStore.permission?.manufacture?.machines?.update"
        :to="`/manufacture/machines/${route.params.id}/edit`"
      >
        <base-button color="info" size="sm">Edit</base-button>
      </router-link>

      <base-button
        v-if="authStore.permission?.manufacture?.machines?.delete"
        color="danger"
        size="sm"
        @click="
          deleteModalRef.toggleModal(true, {
            id: route.params.id.toString(),
            name: `[${data?.code}] ${data?.name}`
          })
        "
      >
        Delete
      </base-button>
    </div>
    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
  </base-card>
</template>
