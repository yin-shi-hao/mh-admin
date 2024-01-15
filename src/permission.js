import router from './router'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { isHttp } from '@/utils/validate'
import { isRelogin } from '@/utils/request'
import useUserStore from '@/store/modules/user'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'

NProgress.configure({ showSpinner: false });

// const whiteList = ['/login', '/register','/index',"/tool/build",'/system/user',"/assignment/task","/assignment/taskClassify","/assignment/taskReceive","/receiver/person","/receiver/withdrawRecord","/receiver/walletBill","/system/role","/system/menu","/monitor/online","/system/dept","/system/job","/system/dict","/monitor/logs","/monitor/errorLog","/user/profile"];
const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  console.log(to,from,"路由")
  NProgress.start()
  if (getToken()) {
    to.meta.title && useSettingsStore().setTitle(to.meta.title)
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (useUserStore().roles.length === 0) {
        isRelogin.show = true
        next()

        // 判断当前用户是否已拉取完user_info信息
        // useUserStore().getInfo().then(() => {
        //   isRelogin.show = false
        //   usePermissionStore().generateRoutes().then(accessRoutes => {
        //     // 根据roles权限生成可访问的路由表
        //     accessRoutes.forEach(route => {
        //       if (!isHttp(route.path)) {
        //         router.addRoute(route) // 动态添加可访问路由表
        //       }
        //     })
        //     next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
        //   })
        // }).catch(err => {
        //   useUserStore().logOut().then(() => {
        //     ElMessage.error(err)
        //     next({ path: '/' })
        //   })
        // })
      } else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      console.log(to,"静如的理由")
      
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
