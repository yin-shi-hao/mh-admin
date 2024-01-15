<template>
  <div :class="{ 'has-logo': showLogo }" :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
        :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
        :unique-opened="true"
        :active-text-color="theme"
        :collapse-transition="false"
        mode="vertical"
        router
      >
      <el-menu-item index="/index">
          <el-icon><setting /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
        <!-- <el-menu-item index="/index">
          <el-icon><setting /></el-icon>
          <span>首页</span>
        </el-menu-item>
          <el-sub-menu index="1-1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>任务管理</span>
            </template>
            <el-menu-item index="/assignment/task" >任务列表</el-menu-item>
            <el-menu-item index="/assignment/taskClassify" >审核列表</el-menu-item>
            <el-menu-item index="/assignment/taskReceive" >任务分类</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="1-2">
            <template #title><el-icon><location /></el-icon>
              <span>任务管理</span></template>
            <el-menu-item index="1-2-1">item one</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="1-3">
            <template #title><el-icon><location /></el-icon>
              <span>任务管理</span></template>
            <el-menu-item index="1-3-1">item one</el-menu-item>
          </el-sub-menu> -->
      </el-menu>
     
    </el-scrollbar>
    
  </div>
</template>

<script setup>
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.module.scss'
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'

const route = useRoute();
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()
const routedata=[
{
    path:"/assignment/task",
    name:"任务管理"
  }
]
const sidebarRouters=[
    
    {
        "name": "任务管理",
        "path": "/assignment",
        "hidden": false,
        "redirect": "noredirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
            "title": "任务管理",
            "icon": "list",
            "noCache": true
        },
        "children": [
            {
                "name": "Task",
                "path": "task",
                "hidden": false,
                "component": "assignment/task",
                "meta": {
                    "title": "任务列表",
                    "icon": "list",
                    "noCache": true
                }
            },
            {
                "name": "TaskReceive",
                "path": "taskReceive",
                "hidden": false,
                "component": "assignment/receive",
                "meta": {
                    "title": "审核列表",
                    "icon": "system",
                    "noCache": true
                }
            },
            {
                "name": "TaskClassify",
                "path": "taskClassify",
                "hidden": false,
                "component": "assignment/classify",
                "meta": {
                    "title": "任务分类",
                    "icon": "tree-table",
                    "noCache": true
                }
            }
        ]
    },
    {
        "name": "知识付费管理",
        "path": "/lesson",
        "hidden": false,
        "redirect": "noredirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
            "title": "知识付费管理",
            "icon": "list",
            "noCache": true
        },
        "children": [
            {
                "name": "LessonList",
                "path": "lessonList",
                "hidden": false,
                "component": "lesson/lessonList",
                "meta": {
                    "title": "课程列表",
                    "icon": "list",
                    "noCache": true
                }
            }
        ]
    },
    {
        "name": "Receiver",
        "path": "/receiver",
        "hidden": false,
        "redirect": "noredirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
            "title": "账号管理",
            "icon": "user",
            "noCache": true
        },
        "children": [
            {
                "name": "Person",
                "path": "person",
                "hidden": false,
                "component": "receiver/person/index",
                "meta": {
                    "title": "账号列表",
                    "icon": "people",
                    "noCache": true
                }
            },
            {
                "name": "WalletBill",
                "path": "walletBill",
                "hidden": false,
                "component": "receiver/bill/index",
                "meta": {
                    "title": "余额明细",
                    "icon": "money",
                    "noCache": true
                }
            },
            {
                "name": "WithdrawRecord",
                "path": "withdrawRecord",
                "hidden": false,
                "component": "receiver/withdraw/index",
                "meta": {
                    "title": "提现记录",
                    "icon": "money",
                    "noCache": true
                }
            },{
                "name": "member",
                "path": "member",
                "hidden": false,
                "component": "receiver/withdraw/index",
                "meta": {
                    "title": "微信支付记录",
                    "icon": "money",
                    "noCache": true
                }
            },{
                "name": "invite",
                "path": "invite",
                "hidden": false,
                "component": "receiver/withdraw/index",
                "meta": {
                    "title": "分销记录",
                    "icon": "money",
                    "noCache": true
                }
            }
        ]
    },
    {
        "name": "系统管理",
        "path": "/system",
        "hidden": false,
        "redirect": "noredirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
            "title": "系统管理",
            "icon": "system",
            "noCache": true
        },
        "children": [
            {
                "name": "User",
                "path": "user",
                "hidden": false,
                "component": "system/user/index",
                "meta": {
                    "title": "用户管理",
                    "icon": "peoples",
                    "noCache": true
                }
            },
            {
                "name": "Role",
                "path": "role",
                "hidden": false,
                "component": "system/roles/index",
                "meta": {
                    "title": "角色管理",
                    "icon": "role",
                    "noCache": true
                }
            },
            {
                "name": "Menu",
                "path": "menu",
                "hidden": false,
                "component": "system/menu/index",
                "meta": {
                    "title": "菜单管理",
                    "icon": "menu",
                    "noCache": true
                }
            },
            {
                "name": "Dept",
                "path": "dept",
                "hidden": false,
                "component": "system/dept/index",
                "meta": {
                    "title": "部门管理",
                    "icon": "dept",
                    "noCache": true
                }
            },
            {
                "name": "Job",
                "path": "job",
                "hidden": false,
                "component": "system/job/index",
                "meta": {
                    "title": "岗位管理",
                    "icon": "Steve-Jobs",
                    "noCache": true
                }
            },
            {
                "name": "Dict",
                "path": "dict",
                "hidden": false,
                "component": "system/dict/index",
                "meta": {
                    "title": "字典管理",
                    "icon": "dictionary",
                    "noCache": true
                }
            }
        ]
    },
    {
        "name": "系统监控",
        "path": "/monitor",
        "hidden": false,
        "redirect": "noredirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
            "title": "系统监控",
            "icon": "monitor",
            "noCache": true
        },
        "children": [
            {
                "name": "OnlineUser",
                "path": "online",
                "hidden": false,
                "component": "monitor/online/index",
                "meta": {
                    "title": "在线用户",
                    "icon": "Steve-Jobs",
                    "noCache": true
                }
            },
            {
                "name": "Log",
                "path": "logs",
                "hidden": false,
                "component": "monitor/log/index",
                "meta": {
                    "title": "操作日志",
                    "icon": "log",
                    "noCache": true
                }
            },
            {
                "name": "ErrorLog",
                "path": "errorLog",
                "hidden": false,
                "component": "monitor/log/errorLog",
                "meta": {
                    "title": "异常日志",
                    "icon": "error",
                    "noCache": true
                }
            }
        ]
    }
]
// const sidebarRouters =  computed(() => permissionStore.sidebarRouters);
const showLogo = computed(() => settingsStore.sidebarLogo);
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
})

</script>
