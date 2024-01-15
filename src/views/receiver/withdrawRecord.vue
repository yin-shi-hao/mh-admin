<template>
    <div class="app-container">
       <el-form :model="queryParams" ref="queryRef" v-show="showSearch" :inline="true" label-width="68px">
          <el-form-item  prop="phone">
             <el-input
                v-model="queryParams.phone"
                placeholder="单号"
                clearable
                style="width: 120px"
                @keyup.enter="handleQuery"
             />
          </el-form-item>
          <el-form-item  prop="nicname">
             <el-input
                v-model="queryParams.nicname"
                placeholder="会员编号"
                clearable
                style="width: 120px"
                @keyup.enter="handleQuery"
             />
          </el-form-item>
          <el-form-item  prop="roleKey">
             <el-input
                v-model="queryParams.roleKey"
                placeholder="手机号"
                clearable
                style="width: 120px"
                @keyup.enter="handleQuery"
             />
          </el-form-item>
          <el-form-item  prop="tashTitle">
             <el-input
                v-model="queryParams.tashTitle"
                placeholder="昵称"
                clearable
                style="width: 120px"
                @keyup.enter="handleQuery"
             />
          </el-form-item>
          <el-form-item  prop="tashStatus">
             <el-select
                v-model="queryParams.tashStatus"
                placeholder="提现状态"
                clearable
                style="width: 100px"
             >
                <el-option
                   v-for="dict in sys_normal_disable"
                   :key="dict.value"
                   :label="dict.label"
                   :value="dict.value"
                />
             </el-select>
          </el-form-item>
         
          <el-form-item  style="width: 208px">
             <el-date-picker
                v-model="dateRange"
                value-format="YYYY-MM-DD"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
             ></el-date-picker>
             <!-- <el-date-picker
                v-model="dateRange"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="YYYY-MM-DD HH:mm:ss"
                date-format="YYYY/MM/DD ddd"
                time-format="A hh:mm:ss"
      /> -->
          </el-form-item>
          <el-form-item>
             <el-button type="success" icon="Search" @click="handleQuery">搜索</el-button>
             <el-button style="background-color: #F5BD41;" icon="Refresh" @click="resetQuery">重置</el-button>
             <!-- <el-button style="background-color: #448EF7;" icon="download" @click="resetQuery" :disabled="disdown">批量下载</el-button> -->
          </el-form-item>
       </el-form>
       <!-- <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
             <el-button
                type="primary"
                
                icon="Plus"
                @click="handleAdd"
               
             >新增</el-button>
          </el-col>
          <el-col :span="1.5">
             <el-button
                type="success"
                plain
                icon="Edit"
                :disabled="single"
                @click="handleUpdate"
               
             >修改</el-button>
          </el-col>
          <el-col :span="1.5">
             <el-button
                type="danger"
                plain
                icon="Delete"
                :disabled="multiple"
                @click="handleDelete"
                
             >删除</el-button>
          </el-col>
          <el-col :span="1.5">
             <el-button
                type="warning"
                plain
                icon="Download"
                @click="handleExport"
                
             >导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
       </el-row> -->
    <el-table :data="roleList" style="width: 100%"  @selection-change="handleSelectionChange">
        <!-- <el-table-column fixed type="selection" width="55" /> -->
    <el-table-column fixed  prop="batchNo" label="提现单号" width="200" />
    <el-table-column prop="numberId" label="会员编号" width="200" />
    <el-table-column prop="state" label="用户昵称" width="120" />
    <el-table-column prop="amount" label="提现金额(元)" width="120" />
    <el-table-column prop="city" label="提现通道" width="120" >
      <template #default="scope">
        {{ scope.row.channelType==1?'微信':"支付宝"}}
      </template>
    </el-table-column>
    <el-table-column prop="address" label="状态" width="120" >
      <!-- <el-tag class="mx-1" type="danger" effect="plain">
      已删除
    </el-tag> -->
    <template #default="scope">
     <el-tag class="mx-1" type="warning" effect="dark" v-if="scope.row.status==0"> 
      提现中
    </el-tag>
    <el-tag class="mx-1" type="danger" effect="dark" v-else-if="scope.row.status==1">
      提现失败
    </el-tag>
    <el-tag class="mx-1" type="success" effect="dark" v-else>
      提现成功
    </el-tag>
      </template>
    </el-table-column>
   
    <el-table-column prop="arrivalTime" label="到账时间" width="120" >
      <template #default="scope">
        {{ parseTime(scope.row.arrivalTime) }}
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="申请时间" width="120" >
      <template #default="scope">
        {{ parseTime(scope.row.createTime) }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="180">
      <template #default="scope">
        <el-button  type="primary" icon="view" @click="handleView(scope.row)">查看</el-button>
        <!-- <el-button   style="background-color: #F7CA54;" icon="Edit" @click="handleAdd(scope.row)">审核</el-button>
        <el-button  style="background-color:#F7CA54;" icon="download" @click="handleDelete(scope.row)">下载</el-button> -->
        <!-- <el-button  type="danger" icon="Delete" @click="handleDelete(scope.row)">发布</el-button>
        <el-button  type="danger" icon="Delete" @click="handleDelete(scope.row)">下架</el-button> -->

        <!-- <el-button link type="primary" size="small" @click="handleClick"
          >查看</el-button
        >
        <el-button link type="primary" size="small" @click="handleUpdate">修改</el-button>
        <el-button link type="primary" size="small" @click="handleUpdate">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          :small="true"
        layout="total,prev, pager, next,sizes"
          @pagination="getList"
          v-model:current-page="currentPage1"
          :page-size="100"
          :background="false"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
       />
       <!-- 表格数据 -->
       <!-- <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="角色编号" prop="roleId" width="120" />
          <el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" width="150" />
          <el-table-column label="权限字符" prop="roleKey" :show-overflow-tooltip="true" width="150" />
          <el-table-column label="显示顺序" prop="roleSort" width="100" />
          <el-table-column label="状态" align="center" width="100">
             <template #default="scope">
                <el-switch
                   v-model="scope.row.status"
                   active-value="0"
                   inactive-value="1"
                   @change="handleStatusChange(scope.row)"
                ></el-switch>
             </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createTime">
             <template #default="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
             </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
             <template #default="scope">
               <el-tooltip content="修改" placement="top" v-if="scope.row.roleId !== 1">
                 <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:role:edit']"></el-button>
               </el-tooltip>
               <el-tooltip content="删除" placement="top" v-if="scope.row.roleId !== 1">
                 <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:role:remove']"></el-button>
               </el-tooltip>
               <el-tooltip content="数据权限" placement="top" v-if="scope.row.roleId !== 1">
                 <el-button link type="primary" icon="CircleCheck" @click="handleDataScope(scope.row)" v-hasPermi="['system:role:edit']"></el-button>
               </el-tooltip>
               <el-tooltip content="分配用户" placement="top" v-if="scope.row.roleId !== 1">
                 <el-button link type="primary" icon="User" @click="handleAuthUser(scope.row)" v-hasPermi="['system:role:edit']"></el-button>
               </el-tooltip>
             </template>
          </el-table-column>
       </el-table>
  -->
       <!-- <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
       /> -->
 
       <!-- 添加或修改角色配置对话框 -->
       <el-dialog :title="title" v-model="open" width="600px" append-to-body>
          <el-form ref="roleRef" :model="form" :rules="rules" label-width="100px">
                <div class="shContent">
                    <div style="width: 100px;text-align: right;margin-right:20px;font-size: 18px;">任务编号</div>
                    <div>123456</div>
                </div>
                <div class="shContent">
                    <div style="width: 100px;text-align: right;margin-right:20px;font-size: 18px;">任务编号</div>
                    <div>123456</div>
                </div>
                <div class="shContent">
                    <div style="width: 100px;text-align: right;margin-right:20px;font-size: 18px;">任务编号</div>
                    <div>123456</div>
                </div>
                <div class="shContent">
                    <div style="width: 100px;text-align: right;margin-right:20px;font-size: 18px;">任务编号</div>
                    <div>123456</div>
                </div>
                <div class="shContent">
                    <div style="width: 100px;text-align: right;margin-right:20px;font-size: 18px;">任务编号</div>
                    <div>123456</div>
                </div>
                <div class="shContent">
                    <div style="width: 100px;text-align: right;margin-right:20px;font-size: 18px;">任务编号</div>
                    <div>123456</div>
                </div>
                <el-form-item label="审核状态" prop="isText">
                  <el-radio-group v-model="form.isText">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
                <!-- <el-radio :label="9">Option C</el-radio> -->
              </el-radio-group>
                </el-form-item>
          </el-form>
          <template #footer>
             <div class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button style="color: #2c2b2b;" @click="cancel">取 消</el-button>
             </div>
          </template>
       </el-dialog>
 
       <!-- 分配角色数据权限对话框 -->
       <el-dialog :title="title" v-model="openDataScope" width="700px" append-to-body>
          <el-form :model="form" label-width="80px">
             <el-form-item label="上传Icon">
                <el-input v-model="form.roleName" :disabled="true" />
             </el-form-item>
             <el-row>
              <el-col :span="12">
                <el-form-item label="权限字符">
                <el-input v-model="form.roleKey" :disabled="true" />
             </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="权限字符">
                <el-input v-model="form.roleKey" :disabled="true" />
             </el-form-item>
              </el-col>
             </el-row>
            
             <el-form-item label="权限范围">
                <el-select v-model="form.dataScope" @change="dataScopeSelectChange">
                   <el-option
                      v-for="item in dataScopeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                   ></el-option>
                </el-select>
             </el-form-item>
             
             <el-form-item label="数据权限" v-show="form.dataScope == 2">
                <el-checkbox v-model="deptExpand" @change="handleCheckedTreeExpand($event, 'dept')">展开/折叠</el-checkbox>
                <el-checkbox v-model="deptNodeAll" @change="handleCheckedTreeNodeAll($event, 'dept')">全选/全不选</el-checkbox>
                <el-checkbox v-model="form.deptCheckStrictly" @change="handleCheckedTreeConnect($event, 'dept')">父子联动</el-checkbox>
                <el-tree
                   class="tree-border"
                   :data="deptOptions"
                   show-checkbox
                   default-expand-all
                   ref="deptRef"
                   node-key="id"
                   :check-strictly="!form.deptCheckStrictly"
                   empty-text="加载中，请稍候"
                   :props="{ label: 'label', children: 'children' }"
                ></el-tree>
             </el-form-item>
          </el-form>
          <template #footer>
             <div class="dialog-footer">
                <el-button type="primary" @click="submitDataScope">确 定</el-button>
                <el-button @click="cancelDataScope">取 消</el-button>
             </div>
          </template>
       </el-dialog>
       <el-drawer v-model="drawer2" :direction="'rtl'" >
            <template #header>
              <h4>提现单详情</h4>
            </template>
            <template #default>
              <div>
                <el-descriptions title="" :column="1" border :size="'small'">
                    <el-descriptions-item
                      label="提现单号"
                      label-align="left"
                      align="center"
                      label-class-name="my-label"
                      class-name="my-content"
                      width="40px"
                      >{{ detail.batchNo }}</el-descriptions-item
                    >
                    
                    <el-descriptions-item label="会员编号" label-align="left" align="center">
                      <!-- <el-tag size="small">School</el-tag> -->
                      {{ detail.orderNo }}
                    </el-descriptions-item>
                    <el-descriptions-item label="昵称" label-align="left" align="center"
                      >{{  }}</el-descriptions-item
                    >
                    <el-descriptions-item label="手机号" label-align="left" align="center"
                      >{{  }}</el-descriptions-item
                    >
                    
                    <el-descriptions-item label="提现金额" label-align="left" align="center"
                      > 
                      <!-- <el-tag size="small">School</el-tag> -->
                      {{ detail.amount }}
                      </el-descriptions-item
                    >
                    
                    <el-descriptions-item label="提现服务费" label-align="left" align="center"
                      >{{ detail.serviceFee }}</el-descriptions-item
                    >
                    <el-descriptions-item label="服务费率" label-align="left" align="center"
                      >{{ detail.serviceFeeRatio }}</el-descriptions-item
                    >
                    <el-descriptions-item label="提现渠道" label-align="left" align="center"
                      >{{ detail.channelType==1?'微信':'' }}</el-descriptions-item
                    >
                    <el-descriptions-item label="提现申请时间" label-align="left" align="center"
                      >
                      <template #default="scope">
                        {{ parseTime(detail.createTime) }}
                      </template>
                      </el-descriptions-item
                    >
                   
                    <el-descriptions-item label="到账金额" label-align="left" align="center"
                      >{{detail.arrivalMoney}}</el-descriptions-item
                    >
                    <el-descriptions-item label="到账时间" label-align="left" align="center"
                      >
                      <!-- {{ detail.arrivalTime }} -->
                      <template #default="scope">
                        {{ parseTime(detail.arrivalTime) }}
                      </template>
                      </el-descriptions-item
                    >
                    <el-descriptions-item label="订单状态" label-align="left" align="center"
                      >
                      <template #default="scope">
                              <el-tag v-if="detail.status==0" class="mx-1" type="warning" effect="dark">
                            提现中
                          </el-tag>
                          <el-tag v-else-if="detail.status==1" class="mx-1" type="danger" effect="dark">
                            提现失败
                          </el-tag>
                          <el-tag v-else-if="detail.status==2" class="mx-1" type="success" effect="dark">
                            提现成功
                          </el-tag>
                         
                        </template>
   
                      </el-descriptions-item
                    >
                    <el-descriptions-item label="渠道账号" label-align="left" align="center"
                      >{{ detail.channelAccount }}</el-descriptions-item
                    >
                    <el-descriptions-item label="渠道账号昵称" label-align="left" align="center"
                      >{{ detail.channelName }}</el-descriptions-item
                    >
                    <el-descriptions-item label="渠道订单号" label-align="left" align="center"
                      >{{ detail.channelOrderNo }}</el-descriptions-item
                    >
                    <el-descriptions-item label="渠道资金流水号" label-align="left" align="center"
                      >{{ detail.thirdPayFundNo }}</el-descriptions-item
                    >
                    <el-descriptions-item label="渠道响应码" label-align="left" align="center"
                      >{{ detail.subCode }}</el-descriptions-item
                    >
                    <el-descriptions-item label="渠道响应描述" label-align="left" align="center"
                      ></el-descriptions-item
                    >
                    <el-descriptions-item label="备注" label-align="left" align="center"
                      >{{ detail.title }}</el-descriptions-item
                    >
                    
                  </el-descriptions>
              </div>
            </template>
            <!-- <template #footer>
              <div style="flex: auto">
                <el-button @click="cancelClick">cancel</el-button>
                <el-button type="primary" @click="confirmClick">confirm</el-button>
              </div>
            </template> -->
         </el-drawer>
    </div>
 </template>
 
 <script setup name="Role">
 import { addRole, changeRoleStatus, dataScope, delRole, getRole, listRole, updateRole, deptTreeSelect } from "@/api/system/role";
 import { roleMenuTreeselect, treeselect as menuTreeselect } from "@/api/system/menu";
 import {withdrawRecord,getPayDetail} from "@/api/assignment/index"
//  import {formatDate}from "@/utills/index.js"
// import {validTaskNum} from "@/utils/validate"
// import Editor from '@/components/WangEditor/index.vue';
 const router = useRouter();
 const { proxy } = getCurrentInstance();
 const { sys_normal_disable } = proxy.useDict("sys_normal_disable");
 
 const roleList = ref([
  {
    data:"20358",
    name:"ddc",
    status:"xxx"
  }
 ]);
 const detail=ref({})
 const open = ref(false);
 const loading = ref(true);
 const showSearch = ref(true);
 const ids = ref([]);
 const single = ref(true);
 const multiple = ref(true);
 const total = ref(1);
 const title = ref("");
 const dateRange = ref([]);
 const menuOptions = ref([]);
 const menuExpand = ref(false);
 const menuNodeAll = ref(false);
 const deptExpand = ref(true);
 const deptNodeAll = ref(false);
 const deptOptions = ref([]);
 const openDataScope = ref(false);
 const menuRef = ref(null);
 const deptRef = ref(null);
 const imageUrl=ref("")
 const currentPage1=ref(1)
 const inputValue=ref('')
 const drawer2=ref(false)
 const disdown=ref(true)
 /** 数据范围选项*/
 const dataScopeOptions = ref([
   { value: "1", label: "全部数据权限" },
   { value: "2", label: "自定数据权限" },
   { value: "3", label: "本部门数据权限" },
   { value: "4", label: "本部门及以下数据权限" },
   { value: "5", label: "仅本人数据权限" }
 ]);
 const mode=ref("")
 const inputVisible=ref(false)
 const props=ref([])
 const props2=ref([
    {
      id:0,
      name:"任务",
      children:[
        {
          id:1,
          name:"下载"
        }
      ]
    },
    {
      id:3,
      name:"游戏"
    }
])
 const cacheData=ref([])
 const sf=ref([])
 const sq=ref([])
 const options = ref([
   { value: "1", label: "全部数据权限" ,children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],},
   { value: "2", label: "自定数据权限" },
   { value: "3", label: "本部门数据权限" },
   { value: "4", label: "本部门及以下数据权限" },
   { value: "5", label: "仅本人数据权限" }
 ]);
 const info=ref({})
 const data = reactive({
   form: {
    dynamicTags:[]
   },
   queryParams: {
     pageNum: 1,
     pageSize: 10,
     roleName: undefined,
     roleKey: undefined,
     status: undefined,

   },
  
   rules: {
    isText:[{ required: true, message: "请选择", trigger: "blur" }],
    
   },
 });
 //富文本
  
 const { queryParams, form, rules } = toRefs(data);
 const editorRef = shallowRef()
 /** 查询角色列表 */
 function getList() {
   loading.value = true;
   console.log(queryParams.value,dateRange.value,"搜索值")
   let data={
    page:queryParams.value.pageNum,
    size:queryParams.value.pageSize,
    batchNo:queryParams.value.nicname,
    phone:queryParams.value.roleKey,
    nickName:queryParams.value.tashTitle,
    status:queryParams.value.tashStatus,
    startTime:dateRange.value[0],
    endTime:dateRange.value[1],
   }
   withdrawRecord(data).then(res=>{
    console.log("查询成功")
    roleList.value=res.data.list
    total.value=res.data.total
   })
  //  listRole(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
  //    roleList.value = response.rows;
  //    total.value = response.total;
  //    loading.value = false;
  //  });
 }
 /** 搜索按钮操作 */
 function handleQuery() {
   queryParams.value.pageNum = 1;
   getList();
 }
 /** 重置按钮操作 */
 function resetQuery() {
   dateRange.value = [];
   proxy.resetForm("queryRef");
   handleQuery();
 }
 /** 删除按钮操作 */
 function handleDelete(row) {
   const roleIds = row.roleId || ids.value;
   proxy.$modal.confirm('是否确认删除角色编号为"' + roleIds + '"的数据项?').then(function () {
     return delRole(roleIds);
   }).then(() => {
     getList();
     proxy.$modal.msgSuccess("删除成功");
   }).catch(() => {});
 }
 /** 导出按钮操作 */
 function handleExport() {
   proxy.download("system/role/export", {
     ...queryParams.value,
   }, `role_${new Date().getTime()}.xlsx`);
 }
 /** 多选框选中数据 */
 function handleSelectionChange(selection) {
  console.log(selection,"复选框选中元素")
   ids.value = selection.map(item => item.roleId);
   single.value = selection.length != 1;
   multiple.value = !selection.length;
   if(selection.length>0){
    disdown.value=false
   }
 }
 /** 角色状态修改 */
 function handleStatusChange(row) {
   let text = row.status === "0" ? "启用" : "停用";
   proxy.$modal.confirm('确认要"' + text + '""' + row.roleName + '"角色吗?').then(function () {
     return changeRoleStatus(row.roleId, row.status);
   }).then(() => {
     proxy.$modal.msgSuccess(text + "成功");
   }).catch(function () {
     row.status = row.status === "0" ? "1" : "0";
   });
 }
 /** 更多操作 */
 function handleCommand(command, row) {
   switch (command) {
     case "handleDataScope":
       handleDataScope(row);
       break;
     case "handleAuthUser":
       handleAuthUser(row);
       break;
     default:
       break;
   }
 }
 /** 分配用户 */
 function handleAuthUser(row) {
   router.push("/system/role-auth/user/" + row.roleId);
 }
 /** 查询菜单树结构 */
 function getMenuTreeselect() {
   menuTreeselect().then(response => {
     menuOptions.value = response.data;
   });
 }
 /** 所有部门节点数据 */
 function getDeptAllCheckedKeys() {
   // 目前被选中的部门节点
   let checkedKeys = deptRef.value.getCheckedKeys();
   // 半选中的部门节点
   let halfCheckedKeys = deptRef.value.getHalfCheckedKeys();
   checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
   return checkedKeys;
 }
 /** 重置新增的表单以及其他数据  */
 function reset() {
   if (menuRef.value != undefined) {
     menuRef.value.setCheckedKeys([]);
   }
   menuExpand.value = false;
   menuNodeAll.value = false;
   deptExpand.value = true;
   deptNodeAll.value = false;
   form.value = {
    //  roleId: undefined,
    //  roleName: undefined,
    //  roleKey: undefined,
    //  roleSort: 0,
    //  status: "0",
    //  menuIds: [],
    //  deptIds: [],
    //  menuCheckStrictly: true,
    //  deptCheckStrictly: true,
    //  remark: undefined
    // title:"",
    // class:"",
    // taskNum:'',
    // limitNum:"",
    // dynamicTags:[ ],
    isText:true,
    // isImg:true
   };
   proxy.resetForm("roleRef");
 }
 /** 添加角色 */
 function handleAdd() {
   reset();
   getMenuTreeselect();
   open.value = true;
   title.value = "新增任务";
 }
 /** 修改角色 */
 function handleUpdate(row) {
   reset();
   const roleId = row.roleId || ids.value;
   const roleMenu = getRoleMenuTreeselect(roleId);
   getRole(roleId).then(response => {
     form.value = response.data;
     form.value.roleSort = Number(form.value.roleSort);
     open.value = true;
     nextTick(() => {
       roleMenu.then((res) => {
         let checkedKeys = res.checkedKeys;
         checkedKeys.forEach((v) => {
           nextTick(() => {
             menuRef.value.setChecked(v, true, false);
           });
         });
       });
     });
     title.value = "修改角色";
   });
 }
 /** 根据角色ID查询菜单树结构 */
 function getRoleMenuTreeselect(roleId) {
   return roleMenuTreeselect(roleId).then(response => {
     menuOptions.value = response.menus;
     return response;
   });
 }
 /** 根据角色ID查询部门树结构 */
 function getDeptTree(roleId) {
   return deptTreeSelect(roleId).then(response => {
     deptOptions.value = response.depts;
     return response;
   });
 }
 /** 树权限（展开/折叠）*/
 function handleCheckedTreeExpand(value, type) {
   if (type == "menu") {
     let treeList = menuOptions.value;
     for (let i = 0; i < treeList.length; i++) {
       menuRef.value.store.nodesMap[treeList[i].id].expanded = value;
     }
   } else if (type == "dept") {
     let treeList = deptOptions.value;
     for (let i = 0; i < treeList.length; i++) {
       deptRef.value.store.nodesMap[treeList[i].id].expanded = value;
     }
   }
 }
 /** 树权限（全选/全不选） */
 function handleCheckedTreeNodeAll(value, type) {
   if (type == "menu") {
     menuRef.value.setCheckedNodes(value ? menuOptions.value : []);
   } else if (type == "dept") {
     deptRef.value.setCheckedNodes(value ? deptOptions.value : []);
   }
 }
 /** 树权限（父子联动） */
 function handleCheckedTreeConnect(value, type) {
   if (type == "menu") {
     form.value.menuCheckStrictly = value ? true : false;
   } else if (type == "dept") {
     form.value.deptCheckStrictly = value ? true : false;
   }
 }
 /** 所有菜单节点数据 */
 function getMenuAllCheckedKeys() {
   // 目前被选中的菜单节点
   let checkedKeys = menuRef.value.getCheckedKeys();
   // 半选中的菜单节点
   let halfCheckedKeys = menuRef.value.getHalfCheckedKeys();
   checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
   return checkedKeys;
 }
 /** 提交按钮 */
 function submitForm() {
  console.log(form.value,"提交舒适")
   proxy.$refs["roleRef"].validate(valid => {
     if (valid) {
      console.log(form,"提交舒适")
       if (form.value.roleId != undefined) {
         form.value.menuIds = getMenuAllCheckedKeys();
         updateRole(form.value).then(response => {
           proxy.$modal.msgSuccess("修改成功");
           open.value = false;
           getList();
         });
       } else {
         form.value.menuIds = getMenuAllCheckedKeys();
         addRole(form.value).then(response => {
           proxy.$modal.msgSuccess("新增成功");
           open.value = false;
           getList();
         });
       }
     }
   });
 }
 /** 取消按钮 */
 function cancel() {
   open.value = false;
   reset();
 }
 /** 选择角色权限范围触发 */
 function dataScopeSelectChange(value) {
   if (value !== "2") {
     deptRef.value.setCheckedKeys([]);
   }
 }
 /** 分配数据权限操作 */
 function handleDataScope(row) {
   reset();
   const deptTreeSelect = getDeptTree(row.roleId);
   getRole(row.roleId).then(response => {
     form.value = response.data;
     openDataScope.value = true;
     nextTick(() => {
       deptTreeSelect.then(res => {
         nextTick(() => {
           if (deptRef.value) {
             deptRef.value.setCheckedKeys(res.checkedKeys);
           }
         });
       });
     });
     title.value = "分配数据权限";
   });
 }
 /** 提交按钮（数据权限） */
 function submitDataScope() {
  console.log(form,"谁")
   if (form.value.roleId != undefined) {
     form.value.deptIds = getDeptAllCheckedKeys();
     dataScope(form.value).then(response => {
       proxy.$modal.msgSuccess("修改成功");
       openDataScope.value = false;
       getList();
     });
   }
 }
 /** 取消按钮（数据权限）*/
 function cancelDataScope() {
   openDataScope.value = false;
   reset();
 }
 //上传图标
 function handleAvatarSuccess(){

 }
 //页码改变
 function handleSizeChange(){
  console.log("handleSizeChange")
 }
 function handleCurrentChange(){}
 //显示标签输入框
 function showInput(){
  inputVisible.value=true
 }
 //富文本
 function handleCreated(){

 }
 function selectSF(e){
  console.log(e,"sssss33")
  form.sf.value=e
}
// function handleInputConfirm (e){
//   console.log(e,inputValue.value,"标签")
//   console.log(form.value)
//   inputVisible.value=false
//   form.value.dynamicTags.push(inputValue.value)
//   console.log(form.value)
// }
function handleInputConfirm(e){
  if (inputValue.value) {
    form.value.dynamicTags.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
const handleClose = (tag) => {
  form.value.dynamicTags.splice(form.value.dynamicTags.indexOf(tag), 1)
}
//查看功能的抽屉
function handleView(e){
  drawer2.value=true
  console.log(e,"[[[[]]]]")
  let data={
    orderNo:e.orderNo
  }
  let deta={
    ...e
  }
  getPayDetail(data).then(res=>{
    console.log(res,"查看详情")
    
    detail.value={
      ...e,
      ...res.data
    }
  })
  console.log(detail.value,"eee")
}
// function getDetail(){

// }
 getList();
 </script>
 <style lang="scss" scoped>
    .el-form-item{
        margin: 0 10px 20px 0;
    }
    .editor{
      height: 500px !important;
    }
    .el-upload--picture-card {
      width: 40px !important;
      height: 40px !important;
    }
    :deep(.el-upload-list){
      width: 40px !important;
      height: 40px !important;
    }
    :deep(.el-upload-list--picture-card){
      width: 40px !important;
      height: 40px !important;
    }
    :deep(.el-upload--picture-card){
      width: 40px !important;
      height: 40px !important;
    }
    .tagInput{
      width: 60px;
    }
   :deep(.el-drawer__header) {
      margin-bottom: 0;
    }
    :deep(.el-drawer){
      width: 40% !important;
    }
    .el-button{
      height: 30px;
      line-height: 30px;
    //   width: 80px;
      font-size: 14px;
      border: none;
      color: #fff;
      margin-left:5px
    }
    :deep(.el-pagination){
      left: 0;
      margin-left: 20px;
    }
    .shContent{
        display: flex;
        align-items: center;
        line-height: 50px;
    }
</style>
 