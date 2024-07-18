export default {
  path: 'purchasing',
  children: [
    {
      path: 'downpayments',
      children: [
        {
          path: '',
          component: () => import('@/pages/purchasing/downpayments/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/purchasing/downpayments/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/purchasing/downpayments/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/purchasing/downpayments/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
