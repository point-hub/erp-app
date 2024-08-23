<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardTable from './card-table.vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (!authStore.permission?.master?.roles?.read) {
    router.push('/unauthorized')
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />
    <base-card
      ><table>
        <tr>
          <td>ASDJOAHIFHJPEQ</td>
          <td>ASDJOAHIFHJPEQ</td>
          <td>ASDJOAHIFHJPEQ</td>
          <td>ASDJOAHIFHJPEQ</td>
          <td>ASDJOAHIFHJPEQ</td>
          <td>ASDJOAHIFHJPEQ</td>
          <td>ASDJOAHIFHJPEQ</td>
          <td>XCDQPIJ)#!) 0931u 0j1rj13ir13jo</td>
          <td>XCDQPIJ)#!) 0931u 0j1rj13ir13jo</td>
          <td>XCDQPIJ)#!) 0931u 0j1rj13ir13jo</td>
          <td>XCDQPIJ)#!) 0931u 0j1rj13ir13jo</td>
        </tr>
      </table></base-card
    >
    <card-table />
  </div>
</template>

<style scoped lang="postcss"></style>
