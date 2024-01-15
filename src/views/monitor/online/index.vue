<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true">
         <el-form-item  prop="ipaddr">
            <el-input
               v-model="queryParams.ipaddr"
               placeholder="全表模糊搜索"
               clearable
               style="width: 200px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <!-- <el-form-item label="用户名称" prop="userName">
            <el-input
               v-model="queryParams.userName"
               placeholder="请输入用户名称"
               clearable
               style="width: 200px"
               @keyup.enter="handleQuery"
            />
         </el-form-item> -->
         <el-form-item>
            <el-button type="success" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button style="background-color: #F5BD41;color: #fff;" icon="Refresh" @click="resetQuery">重置</el-button>
         </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
         <el-col :span="1.5">
            <el-button
               type="primary"
               icon="Plus"
               @click="handleForceLogout"
            >强退</el-button>
         </el-col>
         <!-- <el-col :span="1.5">
            <el-button
               type="success"
               icon="Edit"
               :disabled="single"
               @click="handleUpdate"
            >修改</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="danger"
               icon="Delete"
               :disabled="multiple"
               @click="handleDelete"
            >删除</el-button>
         </el-col> -->
         <el-col :span="1.5">
            <el-button
            style="background-color: #F5BD41;color: #fff;"
               icon="Download"
               @click="handleExport"
            >导出</el-button>
         </el-col>
         <!-- <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar> -->
      </el-row>
      <el-table
         :data="onlineList.slice((pageNum - 1) * pageSize, pageNum * pageSize)"
         style="width: 100%;"
      >
      <el-table-column type="selection" width="55" />
         <!-- <el-table-column label="序号" width="50" type="index" align="center">
            <template #default="scope">
               <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
         </el-table-column> -->
         <el-table-column label="用户名" align="center" prop="username" :show-overflow-tooltip="true" />
         <el-table-column label="用户昵称" align="center" prop="nickname" :show-overflow-tooltip="true" />
         <el-table-column label="所属部门" align="center" prop="deptName" :show-overflow-tooltip="true" />
         <el-table-column label="岗位" align="center" prop="job" :show-overflow-tooltip="true" />
         <el-table-column label="登陆IP" align="center" prop="ip" :show-overflow-tooltip="true" />
         <el-table-column label="登陆地点" align="center" prop="address" :show-overflow-tooltip="true" />
         <el-table-column label="浏览器" align="center" prop="browser" :show-overflow-tooltip="true" />
         <el-table-column label="登录时间" align="center" prop="loginTime" width="180">
            <template #default="scope">
               <span>{{ parseTime(scope.row.loginTime) }}</span>
            </template>
         </el-table-column>
         <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button link type="primary" icon="Delete" @click="handleForceLogout(scope.row)" >强退</el-button>
            </template>
         </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" v-model:page="pageNum" v-model:limit="pageSize" />
   </div>
</template>
<script setup name="Online">
// import { forceLogout, list as initDa   ta } from "@/api/monitor/online";
import {online,forceful} from "@/api/assignment/index.js"

const { proxy} = getCurrentInstance();

const onlineList = ref([
   {
      id:1
   }
]);
const loading = ref(true);
const total = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);
const showSearch = ref(true);
const queryParams = ref({
  ipaddr: undefined,
  userName: undefined,
  pageNum:1,
  pageSize:20
});

/** 查询登录日志列表 */
function getList() {
  loading.value = true;
  const data={
      // page:queryParams.value.pageNum,
      // size:queryParams.value.pageSize,
      // input:"222"
  }
  online(data).then(response => {
   console.log(response,"----")
    onlineList.value = response.data;
   //  total.value = response.data.total;
   //  loading.value = false;
  });
}
/** 搜索按钮操作 */
function handleQuery() {
  pageNum.value = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}
/** 强退按钮操作 */
function handleForceLogout(row) {
   let data={
      key:row.key
   }
    proxy.$modal.confirm('是否确认强退名称为"' + row.username + '"的用户?').then(function () {
  return forceful(data);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("退出成功");
  }).catch(() => {});
}
function handleExport(){

}
getList();
</script>
<style>
.el-button{
   border: none;
}
</style>
