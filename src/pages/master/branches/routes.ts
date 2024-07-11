export default {
  path: 'master',
  children: [
    {
      path: 'branches',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/branches/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/master/branches/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/master/branches/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/branches/edit/index.vue')
        }
      ]
    }
  ]
}
