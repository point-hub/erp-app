export default {
  path: 'master',
  children: [
    {
      path: 'users',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/users/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/master/users/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/master/users/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/users/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
