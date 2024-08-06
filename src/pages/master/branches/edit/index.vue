<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

import DeleteModal from '../components/delete-modal.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'

const route = useRoute()
const router = useRouter()
const { toastRef } = useToastStore()
const deleteModalRef = ref()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  const response = (await axios.get(`/v1/branches/${route.params.id}`)).data
  formId.value = response._id
  form.data.code = response.code
  form.data.name = response.name
})

const onUpdate = async () => {
  const response = await axios.patch(`/v1/branches/${route.params.id}`, form.data)
  if (response.status === 200) {
    toastRef.toast('Update success', { list: [], color: 'success' })
    router.push('/master/branches')
  }
}

const onDeleted = async () => {
  router.push('/master/branches')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      :form-id="route.params.id.toString()"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
    />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onUpdate()">Update</base-button>
        <base-button
          color="danger"
          @click="
            deleteModalRef.toggleModal(true, {
              id: route.params.id.toString(),
              name: form.data.name
            })
          "
        >
          Delete
        </base-button>
      </div>
    </base-card>

    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
  </div>
</template>
