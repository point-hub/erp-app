export default {
  path: 'master',
  children: [
    {
      path: '',
      component: () => import('@/pages/master/menu/index.vue')
    }
  ]
}
