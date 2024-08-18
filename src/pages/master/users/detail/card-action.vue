<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import DeleteModal from '../components/delete/delete-modal.vue'
import type { IForm } from './form'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const deleteModalRef = ref()

const data = defineModel<IForm>('data')

const onDeleted = async () => {
  router.push('/master/users')
}
</script>

<template>
  <base-card class="py-4!">
    <div class="flex gap-2">
      <router-link v-if="authStore.permission?.master?.users?.create" :to="`/master/users/create`">
        <base-button color="info" size="sm">Create</base-button>
      </router-link>

      <router-link
        v-if="authStore.permission?.master?.users?.update"
        :to="`/master/users/${route.params.id}/edit`"
      >
        <base-button color="info" size="sm">Edit</base-button>
      </router-link>

      <base-button
        v-if="authStore.permission?.master?.users?.delete"
        color="danger"
        size="sm"
        @click="
          deleteModalRef.toggleModal(true, {
            id: route.params.id.toString(),
            name: `${data?.name}`,
            username: `${data?.username}`
          })
        "
      >
        Delete
      </base-button>
    </div>
    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
  </base-card>
</template>
