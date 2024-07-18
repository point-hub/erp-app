export default {
  path: 'master',
  children: [
    {
      path: 'branches',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/branches/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/master/branches/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/master/branches/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/branches/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
