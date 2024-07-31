export default {
  path: 'inventory',
  children: [
    {
      path: 'stock-corrections',
      children: [
        {
          path: '',
          component: () => import('@/pages/inventory/stock-corrections/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/inventory/stock-corrections/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/inventory/stock-corrections/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/inventory/stock-corrections/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
