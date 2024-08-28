export default {
  path: 'inventory',
  children: [
    {
      path: 'inventory-report',
      children: [
        {
          path: '',
          component: () => import('@/pages/inventory/inventory-report/list/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
