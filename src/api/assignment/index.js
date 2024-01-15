import request from '@/utils/request'
export function taskList(data){
    return request({
        url: '/api/admin/new/task',
        method: 'post',
        data
    })
}
export function addTask(data){
    return request({
        url: '/api/admin/new/task/public',
        method: 'post',
        data:data
    })
}
export function getArea(data){
    return request({
        url: '/api/new/region/getRegions',
        method: 'get',
        data:data
    })
}
export function copy22(data){
    return request({
        url: '/api/admin/new/task/copy',
        method: 'post',
        data:data
    })
}
export function sortList(data){
    return request({
        url: '/api/admin/new/task/changeSort',
        method: 'post',
        data:data
    })
}
export function taskClass(){
    return request({
        url: '/api/admin/new/taskClassify/tree',
        method: 'get'
    })
}

export function deltask(data){
    return request({
        url: '/api/admin/new/task/delete',
        method: 'post',
        data:data
    })
}

export function viewDetail(data){
    return request({
        url: '/api/admin/new/task/getDetail',
        method: 'get',
        data:data
    })
}
export function update(data){
    return request({
        url: '/api/admin/new/lesson/updateInfo',
        method: 'post',
        data:data
    })
}
//发布
export function release(data){
    return request({
        url: '/api/admin/new/lesson/upper',
        method: 'post',
        data:data
    })
}
//下架
export function shelf(data){
    return request({
        url: '/api/admin/new/lesson/lower',
        method: 'post',
        data:data
    })
}

export function imgupdate(data){
    return request({
        url: '/api/mini/new/img/upload',
        method: 'post',
        data:data
    })
}
export function taskreceive(data){
    return request({
        url: '/api/admin/new/taskReceive/list',
        method: 'post',
        data:data
    })
}

export function receiveDetail(data){
    return request({
        url: '/api/admin/new/taskReceive/getDetail',
        method: 'get',
        data:data
    })
}

export function examine(data){
    return request({
        url: '/api/admin/new/taskReceive/examine',
        method: 'post',
        data:data
    })
}
// 
export function settle(data){
    return request({
        url: '/api/admin/new/taskReceive/settle',
        method: 'post',
        data:data
    })
}
export function userList(data){
    return request({
        url: '/api/admin/new/account/userList',
        method: 'post',
        data:data
    })
}
export function withdrawRecord(data){
    return request({
        url: '/api/admin/new/wallet/withdrawRecord',
        method: 'post',
        data:data
    })
}
export function freezeOrThaw(data){
    return request({
        url: '/api/admin/new/account/freezeOrThaw',
        method: 'post',
        data:data
    })
}

export function getPayDetail(data){
    return request({
        url: '/api/admin/new/wallet/withdrawRecord/getDetail',
        method: 'get',
        data:data
    })
}
// export function getMember(data){
//     return request({
//         url: '/api/admin/new/wallet/wechatPayOrder',
//         method: 'post',
//         data:data
//     })
// }
export function classList(data){
    return request({
        url: '/api/admin/new/taskClassify/list',
        method: 'get',
        data:data
    })
}
    export function classtree(data){
        return request({
            url: '/api/admin/new/taskClassify/tree',
            method: 'get',
            data:data
        })
    }
    export function addclass(data){
        return request({
            url: '/api/admin/new/taskClassify/add',
            method: 'post',
            data:data
        })
    }
    export function editclass(data){
        return request({
            url: '/api/admin/new/taskClassify/update',
            method: 'post',
            data:data
        })
    }
    export function deleteclass(data){
        return request({
            url: '/api/admin/new/taskClassify/delete',
            method: 'post',
            data:data
        })
    }
    export function banlaceList(data){
        return request({
            url: '/api/admin/new/wallet/userBill',
            method: 'post',
            data:data
        })
    }
    export function wxpayList(data){
        return request({
            url: '/api/admin/new/wallet/wechatPayOrder',
            method: 'post',
            data:data
        })
    }
    export function wxpaydetail(data){
        return request({
            url: '/api/admin/new/wallet/wechatPayOrder/getDetail',
            method: 'get',
            data:data
        })
    }
    export function inviteList(data){
        return request({
            url: '/api/admin/new/account/inviteRecord',
            method: 'post',
            data:data
        })
    }
    export function online(data){
        return request({
            url: '/api/admin/new/account/getOnlineUser',
            method: 'get',
            data:data
        })
    }
    export function forceful(data){
        return request({
            url: '/api/admin/new/account/forceOffline',
            method: 'post',
            data:data
        })
    }
    export function indexDetail(data){
        return request({
            url: '/api/admin/new/task/homeCount',
            method: 'get',
            data:data
        })
    }

  
    
    