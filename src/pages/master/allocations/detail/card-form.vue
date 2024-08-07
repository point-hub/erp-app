<script setup lang="ts">
import { ref, watch } from 'vue'

import axios from '@/axios'

import type { IFormError } from './form'

const code = defineModel<string>('code')
const name = defineModel<string>('name')
const allocation_group_id = defineModel<string>('allocation_group_id')
const errors = defineModel<IFormError>('errors')
const allocationGroup = ref()

const selected = ref()
const options = ref([])

watch(allocation_group_id, () => {
  refetch()
})

const refetch = async () => {
  const response = await axios.get('/v1/allocation-groups', {
    params: {
      page: 1
    }
  })
  if (response.status === 200) {
    options.value = response.data.data.map((data: { _id: string; code: string; name: string }) => {
      if (data._id === allocation_group_id.value) {
        allocationGroup.value = `[${data.code}] ${data.name}`
      }
      return {
        id: data._id,
        label: `[${data.code}] ${data.name}`
      }
    })

    selected.value = options.value[0]
  }
}
</script>

<template>
  <base-card>
    <template #header>Allocations</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled v-model="allocationGroup" label="Allocation Group" />
      <base-input disabled v-model="code" label="Code" :errors="errors?.code" />
      <base-input disabled v-model="name" label="Name" :errors="errors?.name" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
