export default {
  path: 'manufacture',
  children: [
    {
      path: 'machines',
      children: [
        {
          path: '',
          component: () => import('@/pages/manufacture/machines/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/manufacture/machines/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/manufacture/machines/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/manufacture/machines/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
