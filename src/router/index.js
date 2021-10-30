import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRouterMap = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        noCache: true,
        affix: true
      }
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },


  {
    path: '/aticle',
    component: Layout,
    redirect: 'aticle/list',
    name: 'aticle',
    meta: {
      title: '文章中心',
      icon: 'list'
    },
    children: [{
        path: 'add',
        component: () => import('@/views/aticle/add'),
        name: 'add',
        meta: {
          title: '新增文章',
          noCache: true
        }
      },
      {
        path: 'list',
        component: () => import('@/views/aticle/add'),
        name: 'list',
        meta: {
          title: '文章列表',
          noCache: true
        }
      },
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: 'category/index',
    name: 'category',
    meta: {
      title: '分类管理',
      icon: 'people'
    },
    children: [{
      path: 'index',
      component: () => import('@/views/tag/index'),
      name: 'list',
      meta: {
        title: '标签列表',
        noCache: true
      }
    }]
  },
  {
    path: '/tag',
    component: Layout,
    redirect: 'tag/index',
    name: 'tag',
    meta: {
      title: '分类管理',
      icon: 'form'
    },
    children: [{
      path: 'index',
      component: () => import('@/views/category/index'),
      name: 'list',
      meta: {
        title: '分类管理',
        noCache: true
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
export const asyncRouterMap = [{
    path: '/aticle',
    component: Layout,
    redirect: 'aticle/list',
    name: 'aticle',
    meta: {
      title: '文章中心',
      icon: 'list'
    },
    children: [{
        path: 'add',
        component: () => import('@/views/aticle/add'),
        name: 'add',
        meta: {
          title: '新增文章',
          noCache: true
        }
      },
      {
        path: 'list',
        component: () => import('@/views/aticle/add'),
        name: 'list',
        meta: {
          title: '文章列表',
          noCache: true
        }
      },
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: 'category/index',
    name: 'category',
    meta: {
      title: '分类管理',
      icon: 'people'
    },
    children: [{
      path: 'index',
      component: () => import('@/views/tag/index'),
      name: 'list',
      meta: {
        title: '标签列表',
        noCache: true
      }
    }]
  },
  {
    path: '/tag',
    component: Layout,
    redirect: 'tag/index',
    name: 'tag',
    meta: {
      title: '分类管理',
      icon: 'form'
    },
    children: [{
      path: 'index',
      component: () => import('@/views/category/index'),
      name: 'list',
      meta: {
        title: '分类管理',
        noCache: true
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]