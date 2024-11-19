<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardTable from './card-table.vue'

const authStore = useAuthStore()
const router = useRouter()

const sitemap = {
  title: 'My Sitemap',
  subtitle: 'Version 1.0',
  homepage: {
    link: 'https://dev.pointhub.net/library/papp',
    name: 'Home',
    desc: ''
  },
  menu: [
    {
      name: 'Getting Started',
      child: [
        {
          link: '/library/papp/docs/introduction',
          name: 'Introduction'
        },
        {
          link: '/library/papp/docs/quick-start',
          name: 'Quick Start'
        }
      ]
    },
    {
      name: 'Components',
      child: [
        {
          link: '/library/papp/docs/components/accordion',
          name: 'Accordion',
          child: [
            {
              link: '/library/papp/docs/components/accordion#always-open',
              name: 'Always Open'
            },
            {
              link: '/library/papp/docs/components/accordion#using-slot',
              name: 'Using Slot'
            }
          ]
        },
        {
          link: '/library/papp/docs/components/alert',
          name: 'Alert'
        },
        {
          link: '/library/papp/docs/components/avatar',
          name: 'Avatar'
        },
        {
          link: '/library/papp/docs/components/button',
          name: 'Button'
        }
      ]
    },
    {
      name: 'Form',
      child: [
        {
          link: '/library/papp/docs/form/autocomplete',
          name: 'Autocomplete'
        }
      ]
    }
  ]
}

onMounted(() => {
  if (!authStore.permission?.purchasing?.purchase_requests?.read) {
    router.push('/unauthorized')
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    das
    <base-sitemap :sitemap="sitemap"></base-sitemap>
    <card-breadcrumbs />
    <card-table />
  </div>
</template>

<style scoped lang="postcss"></style>
