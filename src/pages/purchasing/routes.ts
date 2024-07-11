export default {
  path: 'purchasing',
  children: [
    {
      path: '',
      component: () => import('@/pages/purchasing/menu/index.vue')
    }
  ]
}
