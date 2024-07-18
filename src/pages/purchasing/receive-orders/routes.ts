export default {
  path: 'purchasing',
  children: [
    {
      path: 'receive-orders',
      children: [
        {
          path: '',
          component: () => import('@/pages/purchasing/receive-orders/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/purchasing/receive-orders/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/purchasing/receive-orders/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/purchasing/receive-orders/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
