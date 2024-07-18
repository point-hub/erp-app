export default {
  path: 'finance',
  children: [
    {
      path: 'cash-payments',
      children: [
        {
          path: '',
          component: () => import('@/pages/finance/cash-payments/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/finance/cash-payments/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/finance/cash-payments/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/finance/cash-payments/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
