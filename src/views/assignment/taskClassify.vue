
<template>
  <div class="app-container">
     <el-form :model="queryParams" ref="queryRef" v-show="showSearch" :inline="true" label-width="68px">
        <el-form-item  prop="roleName">
           <el-input
              v-model="queryParams.roleName"
              placeholder="手机号"
              clearable
              style="width: 120px"
              @keyup.enter="handleQuery"
           />
        </el-form-item>
        <el-form-item  prop="roleKey">
           <el-input
              v-model="queryParams.nickName"
              placeholder="昵称"
              clearable
              style="width: 120px"
              @keyup.enter="handleQuery"
           />
        </el-form-item>
        <el-form-item  prop="sort">
           <el-input
              v-model="queryParams.sort"
              placeholder="任务编号"
              clearable
              style="width: 120px"
              @keyup.enter="handleQuery"
           />
        </el-form-item>
        <el-form-item  prop="taskName">
           <el-input
              v-model="queryParams.taskName"
              placeholder="任务名称"
              clearable
              style="width: 120px"
              @keyup.enter="handleQuery"
           />
        </el-form-item>
        <el-form-item  prop="class">
          <el-tree-select  v-model="queryParams.class" :data="taskClass2" filterable node-key="code" :props="{ label: 'name', children: 'children' }">
                      <template #default="{ data: { name } }">
                            {{ name }}</template
    >
                    </el-tree-select>
           <!-- <el-select
              v-model="queryParams.class"
              placeholder="任务分类"
              clearable
              style="width: 100px"
           >
              <el-option
                 v-for="dict in taskClass2"
                 :key="dict.code"
                 :label="dict.name"
                 :value="dict.code"
              />
           </el-select> -->
        </el-form-item>
        <el-form-item  prop="status">
           <el-select
              v-model="queryParams.status"
              placeholder="状态"
              clearable
              style="width: 120px"
           >
              <el-option
                 v-for="dict in taskClass3"
                 :key="dict.code"
                 :label="dict.name"
                 :value="dict.code"
              />
           </el-select>
        </el-form-item>
        <el-form-item  prop="status">
           <el-select
              v-model="queryParams.settlement"
              placeholder="结算状态"
              clearable
              style="width: 100px"
           >
              <el-option
                 v-for="dict in taskClass2"
                 :key="dict.code"
                 :label="dict.name"
                 :value="dict.code"
              />
           </el-select>
        </el-form-item>
        <el-form-item  style="width: 208px">
           <el-date-picker
              v-model="dateRange2"
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
           <el-button style="background-color: #F5BD41;color: #fff;" icon="Refresh" @click="resetQuery">重置</el-button>
           <!-- <el-button icon="Refresh" @click="resetQuery" type="primary">批量下载</el-button> -->
        </el-form-item>
     </el-form>
     <el-row :gutter="10" class="mb8">
        <!-- <el-col :span="1.5">
           <el-button
              type="primary"
              
              icon="Plus"
              @click="handleAdd"
             
           >新增</el-button>
        </el-col> -->
        <!-- <el-col :span="1.5">
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
        </el-col> -->
        <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
     </el-row>
     <el-table :data="roleList" style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
  <el-table-column  prop="id" label="任务编号" width="150" />
  <el-table-column prop="title" label="任务标题" width="120" />
  <el-table-column prop="nickname" label="用户昵称" width="120" />
  <el-table-column prop="phone" label="手机号" width="120" />
  <el-table-column prop="submitTime" label="提交时间" width="120" >
    <!-- <el-tag class="mx-1" type="danger" effect="plain">
    已删除
  </el-tag> -->
  </el-table-column>
  <el-table-column prop="address" label="状态" width="120" >
    <template #default="scope">
        <el-tag v-if="scope.row.status==0" class="mx-1" type="danger" effect="dark">
      待提交
    </el-tag>
    <el-tag v-else-if="scope.row.status==1" class="mx-1" type="warning" effect="dark">
      待审核
    </el-tag>
    <el-tag v-else-if="scope.row.status==2" class="mx-1" type="success" effect="dark">
      审核成功
    </el-tag>
    <el-tag v-else-if="scope.row.status==3" class="mx-1" type="danger" effect="dark">
      审核失败
    </el-tag>
    <el-tag v-else-if="scope.row.status==4" class="mx-1" type="info" effect="dark">
      超时未提交
    </el-tag>
    <el-tag v-else-if="scope.row.status==5" class="mx-1" type="info"  effect="dark">
      放弃任务
    </el-tag>
    <el-tag v-else-if="scope.row.status==6" class="mx-1" type="info"  effect="dark">
      任务被重置
    </el-tag>
    <el-tag v-else-if="scope.row.status==7" class="mx-1" type="info" effect="dark">
      用户重新提交
    </el-tag>
  </template>
   
  </el-table-column>
  <el-table-column prop="address" label="结算状态" width="120" >
    <template #default="scope">
        <el-tag v-if="scope.row.settleStatus==0" class="mx-1" type="warning" effect="dark">
      未结算
    </el-tag>
    <el-tag v-else-if="scope.row.settleStatus==1" class="mx-1" type="success" effect="dark">
      已结算
    </el-tag>
    <el-tag v-else-if="scope.row.settleStatus==2" class="mx-1" type="danger" effect="dark">
      不结算
    </el-tag>
   
  </template>
  </el-table-column>
  <el-table-column prop="classifyName" label="任务分类" width="120" />
  <el-table-column prop="zip" label="认领情况" width="120" >
    <!-- <templete #default="scope">
      {{ scope.row.taskNum+'/'+scope.row.finishNum+'/' }}
    </templete> -->
    <template #default="scope">
      <!-- {{ scope.row.taskNum+'/'+scope.row.finishNum+'/' }} -->
      <span style="color:#2a01f4;">{{scope.row.taskNum}}</span>
          <span style="color:#aeaea7;">/</span>
          <span style="color:#668f3d;">{{scope.row.finishNum}}</span>
          <span style="color:#aeaea7;">/</span>
          <span style="color:#6b6b66;">{{scope.row.submitExamineNum + scope.row.receiveNum}}</span>
          <span style="color:#aeaea7;">/</span>
          <span style="color:#f10404;">{{scope.row.failNum}}</span>
        <!-- <img :src="scope.row.submitImages" alt="" style="width: 40px;height: 40px;"> -->
    </template>
  </el-table-column>
  <el-table-column prop="submitText" label="用户填写字段" width="120" />
  <el-table-column prop="zip" label="用户上传图片" width="120" >
    <template #default="scope">
      <el-image v-if="scope.row.submitImages != null && scope.row.submitImages.length  >0"
                      :src="scope.row.submitImages[0]"
                      :preview-src-list="scope.row.submitImages"
                      lazy
                      alt="点击预览"
                      style="width: 25px; height: 25px"></el-image>
    </template>
    
  </el-table-column>

  <el-table-column fixed="right" label="操作" width="320">
    <template #default="scope">
      <el-button  type="primary" icon="Edit" @click="handleView(scope.row)" >查看</el-button>
      <el-button  style="background-color: #F7BD41;color: #fff;" icon="Edit" @click="handleUpdate(scope.row)"  v-if="scope.row.status==1">审核</el-button>
      <!-- v-if="scope.row.status==2 && scope.row.settleStatus==0" -->
      
      <el-button
            type="danger"
            icon="el-icon-edit"
            @click="showSettleDialog(scope.row)"
            v-if="scope.row.status==2&&scope.row.settleStatus==0"
          >结算</el-button>
          <!-- v-if="scope.row.submitImages != null && scope.row.submitImages.length>0" -->
      <el-button  style="background-color: #F7BD41;color: #fff;" icon="Down" @click="handleDelete(scope.row)" >下载</el-button>
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
        v-model:current-page="queryParams.pageNum"
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
     <el-dialog :title="title" v-model="open" width="700px" append-to-body>
        <el-form ref="roleRef" :model="form" :rules="rules" label-width="100px">
           <el-form-item label="上传Icon" prop="icon" >
            <ImageUpload :isShowTip="false" style="width: 40px;" :limit="1"></ImageUpload>
            <!-- <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon" style="border: 1px dashed #ccc;padding: 20px;" size="80"><Plus /></el-icon>
              </el-upload> -->
           </el-form-item>
           <el-row>
            <el-col :span="12">
              <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"  />
           </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分类" prop="class">
                <!-- <el-tree-select
                    v-model="form.class"
                    :props="props"
                    :cache-data="cacheData"
                  /> -->
                  <!-- <el-tree-select
                    v-model="form.class"
                    :data="props"
                    :label="'name'"
                  /> -->
                  <el-tree-select  v-model="form.class" :data="props2" filterable node-key="name" :props="{ label: 'name', children: 'children' }">
                    <template #default="{ data: { name } }">
                          {{ name }}</template
  >
                  </el-tree-select>
           </el-form-item>
            </el-col>
           </el-row>
           <el-row>
            <el-col :span="12">
              <el-form-item label="任务总数" prop="tasknum">
              <el-input v-model="form.tasknum"  />
           </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="限制提交次数" prop="limitNum" label-width="120px">
              <el-input v-model="form.limitNum"  />
           </el-form-item>
            </el-col>
           </el-row>
              <el-form-item label="区域" prop="area">
                  <el-select v-model="form.sf" filterable placeholder="省份">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    />
                  </el-select>
                  <el-select v-model="form.sq" filterable placeholder="市区">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      />
                    </el-select>             
             </el-form-item>
             <el-form-item label="有效时间" prop="time">
              <!-- <el-date-picker
                  v-model="form.time"
                  type="daterange"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  :default-time="defaultTime"
                /> -->
                <el-date-picker
              v-model="form.time"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="YYYY/MM/DD ddd"
              time-format="A hh:mm:ss"
    />
             </el-form-item>
             <el-form-item label="简介" prop="info">
              <el-input v-model="form.info" type="textarea" placeholder="请输入内容"></el-input>
             </el-form-item>
             <el-form-item label="标签">
              <el-tag
                v-for="tag in form.dynamicTags"
                :key="tag"
                class="mx-1"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                v-if="inputVisible"
                ref="InputRef"
                v-model="inputValue"
                class="ml-1 w-20 tagInput"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                + 添加标签
              </el-button>
             </el-form-item>
           <!-- <el-form-item prop="roleKey">
              <template #label>
                 <span>
                    <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">
                       <el-icon><question-filled /></el-icon>
                    </el-tooltip>
                    权限字符
                 </span>
              </template>
              <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
           </el-form-item> -->
           <!-- <el-form-item label="角色顺序" prop="roleSort">
              <el-input-number v-model="form.roleSort" controls-position="right" :min="0" />
           </el-form-item>
           <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                 <el-radio
                    v-for="dict in sys_normal_disable"
                    :key="dict.value"
                    :label="dict.value"
                 >{{ dict.label }}</el-radio>
              </el-radio-group>
           </el-form-item> -->
           <el-form-item label="支持设备" prop="device">
              <!-- <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">安卓</el-checkbox>
              <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">苹果</el-checkbox>
              <el-checkbox v-model="form.menuCheckStrictly" @change="handleCheckedTreeConnect($event, 'menu')">pc</el-checkbox> -->
              <el-checkbox-group v-model="form.checkList">
                  <el-checkbox label="安卓" />
                  <el-checkbox label="苹果" />
                  <el-checkbox label="pc" />
                 
              </el-checkbox-group>
           </el-form-item>
           <el-row>
            <el-col :span="12">
              <el-form-item label="供给价格" prop="supplyPrice">
              <el-input v-model="form.supplyPrice"  />
           </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="c端价格" prop="cPrice">
              <el-input v-model="form.cPrice"  />
           </el-form-item>
            </el-col>
           </el-row>
           <el-row>
            <el-col :span="12">
              <el-form-item label="会员价格" prop="vipPrice">
              <el-input v-model="form.vipPrice"  />
           </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核时长" prop="shTime">
              <el-input v-model="form.shTime"  />
           </el-form-item>
            </el-col>
           </el-row>
           <el-row>
            <el-col :span="12">
              <el-form-item label="提交限时" prop="linitTime">
              <el-input v-model="form.linitTime"  />
           </el-form-item>
            </el-col>
            
           </el-row>
           <el-form-item label="是否提交文本" prop="isText">
            <el-radio-group v-model="form.isText">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
              <!-- <el-radio :label="9">Option C</el-radio> -->
            </el-radio-group>
           </el-form-item>
           <el-form-item label="文本显示名称" prop="text" label-width="120px">
              <el-input v-model="form.text"  />
           </el-form-item>
           <el-form-item label="是否提交图片" prop="isImg">
            <el-radio-group v-model="form.isImg">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
              <!-- <el-radio :label="9">Option C</el-radio> -->
            </el-radio-group>
           </el-form-item>
           <el-form-item label="图片显示名称" prop="imgTitle" label-width="120px">
              <el-input v-model="form.imgTitle"  />
           </el-form-item>
           <el-form-item label="任务要求" prop="taskRequest">
              <el-input v-model="form.taskRequest" type="textarea" placeholder="请输入内容"></el-input>
           </el-form-item>
           <el-form-item label="任务步骤">
            <!-- <editor v-model="form.content" style="overflow-y: hidden;" :min-height="192"
                  :height="500"
                :mode="mode"
                @onCreated="handleCreated" /> -->
                <editor v-model="form.content" :min-height="192"
                 />
           </el-form-item>
        </el-form>
        <template #footer>
           <div class="dialog-footer">
              <el-button type="primary" @click="submitForm">确 定</el-button>
              <el-button @click="cancel">取 消</el-button>
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
            <h4>查看任务详情</h4>
          </template>
          <template #default>
            <div>
              <el-descriptions :column="1" border>
         <el-descriptions-item label="任务编号" >{{ viewData.taskIdentifier }}</el-descriptions-item>
         <el-descriptions-item label="任务标题">{{ viewData.title }}</el-descriptions-item>
         <el-descriptions-item label="会员编号">{{viewData.userNumberId}}</el-descriptions-item>
         <!-- <el-descriptions-item label="任务状态">{{viewData.status}}</el-descriptions-item> -->
         <el-descriptions-item label="认领情况">
           <el-tag style="margin-right: 5px;">任务数（{{viewData.taskNum}}）</el-tag>
           <el-tag type="success" style="margin-right: 5px;">完成数（{{viewData.finishNum}}）</el-tag>
           <el-tag type="info" style="margin-right: 5px;">领取数（{{viewData.receiveNum }}）</el-tag>
           <el-tag type="warning">失败数（{{viewData.failNum}}）</el-tag>
         </el-descriptions-item>
         <el-descriptions-item label="任务状态">
            <el-tag :type="taskStatusTagTypeOptions[viewData.taskStatus]"
                  effect="dark">
                {{taskStatusOptions[viewData.taskStatus]}}
              </el-tag>
         </el-descriptions-item>
         <!-- <el-descriptions-item label="用户昵称">{{viewData.nickname}}</el-descriptions-item>
         <el-descriptions-item label="手机号">{{viewData.phone}}</el-descriptions-item> -->
         <el-descriptions-item label="领取时间">{{parseTime(viewData.receiveTime) }}</el-descriptions-item>
         <el-descriptions-item label="领取状态">
           <el-tag :type="statusTagTypeOptions[viewData.status]"
               effect="dark">
             {{statusOptions[viewData.status]}}
           </el-tag>
         </el-descriptions-item>
         <el-descriptions-item label="提交时间">{{parseTime(viewData.submitTime)}}</el-descriptions-item>
         <el-descriptions-item label="用户提交的文本">{{ viewData.submitText}}</el-descriptions-item>
         <el-descriptions-item label="用户提交的图片">
           <el-image
             v-for="(url,index) in viewData.submitImgList" :key="url"
             :src="viewData.submitImgList[index]"
             :preview-src-list="viewData.submitImgList"
             lazy
             alt="点击预览"
             style="width: 80px; height: 80px;"
             fit="contain"></el-image>
         </el-descriptions-item>
         <el-descriptions-item label="审核时间">{{viewData.examineTime}}</el-descriptions-item>
         <el-descriptions-item label="审核不合格原因">{{viewData.failReason}}</el-descriptions-item>
         <el-descriptions-item label="结算状态">
           <el-tag :type="settleStatusTagTypeOptions[viewData.settleStatus]"
               effect="dark">
             {{settleStatusOptions[viewData.settleStatus]}}
           </el-tag>
         </el-descriptions-item>
         <el-descriptions-item label="结算时间">{{parseTime(viewData.settleTime)}}</el-descriptions-item>
         <el-descriptions-item label="结算失败原因">{{viewData.notSettleReason}}</el-descriptions-item>
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
       <el-dialog append-to-body  v-model="openTask" title="任务审核" width="580px">
      <!-- <el-form ref="taskForm" :model="taskForm" :rules="examineRules" size="small" label-width="90px"> -->
      <el-form ref="taskForm" :model="form2" :rules="examineRules" size="small" label-width="90px">
        <el-form-item label="任务编号">
          {{ form2.id }}
        </el-form-item>
        <el-form-item label="标题">
          {{ form2.title }}
        </el-form-item>
        <el-form-item label="会员名称">
          {{ form2.numberId }}
        </el-form-item>
        <el-form-item label="手机号">
          {{ form2.phone }}
        </el-form-item>
        <el-form-item label="填写的字段">
          {{ form2.submitText }}
        </el-form-item>
        <el-form-item label="上传的图片" v-if="form2.submitImgList != null && form2.submitImgList.length  >0">
          <el-image
            v-for="(url, index) in form2.submitImgList" :key="url"
            :src="form2.submitImgList[index]"
            :preview-src-list="form2.submitImgList"
            lazy
            alt="点击预览"
            style="width: 80px; height: 80px;margin-right: 10px;"
            fit="contain"></el-image>
        </el-form-item>
        <el-form-item label="审核">
          <el-radio-group v-model="listStatus" class="ml-4" @change="changeRadio">
            <el-radio label="2" size="large">合格</el-radio>
            <el-radio label="3" size="large">不合格</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="任务编号" >
          {{taskForm.identifier}}
          222
        </el-form-item>
        <el-form-item label="标题">
          {{taskForm.title.value}}
        </el-form-item>
        <el-form-item label="会员名称">
          {{taskForm.numberId}}
        </el-form-item>
        <el-form-item label="手机号">
          {{taskForm.phone}}
        </el-form-item>
        <el-form-item label="填写的字段" v-if="taskForm.submitText != null">
          {{taskForm.submitText}}
        </el-form-item>
        <el-form-item label="上传的图片" v-if="taskForm.submitImages != null && taskForm.submitImages.length  >0">
          <el-image
            v-for="(url, index) in taskForm.submitImages" :key="url"
            :src="taskForm.submitImages[index]"
            :preview-src-list="taskForm.submitImages"
            lazy
            alt="点击预览"
            style="width: 80px; height: 80px;margin-right: 10px;"
            fit="contain"></el-image>
        </el-form-item>
        <el-form-item label="审核状态" prop="examineStatus">
          <el-radio-group v-model="form2.examineStatus" class="ml-4" @change="changeRadio">
            <el-radio label="2" size="large">合格</el-radio>
            <el-radio label="3" size="large">不合格</el-radio>
          </el-radio-group>
          <el-radio v-model="taskForm.examineStatus" label="2" @input="radioSelect">合格</el-radio>
          <el-radio v-model="taskForm.examineStatus" label="3">不合格</el-radio>
        </el-form-item> -->
        <el-form-item label="不合格原因" prop="failReason" v-if="listStatus ==3">
          <el-input type="textarea" :rows="2" v-model="taskfailReason" style="width: 430px;" />
        </el-form-item>
      </el-form>
      
      <template #footer>
             <div class="dialog-footer">
                <el-button type="primary" @click="examineSubmitMethod">确 定</el-button>
                <el-button @click="examineCancel">取 消</el-button>
             </div>
          </template>
    </el-dialog>
    <el-dialog append-to-body  v-model="openrece" title="任务结算" width="580px">
      <!-- <el-form ref="taskForm" :model="taskForm" :rules="examineRules" size="small" label-width="90px"> -->
      <el-form ref="taskForm" :model="settleForm" :rules="examineRules" size="small" label-width="90px">
        <el-form-item label="任务编号">
          {{ settleForm.id }}
        </el-form-item>
        <el-form-item label="标题">
          {{ settleForm.title }}
        </el-form-item>
        <el-form-item label="会员名称">
          {{ settleForm.numberId }}
        </el-form-item>
        <el-form-item label="手机号">
          {{ settleForm.phone }}
        </el-form-item>
        <el-form-item label="填写的字段">
          {{ settleForm.submitText }}
        </el-form-item>
        <el-form-item label="上传的图片" v-if="settleForm.submitImgList != null && settleForm.submitImgList.length  >0">
          <el-image
            v-for="(url, index) in settleForm.submitImgList" :key="url"
            :src="settleForm.submitImgList[index]"
            :preview-src-list="settleForm.submitImgList"
            lazy
            alt="点击预览"
            style="width: 80px; height: 80px;margin-right: 10px;"
            fit="contain"></el-image>
        </el-form-item>
        <el-form-item label="结算">
          <el-radio-group v-model="jsStatus" class="ml-4" @change="changeRadio">
            <el-radio label="1" size="large">结算</el-radio>
            <el-radio label="2" size="large">不结算</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="任务编号" >
          {{taskForm.identifier}}
          222
        </el-form-item>
        <el-form-item label="标题">
          {{taskForm.title.value}}
        </el-form-item>
        <el-form-item label="会员名称">
          {{taskForm.numberId}}
        </el-form-item>
        <el-form-item label="手机号">
          {{taskForm.phone}}
        </el-form-item>
        <el-form-item label="填写的字段" v-if="taskForm.submitText != null">
          {{taskForm.submitText}}
        </el-form-item>
        <el-form-item label="上传的图片" v-if="taskForm.submitImages != null && taskForm.submitImages.length  >0">
          <el-image
            v-for="(url, index) in taskForm.submitImages" :key="url"
            :src="taskForm.submitImages[index]"
            :preview-src-list="taskForm.submitImages"
            lazy
            alt="点击预览"
            style="width: 80px; height: 80px;margin-right: 10px;"
            fit="contain"></el-image>
        </el-form-item>
        <el-form-item label="审核状态" prop="examineStatus">
          <el-radio-group v-model="form2.examineStatus" class="ml-4" @change="changeRadio">
            <el-radio label="2" size="large">合格</el-radio>
            <el-radio label="3" size="large">不合格</el-radio>
          </el-radio-group>
          <el-radio v-model="taskForm.examineStatus" label="2" @input="radioSelect">合格</el-radio>
          <el-radio v-model="taskForm.examineStatus" label="3">不合格</el-radio>
        </el-form-item> -->
        <el-form-item label="不结算原因" prop="failReason" v-if="jsStatus == 2">
          <el-input type="textarea" :rows="2" v-model="jstaskfailReason" style="width: 430px;" />
        </el-form-item>
      </el-form>
      
      <template #footer>
             <div class="dialog-footer">
                <el-button type="primary" @click="settleTask">确 定</el-button>
                <el-button @click="settleCancel">取 消</el-button>
             </div>
          </template>
    </el-dialog>
    <!-- <el-dialog append-to-body  v-model="openrece"  title="任务结算" width="580px">
      <el-form ref="settleForm" :model="settleForm"  size="small" label-width="90px">
        
        <el-form-item label="任务编号">
          {{settleForm.identifier}}
        </el-form-item>
        <el-form-item label="标题">
          {{settleForm.title}}
        </el-form-item>
        <el-form-item label="会员名称">
          {{settleForm.numberId}}
        </el-form-item>
        <el-form-item label="手机号">
          {{settleForm.phone}}
        </el-form-item>
        <el-form-item label="填写的字段" v-if="settleForm.submitText != null">
          {{settleForm.submitText}}
        </el-form-item>
        <el-form-item label="上传的图片" v-if="settleForm.submitImages != null && settleForm.submitImages.length  >0">
          <el-image
            v-for="url in settleForm.submitImages" :key="url"
            :src="url"
            :preview-src-list="showImg(url)"
            lazy
            alt="点击预览"
            style="width: 80px; height: 80px;margin-right: 10px;"
            fit="contain"></el-image>
        </el-form-item>
        <el-form-item label="审核状态" prop="status">
          <el-tag :type="statusTagTypeOptions[settleForm.status]"
              effect="dark">
            {{statusOptions[settleForm.status]}}
          </el-tag>
        </el-form-item>
        <el-form-item label="结算状态" prop="settleStatus">
          <el-radio v-model="settleForm.settleStatus" label="1" @input="radioSelectBySettle">结算</el-radio>
          <el-radio v-model="settleForm.settleStatus" label="2">不结算</el-radio>
        </el-form-item>
        <el-form-item label="不结算原因" prop="notSettleReason" v-if="settleForm.settleStatus == 2">
          <el-input type="textarea" :rows="2" v-model="settleForm.notSettleReason" style="width: 430px;" />
        </el-form-item>
      </el-form>
      <template #footer>
             <div class="dialog-footer">
                <el-button type="primary" @click="settleCancel">取 消</el-button>
                <el-button @click="settleSubmitMethod">确 定</el-button>
             </div>
          </template>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="settleCancel">取消</el-button>
        <el-button type="primary" @click="settleSubmitMethod">确认</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script setup name="Role">
import { addRole, changeRoleStatus, dataScope, delRole, getRole, listRole, updateRole, deptTreeSelect } from "@/api/system/role";
import { roleMenuTreeselect, treeselect as menuTreeselect } from "@/api/system/menu";
import { taskreceive,taskClass,receiveDetail,examine,settle} from "@/api/assignment/index";
import { reactive, toRef, toRefs } from "vue";
import axios from 'axios'
console.log(axios.delete,"  ]]]")
const openrece=ref(false)
const jsStatus=ref('1')
const jstaskfailReason=ref('')
const dateRange2=ref([])
// import {validTaskNum} from "@/utils/validate"
// import Editor from '@/components/WangEditor/index.vue';
const router = useRouter();
const { proxy } = getCurrentInstance();
// const { sys_normal_disable } = proxy.useDict("sys_normal_disable");
const statusOptions=ref({
        "0": "待提交",
        "1": "待审核",
        "2": "审核成功",
        "3": "审核失败",
        "4": "超时未提交",
        "5": "放弃任务",
        "6": "任务下架/取消"
      }) 
     const  statusTagTypeOptions=ref({
        "0": "warning",
        "1": "warning",
        "2": "success",
        "3": "danger",
        "4": "info",
        "5": "info",
        "6": "info"
      }) 
     const  settleStatusOptions=ref({
        "0": "未结算",
        "1": "已结算",
        "2": "不结算"
      })
      const settleStatusTagTypeOptions=ref({
        "0": "danger",
        "1": "success",
        "2": "info",
      })
      const taskStatusOptions=ref({
        "0": "待发布",
        "1": "已发布",
        "2": "已下架",
        "3": "完成结束",
        "4": "过期结束",
        "5": "已删除"
      })
      const taskStatusTagTypeOptions=ref({
        "0": "",
        "1": "success",
        "2": "danger",
        "3": "info",
        "4": "info",
        "5": "warning"
      })
const roleList = ref([

]);
const viewData=ref({})
const taskfailReason=ref('')
const listStatus=ref('2')
const openTask=ref(false)
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
const taskClass2=ref([])

const taskClass3=ref([
      {
        code:0,
        name:"待提交"
      },{
        code:1,
        name:"待审核"
      },{
        code:2,
        name:"审核成功"
      },{
        code:3,
        name:"审核失败"
      },{
        code:4,
        name:"超时未提交"
      },{
        code:5,
        name:"放弃任务"
      },{
        code:6,
        name:"任务被重置"
      },{
        code:7,
        name:"用户重新提交"
      }
])
const inputValue=ref('')
const drawer2=ref(false)
const taskForm=ref({
  examineStatus:"2"
})
const settleForm=ref({
  examineStatus:"2"

})
// let taskForm=ref({
//   // id: null, 
//   // taskId: null,
//   //  userUuid: null,
//     examineStatus: "2",
//   //    failReason: null,
//   //       identifier: "ssrecd",
//   //        title: "0000",
//   //         nickname: null,
//   //          phone: null,
//   //       submitText: null,
//   //        submitImages: null,
// })
// console.log(taskForm.value,"戒毒所")
// let exform=reactive({
//   taskForm:{
//     id: null, taskId: null, userUuid: null, examineStatus: "1", failReason: null,
//         identifier: "ssrecd", title: null, nickname: null, phone: null,
//         submitText: null, submitImages: null,
//   }
// })
// const listForm=ref({
//   identifier:"rrrrrr",
//   title :"eeee"
// })
// const {taskForm}= toRefs(exform)
const examineRules=ref({
        examineStatus: [
          { required: true, trigger: 'blur', message: '请选择审核状态' }
        ]
      })
     
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
   taskName:undefined,
   class:undefined
  //  nickName
  //  taskName
  //  sort
 },

 rules: {
  icon:[{ required: true, message: "请上传icon", trigger: "blur" }],
   title: [{ required: true, message: "请输入任务标题", trigger: "blur" },
   { min: 2, max: 10, message: "长度在5到30个字符", trigger: "blur" },
  ],
   class: [{ required: true, message: "请选择分类", trigger: "blur" }],
   tasknum: [{ required: true, message: "请输入任务数量", trigger: "blur" },
   { validator: (rule, value, callback) => {
              if (Number(value) <1) {
                  callback(new Error('任务数量只能输入大于0数字'))
              } else {
                  callback()
              }
              }, trigger: "blur" }],
   limitNum: [{ required: true, message: "请输入限制提交次数", trigger: "blur" },
   { validator: (rule, value, callback) => {
              if (Number(value) <1) {
                  callback(new Error('限制提交数量只能输入大于0数字'))
              } else {
                  callback()
              }
              }, trigger: "blur" }],
   area: [{ required: true, message: "请选择区域", trigger: "blur" }],
   time: [{ required: true, message: "请选择时间", trigger: "blur" }],
   info: [{ required: true, message: "请输入任务简介", trigger: "blur" }],
   supplyPrice: [{ required: true, message: "请输入供给价格", trigger: "blur" }],
   cPrice: [{ required: true, message: "请输入c端价格", trigger: "blur" }],
   vipPrice: [{ required: true, message: "请输入会员价格", trigger: "blur" }],
   shTime: [{ required: true, message: "请输入审核限时", trigger: "blur" }],
   linitTime: [{ required: true, message: "请输入提交限时", trigger: "blur" }],
   text: [{ required: true, message: "请输入文本显示的名称", trigger: "blur" }],
   imgTitle: [{ required: true, message: "请输入图片显示的内容", trigger: "blur" }],
   taskRequest: [{ required: true, message: "请输入任务要求", trigger: "blur" }],
 },
});
//富文本

const { queryParams, form, rules } = toRefs(data);
const data2=reactive({
  form2:{
    examineStatus:"2"
  }
})
const {form2}=toRefs(data2)
const editorRef = shallowRef()
/** 查询角色列表 */
function getList() {
 loading.value = true;
 console.log(queryParams.value.class)
 let data={
  page:queryParams.value.pageNum,
  size:queryParams.value.pageSize,
  nickName:queryParams.value.nickName,
  taskName:queryParams.value.taskName,
  taskNumber:queryParams.value.sort,
  // classCode:queryParams.value.class.toString(),
  phone:queryParams.value.roleName,
  status:queryParams.value.status,
  time:dateRange2.value,
  sort:"desc"
 }
 if(queryParams.value.class){
  data.classCode=queryParams.value.class.toString()
 }
 console.log(queryParams.value,dateRange.value,"搜索值")
 taskreceive(data).then(res=>{
  console.log(res,"========")
  total.value=res.data.total
  roleList.value=res.data.list

  
 })
//  listRole(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
//    roleList.value = response.rows;
//    total.value = response.total;
//    loading.value = false;
//  });
}
/** 搜索按钮操作 */
function handleQuery() {
  console.log(queryParams.value,"账哈")
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
 ids.value = selection.map(item => item.roleId);
 single.value = selection.length != 1;
 multiple.value = !selection.length;
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
  title:"",
  class:"",
  taskNum:'',
  limitNum:"",
  dynamicTags:[ ],
  isText:true,
  isImg:true
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
 let data={
  receiveId:row.id
 }
 receiveDetail(data).then(res=>{
  console.log(res,"[[[[[[[[[[]]]]]]]]]]")
  form2.value=res.data
  console.log(taskForm,"sssswisi")
 getList();

 })
 openTask.value=true
//  const roleId = row.roleId || ids.value;
//  const roleMenu = getRoleMenuTreeselect(roleId);
//  getRole(roleId).then(response => {
//    form.value = response.data;
//    form.value.roleSort = Number(form.value.roleSort);
//    open.value = true;
//    nextTick(() => {
//      roleMenu.then((res) => {
//        let checkedKeys = res.checkedKeys;
//        checkedKeys.forEach((v) => {
//          nextTick(() => {
//            menuRef.value.setChecked(v, true, false);
//          });
//        });
//      });
//    });
//    title.value = "修改角色";
//  });
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
let data={
  receiveId:e.id
}
receiveDetail(data).then(res=>{
  console.log(res)
  viewData.value=res.data
})
}
function selectClass(){
    taskClass().then((res)=>{
      console.log(res,"任务分类")
      taskClass2.value=res.data
    })
  }
  function radioSelect(v){
    console.log(v)
      taskForm.failReason = null
    }
    function radioSelectBySettle(v){
      console.log(v,"ss")
      settleForm.notSettleReason = null
    }
   function examineCancel(){
    openTask.value = false
      // if (proxy.$refs['taskForm']) {
      //   proxy.$refs['taskForm'].clearValidate()
      //  taskForm = resetForm
      // }
    }
    // 
   function examineSubmitMethod(){
    let data={
      id:form2.value.id,
      status:Number(listStatus.value),
      failReason:taskfailReason.value,
      taskId:form2.value.taskId,
      userUUID:form2.value.userUUID
    }
    examine(data).then(res=>{
      // console.log(res,"能不能帮你")
      openTask.value=false
   proxy.$modal.msgSuccess("审核成功");
   getList()


    })
      // if (proxy.$refs['taskForm']) {
      //   proxy.$refs['taskForm'].validate((valid) => {
      //     if (valid) {
      //       // examineLoading = true
      //       let params = {
      //         "id":taskForm.value.id,
      //         "taskId":taskForm.value.taskId,
      //         "userUuid":taskForm.value.userUuid,
      //         "status":taskForm.value.examineStatus,
      //         "failReason":taskForm.value.failReason
      //       }
      //       //审核
      //       // this.crud.crudMethod.examine(params).then(() => {
      //       //   this.crud.notify("审核处理成功", CRUD.NOTIFICATION_TYPE.SUCCESS)
      //       //   this.examineLoading = false
      //       //   this.examineCancel()
      //       //   this.crud.refresh()
      //       // }).catch(() => {
      //       //   this.examineLoading = false
      //       // })
      //     }
      //   })
      // }
    }
    function changeRadio(e){
      console.log(e,"改变rodio")
      console.log(taskForm,"[[[[]]]]")
      listStatus.value=e
    }
    //结算
    function showSettleDialog(e){
      let data={
  receiveId:e.id
}
receiveDetail(data).then(res=>{
  console.log(res)
  settleForm.value=res.data
  openrece.value=true
console.log(settleForm.value,"[[=====]]")
})
    }
    //结算
    function settleCancel(){
      openrece.value=false

    }
    //结算确定settleSubmitMethod
    function settleSubmitMethod(e){
      let data={
      id:settleForm.value.id,
      status:Number(jsStatus.value),
      failReason:jstaskfailReason.value,
      taskId:settleForm.value.taskId,
      userUUID:settleForm.value.userUUID
    }
    examine(data).then(res=>{
      // console.log(res,"能不能帮你")
      openTask.value=false
   proxy.$modal.msgSuccess("审核成功");
   getList()


    })
    }
    function settleTask(){
      let data={
      id:settleForm.value.id,
      settleStatus:Number(jsStatus.value),
      notSettleReason:jstaskfailReason.value,
      // taskId:settleForm.value.taskId,
      // userUUID:settleForm.value.userUUID
    }
    settle(data).then(res=>{
      // console.log(res,"能不能帮你")
      openrece.value=false
   proxy.$modal.msgSuccess("结算成功");
   getList()


    })
    }
//     const deleteName =async(index)=>{
//       let res = await axios.delete('/mock/deleteNews',{
//         params:{
//           index:index
//         }
//       })
//       console.log(res,"[[[[[222]]]]]")
//   data.list=res
// }
  selectClass()
 getList();
//  deleteName()
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
  //:deep(.el-button){
   // height: 30px;
  //  line-height: 30px;
  //  width: 66px;
  //  font-size: 14px;
  //  border: none;
  //  color: #fff;
   // margin-left:5px
 // }
  :deep(.el-pagination){
    left: 0;
    margin-left: 20px;
  }
</style>
