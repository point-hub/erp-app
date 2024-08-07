<script setup lang="ts">
import { ref } from 'vue'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

const { toastRef } = useToastStore()

const password = ref()
const errors = ref<string[]>([])
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

const loadingState = ref(false)
const onDelete = async () => {
  // prevent calling twice use loading state
  if (loadingState.value) return
  // start loading state
  loadingState.value = true
  // password checking
  if (password.value !== 'Admin123!') {
    if (errors.value.length === 0) {
      errors.value.push('Wrong Password')
    }
    loadingState.value = false
    return
  }
  // start api call
  const response = await axios.delete(`/v1/warehouses/${id.value}`)
  if (response.status === 200) {
    emit('deleted')
    password.value = ''
    toastRef.toast(`Delete Warehouse "${name.value}" success`)
    toggleModal(false)
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
        <p>Are you sure you want to delete Warehouse "{{ name }}"?</p>
        <base-input
          type="password"
          v-model="password"
          label="Please enter your password to confirm this action"
          :errors="errors"
          @keyup="errors = []"
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
