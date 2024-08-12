<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'

import DeleteModal from '../components/delete-modal.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardChartOfAccount from './card-chart-of-account.vue'
import CardDna from './card-dna.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'

const route = useRoute()
const router = useRouter()
const deleteModalRef = ref()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  const response = (await axios.get(`/v1/items/${route.params.id}`)).data
  formId.value = response._id
  form.data.chart_of_account = response.chart_of_account
  form.data.category = response.category
  form.data.code = response.code
  form.data.name = response.name
  form.data.unit = response.unit
  form.data.have_production_number = response.have_production_number
  form.data.have_an_expiry_date = response.have_an_expiry_date
})

const onDeleted = async () => {
  router.push('/master/items')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <router-link :to="`/master/items/${route.params.id}/edit`">
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
      v-model:category="form.data.category"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:unit="form.data.unit"
    />

    <card-chart-of-account v-model:chart_of_account="form.data.chart_of_account" />

    <card-dna
      v-model:have_production_number="form.data.have_production_number"
      v-model:have_an_expiry_date="form.data.have_an_expiry_date"
    />

    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
  </div>
</template>
