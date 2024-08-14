<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'

import DeleteModal from '../components/delete-modal.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'

const route = useRoute()
const router = useRouter()
const deleteModalRef = ref()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  const response = (await axios.get(`/v1/master/warehouses/${route.params.id}`)).data
  formId.value = response._id
  form.data.branch_id = response.branch._id
  form.data.code = response.code
  form.data.name = response.name
})

const onDeleted = async () => {
  router.push('/master/warehouses')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <router-link :to="`/master/warehouses/${route.params.id}/edit`">
          <base-button color="info" size="sm">Edit</base-button>
        </router-link>

        <base-button
          color="danger"
          size="sm"
          @click="
            deleteModalRef.toggleModal(true, {
              id: route.params.id.toString(),
              name: `[${form.data.code}] ${form.data.name}`
            })
          "
        >
          Delete
        </base-button>
      </div>
    </base-card>
    <card-form
      :form-id="route.params.id.toString()"
      v-model:branch_id="form.data.branch_id"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
    />

    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
  </div>
</template>
