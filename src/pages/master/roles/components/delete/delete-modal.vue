<script setup lang="ts">
import { ref } from 'vue'

import { useToastStore } from '@/stores/toast.store'

import { useDeleteRoleApi } from './delete.api'
import type { IFormError } from './form'
import { useVerifyPasswordApi } from './verify-password.api'

const { toastRef } = useToastStore()

const password = ref()
const errors = ref<IFormError>({
  password: [],
  reason: []
})
const id = defineModel<string>('id')
const name = defineModel<string>('name')
const emit = defineEmits(['deleted'])

interface IData {
  id: string
  name: string
}
const showModal = ref(false)
const toggleModal = (state?: boolean, data?: IData) => {
  if (data) {
    id.value = data.id
    name.value = data.name
  }
  let newValue = !showModal.value
  if (state === true) {
    newValue = true
    loadingState.value = false
  }
  if (state === false) newValue = false
  showModal.value = newValue
}

const reason = ref<string>()
const loadingState = ref(false)
const onDelete = async () => {
  // prevent calling twice use loading state
  if (loadingState.value) return
  // start loading state
  loadingState.value = true
  // frontend checking
  if (!password.value) {
    errors.value.password = ['The password field is required']
  }
  if (!reason.value) {
    errors.value.reason = ['The reason field is required.']
  }
  if (!id.value || !password.value || !reason.value) {
    loadingState.value = false
    return
  }
  // password checking
  const verifyPasswordApi = useVerifyPasswordApi()
  const responseVerifyPassword = await verifyPasswordApi.send(password.value, errors.value)
  if (!responseVerifyPassword) {
    loadingState.value = false
    return
  }
  // start api call
  const deleteRoleApi = useDeleteRoleApi()
  const responseDelete = await deleteRoleApi.send(id.value, reason.value, errors.value)
  if (!responseDelete) {
    loadingState.value = false
    return
  }

  emit('deleted')
  password.value = ''
  reason.value = ''
  toastRef.toast(`Delete Role "${name.value}" success`, { color: 'success' })
  toggleModal(false)

  // stop loading state
  loadingState.value = false
}

defineExpose({
  showModal,
  toggleModal,
  id,
  name,
  loadingState
})
</script>

<template>
  <base-modal :is-open="showModal" @on-close="toggleModal(false)">
    <div class="max-h-90vh overflow-auto p-4">
      <h2 class="py-4 text-2xl font-bold">Delete Role</h2>
      <div class="space-y-8">
        <p>
          Please enter your reason and password to protect you from accidentally deleting your data
        </p>
        <div class="flex flex-col">
          <span class="font-semibold">Role</span>
          <span>{{ name }}</span>
        </div>
        <base-textarea
          required
          label="Reason to delete"
          :maxlength="1000"
          v-model="reason"
          layout="vertical"
          :errors="errors.reason"
          @keyup="errors.reason = []"
        />
        <base-input
          type="password"
          v-model="password"
          label="Password"
          :errors="errors.password"
          @keyup="errors.password = []"
        />
        <div class="flex gap-2">
          <base-button color="danger" size="sm" @click="onDelete()" :disabled="loadingState">
            Confirm
          </base-button>
          <base-button color="secondary" size="sm" @click="toggleModal(false)">
            Cancel
          </base-button>
        </div>
      </div>
    </div>
  </base-modal>
</template>
