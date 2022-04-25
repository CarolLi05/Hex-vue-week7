import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/',
    component: () => import('../views/front/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/front/LoginView.vue')
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/front/ProductsView.vue')
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('../views/front/ProductView.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/front/CartView.vue')
      },
      {
        path: 'orderForm',
        name: 'form',
        component: () => import('../views/front/OrderForm.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/DashboardView.vue'),
    children: [
      {
        path: 'products',
        name: 'adminProducts',
        component: () => import('../views/dashboard/AdminProducts.vue')
      },
      {
        path: 'order',
        name: 'adminOrder',
        component: () => import('../views/dashboard/AdminOrder.vue')
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('../views/dashboard/AdminCoupon.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active' // Bootstrap
})

export default router
