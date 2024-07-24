export default {
  path: 'manufacture',
  children: [
    {
      path: 'formulas',
      children: [
        {
          path: '',
          component: () => import('@/pages/manufacture/formulas/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/manufacture/formulas/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/manufacture/formulas/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/manufacture/formulas/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
