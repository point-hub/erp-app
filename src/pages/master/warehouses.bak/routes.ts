export default {
  path: 'master',
  children: [
    {
      path: 'warehouses',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/warehouses/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/master/warehouses/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/master/warehouses/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/warehouses/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
