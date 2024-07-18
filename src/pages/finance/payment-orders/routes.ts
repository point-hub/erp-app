export default {
  path: 'finance',
  children: [
    {
      path: 'payment-orders',
      children: [
        {
          path: '',
          component: () => import('@/pages/finance/payment-orders/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/finance/payment-orders/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/finance/payment-orders/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/finance/payment-orders/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
