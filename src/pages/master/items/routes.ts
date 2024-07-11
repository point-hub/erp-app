export default {
  path: 'master',
  children: [
    {
      path: 'items',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/items/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/master/items/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/master/items/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/items/edit/index.vue')
        }
      ]
    }
  ]
}
