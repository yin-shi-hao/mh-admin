<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
         <el-form-item  prop="menuName">
            <el-input
               v-model="queryParams.menuName"
               placeholder="模糊搜索"
               clearable
               style="width: 200px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item style="width: 308px;">
                  <el-date-picker
                     v-model="dateRange"
                     value-format="YYYY-MM-DD"
                     type="daterange"
                     range-separator="-"
                     start-placeholder="开始日期"
                     end-placeholder="结束日期"
                  ></el-date-picker>
               </el-form-item>
         <!-- <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="菜单状态" clearable style="width: 200px">
               <el-option
                  v-for="dict in sys_normal_disable"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
               />
            </el-select>
         </el-form-item> -->
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
         </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
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
               </el-col>
         <el-col :span="1.5">
            <el-button 
               type="info"
               plain
               icon="Sort"
               @click="toggleExpandAll"
            >展开/折叠</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" :columns="ToolList"></right-toolbar>
      </el-row>
        <el-table :default-expand-all="isExpandAll" v-if="refreshTable" :data="menuList" style="width: 100%" row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center" />

         <el-table-column prop="name" label="名称" :show-overflow-tooltip="true" ></el-table-column>
         <el-table-column prop="icon" label="状态" align="center">
            <template #default="scope">
                <el-switch
                    v-model="switchValue"
                    size="large"
                    
                />
            </template>
         </el-table-column>
        
         <el-table-column label="创建时间" align="center" prop="createTime">
            <template #default="scope">
               <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
         </el-table-column>
         <el-table-column fixed="right" label="操作" align="center" width="210" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button  type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
               <el-button link type="primary" icon="Plus" @click="handleAdd(scope.row)" v-hasPermi="['system:menu:add']">新增</el-button>
               <el-button  type="danger" icon="Delete" @click="handleDelete(scope.row)"></el-button>
            </template>
         </el-table-column>
      </el-table>
      <el-dialog :title="title" v-model="open" width="500px" append-to-body>
        <el-form ref="roleRef" :model="form" :rules="rules" label-width="100px">
          <el-row>
             <el-col :span="24">
            <el-form-item label="名称" prop="roleName">
               <el-input v-model="form.roleName" placeholder="请输入角色名称" />
            </el-form-item>
          </el-col>
          </el-row>
          <el-form-item label="状态" prop="radio">
            <el-radio-group v-model="form.radio">
                <el-radio :label="3">启用</el-radio>
                <el-radio :label="6">停用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="上级部门" prop="class">
            <el-tree-select  v-model="form.class" :data="props2" filterable node-key="name" clearable :props="{ label: 'name', children: 'children' }" style="width: 100%;">
                      <template #default="{ data: { name } }">
                            {{ name }}</template>
                    </el-tree-select>
          </el-form-item>   
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitForm">确 定</el-button>
               <el-button @click="cancel">取 消</el-button>
            </div>
         </template>
    </el-dialog>
    <!-- <div>
    <el-button
      @mouseover="(e) => (buttonRef = e.currentTarget)"
      @click="visible = !visible"
      >Click to open tooltip</el-button
    >
  </div> -->

  
    </div>
</template>
<script setup>
const buttonRef = ref()
const tooltipRef = ref()

const visible = ref(false)
const dateRange=ref('')
const showSearch=ref(true)
const switchValue=ref(true)
const isExpandAll=ref(true)
const menuList=ref([])
const ids=ref('')
const multiple=ref('')
const single=ref('')
const open=ref(false)
const radio=ref(3)
const title=ref('新增部门')
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
const ToolList=ref([
    {
        value:0,
      desc: "名称" ,
    //   disabled: i % 4 === 0,
    },
    {
        value:1,
      desc: "状态" ,
    //   disabled: i % 4 === 0,
    },
    {
        value:2,
      desc: "创建时间" ,
    //   disabled: i % 4 === 0,
    },
    {
        value:3,
      desc: "操作" ,
    //   disabled: i % 4 === 0,
    }
])
 menuList.value =[
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
    children: [
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
        children: [
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      }
    ],
      },
    ],
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const refreshTable=ref(true)
    const userList=ref([])
    const total=ref(10)
    const data=reactive({
        form:{
            radio:3
        },
        queryParams:{
            pageNum:1,
            pageSize:20
        },
        rules:{
            roleName:[{required: true, message: "请输入名称", trigger: "blur" }],
            class:[{required: true, message: "请选择", trigger: "blur" }]
        }
    })
    const {form,queryParams,rules}=toRefs(data)
    const columns = ref([
  { key: 0, label: `用户编号`, visible: true },
  { key: 1, label: `用户名称`, visible: true },
  { key: 2, label: `用户昵称`, visible: true },
  { key: 3, label: `部门`, visible: true },
  { key: 4, label: `手机号码`, visible: true },
  { key: 5, label: `状态`, visible: true },
  { key: 6, label: `创建时间`, visible: true }
]);

    console.log(queryParams,"[[ss]]")
    //选中表格数据
    // function handleSelectionChange(){

    // }
    //表格数据中的开关按钮
    function handleStatusChange(){

    }
    function handleQuery(){


    }
    //重置搜索表单
    function resetQuery(){

    }
    //获取表格数据
    function getList(){

    }
    function handleAdd(){
        open.value=true
    }
    //切换展开收起
    function toggleExpandAll(){

    }
    //修改
    function handleUpdate(){
        title.value="修改部门"
        open.value=true
    }
    function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.userId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};
function handleDelete(){

}
function submitForm(){
    open.value=false
}
function cancel(){
    open.value=false 
}
    </script>