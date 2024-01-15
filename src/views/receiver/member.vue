<template>
    <div class="app-container">
       <el-form :model="queryParams" ref="queryRef" v-show="showSearch" :inline="true" label-width="68px">
          <el-form-item  prop="number">
             <el-input
                v-model="queryParams.number"
                placeholder="会员编号"
                clearable
                style="width: 160px"
                @keyup.enter="handleQuery"
             />
          </el-form-item>
          <!-- <el-form-item  prop="realName">
             <el-input
                v-model="queryParams.realName"
                placeholder="真实姓名"
                clearable
                style="width: 180px"
                @keyup.enter="handleQuery"
             />
          </el-form-item>
          <el-form-item  prop="idNumber">
             <el-input
                v-model="queryParams.idNumber"
                placeholder="身份证号"
                clearable
                style="width: 180px"
                @keyup.enter="handleQuery"
             />
          </el-form-item> -->
          <el-form-item  prop="phone">
             <el-input
                v-model="queryParams.phone"
                placeholder="手机号"
                clearable
                style="width: 180px"
                @keyup.enter="handleQuery"
             />
          </el-form-item>
          <!-- <el-form-item  prop="nickName">
             <el-input
                v-model="queryParams.nickName"
                placeholder="昵称"
                clearable
                style="width: 180px"
                @keyup.enter="handleQuery"
             />
          </el-form-item> -->
          <el-form-item  prop="status">
             <el-select
                v-model="queryParams.status"
                placeholder="状态"
                clearable
                style="width: 180px"
             >
                <el-option
                   v-for="dict in status"
                   :key="dict.label"
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
                range-separator=":"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
             ></el-date-picker>
          </el-form-item>
          <el-form-item>
             <el-button type="success" icon="Search" @click="handleQuery" style="background-color: #5FCB71;">搜索</el-button>
             <el-button icon="Refresh" @click="resetQuery" style="background-color: #F5BD41;color: #fff;">重置</el-button>
          </el-form-item>
       </el-form>
       <el-table :data="roleList" style="width: 100%"  @selection-change="handleSelectionChange">
    <el-table-column  prop="numberId" label="会员编号" width="150" />
    <el-table-column prop="nickName" label="用户昵称" width="120" />
    <el-table-column prop="phone" label="手机号" width="120" />
   
    <el-table-column prop="amount" label="钱包余额(元)" width="120" />
    <el-table-column prop="address" label="状态" width="120" >
      <template #default="scope">
         <el-tag class="mx-1" type="success" effect="dark" v-if="scope.row.status==0"> 
      创建
    </el-tag> 
    <el-tag class="mx-1" type="success" effect="dark" v-else-if="scope.row.status==1"> 
      消费成功
    </el-tag>
    <el-tag class="mx-1" type="warning" effect="dark" v-else>
      消费失败
    </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="registerDate" label="创建时间" >
      <template #default="scope">
       {{parseTime(scope.row.createTime)}}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <!-- <el-popconfirm
                    width="220"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    @confirm="confirmEvent(scope.row)"
                    @cancel="cancelEvent(scope.row)"
                    icon-color="#626AEF"
                    title="确定将该用户拉黑吗"
                    v-if="scope.row.status==1"
                > -->
                    <!-- <template #reference> -->
                        <el-button  type="primary" icon="view" @click="getdetail(scope.row)">查看详情</el-button>
                    <!-- </template> -->
                <!-- </el-popconfirm> -->
                <!-- <el-popconfirm
                    width="220"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    @confirm="confirmEventjc(scope.row)"
                    @cancel="cancelEvent(scope.row)"
                    icon-color="#626AEF"
                    title="确定将该用户解除吗"
                    v-if="scope.row.status==0"
                >
                    <template #reference>
                        <el-button  type="primary" icon="view" @click="handleView(scope.row)">解除</el-button>
                    </template> -->
                <!-- </el-popconfirm> -->
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
       <el-drawer v-model="drawer2" :direction="'rtl'" >
            <template #header>
              <h4>查看任务详情</h4>
            </template>
            <template #default>
              <div>
                <el-descriptions title="" :column="1" border :size="'small'">
                    <el-descriptions-item
                      label="单号"
                      label-align="left"
                      align="center"
                      label-class-name="my-label"
                      class-name="my-content"
                      width="40px"
                      >{{detail.orderNo}}</el-descriptions-item
                    >
                    <el-descriptions-item label="标题" label-align="left" align="center" 
                      >{{detail.description}}</el-descriptions-item
                    >
                    <el-descriptions-item label="会员编号" label-align="left" align="center" 
                      >{{detail.numberId}}</el-descriptions-item
                    >
                    <el-descriptions-item label="分类" label-align="left" align="center"
                      >{{ detail.amount }}</el-descriptions-item
                    >
                    <el-descriptions-item label="手机号" label-align="left" align="center"
                      >{{ detail.phone }}</el-descriptions-item
                    >
                  
                    <el-descriptions-item label="状态" label-align="left" align="center"
                      > 
                      <template #default="scope">
                            <el-tag v-if="detail.status==0" class="mx-1" type="danger" effect="plain">
                          创建
                        </el-tag>
                        <el-tag v-else-if="detail.status==1" class="mx-1" type="success" >
                          消费成功
                        </el-tag>
                        <el-tag v-else-if="detail.status==2" class="mx-1" type="danger" effect="plain">
                          消费失败
                        </el-tag>
                        
                      </template>
                    </el-descriptions-item>
                   
                    <el-descriptions-item label="创建人" label-align="left" align="center"
                      >{{ detail.nickName }}</el-descriptions-item
                    >
                    <el-descriptions-item label="创建时间" label-align="left" align="center"
                      >{{ parseTime(detail.createTime )}}</el-descriptions-item
                    >
                  </el-descriptions>
              </div>
            </template>
           
         </el-drawer>
    </div>
</template>
<script setup>
import {wxpayList,wxpaydetail} from "@/api/assignment/index.js"
import { reactive, toRefs } from 'vue';
    const showSearch=ref(true)
    const total=ref(20)
    const status=ref([
        {
            label:"正常",
        value:0
        },
        {
            label:"过期",
        value:1
        }
    ])
    const detail=ref({})
    const data=reactive({
        queryParams:{
            // status:'',
            pageSize:10,
            pageNum:1
        }
    })
    const drawer2=ref(false)
    const currentPage1=ref(1)
    const roleList= ref([     ])
    const dateRange=ref([])
    const {queryParams}=toRefs(data)
    //搜索
    function handleQuery(){
        console.log(queryParams.value)
    }
    //重置
    function resetQuery(){

    }
    function getList(){
      let data={
         page:queryParams.value.pageNum,
         size:queryParams.value.pageSize,
         // orderNo:queryParams.value.
         numberId:queryParams.value.number,
         status:Number(queryParams.value.status) ,
         startTime:dateRange.value[0],
         endTime:dateRange.value[1],
         phone:queryParams.value.phone
      }
      wxpayList(data).then(res=>{
            console.log(res,"------")
            total.value=res.data.total
            roleList.value=res.data.list
        })
    }
    function handleSizeChange(e){
      console.log(e,"该表")
    }
    function handleSelectionChange(e){
      console.log(e,"选择")
    }
    function handleCurrentChange(e){
      console.log(e,"[====]")
    }
    function getdetail(e){
      console.log(e,"查看详情")
      drawer2.value=true
      let data={
         orderNo:e.orderNo
      }
      wxpaydetail(data).then(res=>{
         console.log(res,"[----花钱]")
         detail.value=res.data
      })
    }
    getList()
</script>