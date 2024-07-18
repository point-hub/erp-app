<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useToastStore } from '@/stores/toast-store'

import { useForm } from './form'
import { usePassword } from './password'

const { toastRef } = useToastStore()
const form = reactive(useForm())
const password = reactive(usePassword())

const router = useRouter()
const usernameRef = ref()

onMounted(() => {
  usernameRef.value.inputRef.focus()
})

const onSubmit = async () => {
  if (form.data.username == 'gmbtest' && form.data.password == 'Admin123!') {
    router.push('/')
    return
  } else {
    toastRef.toast('wrong username or password', { color: 'danger' })
  }
}
</script>

<template>
  <base-card class="max-w-xl">
    <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <div class="-mt-4">
          <h3 class="font-semibold">Sign in with Pointhub</h3>
          to continue to ERP
        </div>
        <div v-show="false">
          You can’t sign in because this app sent an invalid request. You can try again later, or
          contact the developer about this issue.
        </div>
        <div class="flex flex-col gap-4">
          <base-input
            ref="usernameRef"
            required
            v-model="form.data.username"
            :errors="form.errors.username"
            label="Username / Email"
            layout="vertical"
          />
          <base-input
            required
            :type="password.type"
            v-model="form.data.password"
            :errors="form.errors.password"
            label="Password"
            layout="vertical"
          >
            <template #suffix>
              <BaseButton @click="password.toggle" variant="text" color="secondary">
                <BaseIcon icon="i-far-eye" />
              </BaseButton>
            </template>
          </base-input>
          <div>
            <base-button type="submit" is-block color="primary"> Sign In </base-button>
          </div>
        </div>
      </div>
    </form>
  </base-card>
</template>

<style scoped lang="postcss"></style>
