export default {
  path: 'finance',
  children: [
    {
      path: 'cash-report',
      component: () => import('@/pages/finance/cash-report/index.vue')
    }
  ]
}
