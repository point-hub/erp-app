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
  const response = (await axios.get(`/v1/master/chart-of-accounts/${route.params.id}`)).data
  formId.value = response._id
  form.data.type = response.type
  form.data.category = response.category
  form.data.number = response.number
  form.data.name = response.name
  form.data.subledger = response.subledger
})

const onDeleted = async () => {
  router.push('/master/chart-of-accounts')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <router-link :to="`/master/chart-of-accounts/create`">
          <base-button color="info" size="sm">Create</base-button>
        </router-link>

        <router-link :to="`/master/chart-of-accounts/${route.params.id}/edit`">
          <base-button color="info" size="sm">Edit</base-button>
        </router-link>

        <base-button
          color="danger"
          size="sm"
          @click="
            deleteModalRef.toggleModal(true, {
              id: route.params.id.toString(),
              name: `[${form.data.number}] ${form.data.name}`
            })
          "
        >
          Delete
        </base-button>
      </div>
    </base-card>

    <card-form
      :form-id="route.params.id.toString()"
      v-model:type="form.data.type.name"
      v-model:category="form.data.category.name"
      v-model:number="form.data.number"
      v-model:name="form.data.name"
      v-model:subledger="form.data.subledger"
    />

    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
  </div>
</template>
