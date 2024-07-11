export default {
  path: 'finance',
  children: [
    {
      path: '',
      component: () => import('@/pages/finance/menu/index.vue')
    }
  ]
}
