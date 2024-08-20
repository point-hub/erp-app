export default {
  path: 'purchasing',
  children: [
    {
      path: 'down-payments',
      children: [
        {
          path: '',
          component: () => import('@/pages/purchasing/down-payments/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/purchasing/down-payments/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/purchasing/down-payments/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/purchasing/down-payments/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
