import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Customer from '../views/customer/Customer.vue'
import Item from '../views/item/Item.vue'
import Sales from '../views/sales/Sales.vue'
import EditCustomer from '../views/customer/EditCustomer.vue'
import EditItem from '../views/item/EditItem.vue'
import EditSales from '../views/sales/EditSales.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer
  },
  {
    path: '/customer-edit',
    name: 'EditCustomer',
    component: EditCustomer
  },
  {
    path: '/item',
    name: 'Item',
    component: Item
  },
  {
    path: '/item-edit',
    name: 'EditItem',
    component: EditItem
  },
  {
    path: '/sales',
    name: 'Sales',
    component: Sales
  },
  {
    path: '/sales-edit',
    name: 'EditSales',
    component: EditSales
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
