export default {
  path: 'purchasing',
  children: [
    {
      path: 'purchase-orders',
      children: [
        {
          path: '',
          component: () => import('@/pages/purchasing/purchase-orders/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/purchasing/purchase-orders/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/purchasing/purchase-orders/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/purchasing/purchase-orders/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
