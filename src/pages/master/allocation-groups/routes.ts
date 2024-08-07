export default {
  path: 'master',
  children: [
    {
      path: 'allocation-groups',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/allocation-groups/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/master/allocation-groups/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/master/allocation-groups/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/allocation-groups/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
