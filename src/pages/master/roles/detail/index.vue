<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'

import DeleteModal from '../components/delete-modal.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import CardPermissions from './card-permissions.vue'
import { useForm } from './form'

const route = useRoute()
const router = useRouter()
const deleteModalRef = ref()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  const response = (await axios.get(`/v1/master/roles/${route.params.id}`)).data
  formId.value = response._id
  form.data.code = response.code
  form.data.name = response.name
  form.data.permission = response.permission
})

const onDeleted = async () => {
  router.push('/master/roles')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <router-link :to="`/master/roles/${route.params.id}/edit`">
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
      v-model:code="form.data.code"
      v-model:name="form.data.name"
    />

    <card-permissions v-model:permission="form.data.permission" />

    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
  </div>
</template>
