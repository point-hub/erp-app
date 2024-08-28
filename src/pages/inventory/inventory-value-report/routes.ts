export default {
  path: 'inventory',
  children: [
    {
      path: 'inventory-value-report',
      children: [
        {
          path: '',
          component: () => import('@/pages/inventory/inventory-value-report/list/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
