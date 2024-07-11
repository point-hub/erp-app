export default {
  path: 'master',
  children: [
    {
      path: 'warehouses',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/warehouses/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/master/warehouses/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/master/warehouses/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/warehouses/edit/index.vue')
        }
      ]
    }
  ]
}
