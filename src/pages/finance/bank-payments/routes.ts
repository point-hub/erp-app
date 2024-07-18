export default {
  path: 'finance',
  children: [
    {
      path: 'bank-payments',
      children: [
        {
          path: '',
          component: () => import('@/pages/finance/bank-payments/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/finance/bank-payments/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/finance/bank-payments/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/finance/bank-payments/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
