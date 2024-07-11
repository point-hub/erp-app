export default {
  path: 'master',
  children: [
    {
      path: 'allocations',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/allocations/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/master/allocations/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/master/allocations/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/allocations/edit/index.vue')
        }
      ]
    }
  ]
}
