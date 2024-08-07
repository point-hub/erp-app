export default {
  path: 'master',
  children: [
    {
      path: 'supplier-groups',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/supplier-groups/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/master/supplier-groups/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/master/supplier-groups/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/supplier-groups/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
