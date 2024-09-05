<script setup lang="ts">
import { numberFormat } from '@point-hub/js-utils'
import { AxiosError } from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'
import ChartOfAccountAutocomplete from '@/pages/master/chart-of-accounts/components/autocomplete/autocomplete.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useToastStore } from '@/stores/toast.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import { useForm } from './form'

const { toastRef } = useToastStore()

const route = useRoute()
const router = useRouter()

interface IJournal {
  _id?: string
  description?: string
  account?: string
  subledger?: string
  position?: string
  editable?: boolean
  category?: string
  type?: string
  value?: number
  chart_of_account_id?: string
  chart_of_account?: {
    _id: string
    id: string
    label: string
    number: string
    name: string
  }
}

interface ISettingJournal {
  _id: string
  module: string
  feature: string
  journals: IJournal[]
}

const isLoading = ref(false)
const form = reactive(useForm())
const authStore = useAuthStore()

const formId = ref()
const getSettingJournal = async () => {
  formId.value = route.params.id
  const response = await axios.get(`/v1/master/setting-journals/${route.params.id}`)
  form.data.module = response.data.module
  form.data.feature = response.data.feature

  form.data.journals = response.data.journals.map((data: IJournal) => {
    return {
      _id: data._id,
      description: data.description,
      account: data.account,
      subledger: data.subledger,
      editable: data.editable,
      category: data.category,
      type: data.type,
      value: data.value,
      position: data.position,
      chart_of_account_id: data.chart_of_account?._id,
      chart_of_account: data.chart_of_account
    }
  })
}

const settingJournal = ref<ISettingJournal>()

onMounted(async () => {
  if (!authStore.permission?.master?.setting_journals?.update) {
    router.push('/unauthorized')
  }

  await getSettingJournal()
})

const onUpdate = async () => {
  try {
    settingJournal.value?.journals.forEach((element: any) => {
      element.chart_of_account_id = element?.chart_of_account?.id
    })

    const response = await axios.patch(`/v1/master/setting-journals/${route.params.id}`, form.data)
    if (response.status === 200) {
      toastRef.toast('Update success', { color: 'success' })
      router.push('/master/setting-journals')
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      var listErrors: string[] = []
      const formErrors = error?.response?.data?.errors
      if (formErrors) {
        for (const key in formErrors) {
          form.errors[key] = formErrors[key]
          listErrors.push(formErrors[key])
        }
      }
      toastRef.toast(error.response?.data.message, {
        lists: listErrors.flat(),
        color: 'danger'
      })
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <base-card>
      <template #header>Setting Journals</template>
      <h3 class="capitalize">{{ form.data.module }} | {{ form.data.feature }}</h3>

      <div class="flex flex-col gap-4 my-5">
        <base-table>
          <thead>
            <tr>
              <th class="">Account</th>
              <th>Chart of Account</th>
              <th class="w-40 text-right">Debit</th>
              <th class="w-40 text-right">Credit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="5">
                <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                  <base-spinner color="primary" size="xs" /> <span>Loading</span>
                </p>
              </td>
            </tr>
            <template v-if="!isLoading">
              <tr v-for="(journal, index) in form.data.journals" :key="journal.id">
                <td>
                  <p>{{ journal.account }}</p>
                  <p class="text-xs">{{ journal.description }}</p>
                  <div class="mt-2">
                    <p class="text-xs" v-if="journal.category">
                      <span class="font-semibold">Category:</span> {{ journal.category }}
                    </p>
                    <p class="text-xs" v-if="journal.subledger">
                      <span class="font-semibold">Subledger:</span> {{ journal.subledger }}
                    </p>
                  </div>
                </td>
                <td class="w-100">
                  <span v-if="journal.editable">
                    <chart-of-account-autocomplete
                      v-model="journal.chart_of_account_id"
                      v-model:selected="journal.chart_of_account"
                      :category-code="journal.category"
                      :errors="form.errors[`journals.${index}.chart_of_account_id`]"
                      border="full"
                    />
                  </span>
                </td>
                <td class="text-right">
                  {{
                    journal.position.toLowerCase() === 'debit' ? numberFormat(journal.value) : ''
                  }}
                </td>
                <td class="text-right">
                  {{
                    journal.position.toLowerCase() === 'credit' ? numberFormat(journal.value) : ''
                  }}
                </td>
              </tr>
            </template>
          </tbody>
        </base-table>
      </div>
    </base-card>

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onUpdate()">Update</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
