<script setup lang="ts">
import {
  AppFooter,
  AppSidebar,
  useMobileBreakpoint,
  useSidebar,
  useSidebarStore
} from '@point-hub/papp'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import AppHeader from '@/components/app-header.vue'
import { useAppMenu } from '@/composable/app-menu'

import { version } from '../../package.json'

const route = useRoute()

useSidebar()

const appMenu = reactive(useAppMenu())
const mobileBreakpoint = useMobileBreakpoint()
const sidebarStore = useSidebarStore()

const choosenAppIndex = ref(0)
const choosenTitle = ref(appMenu.menus[choosenAppIndex.value].name)
const onChooseApp = (path: string) => {
  for (const [index, app] of appMenu.menus.entries()) {
    if (app.path === path) {
      choosenTitle.value = app.name
      choosenAppIndex.value = index
    }
  }
}

onMounted(() => {
  for (const [index, app] of appMenu.menus.entries()) {
    if (route.path.includes(app.path)) {
      choosenTitle.value = app.name
      choosenAppIndex.value = index
    }
  }
})
</script>

<template>
  <div class="app-layout">
    <!-- Header -->
    <component :is="AppHeader" class="print:hidden!" />

    <!-- Sidebar -->
    <div class="print:hidden!">
      <component :is="AppSidebar" :title="choosenTitle" :apps="appMenu.menus"
        :menus="appMenu.menus[choosenAppIndex].menu ?? []" :is-sidebar-open="sidebarStore.isSidebarOpen"
        :is-mobile="mobileBreakpoint.isMobile()" @choose="onChooseApp" class="print:hidden!" />
    </div>

    <!-- Main Container -->
    <div class="main-container">
      <!-- Main Content -->
      <main class="main-content">
        <router-view></router-view>
      </main>

      <!-- Footer -->
      <component :is="AppFooter" :version="version" class="print:hidden!" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.app-layout {
  @apply h-100vh w-full flex grow;
}

.main-container {
  @apply flex flex-col py-4 space-y-8 w-full transition-all duration-300;
}

.is-sidebar-open .main-container {
  @apply lg:w-[calc(100%-(var(--sidebar-panel-width)+var(--sidebar-menu-width)))] lg:ml-[calc(var(--sidebar-panel-width)+var(--sidebar-menu-width))];
}

.main-content {
  @apply mt-[60px] px-4 flex-1;
}

.main-content-header {
  @apply flex space-x-4 py-2 overflow-x-hidden;
}

.main-content-body {
  @apply flex flex-col space-y-5;
}

@media print {
  .is-sidebar-open .main-container {
    @apply lg:w-full lg:ml-0;
    /* Remove sidebar-specific width and margin for print */
  }

  .card {
    @apply border-none;
  }

  .main-content {
    @apply mt-0 px-0 flex-1;
  }

  .sidebar,
  .sidebar-panel,
  .sidebar-menu {
    display: none;
    /* Hide sidebar elements on print */
  }
}
</style>
