<script setup lang="ts">
const name = defineModel<string>('name')
const username = defineModel<string>('username')
const email = defineModel<string>('email')
const role = defineModel<string>('role')
</script>

<template>
  <base-card>
    <template #header>Users</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled label="Role" v-model="role" />
      <base-input disabled label="Name" v-model="name" />
      <base-input disabled label="Username" v-model="username" />
      <base-input disabled label="Email" v-model="email" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
