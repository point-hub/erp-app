export default {
  path: 'master',
  children: [
    {
      path: 'chart-of-accounts',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/chart-of-accounts/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'tree',
          component: () => import('@/pages/master/chart-of-accounts/tree/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/master/chart-of-accounts/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/master/chart-of-accounts/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/chart-of-accounts/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
