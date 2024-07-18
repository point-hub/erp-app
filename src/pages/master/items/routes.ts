export default {
  path: 'master',
  children: [
    {
      path: 'items',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/items/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/master/items/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/master/items/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/items/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
