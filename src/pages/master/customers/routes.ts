export default {
  path: 'master',
  children: [
    {
      path: 'customers',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/customers/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/master/customers/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/master/customers/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/customers/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
