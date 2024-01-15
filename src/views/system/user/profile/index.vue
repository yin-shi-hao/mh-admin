<template>
   <div class="app-container">
      <el-row :gutter="20">
         <el-col :span="6" :xs="24">
            <el-card class="box-card">
               <template v-slot:header>
                 <div class="clearfix">
                   <span>个人信息</span>
                 </div>
               </template>
               <div>
                  <div class="text-center">
                     <userAvatar />
                  </div>
                  <ul class="list-group list-group-striped">
                     <li class="list-group-item">
                        <svg-icon icon-class="user" />登陆账号
                        <div class="pull-right">{{ state.user.userName }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="user" />用户名称
                        <div class="pull-right">{{ state.user.userName }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="phone" />手机号码
                        <div class="pull-right">{{ state.user.phonenumber }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="email" />用户邮箱
                        <div class="pull-right">{{ state.user.email }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="tree" />所属部门
                        <div class="pull-right" v-if="state.user.dept">{{ state.user.dept.deptName }} / {{ state.postGroup }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="peoples" />所属角色
                        <div class="pull-right">{{ state.roleGroup }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="date" />安全设置
                        <div class="pull-right"><el-button link type="primary" @click="editCropper()">修改密码</el-button> </div>
                     </li>
                  </ul>
               </div>
            </el-card>
         </el-col>
         <el-col :span="18" :xs="24">
            <el-card>
               <!-- <template v-slot:header>
                 <div class="clearfix">
                   <span>操作日志</span>
                 </div>
               </template> -->
               <el-tabs v-model="activeTab">
                  <el-tab-pane label="操作日志" name="userinfo">
                     <!-- <userInfo :user="state.user" /> -->
                     <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="date" label="行为" width="100" />
                        <el-table-column prop="name" label="ip" width="100" />
                        <el-table-column prop="address" label="ip来源" width="180" />
                        <el-table-column prop="name" label="浏览器" width="100" />
                        <el-table-column prop="name" label="请求耗时" width="180" />
                        <el-table-column prop="name" label="创建日期"  >

                        </el-table-column>
                     </el-table>
                  </el-tab-pane>
                  <!-- <el-tab-pane label="修改密码" name="resetPwd">
                     <resetPwd />
                  </el-tab-pane> -->
               </el-tabs>
            </el-card>
         </el-col>
      </el-row>
      <el-dialog title="修改密码" v-model="open" width="400px" append-to-body  @close="closeDialog">
         <el-form ref="menuRef" :model="form" :rules="rules" label-width="100px">
            <el-row>
               <el-col :span="24">
                  <el-form-item label="旧密码" prop="oldName">
                     <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
                  </el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item label="新密码" prop="newName">
                     <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
                  </el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item label="确认密码" prop="snewName">
                     <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
                  </el-form-item>
               </el-col>
            </el-row>
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitForm">确 定</el-button>
               <el-button @click="cancel">取 消</el-button>
            </div>
         </template>
      </el-dialog>
   </div>
</template>

<script setup name="Profile">
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import { getUserProfile } from "@/api/system/user";

const activeTab = ref("userinfo");
const state = reactive({
  user: {},
  roleGroup: {},
  postGroup: {}
});
const tableData=ref([])
const data=reactive({
   form:{},
   rules:{oldName:[{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
   newName:[{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
   snewName:[{ required: true, message: "菜单名称不能为空", trigger: "blur" }]
},
   
})
const {form,rules} =toRefs(data)
const open=ref(false)
function getUser() {
  getUserProfile().then(response => {
    state.user = response.data;
    state.roleGroup = response.roleGroup;
    state.postGroup = response.postGroup;
  });
};
function editCropper() {
  open.value = true;
}
function closeDialog() {
//   options.img = userStore.avatar;
//   options.visible = false;
   open.value = false;

}
//修改密码
function submitForm(){
   open.value=false

}
function cancel(){
   open.value=false
}
getUser();
</script>
