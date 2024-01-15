<template>
   <div class="app-container">
      <el-row :gutter="20">
         <el-col :md="24" :lg="10">
            <div class="left-box">
               <div style="padding: 20px;border-bottom: 1px solid #eee;">
                  <div class="left-title">
                     <div>字典列表</div>
                  <el-button type="primary" icon="plus" @click="handleLeftAdd">新增</el-button>
                  </div>
                  
               </div>
               <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" style="padding: 20px;">
                  <el-form-item  prop="dictName" style="width: 180px;">
                     <el-input
                        v-model="queryParams.dictName"
                        placeholder="输入名称或者描述"
                        clearable
                        style="width: 240px"
                        @keyup.enter="handleQuery"
                     />
                  </el-form-item>
                  <el-form-item style="width: 180px;">
                     <el-button type="success" icon="Search" @click="handleQuery">搜索</el-button>
                     <el-button icon="Refresh" @click="resetQuery">导出</el-button>
                  </el-form-item>
               </el-form>

               
               <el-table  :data="typeList" @selection-change="handleSelectionChange" @cell-click="handleClick">
                  
                  <el-table-column label="名称" align="center" prop="dictName" :show-overflow-tooltip="true"/>
                  <el-table-column label="描述" align="center" prop="dictName" :show-overflow-tooltip="true"/>
                  
                  <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                     <template #default="scope">
                        <el-button type="primary" icon="Edit" @click="handleUpdate(scope.row)" ></el-button>
                        <el-button type="danger" icon="Delete" @click="handleDelete(scope.row)" ></el-button>
                     </template>
                  </el-table-column>
               </el-table>
               <pagination
                  v-show="total > 0"
                  :total="total"
                  v-model:page="queryParams.pageNum"
                  v-model:limit="queryParams.pageSize"
                  @pagination="getList"
                  style="padding: 40px 10px;"
                  :layout="'total, prev, pager, next,  sizes'"
               />
               <!-- <el-pagination layout="prev, pager, next" :total="1000" /> -->
            </div>
            
         </el-col>
         <el-col :md="24" :lg="14">
            <div class="left-box">
               <div style="padding: 20px;border-bottom: 1px solid #eee;">
                  <div class="left-title">
                     <div>字典详情</div>
                  <el-button type="primary" icon="plus" @click="handleRighttadd">新增</el-button>
                  </div>
                  
               </div>
               <div v-if="showContent">
                  <el-form :model="queryParamsDetail" ref="queryRef" :inline="true" v-show="showSearch" style="padding: 20px;">
                  <el-form-item  prop="dictName" style="width: 200px;">
                     <el-input
                        v-model="queryParamsDetail.dictName"
                        placeholder="输入字典标签查询"
                        clearable
                        style="width: 240px"
                        @keyup.enter="handleQuery"
                     />
                  </el-form-item>
                  <el-form-item>
                     <el-button type="success" icon="Search" @click="handleQuery">搜索</el-button>
                     <!-- <el-button icon="Refresh" @click="resetQuery">导出</el-button> -->
                  </el-form-item>
               </el-form>

               
               <el-table  :data="typeList" @selection-change="handleSelectionChange">
                  
                  <el-table-column label="所属字典" align="center" prop="dictName" :show-overflow-tooltip="true"/>
                  <el-table-column label="字典标签" align="center" prop="dictName" :show-overflow-tooltip="true"/>
                  <el-table-column label="字典值" align="center" prop="dictName" :show-overflow-tooltip="true"/>
                  <el-table-column label="排序" align="center" prop="dictName" :show-overflow-tooltip="true"/>
                  
                  <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                     <template #default="scope">
                        <el-button  type="primary" icon="Edit" @click="handleUpdate(scope.row)" ></el-button>
                        <el-button  type="danger" icon="Delete" @click="handleDelete(scope.row)" ></el-button>
                     </template>
                  </el-table-column>
               </el-table>
               <pagination
               style="padding: 40px 10px;"
               :layout="'total, prev, pager, next,  sizes'"
                  v-show="total > 0"
                  :total="total"
                  v-model:page="queryParamsDetail.pageNum"
                  v-model:limit="queryParamsDetail.pageSize"
                  @pagination="getList"
               />
               <!-- <el-pagination layout="prev, pager, next" :total="1000" /> -->
               </div>
               <div v-else style="line-height: 50px;height: 50px;margin-left: 20px;">
                  点击字典详情查看
               </div>
            </div>
            
         </el-col>
      </el-row>
      
      <!-- 添加或修改参数配置对话框 -->
      <el-dialog :title="title" v-model="open" width="500px" append-to-body>
         <el-form ref="dictRef" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="字典名称" prop="dictName">
               <el-input v-model="form.dictName" placeholder="请输入字典名称" />
            </el-form-item>
           
            <el-form-item label="描述" prop="remark">
               <el-input v-model="form.remark"  placeholder="请输入内容"></el-input>
            </el-form-item>
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitForm">确 定</el-button>
               <el-button @click="cancel">取 消</el-button>
            </div>
         </template>
      </el-dialog>
      <el-dialog :title="titleDetail" v-model="openDetail" width="500px" append-to-body>
         <el-form ref="dictRef" :model="formDetil" :rules="detailrules" label-width="80px">
            <el-form-item label="字典标签" prop="dictName">
               <el-input v-model="formDetil.dictName" placeholder="请输入字典名称" />
            </el-form-item>
            <el-form-item label="字典值" prop="remark">
               <el-input v-model="formDetil.remark"  placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="postSort">
                <el-input-number v-model="formDetil.postSort" controls-position="right" :min="0" style="width: 100%;" />
             </el-form-item>
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitForm">确 定</el-button>
               <el-button @click="cancelDetail">取 消</el-button>
            </div>
         </template>
      </el-dialog>
   </div>
</template>

<script setup name="Dict">
import useDictStore from '@/store/modules/dict'
import { listType, getType, delType, addType, updateType, refreshCache } from "@/api/system/dict/type";

const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");

const typeList = ref([
   {id:1,name:"edd"},
   {id:1,name:"edd"},
   
]);
const titleDetail=ref('新增字典详情')
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(10);
const title = ref("");
const dateRange = ref([]);
const showContent=ref(false)
const openDetail=ref(false)
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    dictName: undefined,
    dictType: undefined,
    status: undefined
  },
  rules: {
    dictName: [{ required: true, message: "字典名称不能为空", trigger: "blur" }],
   //  dictType: [{ required: true, message: "字典类型不能为空", trigger: "blur" }]
  },
});

const { queryParams, form, rules } = toRefs(data);
const dataDetail = reactive({
   formDetil: {},
  queryParamsDetail: {
    pageNum: 1,
    pageSize: 10,
    dictName: undefined,
    dictType: undefined,
    status: undefined
  },
  detailrules: {
    dictName: [{ required: true, message: "字典名称不能为空", trigger: "blur" }],
    postSort: [{ required: true, message: "字典类型不能为空", trigger: "blur" }]
  },
});

const { formDetil, queryParamsDetail, detailrules } = toRefs(dataDetail);

/** 查询字典类型列表 */
function getList() {
  loading.value = true;
  listType(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
    typeList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 表单重置 */
function reset() {
  form.value = {
    dictId: undefined,
    dictName: undefined,
    dictType: undefined,
    status: "0",
    remark: undefined
  };
  proxy.resetForm("dictRef");
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
/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加字典类型";
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.dictId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}
/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const dictId = row.dictId || ids.value;
  getType(dictId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改字典类型";
  });
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs["dictRef"].validate(valid => {
    if (valid) {
      if (form.value.dictId != undefined) {
        updateType(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addType(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}
/** 删除按钮操作 */
function handleDelete(row) {
  const dictIds = row.dictId || ids.value;
  proxy.$modal.confirm('是否确认删除字典编号为"' + dictIds + '"的数据项？').then(function() {
    return delType(dictIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy.download("system/dict/type/export", {
    ...queryParams.value
  }, `dict_${new Date().getTime()}.xlsx`);
}
/** 刷新缓存按钮操作 */
function handleRefreshCache() {
  refreshCache().then(() => {
    proxy.$modal.msgSuccess("刷新成功");
    useDictStore().cleanDict();
  });
}
function handleClick(e){
   console.log(e,"当前但行")
   showContent.value=true
}
function handleLeftAdd(){
   open.value=true
}
function handleRighttadd(){
   openDetail.value=true
}

function cancelDetail(){
   openDetail.value=false
}
getList();
</script>
<style>
.left-box{
   box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1) ;
   /* margin: 20px; */
   /* padding: 30px 20px; */
}
.right-box{
   box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1) ;
   /* margin: 20px; */
   /* padding: 30px 20px; */
}
.left-title{
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 40px;
   line-height: 40px;
   /* margin-bottom: 20px; */
}
.el-form-item{
   margin-right: 10px !important;
}
</style>
