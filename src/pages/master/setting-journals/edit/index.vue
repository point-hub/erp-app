<script setup lang="ts">
import { AxiosError } from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import { useForm } from './form'

const { toastRef } = useToastStore()

const route = useRoute()
const router = useRouter()

interface ISettingJournal {
  _id: string
  module: string
  feature: string
  journals: { [key: string]: any }
}

const isLoading = ref(false)
const form = reactive(useForm())

const formId = ref()
const selected = ref()
const options = ref()
const getSettingJournal = async () => {
  formId.value = route.params.id
  const response = await axios.get(`/v1/master/setting-journals/${route.params.id}`)
  form.data.module = response.data.module
  form.data.feature = response.data.feature
  form.data.journals = response.data.journals
  const responseChartOfAccounts = await axios.get(`/v1/master/chart-of-accounts`, {
    params: { page_size: 1000 }
  })
  options.value = responseChartOfAccounts.data.data.map(
    (data: { _id: string; number: string; name: string }) => {
      for (const element of form.data.journals) {
        console.log(element.chart_of_account_id, data._id, element.chart_of_account_id === data._id)
        if (data._id === element.chart_of_account._id) {
          selected.value = {
            id: data._id,
            label: `[${data.number}] ${data.name}`
          }
        }
      }
      return {
        id: data._id,
        label: `[${data.number}] ${data.name}`
      }
    }
  )

  settingJournal.value = response.data
}

const settingJournal = ref<ISettingJournal>()

onMounted(async () => {
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
      <h3 class="capitalize">{{ settingJournal?.module }} | {{ settingJournal?.feature }}</h3>

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
              <tr v-for="journal in settingJournal?.journals" :key="journal">
                <td>
                  <p>{{ journal.account }}</p>
                  <p class="text-xs">{{ journal.description }}</p>
                </td>
                <td class="uppercase">
                  <span v-if="journal.editable" class="absolute">
                    <base-autocomplete
                      v-model="journal.chart_of_account"
                      :options="options"
                      border="none"
                    ></base-autocomplete>
                  </span>
                </td>
                <td class="text-right">
                  {{ journal.position === 'debit' ? 'xxx' : '' }}
                </td>
                <td class="text-right">
                  {{ journal.position === 'credit' ? 'xxx' : '' }}
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
