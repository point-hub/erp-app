<script setup lang="ts">
import { AxiosError } from 'axios'
import { ref } from 'vue'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

const { toastRef } = useToastStore()

const password = ref()
const errors = ref<{
  password?: string[]
  reason?: string[]
}>({
  password: [],
  reason: []
})
const id = defineModel('id')
const name = defineModel('name')
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
  if (state === true) newValue = true
  if (state === false) newValue = false
  showModal.value = newValue
}

const reason = ref()
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
  if (errors.value?.password || errors.value?.reason) {
    loadingState.value = false
    return
  }
  // password checking
  try {
    const response = await axios.post(`/v1/auth/verify-password`, {
      password: password.value
    })
    if (response.data.verified === false) {
      errors.value.password = ['Wrong Password']
      loadingState.value = false
      return
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      loadingState.value = false
      return
    }
  }
  // start api call
  try {
    const response = await axios.post(`/v1/warehouses/${id.value}/delete`, {
      reason: reason.value
    })
    if (response.status === 200) {
      emit('deleted')
      password.value = ''
      reason.value = ''
      toastRef.toast(`Delete Warehouse "${name.value}" success`, {
        lists: [],
        color: 'success'
      })
      toggleModal(false)
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      var listErrors: string[] = []
      const formErrors = error?.response?.data?.errors
      if (formErrors) {
        for (const key in formErrors) {
          errors.value.reason = formErrors[key]
          listErrors.push(formErrors[key])
        }
      }
      toastRef.toast(error.response?.data.message, {
        lists: listErrors.flat(),
        color: 'danger'
      })
    }
  }

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
      <h2 class="py-4 text-2xl font-bold">Delete Warehouse</h2>
      <div class="space-y-8">
        <p>
          Please enter your reason and password to protect you from accidentally deleting your data
        </p>
        <div class="flex flex-col">
          <span class="font-semibold">Warehouse</span>
          <span>{{ name }}</span>
        </div>
        <base-textarea
          required
          label="Reason to delete"
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
