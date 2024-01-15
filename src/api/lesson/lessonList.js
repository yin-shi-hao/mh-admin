
import request from '@/utils/request'
//获取课程列表
export function lessonList(data){
    return request({
        url: '/api/admin/new/lesson/lessonList',
        method: 'post',
        data
    })
}

// 查看详情
export function viewDetail(data){
    return request({
        url: '/api/admin/new/lesson/lessonDetail',
        method: 'get',
        data:data
    })
}
// 编辑
export function changeApi(data){
    return request({
        url: '/api/admin/new/lesson/update',
        method: 'post',
        data:data
    })
}

// 拖动
export function sortList(data){
    return request({
        url: '/api/admin/new/lesson/changeSort',
        method: 'post',
        data:data
    })
}

// 添加课程
export function addLesson(data){
    return request({
        url: '/api/admin/new/lesson/add',
        method: 'post',
        data:data
    })
}

// 新用户活动
export function newUserActivityApi(data){
    return request({
        url: '/api/admin/new/lesson/updateNewUserActivity',
        method: 'post',
        data:data
    })
} 

// 每日限免
export function DailyFreeActivityApi(data){
    return request({
        url: '/api/admin/new/lesson/updateDailyFreeActivity',
        method: 'post',
        data:data
    })
}

// 每周翻一翻
export function WeeklyFlipActivityApi(data){
    return request({
        url: '/api/admin/new/lesson/updateWeeklyLotteryActivity',
        method: 'post',
        data:data
    })
}
export function SeckillActivityApi(data){
    return request({
        url: '/api/admin/new/lesson/updateSeckillActivity',
        method: 'post',
        data:data
    })
}
// 下架
export function lessShelf(data){
    return request({
        url: '/api/admin/new/lesson/lower',
        method: 'post',
        data:data
    })
}
    // 置顶
    export function totop(data){
        return request({
            url: '/api/admin/new/lesson/top',
            method: 'post',
            data:data
        })
    }
  // 取消置顶
export function untotop(data){
    return request({
        url: '/api/admin/new/lesson/cancelTop',
        method: 'post',
        data:data
    })
}
// 删除课程
export function deleteApi(data){
    return request({
        url: '/api/admin/new/lesson/delete',
        method: 'post',
        data:data
    })
}