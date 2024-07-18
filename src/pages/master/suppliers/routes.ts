export default {
  path: 'master',
  children: [
    {
      path: 'suppliers',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/suppliers/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/master/suppliers/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/master/suppliers/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/suppliers/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
