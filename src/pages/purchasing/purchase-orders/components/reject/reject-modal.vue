<script setup lang="ts">
import { ref } from 'vue'

import { useToastStore } from '@/stores/toast.store'

import type { IFormError } from './form'
import { useRejectApi } from './reject.api'

const { toastRef } = useToastStore()

const errors = ref<IFormError>({
  reason: []
})
const id = defineModel<string>('id')
const form_number = defineModel<string>('form_number')
const emit = defineEmits(['rejected'])

interface IData {
  id: string
  form_number: string
}
const showModal = ref(false)
const toggleModal = (state?: boolean, data?: IData) => {
  if (data) {
    id.value = data.id
    form_number.value = data.form_number
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
const onReject = async () => {
  // prevent calling twice use loading state
  if (loadingState.value) return
  // start loading state
  loadingState.value = true
  // frontend checking
  if (!reason.value) {
    errors.value.reason = ['The reason field is required.']
  }
  if (!id.value || !reason.value) {
    loadingState.value = false
    return
  }

  // start api call
  const rejectApi = useRejectApi()
  const responseReject = await rejectApi.send(id.value, reason.value, errors.value)
  if (!responseReject) {
    loadingState.value = false
    return
  }

  emit('rejected')
  reason.value = ''
  toastRef.toast(`Reject Purchase Order "${form_number.value}" success`, { color: 'success' })
  toggleModal(false)

  // stop loading state
  loadingState.value = false
}

defineExpose({
  showModal,
  toggleModal,
  id,
  form_number,
  loadingState
})
</script>

<template>
  <base-modal :is-open="showModal" @on-close="toggleModal(false)">
    <div class="max-h-90vh overflow-auto p-4">
      <h2 class="py-4 text-2xl font-bold">Reject Purchase Order</h2>
      <div class="space-y-8">
        <div class="flex flex-col">
          <span class="font-semibold">Form Number</span>
          <span>{{ form_number }}</span>
        </div>
        <base-textarea
          required
          label="Reason to reject"
          :maxlength="1000"
          v-model="reason"
          layout="vertical"
          :errors="errors.reason"
          @keyup="errors.reason = []"
        />
        <div class="flex gap-2">
          <base-button color="danger" size="sm" @click="onReject()" :disabled="loadingState">
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
