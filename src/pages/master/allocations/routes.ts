export default {
  path: 'master',
  children: [
    {
      path: 'allocations',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/allocations/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/master/allocations/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/master/allocations/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/allocations/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
