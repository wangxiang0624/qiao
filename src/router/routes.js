const routes = [
    {
        name: 'paymentUser',
        path: '/paymentUser',
        component: () => import('@/view/indexHome')
    },
    {
        name: 'B',
        path: '/B',
        component: () => import('@/view/indexDetail')
    },
    
];
 
export default routes