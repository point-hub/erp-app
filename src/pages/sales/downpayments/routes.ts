export default {
  path: 'sales',
  children: [
    {
      path: 'downpayments',
      children: [
        {
          path: '',
          component: () => import('@/pages/sales/downpayments/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/sales/downpayments/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/sales/downpayments/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/sales/downpayments/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
