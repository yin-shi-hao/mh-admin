<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col>
        <el-button type="primary" icon="Plus" @click="hangdAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="code"
      default-expand-all
    >
      <el-table-column prop="name" label="分类" sortable />
      <el-table-column prop="isSys" label="是否系统配置" >
        <template #default="scope">
          <!-- {{ scope.row.isSys==1?'是':"否" }} -->
          <el-tag v-if="scope.row.isSys==1" class="mx-1" type="success" >
            是
          </el-tag>
          <el-tag v-if="scope.row.isSys==0" class="mx-1" type="info" >
            否
          </el-tag>
        </template>

      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable />
      <el-table-column prop="address" label="操作" >
        <template #default="scope">
          <el-button type="primary" :disabled="scope.row.children?true:false" @click="editClass(scope.row)">修改</el-button>
          <el-popconfirm
                    width="220"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    @confirm="confirmdown(scope.row)"
                    @cancel="canceldown(scope.row)"
                    :hide-icon="true"
                    title="确定删除该条数据吗"
                >
                    <template #reference>
                      <el-button type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" v-model="open" width="400px" append-to-body>
      <el-form class="demo-form-inline" :model="list" :rules="querList" ref="roleRef" label-width="100px">
        <el-form-item label="分类" prop="class" >
          <div v-if="isedit">{{ classtitle }}</div>
            <el-tree-select v-else   v-model="list.class" :data="props2" filterable node-key="code" :props="{ label: 'name', children: 'children' }">
              <template #default="{ data: { name } }"> {{ name }}</template>
            </el-tree-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="title">
            <el-input v-model="list.title"  />
        </el-form-item>
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
<script setup>
import { reactive } from 'vue';
import { ElNotification } from 'element-plus'
import {classList,classtree,addclass,deleteclass,editclass} from "@/api/assignment/index.js"
const { proxy } = getCurrentInstance();
const open=ref(false)
const isedit=ref(false)
const title="任务审核"
const data=reactive({
  form:{
    title:"",
    class:""
  },
  rules:{
    title:[{ required: true, message: "请填写分类名称", trigger: "blur" }]
  }
})
const data1=reactive({
  list:{
    title:"",
    class:""
  },
  querList:{
    title:[{ required: true, message: "请填写分类名称", trigger: "blur" }]
  }
})
const {list,querList}=toRefs(data1)
const classtitle=ref('')
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
const {  form, rules } = toRefs(data);
   const tableData=ref([
  // {
  //   id: 1,
  //   date: '2016-05-02',
  //   name: 'wangxiaohu',
  //   address: 'No. 189, Grove St, Los Angeles',
  // },
  // {
  //   id: 2,
  //   date: '2016-05-04',
  //   name: 'wangxiaohu',
  //   address: 'No. 189, Grove St, Los Angeles',
  // },
  // {
  //   id: 3,
  //   date: '2016-05-01',
  //   name: 'wangxiaohu',
  //   address: 'No. 189, Grove St, Los Angeles',
  //   children: [
  //     {
  //       id: 31,
  //       date: '2016-05-01',
  //       name: 'wangxiaohu',
  //       address: 'No. 189, Grove St, Los Angeles',
  //     },
  //     {
  //       id: 32,
  //       date: '2016-05-01',
  //       name: 'wangxiaohu',
  //       address: 'No. 189, Grove St, Los Angeles',
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   date: '2016-05-03',
  //   name: 'wangxiaohu',
  //   address: 'No. 189, Grove St, Los Angeles',
  // },
]
)
function hangdAdd(){
  open.value=true
}
function submitForm(e){
  console.log(e,"wwww")
  // open.value=false
  console.log(list.value,"-----")
  // if(list.value.class){
    proxy.$refs["roleRef"].validate(valid=>{
    if(valid){
      console.log("数据通过验证")
      let isClass=0
      if(list.value.class){
        isClass=list.value.class
      }
      let data={
        name:list.value.title,
        parentCode:isClass
      }
      console.log(data,"ddpdp")
      if(isedit.value){
        let obj={
          name:list.value.title,
        code:list.value.class
        }
        editclass(obj).then(res=>{
          console.log(res,"sss")
      getList()

          proxy.$modal.msgSuccess("修改成功");

        })
      }else{
        addclass(data).then(res=>{
          console.log(res,"新增分类")
            list.value={
            class:"",
            title:""
          }
      getList()
          
          proxy.$modal.msgSuccess("新增成功");
       })
      }
      open.value=false
          proxy.resetForm("roleRef");
      getList()
      gettree()
    }
  })
  console.log(form.value,"提交数据")
  // }else{
  //   ElNotification({
  //   message: '父级分类不能为空',
  //   type: 'error',
  // })
  // }
  
  //清空表单
}
function cancel(){
  open.value=false
  console.log("取消")
  list.value={
    class:"",
    title:""
  }
  proxy.resetForm("roleRef");

}
function confirmdown(e){
  console.log(e,"删除")
  let data={
    code:e.code
  }
  deleteclass(data).then(res=>{
    console.log(res,"删除成功")
    proxy.$modal.msgSuccess("删除成功");
    getList()

  })

}
function canceldown(){
  console.log("取消")
}
function getList(){
  classtree().then(res=>{
    tableData.value=res.data
//     console.log("获取reins")
//     const parentA = res.data.filter(item => !item.parentCode);

// const childA = res.data.filter(item => item.parentCode);
// console.log(parentA)
// console.log(childA,"成功转表")
//     // let list=res.data
//     // for(let i=0;i<parentA.length;i++){
//     //   for(let j=0;j<childA.length;j++){
//     //     if(childA[j].parentCode==parentA[i].code){

//     //     }
//     //   }
//     // }
//     for (const item of parentA) {
//       item.children = []

//       for (const i in childA) {

//         const v = childA[i];

//         if (item.code === v.parentCode) {
//           console.log(v,"成功 ")

//           item.children.push(v);
//           console.log(item,"iten")

//           // 这一步递归 如果没有下面三行代码 只能找到第一级对应的children第二级目录

//           let c = JSON.parse(JSON.stringify(childA)); // 简单深拷贝一下

//           // 能走到这儿，说明这个娃 已经找到父亲了 不需要在遍历了 所以删了 你要是非的不删也可以

//         // 注意这里是具体根据业务的，如果不同父目录下面可能有相同的子目录，这里就不能删除了

//           c.splice(i, 1);
//           console.log(c,"c")

//           // 这里需要把当前儿子 加上【】转为数组因为treeData接受的是父，子数组

//           // this.treeData([v], c);

//         }

//       }

//       }
//       console.log(parentA,"[[=======]]")
//           tableData.value=parentA
        })

}
function gettree(){
  classtree().then(res=>{
    console.log(res,"[[[[]]]]")
    props2.value=res.data
    
  })
}
function addbtn(){
  addclass().then(res=>{
    console.log(res,"新增分类")
  })
}
function editClass(e){
  console.log(e,"修改")
  classtitle.value=e.name
  list.value.class=e.code
  isedit.value=true
  open.value=true

}
getList()
gettree()
</script>
<style lang="scss">
.demo-form-inline .el-input,.el-input__wrapper,.el-input__inner ,.el-form-item__content{
width: 220px;
}
</style>