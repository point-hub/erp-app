export default {
  path: 'inventory',
  children: [
    {
      path: 'inventory-audits',
      children: [
        {
          path: '',
          component: () => import('@/pages/inventory/inventory-audits/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/inventory/inventory-audits/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/inventory/inventory-audits/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/inventory/inventory-audits/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
