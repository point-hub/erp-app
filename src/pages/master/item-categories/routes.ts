export default {
  path: 'master',
  children: [
    {
      path: 'item-categories',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/item-categories/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/master/item-categories/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/master/item-categories/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/item-categories/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
