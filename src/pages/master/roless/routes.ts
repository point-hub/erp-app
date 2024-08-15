export default {
  path: 'master',
  children: [
    {
      path: 'roles',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/roles/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/master/roles/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/master/roles/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/roles/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
