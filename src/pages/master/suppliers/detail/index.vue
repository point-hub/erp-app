<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'

import DeleteModal from '../components/delete-modal.vue'
import CardBank from './card-bank.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'

const route = useRoute()
const router = useRouter()
const deleteModalRef = ref()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  const response = (await axios.get(`/v1/master/suppliers/${route.params.id}`)).data
  formId.value = response._id
  form.data.supplier_group_id = response.supplier_group._id
  form.data.code = response.code
  form.data.name = response.name
  form.data.address = response.address
  form.data.phone = response.phone
  form.data.email = response.email
  form.data.notes = response.notes
  form.data.bank_name = response.bank_name
  form.data.bank_branch = response.bank_branch
  form.data.bank_account_name = response.bank_account_name
  form.data.bank_account_number = response.bank_account_number
})

const onDeleted = async () => {
  router.push('/master/suppliers')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <router-link :to="`/master/suppliers/${route.params.id}/edit`">
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
      v-model:supplier_group_id="form.data.supplier_group_id"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:address="form.data.address"
      v-model:phone="form.data.phone"
      v-model:email="form.data.email"
      v-model:notes="form.data.notes"
    />

    <card-bank
      v-model:branch="form.data.bank_branch"
      v-model:name="form.data.bank_name"
      v-model:account_name="form.data.bank_account_name"
      v-model:account_number="form.data.bank_account_number"
      :errors="form.errors"
    />

    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
  </div>
</template>
