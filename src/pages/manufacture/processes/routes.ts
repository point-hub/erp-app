export default {
  path: 'manufacture',
  children: [
    {
      path: 'processes',
      children: [
        {
          path: '',
          component: () => import('@/pages/manufacture/processes/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/manufacture/processes/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/manufacture/processes/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/manufacture/processes/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
