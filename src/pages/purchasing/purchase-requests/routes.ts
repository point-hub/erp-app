export default {
  path: 'purchasing',
  children: [
    {
      path: 'purchase-requests',
      children: [
        {
          path: '',
          component: () => import('@/pages/purchasing/purchase-requests/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/purchasing/purchase-requests/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/purchasing/purchase-requests/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/purchasing/purchase-requests/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
