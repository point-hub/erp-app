export default {
  path: 'finance',
  children: [
    {
      path: 'bank-report',
      component: () => import('@/pages/finance/bank-report/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
