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
  const response = (await axios.get(`/v1/users/${route.params.id}`)).data
  formId.value = response._id
  form.data.role_id = response.role._id
  form.data.name = response.name
  form.data.username = response.username
  form.data.email = response.email
})

const onDeleted = async () => {
  router.push('/master/users')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <router-link :to="`/master/users/${route.params.id}/edit`">
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
      v-model:role_id="form.data.role_id"
      v-model:name="form.data.name"
      v-model:username="form.data.username"
      v-model:email="form.data.email"
    />

    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
  </div>
</template>
