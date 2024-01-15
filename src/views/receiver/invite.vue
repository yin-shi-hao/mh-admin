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
                placeholder="邀请人会员id"
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
          </el-form-item>
          <el-form-item  prop="status">
             <el-select
                v-model="queryParams.status"
                placeholder="状态"
                clearable
                style="width: 180px"
             >
                <el-option
                   v-for="dict in status"
                   :key="dict.lable"
                   :label="dict.lable"
                   :value="dict.value"
                />
             </el-select>
          </el-form-item> -->
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
    <el-table-column  prop="numberId" label="被邀请人会员id" width="150" />
    <el-table-column prop="nickName" label="被邀请人昵称" width="120" />
    <el-table-column prop="phone" label="邀请人电话" width="120" />
    <el-table-column prop="invitationNickName" label="邀请人昵称" width="120" />
   
    <el-table-column prop="rewardAmount" label="奖励金额" width="120" />
    <el-table-column prop="invitationPhone" label="被邀请人电话" width="120" />
    <!-- <el-table-column prop="address" label="状态" width="120" >
      <template #default="scope">
        <el-tag class="mx-1" type="success" effect="dark" v-if="scope.row.status==1"> 
      正常
    </el-tag>
    <el-tag class="mx-1" type="warning" effect="dark" v-else>
      拉黑
    </el-tag>
      </template>
    </el-table-column> -->
    <el-table-column prop="registerDate" label="邀请时间" >
      <template #default="scope">
       {{parseTime(scope.row.receiveTime)}}
      </template>
    </el-table-column>
    <!-- <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-popconfirm
                    width="220"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    @confirm="confirmEvent(scope.row)"
                    @cancel="cancelEvent(scope.row)"
                    icon-color="#626AEF"
                    title="确定将该用户拉黑吗"
                    v-if="scope.row.status==1"
                >
                    <template #reference>
                        <el-button  type="primary" icon="view" @click="handleView(scope.row)">拉黑</el-button>
                    </template>
                </el-popconfirm>
                <el-popconfirm
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
                    </template>
                </el-popconfirm>
      </template>
    </el-table-column> -->
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
    </div>
</template>
<script setup>
import {inviteList} from "@/api/assignment/index.js"
import { reactive, toRefs } from 'vue';
    const showSearch=ref(true)
    const total=ref(20)
    const roleList=ref([])
    const currentPage1=ref('')
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
    const data=reactive({
        queryParams:{
         pageNum:1,
         pageSize:10
            // status:''
        }
    })
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
         // status:Number(queryParams.value.status) ,
         startTime:dateRange.value[0],
         endTime:dateRange.value[1],
         invitationNumberId:queryParams.value.phone
      }
      inviteList(data).then(res=>{
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
    getList()
</script>