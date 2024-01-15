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
          <el-form-item  prop="realName">
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
          </el-form-item>
          <el-form-item  prop="phone">
             <el-input
                v-model="queryParams.phone"
                placeholder="手机号"
                clearable
                style="width: 180px"
                @keyup.enter="handleQuery"
             />
          </el-form-item>
          <el-form-item  prop="nickName">
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
             <el-button type="success" icon="Search" @click="handleQuery" style="background-color: #5FCB71;">搜索</el-button>
             <el-button icon="Refresh" @click="resetQuery" style="background-color: #F5BD41;color: #fff;">重置</el-button>
          </el-form-item>
       </el-form>
       <!-- <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
             <el-button
                type="primary" style="height: 30px;line-height: 30px;"
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
    <el-table-column  prop="numberId" label="会员编号" width="150" />
    <el-table-column prop="nickname" label="用户昵称" width="120" />
    <el-table-column prop="phone" label="手机号" width="120" />
    <!-- <el-table-column prop="realName" label="真实姓名" width="120" />
    <el-table-column prop="idCardNo" label="身份证号" width="120" />
    <el-table-column prop="city" label="身份证照" width="120" >
      <template #default="scope">
          <img :src="scope.row.cardAfterPhoto" alt="" style="width: 30px;height: 30px;">
          <img :src="scope.row.cardFrontPhoto" alt="" style="width: 30px;height: 30px;">
      </template>
    </el-table-column>
    
    <el-table-column prop="address" label="实名状态" width="120" >
      <template #default="scope">
        <el-tag class="mx-1" type="warning" effect="dark" v-if="scope.row.realStatus==1"> 
      已实名
    </el-tag>
    <el-tag class="mx-1" type="warning" effect="dark" v-else>
      未实名
    </el-tag>
      </template>
      
    </el-table-column> -->
    <el-table-column prop="balance" label="钱包余额(元)" width="120" />
    <el-table-column prop="address" label="状态" width="120" >
      <template #default="scope">
        <el-tag class="mx-1" type="success" effect="dark" v-if="scope.row.status==1"> 
      正常
    </el-tag>
    <el-tag class="mx-1" type="warning" effect="dark" v-else>
      拉黑
    </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="registerDate" label="注册时间" width="120" >
      <template #default="scope">
       {{parseTime(scope.row.registerDate)}}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
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
        <!-- <el-button  type="primary" icon="view" @click="handleView(scope.row)">拉黑</el-button> -->
       
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
                <el-descriptions title="" :column="1" border :size="'small'">
                    <el-descriptions-item
                      label="任务编号"
                      label-align="left"
                      align="center"
                      label-class-name="my-label"
                      class-name="my-content"
                      width="40px"
                      >kooriookami</el-descriptions-item
                    >
                    <el-descriptions-item label="标题" label-align="left" align="center" 
                      >18100000000</el-descriptions-item
                    >
                    <el-descriptions-item label="icon" label-align="left" align="center"
                      ><img src="../../assets/images/profile.jpg" alt="" style="width: 80px;height: 80px;">
                      </el-descriptions-item
                    >
                    <el-descriptions-item label="简介" label-align="left" align="center">
                      <el-tag size="small">School</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="分类" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="区域" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="有效时间" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="标签" label-align="left" align="center"
                      > <el-tag size="small">School</el-tag>
                      </el-descriptions-item
                    >
                    <el-descriptions-item label="支持设备" label-align="left" align="center"
                      ><el-checkbox-group v-model="info.checkList">
                             
                              <el-checkbox label="disabled" disabled />
                              <el-checkbox label="disabled" disabled />
                              <el-checkbox label="selected and disabled" disabled />
                            </el-checkbox-group>
                      </el-descriptions-item
                    >
                    <el-descriptions-item label="任务总数" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="已领取任务数" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="等待审核任务数" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="完成任务数" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="任务状态" label-align="left" align="center"
                      > <el-tag size="small">School</el-tag>
                      </el-descriptions-item
                    >
                    <el-descriptions-item label="状态变更人" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="变更时间" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="供给价格" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="C端价格" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="审核限时" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="提交限时" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="限制提交次数" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="是否提交文本" label-align="left" align="center"
                      > <el-tag size="small">School</el-tag>
                      </el-descriptions-item
                    >
                    <el-descriptions-item label="提交文本字段名" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="是否上传图片" label-align="left" align="center"
                      > <el-tag size="small">School</el-tag>
                      </el-descriptions-item
                    >
                    <el-descriptions-item label="上传图片字段名" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="任务要求" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="任务步骤" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="创建人创建时间" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
                    >
                    <el-descriptions-item label="任务步骤" label-align="left" align="center"
                      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                      Province</el-descriptions-item
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
 import { userList,freezeOrThaw } from "@/api/assignment/index";

 
// import {validTaskNum} from "@/utils/validate"
// import Editor from '@/components/WangEditor/index.vue';
 const router = useRouter();
 const { proxy } = getCurrentInstance();
 const { sys_normal_disable } = proxy.useDict("sys_normal_disable");
 const status=ref([
  {
    value:0,
    lable:"拉黑"
  },
  {
    value:1,
    lable:"正常"
  }
 ])
 const roleList = ref([
  {
    data:"20358",
    name:"ddc",
    status:"xxx"
  }
 ]);
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
     number:undefined,
     realName:undefined,
     idNumber:undefined,
     phone:undefined,
     nickName:undefined,
     status:undefined,
     startTime:undefined,
     endTime:undefined
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
     supplyPrice: [{ required: true, message: "请输入供给价格", trigger: "blur" },
     {validator:valRule,trigger:"blur"}
    ],
     cPrice: [{ required: true, message: "请输入c端价格", trigger: "blur" },
     {validator:valRule,trigger:"blur"}
    ],
     vipPrice: [{ required: true, message: "请输入会员价格", trigger: "blur" },
     {validator:valRule,trigger:"blur"} ],
     shTime: [{ required: true, message: "请输入审核限时", trigger: "blur" },
     {validator:TimeRule,trigger:"blur"}],
     linitTime: [{ required: true, message: "请输入提交限时", trigger: "blur" },
     {validator:TimeRule,trigger:"blur"}],
     text: [{ required: true, message: "请输入文本显示的名称", trigger: "blur" }],
     imgTitle: [{ required: true, message: "请输入图片显示的内容", trigger: "blur" }],
     taskRequest: [{ required: true, message: "请输入任务要求", trigger: "blur" }],
   },
 });
 //富文本
  
 const { queryParams, form, rules } = toRefs(data);
 const editorRef = shallowRef()
 /** 查询角色列表 */
 function getList() {
  let data={
    page:queryParams.value.pageNum,
    size:queryParams.value.pageSize,
   
     number:queryParams.value.number,
     realName:queryParams.value.realName,
     idNumber:queryParams.value.idNumber,
     phone:queryParams.value.phone,
     nickName:queryParams.value.nickName,
     status:queryParams.value.status,
     startTime:new Date(dateRange.value[0]).getTime(),
     endTime:new Date(dateRange.value[1]).getTime()
  }
   loading.value = true;
  //  console.log(queryParams.value,dateRange.value,"搜索值")
   userList(data).then(res=>{
    console.log(res,"列表")
    roleList.value=res.data.list
    total.value=res.data.total
   })
  //  listRole(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
  //    roleList.value = response.rows;
  //    total.value = response.total;
  //    loading.value = false;
  //  });
 }
 function valRule(rule,value,callback){
 let reg=/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
 if(!reg.test(value)){
  callback(new Error("请输入正确的价格"))
 }
 }
 function TimeRule(rule,value,callback){
 let reg=/^[0-9]*[1-9][0-9]*$/
 if(!reg.test(value)){
  callback(new Error("请输入正确的价格"))
 }}
 /** 搜索按钮操作 */
 function handleQuery() {
   queryParams.value.pageNum = 1;
   getList();
 }
 /** 重置按钮操作 */
 function resetQuery() {
  console.log("充值")
   dateRange.value = [];
   proxy.resetForm("queryRef");
  //  handleQuery();
  getList()
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
//   drawer2.value=true

}
function confirmEvent(e) {
  console.log('confirm!拉黑',e)
  let data={
    uuid:e.uuid,
    status:0
  }
  freezeOrThaw(data).then(res=>{
    console.log(res,"pppp")
    proxy.$modal.msgSuccess("拉黑成功");
  getList();


  })

}
function confirmEventjc(e) {
  console.log('confirm!拉黑',e)
  let data={
    uuid:e.uuid,
    status:1
  }
  freezeOrThaw(data).then(res=>{
    console.log(res,"pppp")
    proxy.$modal.msgSuccess("解除成功");
  getList();


  })

}
function cancelEvent(e){
  console.log('cancel!',e)
}
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
    :deep(.el-button){
      height: 30px;
      line-height: 30px;
      width: 66px;
      font-size: 14px;
      border: none;
      color: #fff;
      margin-left:5px
    }
    :deep(.el-pagination){
      left: 0;
      margin-left: 20px;
    }
</style>
 