import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store';

import Mall from '@/pages/client/Mall';
import MallShow from '@/pages/client/MallShow';
import MallIndex from '@/pages/client/MallIndex';
import MallLogin from '@/pages/client/MallLogin';
import MySuggest from '@/pages/client/MySuggest';
import MyCollects from '@/pages/client/MyCollects';
import MyTicket from '@/pages/client/MyTicket';
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
import EditAds from '@/pages/admin/EditAds'
import Suggest from '@/pages/admin/Suggest'
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
            }, {
              path: 'myOrder',
              name: 'MyOrder',
              component: MyOrder,
              meta: {
                requireLogin: true,
              },
            },{
              path: 'mySuggest',
              name: 'MySuggest',
              component: MySuggest,
              meta: {
                requireLogin:true,
              },
            },{
              path: 'myCollects',
              name: 'MyCollects',
              component: MyCollects,
              meta: {
                requireLogin:true,
              },
            },{
              path: 'myTicket',
              name: 'MyTicket',
              component: MyTicket,
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
      redirect:"/backstage/goods",
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
          path: 'editAds',
          name: 'EditAds',
          component: EditAds,
          meta: {
            requireLogin:true,
          },
        }, {
          path: 'suggest',
          name: 'Suggest',
          component: Suggest,
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
