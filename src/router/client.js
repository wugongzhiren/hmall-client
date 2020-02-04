import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store';

import Mall from '@/pages/client/Mall';
import MallShow from '@/pages/client/MallShow';
import MallIndex from '@/pages/client/MallIndex';
import MallLogin from '@/pages/client/MallLogin';
import GoodsDetail from '@/pages/client/GoodsDetail';
import GoodsList from '@/pages/client/GoodsList';
import Personal from '@/pages/client/Personal';
import MyOrder from '@/pages/client/MyOrder';
import MyData from '@/pages/client/MyData';
import Cart from '@/pages/client/Cart';
import ErrorPage from '@/pages/ErrorPage';
import AdminLogin from '@/pages/admin/AdminLogin';
import Backstage from '@/pages/admin/Backstage'
import EditUser from '@/pages/admin/EditUser'
import EditAdmin from '@/pages/admin/EditAdmin'
import Goods from '@/pages/admin/Goods'
import Orders from '@/pages/admin/Orders'
import EditOrders from '@/pages/admin/EditOrders'
import EditGoods from '@/pages/admin/EditGoods'
import Messages from '@/pages/admin/Messages'
import EditTicket from '@/pages/admin/EditTicket'
Vue.use(Router);

let router = new Router({
  routes: [
    {
      path:"/",
      redirect:"/mall"
    },{
      path: '/login',
      name: 'MallLogin',
      component: MallLogin
    },{
      path: '/AdminLogin',
      name: 'AdminLogin',
      component: AdminLogin
    },{
      path: '/mall',
      name: 'Mall',
      component: Mall,
      redirect:'/mall/show',
      children:[
        {
          path: 'show',
          name: 'MallShow',
          component: MallShow,
          redirect:'/mall/show/index',
          children:[
            {
              path: 'index',
              name: 'MallIndex',
              component: MallIndex
            },{
              path: 'goodsList/:typeId/:keyword',
              name: 'GoodsList',
              component: GoodsList
            },
          ]
        },{
          path: 'goods/:id',
          name: 'GoodsDetail',
          component: GoodsDetail
        },{
          path: 'personal',
          name: 'Personal',
          component: Personal,
          redirect:'/mall/personal/cart',
          children:[
            {
              path: 'cart',
              name: 'Cart',
              component: Cart,
              meta: {
                requireLogin:true,
              },
            },{
              path: 'myData',
              name: 'MyData',
              component: MyData,
              meta: {
                requireLogin:true,
              },
            },{
              path: 'myOrder',
              name: 'MyOrder',
              component: MyOrder,
              meta: {
                requireLogin:true,
              },
            }
          ]
        }
      ]
    },{
      path: '/backstage',
      name: 'Backstage',
      redirect:"/backstage/editUser",
      component: Backstage,
      children: [
        {
          path: 'editUser',
          name: 'EditUser',
          component: EditUser,
          meta: {
            requireLogin:true,
          },
        }, {
          path: 'editTicket',
          name: 'EditTicket',
          component: EditTicket,
          meta: {
            requireLogin:true,
          },
        },{
          path: 'editAdmin',
          name: 'EditAdmin',
          component: EditAdmin,
          meta: {
            requireLogin:true,
          },
        },{
          path: 'goods',
          name: 'Goods',
          component: Goods,
          meta: {
            requireLogin:true,
          },
        },{
          path: 'goods/:id',
          name: 'EditGoods',
          component: EditGoods,
          meta: {
            requireLogin:true,
          },
        },{
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: {
            requireLogin:true,
          },
        },{
          path: 'orders/:id',
          name: 'EditOrders',
          component: EditOrders,
          meta: {
            requireLogin:true,
          },
        },{
          path: 'messages',
          name: 'Messages',
          component: Messages,
          meta: {
            requireLogin:true,
          },
        }
      ]
    },{
  	  path:'*',
  	  name:'ErrorPage',
  	  component: ErrorPage
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

//登录拦截
/*router.beforeEach((to,from,next) => {
  if(to.meta.requireLogin){
    if(store.state.clientToken){
      next()
    }else{
      next({
        path: '/login',
        query:{redirect: to.fullPath}
      })
    }
  }else{
    next();
  }
});*/

export default router;
