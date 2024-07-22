export default {
  path: 'sales',
  children: [
    {
      path: 'payment-collections',
      children: [
        {
          path: '',
          component: () => import('@/pages/sales/payment-collections/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/sales/payment-collections/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/sales/payment-collections/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/sales/payment-collections/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
