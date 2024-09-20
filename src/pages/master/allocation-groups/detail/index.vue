<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetAllocationGroupApi } from './retrieve.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getAllocationGroupApi = useGetAllocationGroupApi()

const form = reactive(useForm())

const formId = ref()
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  if (!authStore.permission?.master?.allocations?.read) {
    router.push('/unauthorized')
  }

  const response = await getAllocationGroupApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.code = response.code
    form.data.name = response.name
    form.data.notes = response.notes
  }

  isLoading.value = false
})
</script>

<template>
  <div v-if="isLoading" class="w-full h-full flex justify-center items-center text-2xl gap-2">
    <base-loader />
  </div>
  <div v-else class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-action v-if="authStore.permission?.master?.allocations?.read" :data="form.data" />

    <card-form
      v-if="authStore.permission?.master?.allocations?.read"
      :form-id="route.params.id.toString()"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:notes="form.data.notes"
    />
  </div>
</template>

<style>
/* HTML: <div class="loader"></div> */
.loader {
  --w: 10ch;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  line-height: 1.2em;
  letter-spacing: var(--w);
  width: var(--w);
  overflow: hidden;
  white-space: nowrap;
  color: #0000;
  animation: l19 2s infinite linear;
}

.loader:before {
  content: 'Loading...';
}

@keyframes l19 {
  0% {
    text-shadow:
      calc(0 * var(--w)) 0,
      calc(-1 * var(--w)) 0,
      calc(-2 * var(--w)) 0,
      calc(-3 * var(--w)) 0,
      calc(-4 * var(--w)) 0,
      calc(-5 * var(--w)) 0,
      calc(-6 * var(--w)) 0,
      calc(-7 * var(--w)) 0,
      calc(-8 * var(--w)) 0,
      calc(-9 * var(--w)) 0;
  }
  4% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0,
      calc(-2 * var(--w)) 0,
      calc(-3 * var(--w)) 0,
      calc(-4 * var(--w)) 0,
      calc(-5 * var(--w)) 0,
      calc(-6 * var(--w)) 0,
      calc(-7 * var(--w)) 0,
      calc(-8 * var(--w)) 0,
      calc(-9 * var(--w)) 0;
  }
  8% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0,
      calc(-3 * var(--w)) 0,
      calc(-4 * var(--w)) 0,
      calc(-5 * var(--w)) 0,
      calc(-6 * var(--w)) 0,
      calc(-7 * var(--w)) 0,
      calc(-8 * var(--w)) 0,
      calc(-9 * var(--w)) 0;
  }
  12% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0,
      calc(-4 * var(--w)) 0,
      calc(-5 * var(--w)) 0,
      calc(-6 * var(--w)) 0,
      calc(-7 * var(--w)) 0,
      calc(-8 * var(--w)) 0,
      calc(-9 * var(--w)) 0;
  }
  16% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0,
      calc(-5 * var(--w)) 0,
      calc(-6 * var(--w)) 0,
      calc(-7 * var(--w)) 0,
      calc(-8 * var(--w)) 0,
      calc(-9 * var(--w)) 0;
  }
  20% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0,
      calc(-6 * var(--w)) 0,
      calc(-7 * var(--w)) 0,
      calc(-8 * var(--w)) 0,
      calc(-9 * var(--w)) 0;
  }
  24% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0,
      calc(-7 * var(--w)) 0,
      calc(-8 * var(--w)) 0,
      calc(-9 * var(--w)) 0;
  }
  28% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0,
      calc(-8 * var(--w)) 0,
      calc(-9 * var(--w)) 0;
  }
  32% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0,
      calc(-9 * var(--w)) 0;
  }
  36% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0;
  }
  40%,
  60% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }
  64% {
    text-shadow:
      calc(0 * var(--w)) 0,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }
  68% {
    text-shadow:
      calc(0 * var(--w)) 0,
      calc(-1 * var(--w)) 0,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }
  72% {
    text-shadow:
      calc(0 * var(--w)) 0,
      calc(-1 * var(--w)) 0,
      calc(-2 * var(--w)) 0,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }
  76% {
    text-shadow:
      calc(0 * var(--w)) 0,
      calc(-1 * var(--w)) 0,
      calc(-2 * var(--w)) 0,
      calc(-3 * var(--w)) 0,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }
  80% {
    text-shadow:
      calc(0 * var(--w)) 0,
      calc(-1 * var(--w)) 0,
      calc(-2 * var(--w)) 0,
      calc(-3 * var(--w)) 0,
      calc(-4 * var(--w)) 0,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }
  84% {
    text-shadow:
      calc(0 * var(--w)) 0,
      calc(-1 * var(--w)) 0,
      calc(-2 * var(--w)) 0,
      calc(-3 * var(--w)) 0,
      calc(-4 * var(--w)) 0,
      calc(-5 * var(--w)) 0,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }
  88% {
    text-shadow:
      calc(0 * var(--w)) 0,
      calc(-1 * var(--w)) 0,
      calc(-2 * var(--w)) 0,
      calc(-3 * var(--w)) 0,
      calc(-4 * var(--w)) 0,
      calc(-5 * var(--w)) 0,
      calc(-6 * var(--w)) 0,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }
  92% {
    text-shadow:
      calc(0 * var(--w)) 0,
      calc(-1 * var(--w)) 0,
      calc(-2 * var(--w)) 0,
      calc(-3 * var(--w)) 0,
      calc(-4 * var(--w)) 0,
      calc(-5 * var(--w)) 0,
      calc(-6 * var(--w)) 0,
      calc(-7 * var(--w)) 0,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }
  96% {
    text-shadow:
      calc(0 * var(--w)) 0,
      calc(-1 * var(--w)) 0,
      calc(-2 * var(--w)) 0,
      calc(-3 * var(--w)) 0,
      calc(-4 * var(--w)) 0,
      calc(-5 * var(--w)) 0,
      calc(-6 * var(--w)) 0,
      calc(-7 * var(--w)) 0,
      calc(-8 * var(--w)) 0,
      calc(-9 * var(--w)) 0 #000;
  }
  100% {
    text-shadow:
      calc(0 * var(--w)) 0,
      calc(-1 * var(--w)) 0,
      calc(-2 * var(--w)) 0,
      calc(-3 * var(--w)) 0,
      calc(-4 * var(--w)) 0,
      calc(-5 * var(--w)) 0,
      calc(-6 * var(--w)) 0,
      calc(-7 * var(--w)) 0,
      calc(-8 * var(--w)) 0,
      calc(-9 * var(--w)) 0;
  }
}
</style>
