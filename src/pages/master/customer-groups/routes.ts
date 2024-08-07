export default {
  path: 'master',
  children: [
    {
      path: 'customer-groups',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/customer-groups/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/master/customer-groups/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/master/customer-groups/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/customer-groups/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
