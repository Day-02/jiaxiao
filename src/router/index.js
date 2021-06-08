import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },


  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user.vue'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/student.vue'),
        meta: { title: '学员管理', icon: 'el-icon-school' }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'proxy',
        name: 'Proxy',
        component: () => import('@/views/proxy.vue'),
        meta: { title: '代理管理', icon: 'el-icon-s-custom' }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'banner',
        name: 'Banner',
        component: () => import('@/views/banner'),
        meta: { title: '广告管理', icon: 'el-icon-picture' }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/views/setting'),
        meta: { title: '系统设置', icon: 'el-icon-setting' }
      }
    ]
  },


  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'http://8.140.1.230:9527/#/fblog',
  //       meta: { title: '友情链接', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
