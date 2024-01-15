<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width="68px"
    >
      <el-form-item prop="lessonNo">
        <el-input
          v-model="queryParams.lessonNo"
          placeholder="课程编号"
          clearable
          style="width: 160px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="标题"
          clearable
          style="width: 180px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="status">
        <!-- <el-select
                v-model="queryParams.status"
                placeholder="任务分类"
                clearable
                style="width: 180px"
             > -->
        <el-tree-select
          v-model="queryParams.status"
          :data="props2"
          filterable
          node-key="code"
          :props="{ label: 'name', children: 'children' }"
        >
          <template #default="{ data: { name } }"> {{ name }}</template>
        </el-tree-select>
        <!-- <el-option
                   v-for="dict in props2"
                   :key="dict.name"
                   :label="dict.name"
                   :value="dict.code"
                /> -->
        <!-- </el-select> -->
      </el-form-item>
      <el-form-item style="width: 208px">
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY/MM/DD ddd"
          time-format="A hh:mm:ss"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="success"
          icon="Search"
          @click="handleQuery"
          style="background-color: #5fcb71"
          >搜索</el-button
        >
        <el-button
          icon="Refresh"
          @click="resetQuery"
          style="background-color: #f5bd41; color: #fff"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <!-- <el-button
          type="primary"
          style="height: 30px; line-height: 30px"
          icon="Plus"
          @click="handleAdd"
          >新增</el-button
        > -->
        <!-- <el-button @click="handlecancellationss" type="primary">批量删除</el-button> -->
        <!-- <el-button @click="openA('新增')" type="primary">新增</el-button> -->
        <!-- <el-button @click="handlecancellationss" type="primary">编辑</el-button> -->
      </el-col>
    </el-row>
    <el-table
      :data="courseList"
      style="width: 100%"
      id="dragTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop="lessonNo" label="课程编号" width="150" />
      <el-table-column prop="id" label="id" width="100" />
      <el-table-column label="封面图片" width="120">
        <template #default="scope">
          <img :src="scope.row.img" alt="" style="width: 50px; height: 60px" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="120" />
      <el-table-column prop="classify" label="分类" width="120" />
      <el-table-column prop="price" label="价格" width="120"> </el-table-column>
      <el-table-column
        prop="createTime"
        :formatter="formatCreateTime"
        label="发布时间"
        width="120"
      />
      <el-table-column
        prop="updateTime"
        :formatter="formatUpdateTime"
        label="更新时间"
        width="120"
      />

      <el-table-column fixed="right" label="操作" width="320">
        <template #default="scope">
          <el-button type="primary" icon="view" @click="handleView(scope.row)"
            >查看</el-button
          >
          <!-- <el-button type="primary" icon="view" @click="handlecopy(scope.row)"
            >复制</el-button
          > -->
          <!-- <el-button
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-if="scope.row.status == 0 || scope.row.status == 2"
            >修改</el-button
          > -->
          <el-button
            style="width: 66px;height: 30px;"
            type="primary"
            icon="Edit"
            @click="handlecancellation(scope.row)"
            v-if="scope.row.status == 0 || scope.row.status == 2"
            >删除</el-button
          >
          <el-button
            style="width: 66px;height: 30px;background-color: #5fcb71"
            v-if="scope.row.status == 0 || scope.row.status == 2"
            class="btn"
            @click="confirmsed(scope.row)"
            icon="promotion"
            >发布</el-button
          >
          <el-button
          type="primary"
            @click="confirmdown(scope.row)"
            class="btn"
            icon="bottom"
            v-if="scope.row.status == 1"
            >下架</el-button
          >
          <el-button
            @click="change('编辑',scope.row)"
            class="btn"
            type="primary"
            icon="Edit"
            v-if="scope.row.status == 1"
            >编辑</el-button
          >
          <el-button
          style="width: 66px;height: 30px;"
            type="primary"
            icon="CaretTop"
            @click="handletop(scope.row)"
            v-if="scope.row.top == 0"
            >置顶</el-button
          >
          <el-button
            type="primary"
            icon="CaretBottom"
            @click="unhandletop(scope.row)"
            v-if="scope.row.top == 1"
            >取消置顶</el-button
          >
          <el-button
          v-if="scope.row.dailyFreeActivity == 1"
            type="primary"
            icon="check"
            @click="handlecanDailyFreeActivity(scope.row)"
            >每日限免</el-button
          >
          <el-button
          v-if="scope.row.dailyFreeActivity == 0"
            type="warning"
            icon="close"
            @click="handlecanDailyFreeActivity(scope.row)"
            >每日限免</el-button
          >
          <el-button
            v-if="scope.row.newUserActivity == 1"
            type="primary"
            icon="check"
            @click="handlecanActivity(scope.row)"
            >新人活动</el-button
          >
          <el-button
            v-if="scope.row.newUserActivity == 0"
            type="warning"
            icon="close"
            @click="handlecanActivity(scope.row)"
            >新人活动</el-button
          >
          <el-button
          v-if="scope.row.weeklyLotteryActivity == 1"
            type="primary"
            icon="check"
            @click="handlecanActivity1(scope.row)"
            >翻一翻</el-button
          >
          <el-button
          v-if="scope.row.weeklyLotteryActivity == 0"
            type="warning"
            icon="close"
            @click="handlecanActivity1(scope.row)"
            >翻一翻</el-button
          >
          <el-button
          v-if="scope.row.seckillActivity == 1"
            type="primary"
            icon="check"
            @click="SeckillActivity(scope.row)"
            >秒杀活动</el-button
          >
          <el-button
          v-if="scope.row.seckillActivity == 0"
            type="warning"
            icon="close"
            @click="SeckillActivity(scope.row)"
            >秒杀活动</el-button
          >

          <!-- <el-popconfirm
            v-if="scope.row.status == 0 || scope.row.status == 2"
            width="220"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="confirmsed(scope.row)"
            @cancel="cancelsed(scope.row)"
            :hide-icon="true"
            title="确定发布该条数据吗"
          >
            <template #reference>
              <el-button
                class="btn"
                style="background-color: #5fcb71"
                icon="promotion"
                >发布</el-button
              >
            </template>
          </el-popconfirm> -->

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
      v-model:page="queryParams.page"
      v-model:limit="queryParams.limit"
      :small="true"
      layout="total,prev, pager, next,sizes"
      @pagination="getLessonList"
      v-model:current-page="queryParams.page"
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
          v-model:limit="queryParams.limit"
          @pagination="getList"
       /> -->

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog
      :title="title"
      v-model="open"
      width="700px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form ref="roleRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="上传Icon" prop="icon">
          <!-- <el-form-item label="上传Icon" prop="iconUrl"> -->
          <el-upload
            style="width: 490px"
            class="avatar-uploader"
            action="https://zhenxiangkeji.cn/zhenzhuan/api/mini/new/img/upload"
            :show-file-list="false"
            :format="['jpg', 'jpeg', 'png']"
            :headers="header"
            name="img"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.icon" :src="form.icon" class="avatar" />
            <el-icon
              v-else
              class="avatar-uploader-icon"
              style="border: 1px dashed #ccc; padding: 20px"
              size="80"
              ><Plus
            /></el-icon>
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
          <!-- </el-form-item> -->
          <!-- <ImageUpload :isShowTip="false" style="width: 40px;" :limit="1" v-model="form.img" ></ImageUpload> -->
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
              <el-input v-model="form.title" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分类" prop="class">
              <el-tree-select
                v-model="form.class"
                :data="props2"
                filterable
                node-key="code"
                :props="{ label: 'name', children: 'children' }"
              >
                <template #default="{ data: { name } }">
                  {{ name }}
                </template>
              </el-tree-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务总数" prop="tasknum">
              <el-input type="number" v-model="form.tasknum" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="限制提交次数"
              prop="limitNum"
              label-width="120px"
            >
              <el-input type="number" v-model="form.limitNum" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="区域" prop="sf">
          <el-select
            v-model="form.sf"
            filterable
            placeholder="省份"
            @change="chengsf"
          >
            <el-option
              v-for="item in options"
              :key="item.regionCode"
              :label="item.regionName"
              :value="item.regionCode"
            />
          </el-select>
          <el-select v-model="form.sq" filterable placeholder="市区">
            <!-- <el-select v-model="form.sf" filterable placeholder="市区"> -->
            <el-option
              v-for="item in market"
              :key="item.regionCode"
              :label="item.regionName"
              :value="item.regionCode"
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
          <el-input
            v-model="form.info"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
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
          <el-button
            v-else
            style="border: 1rpx solid #000; color: #ccc"
            size="small"
            @click="showInput"
          >
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
            <el-checkbox label="安卓" key="0" />
            <!--0 -->
            <el-checkbox label="苹果" key="1" />
            <!--1 -->
            <el-checkbox label="pc" key="2" />
            <!--2 -->
          </el-checkbox-group>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="供给价格" prop="supplyPrice">
              <el-input v-model="form.supplyPrice" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="c端价格" prop="cPrice">
              <el-input v-model="form.cPrice" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="会员价格" prop="vipPrice">
              <el-input v-model="form.vipPrice" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核时长" prop="shTime">
              <el-input v-model="form.shTime" maxlength="4" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="提交限时" prop="linitTime">
              <el-input type="number" v-model="form.linitTime" maxlength="4" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="是否提交文本" prop="isText">
          <el-radio-group v-model="form.isText">
            <el-radio :label="1" value="1">是</el-radio>
            <el-radio :label="0" value="0">否</el-radio>
            <!-- <el-radio :label="9">Option C</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="文本显示名称"
          prop="text"
          label-width="120px"
          v-if="form.isText == 1"
        >
          <el-input v-model="form.text" />
        </el-form-item>
        <el-form-item label="是否提交图片" prop="isImg">
          <el-radio-group v-model="form.isImg">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
            <!-- <el-radio :label="9">Option C</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="图片显示名称"
          prop="imgTitle"
          label-width="120px"
          v-if="form.isImg == 1"
        >
          <el-input v-model="form.imgTitle" />
        </el-form-item>
        <el-form-item label="任务要求" prop="taskRequest">
          <el-input
            v-model="form.taskRequest"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传流程文件">
          <el-upload
            v-model:file-list="form.fileList"
            style="width: 490px"
            class="upload-demo"
            action="https://zhenxiangkeji.cn/zhenzhuan/api/mini/new/img/upload"
            :show-file-list="true"
            accept=".pdf"
            :headers="header"
            name="img"
            :on-remove="handremove"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload"
          >
            <el-button type="primary">点击上传</el-button>

            <!-- <img v-if="form.icon" :src="form.icon" class="avatar"> -->
            <!-- <el-icon v-if="form.fileList" class="avatar-uploader-icon" style="border: 1px dashed #ccc;padding: 20px;" size="80"><Plus /></el-icon>

                <el-icon v-else class="avatar-uploader-icon" style="border: 1px dashed #ccc;padding: 20px;" size="80"><Plus /></el-icon> -->
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="任务步骤">
          <!-- <editor v-model="form.content" style="overflow-y: hidden;" :min-height="192"
                    :height="500"
                  :mode="mode"
                  @onCreated="handleCreated" /> -->
          <editor v-model="form.content" :min-height="192" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="datas.fromData" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input v-model="datas.fromData.title" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格" prop="price">
            <el-input v-model="datas.fromData.price" autocomplete="off" />
          </el-form-item>
          </el-col>
        </el-row>
        <div class="m-4">
          <el-form-item label="分类" prop="classify">
            <el-cascader
              v-model="datas.fromData.classify"
              :options="options"
              :props="props"
              @change="handleChange"
            />
          </el-form-item>
        </div>
        <el-form-item label="上传Icon" prop="img" >
          <!-- <el-form-item label="上传Icon" prop="iconUrl"> -->
          <el-upload
            style="width: 490px"
            class="avatar-uploader"
            action="https://zhenxiangkeji.cn/zhenzhuan/api/mini/new/img/upload"
            :show-file-list="false"
            :format="['jpg', 'jpeg', 'png']"
            :headers="header"
            name="img"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="datas.fromData.img" :src="datas.fromData.img" class="avatar" />
            <el-icon
              v-else
              class="avatar-uploader-icon"
              style="border: 1px dashed #ccc; padding: 20px"
              size="80"
              ><Plus
            /></el-icon>
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="任务步骤">
          <!-- <editor v-model="form.content" style="overflow-y: hidden;" :min-height="192"
                    :height="500"
                  :mode="mode"
                  @onCreated="handleCreated" /> -->
          <editor v-model="datas.fromData.content" :min-height="192" />
        </el-form-item>
      </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary"  @click="addChange">
                确定
              </el-button>
            </span>
          </template>
    </el-dialog>
    

    <el-drawer v-model="drawer2" :direction="'rtl'">
      <template #header>
        <h4>查看课程详情</h4>
      </template>
      <template #default>
        <div>
          <el-descriptions title="" :column="1" border :size="'small'">
            <el-descriptions-item
              label="课程编号"
              label-align="left"
              align="center"
              label-class-name="my-label"
              class-name="my-content"
              width="40px"
              >{{ detail.id }}</el-descriptions-item
            >
            <el-descriptions-item
              label="标题"
              label-align="left"
              align="center"
              >{{ detail.title }}</el-descriptions-item
            >
            <el-descriptions-item
              label="封面图片"
              label-align="left"
              align="center"
              ><img
                :src="detail.img"
                alt=""
                style="width: 80px; height: 80px"
              />
            </el-descriptions-item>
            <el-descriptions-item label="简介" label-align="left" align="center"
              >{{ detail.content }}
            </el-descriptions-item>
            <el-descriptions-item
              label="分类"
              label-align="left"
              align="center"
              >{{ detail.classify }}</el-descriptions-item
            >
            <el-descriptions-item
              label="区域"
              label-align="left"
              align="center"
              >{{ detail.updateTime }}</el-descriptions-item
            >
            <el-descriptions-item
              label="有效时间"
              label-align="left"
              align="center"
              >{{
                detail.createTime + "-" + detail.endTime
              }}</el-descriptions-item
            >
            <el-descriptions-item
              label="标签"
              label-align="left"
              align="center"
            >
              <el-tag
                size="small"
                v-for="item in detail.label"
                :key="item.id"
                >{{ item }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item
              label="支持设备"
              label-align="left"
              align="center"
            >
              <el-checkbox-group>
                <!-- <el-checkbox  v-for="item in  detail.deviceType "  :checked="item==0?true:false||item==1?true:false||item==2?true:false" disabled >
                                {{ item==0?'安卓':''||item==1?'苹果':''||item==2?'pc':''}}
                              </el-checkbox> -->
                <el-checkbox disabled> 安卓 </el-checkbox>
                <el-checkbox disabled> 苹果 </el-checkbox>
                <el-checkbox disabled> pc </el-checkbox>
              </el-checkbox-group>
            </el-descriptions-item>
            <el-descriptions-item
              label="任务总数"
              label-align="left"
              align="center"
              >{{ detail.taskNum }}</el-descriptions-item
            >
            <el-descriptions-item
              label="已领取任务数"
              label-align="left"
              align="center"
              >{{ detail.receiveNum }}</el-descriptions-item
            >
            <el-descriptions-item
              label="等待审核任务数"
              label-align="left"
              align="center"
              >{{ detail.submitExamineNum }}</el-descriptions-item
            >
            <el-descriptions-item
              label="完成任务数"
              label-align="left"
              align="center"
              >{{ detail.finishNum }}</el-descriptions-item
            >
            <el-descriptions-item
              label="任务状态"
              label-align="left"
              align="center"
            >
              <!-- <template #default="scope"> -->
              <template>
                <el-tag
                  v-if="detail.status == 0"
                  class="mx-1"
                  type="danger"
                  effect="plain"
                >
                  待发布
                </el-tag>
                <el-tag
                  v-else-if="detail.status == 1"
                  class="mx-1"
                  type="success"
                >
                  已发布
                </el-tag>
                <el-tag
                  v-else-if="detail.status == 2"
                  class="mx-1"
                  type="danger"
                  effect="plain"
                >
                  已下架
                </el-tag>
                <el-tag
                  v-else-if="detail.status == 3"
                  class="mx-1"
                  type="danger"
                  effect="plain"
                >
                  完成结束
                </el-tag>
                <el-tag
                  v-else-if="detail.status == 4"
                  class="mx-1"
                  type="info"
                  plain
                  effect="plain"
                >
                  过期结束
                </el-tag>
                <el-tag
                  v-else-if="detail.status == 5"
                  class="mx-1"
                  type="danger"
                  effect="plain"
                >
                  已删除
                </el-tag>
              </template>
            </el-descriptions-item>
            <el-descriptions-item
              label="状态变更人"
              label-align="left"
              align="center"
              >{{ detail.changeUserName }}</el-descriptions-item
            >
            <el-descriptions-item
              label="变更时间"
              label-align="left"
              align="center"
              >{{ detail.updateTime }}</el-descriptions-item
            >
            <el-descriptions-item
              label="供给价格"
              label-align="left"
              align="center"
              >{{ detail.supplyPrice }}</el-descriptions-item
            >
            <el-descriptions-item
              label="C端价格"
              label-align="left"
              align="center"
              >{{ detail.rewardPrice }}</el-descriptions-item
            >
            <el-descriptions-item
              label="会员价格"
              label-align="left"
              align="center"
              >{{ detail.rewardPriceMember }}</el-descriptions-item
            >
            <el-descriptions-item
              label="审核限时"
              label-align="left"
              align="center"
              >{{ detail.examineTime }}</el-descriptions-item
            >
            <el-descriptions-item
              label="提交限时"
              label-align="left"
              align="center"
              >{{ detail.receiveLimitTime }}</el-descriptions-item
            >
            <el-descriptions-item
              label="限制提交次数"
              label-align="left"
              align="center"
              >{{ detail.permitNum }}</el-descriptions-item
            >
            <el-descriptions-item
              label="是否提交文本"
              label-align="left"
              align="center"
            >
              <el-tag size="small">{{
                detail.isSubmitText == 1 ? "是" : "否"
              }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item
              label="提交文本字段名"
              label-align="left"
              align="center"
              >{{ detail.submitTextName }}</el-descriptions-item
            >
            <el-descriptions-item
              label="是否上传图片"
              label-align="left"
              align="center"
            >
              <el-tag size="small">{{
                detail.isSubmitImg == 1 ? "是" : "否"
              }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item
              label="上传图片字段名"
              label-align="left"
              align="center"
              >{{ detail.submitImgName }}</el-descriptions-item
            >
            <el-descriptions-item
              label="任务要求"
              label-align="left"
              align="center"
              >{{ detail.require }}</el-descriptions-item
            >
            <el-descriptions-item
              label="任务步骤"
              label-align="left"
              align="center"
            >
              <div v-html="detail.content" class="content"></div>
            </el-descriptions-item>
            <el-descriptions-item
              label="创建人"
              label-align="left"
              align="center"
              >{{ detail.createUserName }}</el-descriptions-item
            >
            <el-descriptions-item
              label="创建时间"
              label-align="left"
              align="center"
              >{{ detail.createTime }}</el-descriptions-item
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
import { getToken, removeToken } from "@/utils/auth";
import { formatDate } from "@/utils/index";
import Sortable from "sortablejs";
import {
  addRole,
  changeRoleStatus,
  dataScope,
  delRole,
  getRole,
  listRole,
  updateRole,
  deptTreeSelect,
} from "@/api/system/role";
import {
  taskList,
  addTask,
  getArea,
  taskClass,
  deltask,
  update,
  release,
  shelf,

  
  copy22,
  
} from "@/api/assignment/index";
import {
  totop,
  untotop,
  deleteApi,
  lessonList,
  viewDetail,
  sortList,
  addLesson,
  changeApi,
  lessShelf,
  newUserActivityApi,
  DailyFreeActivityApi,
  WeeklyFlipActivityApi,
  SeckillActivityApi
} from "@/api/lesson/lessonList";
import {
  roleMenuTreeselect,
  treeselect as menuTreeselect,
} from "@/api/system/menu";
import { getTransitionRawChildren, inject, ref } from "vue";
import { ElMessageBox } from "element-plus";
const reload = inject("reload");
// const imgList=defineProps([modelValue])
// import {validTaskNum} from "@/utils/validate"
// import Editor from '@/components/WangEditor/index.vue';
const router = useRouter();
const { proxy } = getCurrentInstance();
//  const { sys_normal_disable } = proxy.useDict("sys_normal_disable");
const sys_normal_disable = ref([]);
let roleList = ref([]);
let courseList = ref([]);
const detail = ref({});
let addurl = ref("");
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(1);
const title = ref(""); //文章标题
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
const imageUrl = ref("");
const currentPage1 = ref(1);
const inputValue = ref("");
const drawer2 = ref(false);
const dailyFreeActivity = ref(0); // 限免

const newUserActivity = ref(0); // 新人活动
const lessonId = ref(0);

const weeklyLotteryActivity = ref(0); // 翻一翻
let market = ref([]);
let regionCode = ref(0);
/** 数据范围选项*/
const dataScopeOptions = ref([
  { value: "1", label: "全部数据权限" },
  { value: "2", label: "自定数据权限" },
  { value: "3", label: "本部门数据权限" },
  { value: "4", label: "本部门及以下数据权限" },
  { value: "5", label: "仅本人数据权限" },
]);
const mode = ref("");
const inputVisible = ref(false);
const props = ref([]);

const props2 = ref([]);
let limitNumber = ref(20);
let pages = ref(0);
const cacheData = ref([]);
const sf = ref([]);
const sq = ref([]);
// const options = ref(
  // []
  //   [
  //    { value: "1", label: "全部数据权限" ,children: [
  //           {
  //             value: 'consistency',
  //             label: 'Consistency',
  //           },
  //           {
  //             value: 'feedback',
  //             label: 'Feedback',
  //           },
  //           {
  //             value: 'efficiency',
  //             label: 'Efficiency',
  //           },
  //           {
  //             value: 'controllability',
  //             label: 'Controllability',
  //           },
  //         ],},
  //    { value: "2", label: "自定数据权限" },
  //    { value: "3", label: "本部门数据权限" },
  //    { value: "4", label: "本部门及以下数据权限" },
  //    { value: "5", label: "仅本人数据权限" }
  //  ]
// )
const header = ref({
  Authorization: getToken(),
});
const info = ref({});
const data = reactive({
  form: {
    dynamicTags: [],
  },
  queryParams: {
    page: 1,
    limit: 10,
    classify: null,
    title: null,
    keyword: null,
    startTime: null,
    endTime: null,
  },

  // rules: {
  //   icon: [{ required: true, message: "请上传icon", trigger: "blur" }],
  //   title: [
  //     { required: true, message: "请输入任务标题", trigger: "blur" },
  //     { min: 5, max: 30, message: "长度在5到30个字符", trigger: "blur" },
  //   ],
  //   class: [{ required: true, message: "请选择分类", trigger: "blur" }],
  //   tasknum: [
  //     { required: true, message: "请输入任务数量", trigger: "blur" },
  //     {
  //       validator: (rule, value, callback) => {
  //         if (Number(value) < 1) {
  //           callback(new Error("任务数量只能输入大于0数字"));
  //         } else {
  //           callback();
  //         }
  //       },
  //       trigger: "blur",
  //     },
  //   ],
  //   limitNum: [
  //     { required: true, message: "请输入限制提交次数", trigger: "blur" },
  //     {
  //       validator: (rule, value, callback) => {
  //         if (Number(value) < 1) {
  //           callback(new Error("限制提交数量只能输入大于0数字"));
  //         } else {
  //           callback();
  //         }
  //       },
  //       trigger: "blur",
  //     },
  //   ],
  //   sf: [{ required: true, message: "请选择区域", trigger: "blur" }],
  //   time: [{ required: true, message: "请选择时间", trigger: "blur" }],
  //   info: [{ required: true, message: "请输入任务简介", trigger: "blur" }],
  //   supplyPrice: [
  //     { required: true, message: "请输入供给价格", trigger: "blur" },
  //     //  {validator:valRule,trigger:"blur"}
  //     {
  //       validator: (rule, value, callback) => {
  //         let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
  //         if (!reg.test(value)) {
  //           callback(new Error("请输入正确的价格"));
  //         } else {
  //           callback();
  //         }
  //       },
  //       trigger: "blur",
  //     },
  //   ],
  //   cPrice: [
  //     { required: true, message: "请输入c端价格", trigger: "blur" },
  //     //  {validator:valRule,trigger:"blur"}

  //     {
  //       validator: (rule, value, callback) => {
  //         let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
  //         if (!reg.test(value)) {
  //           callback(new Error("请输入正确的价格"));
  //         } else {
  //           callback();
  //         }
  //       },
  //       trigger: "blur",
  //     },
  //     {
  //       validator: (rule, value, callback) => {
  //         // let reg=/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
  //         console.log(value, form.value.supplyPrice, "-----");
  //         if (Number(value) > Number(form.value.supplyPrice)) {
  //           callback(new Error("c端价格不能大于供给价格"));
  //         } else {
  //           callback();
  //         }
  //       },
  //       trigger: "blur",
  //     },
  //   ],
  //   vipPrice: [
  //     { required: true, message: "请输入会员价格", trigger: "blur" },
  //     //  {validator:valRule,trigger:"blur"}
  //     {
  //       validator: (rule, value, callback) => {
  //         let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
  //         if (!reg.test(value)) {
  //           callback(new Error("请输入正确的价格"));
  //         } else {
  //           callback();
  //         }
  //       },
  //       trigger: "blur",
  //     },
  //     {
  //       validator: (rule, value, callback) => {
  //         // let reg=/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
  //         if (Number(value) > Number(form.value.supplyPrice)) {
  //           callback(new Error("会员价格不能大于供给价格"));
  //         } else {
  //           callback();
  //         }
  //       },
  //       trigger: "blur",
  //     },
  //   ],
  //   shTime: [
  //     { required: true, message: "请输入审核限时", trigger: "blur" },
  //     //  {validator:TimeRule,trigger:"blur"}
  //     {
  //       validator: (rule, value, callback) => {
  //         let reg = /^[0-9]*[1-9][0-9]*$/;
  //         if (!reg.test(value)) {
  //           callback(new Error("请输入正确的时间"));
  //         } else {
  //           callback();
  //         }
  //       },
  //       trigger: "blur",
  //     },
  //   ],
  //   linitTime: [
  //     { required: true, message: "请输入提交限时", trigger: "blur" },
  //     //  {validator:TimeRule,trigger:"blur"}
  //     {
  //       validator: (rule, value, callback) => {
  //         let reg = /^[0-9]*[1-9][0-9]*$/;
  //         if (!reg.test(value)) {
  //           callback(new Error("请输入正确的时间"));
  //         } else {
  //           callback();
  //         }
  //       },
  //       trigger: "blur",
  //     },
  //   ],
  //   text: [
  //     { required: true, message: "请输入文本显示的名称", trigger: "blur" },
  //   ],
  //   imgTitle: [
  //     { required: true, message: "请输入图片显示的内容", trigger: "blur" },
  //   ],
  //   taskRequest: [
  //     { required: true, message: "请输入任务要求", trigger: "blur" },
  //   ],
  // },
});
//富文本

const { queryParams, form, rules } = toRefs(data);
const editorRef = shallowRef();

/** 查询角色列表 */
function getList() {
  loading.value = true;
  console.log(queryParams.value, dateRange.value, "搜索值");
  listRole(proxy.addDateRange(queryParams.value, dateRange.value)).then(
    (response) => {
      roleList.value = response.rows;
      total.value = response.total;
      loading.value = false;
    }
  );
}
function valRule(rule, value, callback) {
  let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
  if (!reg.test(value)) {
    callback(new Error("请输入正确的价格"));
  }
}
function TimeRule(rule, value, callback) {
  let reg = /^[0-9]*[1-9][0-9]*$/;
  if (!reg.test(value)) {
    callback(new Error("请输入正确的价格"));
  }
}

/**
 * ! 每日限免
 */
let numDailyFreeActivity = 1;
const handlecanDailyFreeActivity = async (row) => {
  lessonId.value = row.id;
  numDailyFreeActivity++;
  if (numDailyFreeActivity % 2 === 0) {
    dailyFreeActivity.value = 1;
    proxy.$modal.msgSuccess("开启每日限免")
  } else {
    dailyFreeActivity.value = 0;
    proxy.$modal.msgSuccess("取消每日限免")
  }
  console.log(dailyFreeActivity.value, lessonId.value);
  console.log(row, "每日限免");
  await DailyFreeActivityApi({
    lessonId: lessonId.value,
    dailyFreeActivity: dailyFreeActivity.value,
  });
  getLessonList()
};

/**
 * ! 新人活动
 */
let numActivity = 1;
const handlecanActivity = async (row) => {
  console.log(row, "新人活动");
  lessonId.value = row.id;
  numActivity++;
  if (row.newUserActivity === 0) {
    newUserActivity.value = 1;
    proxy.$modal.msgSuccess("开启新人活动")
  } else {
    newUserActivity.value = 0;
    proxy.$modal.msgSuccess("取消新人活动")
  }
  console.log(newUserActivity.value, lessonId.value);
  await newUserActivityApi({
    lessonId: lessonId.value,
    newUserActivity: newUserActivity.value,
  });
  getLessonList()
};

/**
 * ! 每周翻一翻
 */
const handlecanActivity1 = async (row) => {
  console.log(row, "周周翻转");
  lessonId.value = row.id;
  if (row.weeklyLotteryActivity === 0) {
    weeklyLotteryActivity.value = 1;
    proxy.$modal.msgSuccess("开启翻一翻")
  } else {
    weeklyLotteryActivity.value = 0;
    proxy.$modal.msgSuccess("取消翻一翻")
  }
  await WeeklyFlipActivityApi({
    lessonId: lessonId.value,
    weeklyLotteryActivity: weeklyLotteryActivity.value,
  });
  getLessonList()
};

/**
 * ! 秒杀 
 */
const seckillActivity = ref(0)
const SeckillActivity = async (row) => {
  lessonId.value = row.id;

  if (row.seckillActivity === 0) {
    seckillActivity.value = 1;
    proxy.$modal.msgSuccess("开启秒杀")
  } else {
    seckillActivity.value = 0;
    proxy.$modal.msgSuccess("取消秒杀")
  }
  console.log(row, "秒杀");
  lessonId.value = row.id;
  await SeckillActivityApi({
    lessonId: lessonId.value,
    seckillActivity : seckillActivity.value,
  });
  getLessonList()
};

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.page = 1;
  console.log(queryParams.value, "搜索值");
  //  getList();
  getLessonList();
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
  //  proxy.$modal.confirm('是否确认删除角色编号为"' + roleIds + '"的数据项?').then(function () {
  //    return delRole(roleIds);
  //  }).then(() => {
  //  getList();
  //    proxy.$modal.msgSuccess("删除成功");
  //  }).catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    "system/role/export",
    {
      ...queryParams.value,
    },
    `role_${new Date().getTime()}.xlsx`
  );
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  console.log(selection,'选中');
  // ids.value = selection.map((item) => item.roleId);
  // single.value = selection.length != 1;
  // multiple.value = !selection.length;
}
/** 角色状态修改 */
function handleStatusChange(row) {
  let text = row.status === "0" ? "启用" : "停用";
  proxy.$modal
    .confirm('确认要"' + text + '""' + row.roleName + '"角色吗?')
    .then(function () {
      return changeRoleStatus(row.roleId, row.status);
    })
    .then(() => {
      proxy.$modal.msgSuccess(text + "成功");
    })
    .catch(function () {
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
  menuTreeselect().then((response) => {
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
    title: "",
    class: "",
    tasknum: "",
    limitNum: "",
    dynamicTags: [],
    isText: 1,
    isImg: 1,
  };
  proxy.resetForm("roleRef");
}
/** 添加角色 */
function handleAdd() {
  reset();
  //  getMenuTreeselect();
  inputValue.value = "";
  inputVisible.value = false;
  // form.value.checkList=[]//需要修改
  open.value = true;
  title.value = "新增任务";
}
/** 修改角色 */
// function handleUpdate(row) {
//   console.log(row, "接收修改");
//   //  reset();
//   const roleId = row.id || ids.value;
//   let data = {
//     taskId: row.id,
//   };
//   viewDetails(data).then((res) => {
//     console.log(res, "[pppppp]");
//     form.value = res.data;
//     form.value.id = row.id;
//     (form.value.title = res.data.title),
//       (form.value.class = res.data.code),
//       (form.value.tasknum = res.data.taskNum),
//       (form.value.limitNum = res.data.permitNum),
//       (form.value.sf = res.data.regionCode),
//       // :res.data.startTime:form.value.time[0],
//       // :res.data.endTime:form.value.time[1],
//       (form.value.info = res.data.introduce),
//       // :res.data.label:form.value.dynamicTags.join(),//处理
//       // deviceType:Object.keys(form.value.checkList).join(),//处理
//       (form.value.cPrice = res.data.rewardPrice),
//       (form.value.supplyPrice = res.data.supplyPrice),
//       (form.value.vipPrice = res.data.rewardPriceMember),
//       (form.value.linitTime = res.data.receiveLimitTime),
//       (form.value.shTime = res.data.examineTime),
//       (form.value.isText = res.data.isSubmitText),
//       (form.value.text = res.data.submitTextName),
//       (form.value.isImg = res.data.isSubmitImg),
//       (form.value.imgTitle = res.data.submitImgName),
//       (form.value.taskRequest = res.data.require),
//       (form.value.content = res.data.content),
//       (form.value.icon = res.data.iconUrl);
//     form.value.time = [res.data.startTime, res.data.endTime];
//     if (res.data.processDocument && res.data.processDocument.length > 0) {
//       form.value.fileList = [
//         {
//           url: res.data.processDocument,
//           name: res.data.processDocument.substr(
//             res.data.processDocument.lastIndexOf("/") + 1,
//             res.data.processDocument.length
//           ),
//         },
//       ];
//       console.log(res.data.processDocument.lastIndexOf("/"), "查找");
//     }

//     // if(form.value.dynamicTags&&form.value.dynamicTags.length>0){
//     // form.value.dynamicTags=res.data.label.split(',')
//     // }
//     if (res.data.label && res.data.label.length > 0) {
//       form.value.dynamicTags = res.data.label.split(",");
//     }
//     console.log(form.value.dynamicTags, "证书");
//     console.log(new Date(res.data.startTime).toISOString());
//     form.value.checkList = [];
//     if (res.data.deviceType.indexOf(0) > -1) {
//       form.value.checkList.push("安卓");
//     }
//     if (res.data.deviceType.indexOf(1) > -1) {
//       form.value.checkList.push("苹果");
//     }
//     if (res.data.deviceType.indexOf(2) > -1) {
//       form.value.checkList.push("pc");
//     }
//     console.log(res.data.deviceType.indexOf(0));
//     // form.value.checkList=["安卓",1]
//     // form.value.checkList=res.data.deviceType
//     open.value = true;
//   });

//   //  const roleMenu = getRoleMenuTreeselect(roleId);
//   //  update(data).then(res=>{
//   //   console.log(res,"[[[[[[[[[[]]]]]]]]]]")
//   //  })
//   //  getRole(roleId).then(response => {
//   //    form.value = response.data;
//   //    form.value.roleSort = Number(form.value.roleSort);
//   //    open.value = true;
//   //    nextTick(() => {
//   //      roleMenu.then((res) => {
//   //        let checkedKeys = res.checkedKeys;
//   //        checkedKeys.forEach((v) => {
//   //          nextTick(() => {
//   //            menuRef.value.setChecked(v, true, false);
//   //          });
//   //        });
//   //      });
//   //    });
//   title.value = "修改任务";
//   //  });
// }
/** 根据角色ID查询菜单树结构 */
function getRoleMenuTreeselect(roleId) {
  return roleMenuTreeselect(roleId).then((response) => {
    menuOptions.value = response.menus;
    return response;
  });
}
/** 根据角色ID查询部门树结构 */
function getDeptTree(roleId) {
  return deptTreeSelect(roleId).then((response) => {
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
function handremove() {
  form.value.fileList = [];
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
// function submitForm() {
//   console.log(form.value, "提交舒适");
//   // console.log(Date.UTC(form.value.time[0]))
//   //
//   // console.log(form.value.dynamicTags.join(),Object.keys(form.value.checkList).join(),"==============")
//   // console.log(proxy.$refs["roleRef"])
//   proxy.$refs["roleRef"].validate((valid) => {
//     // console.log(valid, "表单");
//     if (valid) {
//       let data = {
//         // ...form.value,
//         id: form.value.id,
//         title: form.value.title,
//         iconUrl: form.value.icon,
//         code: Number(form.value.class),
//         taskNum: Number(form.value.tasknum),
//         permitNum: Number(form.value.limitNum),
//         regionCode: form.value.sf,
//         startTime: form.value.time[0],
//         endTime: form.value.time[1],
//         introduce: form.value.info,
//         // label:form.value.dynamicTags.join(),//处理
//         // deviceType:Object.keys(form.value.checkList).join(),//处理
//         rewardPrice: Number(form.value.cPrice),
//         supplyPrice: Number(form.value.supplyPrice),
//         rewardPriceMember: Number(form.value.vipPrice),
//         receiveLimitTime: Number(form.value.linitTime),
//         examineTime: Number(form.value.shTime),
//         isSubmitText: form.value.isText,
//         submitTextName: form.value.text,
//         isSubmitImg: form.value.isImg,
//         submitImgName: form.value.imgTitle,
//         require: form.value.taskRequest,
//         content: form.value.content,
//         //  processDocument:form.value.fileList[0].url
//       };
//       console.log(form.value.checkList, "wwww");
//       if (form.value.checkList && form.value.checkList.length > 0) {
//         if (form.value.checkList.includes("安卓")) {
//           data.deviceType = data.deviceType + "0";
//         }
//         if (form.value.checkList.includes("苹果")) {
//           data.deviceType = data.deviceType + ",1";
//         }
//         if (form.value.checkList.includes("pc")) {
//           data.deviceType = data.deviceType + ",2";
//         }
//         // data.deviceType=Object.keys(form.value.checkList).join()
//       }
//       if (form.value.dynamicTags && form.value.dynamicTags.length > 0) {
//         data.label = form.value.dynamicTags.join();
//       }
//       console.log(form.value.fileList, "000xian享");
//       if (form.value.fileList && form.value.fileList.length > 0) {
//         data.processDocument = form.value.fileList[0].url;
//       } else {
//         data.processDocument = "";
//       }
//       console.log(form, "提交舒适2");
//       if (form.value.id != undefined) {
//         console.log(form.value, "新增的数据");

//         data.startTime = new Date(form.value.time[0]).toISOString();
//         data.endTime = new Date(form.value.time[1]).toISOString();
//         console.log(data.startTime, "选择的时间");
//         //  form.value.menuIds = getMenuAllCheckedKeys();
//         const res = update(data).then((response) => {
//           console.log(response, "提交");
//           proxy.$modal.msgSuccess("修改成功");
//           open.value = false;
//           getTaskList();
//           //  getList();
//         });
//         console.log(res, "提交2");
//       } else {
//         console.log(form.value.checkList, "==============");
//         console.log(form.value.dynamicTags.join(), "==============");
//         // let data={
//         //   title:form.value.title,
//         //   code:Number(form.value.class) ,
//         //   taskNum: Number(form.value.tasknum),
//         //   permitNum:Number(form.value.limitNum),
//         //   regionCode:form.value.sf,
//         //   startTime:form.value.time[0],
//         //   endTime:form.value.time[1],
//         //   introduce:form.value.info,
//         //   label:form.value.dynamicTags.join(),//处理
//         //   deviceType:Object.keys(form.value.checkList).join(),//处理
//         //   rewardPrice:Number(form.value.cPrice),
//         //   supplyPrice:Number(form.value.supplyPrice),
//         //   rewardPriceMember:Number(form.value.vipPrice),
//         //   receiveLimitTime:Number(form.value.linitTime),
//         //   examineTime:Number(form.value.shTime),
//         //   isSubmitText:form.value.isText,
//         //   submitTextName:form.value.text,
//         //   isSubmitImg:form.value.isImg,
//         //   submitImgName:form.value.imgTitle,
//         //   require:form.value.taskRequest,
//         //   content:form.value.content,
//         // }
//         console.log(data, "新增接口传参");
//         //  form.value.menuIds = getMenuAllCheckedKeys();
//         // addTask(form.value).then(response => {
//         addTask(data).then((response) => {
//           proxy.$modal.msgSuccess("新增成功");
//           open.value = false;
//           //  getList();
//           getTaskList();
//         });
//       }
//     } else {
//       console.log(
//         Number(form.value.class),
//         form.value.fileList[0].url,
//         "坚持夫人"
//       );
//       console.log("为验证成功");
//     }
//   });
// }
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
function getrea() {
  let data = {
    parentRegionCode: regionCode.value,
  };

  getArea(data)
    .then((res) => {
      console.log("成功获取地理", res);
      if (regionCode.value == 0) {
        options.value = res.data;
      } else {
        market.value = res.data;
      }
    })
    .catch(() => {
      console.log("失败");
    });
}
/** 分配数据权限操作 */
function handleDataScope(row) {
  reset();
  const deptTreeSelect = getDeptTree(row.roleId);
  getRole(row.roleId).then((response) => {
    form.value = response.data;
    openDataScope.value = true;
    nextTick(() => {
      deptTreeSelect.then((res) => {
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
  console.log(form, "谁");
  if (form.value.roleId != undefined) {
    form.value.deptIds = getDeptAllCheckedKeys();
    dataScope(form.value).then((response) => {
      proxy.$modal.msgSuccess("修改成功");
      openDataScope.value = false;
      //  getList();
    });
  }
}
/** 取消按钮（数据权限）*/
function cancelDataScope() {
  openDataScope.value = false;
  reset();
}
//上传图标
function handleAvatarSuccess(e) {
  console.log(e, "上传");
  datas.value.fromData.img = e.data;
}
function handleAvatarSuccess2(e) {
  console.log(e, "上传");
  let num = e.data.lastIndexOf("/");
  console.log(e.data.lastIndexOf("/"), "3333");
  console.log(e.data.slice(num + 1, e.data.length));
  form.value.fileList = [
    {
      name: e.data.slice(num + 1, e.data.length),
      url: e.data,
    },
  ];
}
//页码改变
function handleSizeChange() {
  console.log("handleSizeChange");
}
function handleCurrentChange() {}
//显示标签输入框
function showInput() {
  inputVisible.value = true;
}
//富文本
function handleCreated() {}
function selectSF(e) {
  console.log(e, "sssss33");
  form.sf.value = e;
}
// function handleInputConfirm (e){
//   console.log(e,inputValue.value,"标签")
//   console.log(form.value)
//   inputVisible.value=false
//   form.value.dynamicTags.push(inputValue.value)
//   console.log(form.value)
// }
function handleInputConfirm(e) {
  console.log(form.value.dynamicTags, "为啥");
  if (inputValue.value) {
    if (form.value.dynamicTags) {
      form.value.dynamicTags.push(inputValue.value);
    } else {
      form.value.dynamicTags = [inputValue.value];
    }
  }
  inputVisible.value = false;
  inputValue.value = "";
}
const handleClose = (tag) => {
  form.value.dynamicTags.splice(form.value.dynamicTags.indexOf(tag), 1);
};
//查看功能的抽屉
function handleView(e) {
  drawer2.value = true;
  console.log(e.id);
  let data = {
    lessonId: 683,
  };
  viewDetail(data).then((res) => {
    console.log(res, "查看课程详情");
    let arrlist = [];
    let arr = {
      ...res.data,
      // label:res.data.label.split(','),
      // deviceType:res.data.deviceType.split(',')
    };
    // for( let i=0;i<arr.deviceType.length;i++){
    //   for(let j=0;j<arr.deviceType[i].length;j++){
    //   arrlist.push(JSON.parse(arr.deviceType[i])[j])

    //   }
    // }
    // arr.deviceType=arrlist.filter(res=>{return res!=undefined})
    console.log(arrlist, "[[[===== ]]]");
    detail.value = arr;
    console.log(detail, "111111111详情查看");
  });
}

/**
 * !! 课程上架
 */
function confirmsed(e) {
  ElMessageBox.confirm("确定发布该条数据吗?")
    .then(() => {
      let data = {
        lessonId: e.id,
      };
      release(data).then((res) => {
        console.log(res);
        proxy.$modal.msgSuccess("发布成功");
        getLessonList();
      });
    })
    .catch(() => {
      // catch error
    });
}

/**
 * !! 课程下架
 */
function confirmdown(e) {
  ElMessageBox.confirm("确定要下架吗?")
    .then(() => {
      let data = {
        lessonId: e.id,
      };
      lessShelf(data).then((res) => {
        console.log(res, "[----0000]");
        proxy.$modal.msgSuccess("下架成功");
        getLessonList();
      });
    })
    .catch(() => {
      // catch error
    });
}
function canceldown(e) {
  console.log("cancel!", e, "下架");
}
function beforeAvatarUpload(file) {
  console.log(file, "上传钱");
  // form.value.icon="https://img2.baidu.com/it/u=2613410048,2511714711&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=288"
  //const isJPG = file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 2;

  // if (!isJPG) {
  //   this.$message.error('上传头像图片只能是 JPG 格式!');
  // }
  if (!isLt2M) {
    this.$message.error("上传头像图片大小不能超过 10MB!");
  }
  return isLt2M;
}
/**
 * !! 课程列表
 */
function getLessonList() {
  let data1 = {
    page: queryParams.value.page,
    limit: queryParams.value.limit,
    lessonNo: queryParams.value.lessonNo,
    classify: queryParams.value.classify,
    title: queryParams.value.title,
    keyword: queryParams.value.keyword,
    startTime: dateRange.value[0],
    endTime: dateRange.value[1],
  };
  lessonList(data1).then((res) => {
    console.log(res, "课程列表");
    courseList.value = res.data.content;
    total.value = res.data.total;
  });
}

function formatCreateTime(value) {
  return formatDate(+value.createTime);
}

function formatUpdateTime(value) {
  return formatDate(+value.updateTime);
}

function getTaskList() {
  // if(queryParams.value.status=='undefined'){
  //   queryParams.value.status=0
  // }
  let data1 = {
    page: queryParams.value.page,
    limit: queryParams.value.limit,
    classify: queryParams.value.classify,
    title: queryParams.value.title,
    keyword: queryParams.value.keyword,
    createTime: dateRange.value[0],
    endTime: dateRange.value[1],
  };
  taskList(data1)
    .then((res) => {
      console.log("接口成功", res);
      // roleList.value=res.data.content
      // data.roleList=res.data.content
      console.log(roleList.value, "----wwwww");
      roleList.value.splice(0, roleList.value.length, ...res.data.content);
      // total.value=res.data.total
      reload();
    })
    .catch((err) => {
      console.log(err, "请求出错了");
    });
}

function selectClass() {
  taskClass().then((res) => {
    console.log(res, "任务分类");
    props2.value = res.data;
  });
}
function handleExceed(files) {
  console.log(files);
  // upload.value!.clearFiles()
  // const file = files[0] as UploadRawFile
  // file.uid = genFileId()
  // upload.value!.handleStart(file)
}
function chengsf(e) {
  console.log(e, "[[[====省份]]]");
  regionCode.value = e;
  getrea();
}
/**
 * !删除
 */
function handlecancellation(e) {
  ElMessageBox.confirm("确定要删除吗?")
    .then(() => {
      let data = {
        lessonId: e.id,
      };
      deleteApi(data).then((res) => {
        // console.log(res,"")
        proxy.$modal.msgSuccess("取消成功");
        getLessonList();
      });
    })
    .catch(() => {
      // catch error
    });
}
/**
 * !批量删除
 */
// const selectedList = ref([]);
//  const handleSelectionChange = (val) => {
//   console.log(val, "选中了");
//   selectedList.value = val;
//    console.log(selectedList.value, "选中了");
// }

// const handlecancellationss = () => {
//   // 遍历数据
//   const resid = selectedList.value.map(item => item.id)
//   console.log(resid, "遍历");
 
//   deleteApi({lessonId:resid}).then((res) => {
//     // console.log(res,"")
//     proxy.$modal.msgSuccess("取消成功");
//     getTaskList();
//   });
// }
/**
 * !置顶
 */
async function handletop(e) {
  // console.log(e, "回去");
  lessonId.value = e.id;
  // console.log(lessonId.value, "回去");
  await totop({ lessonId: lessonId.value }).then((res) => {
    console.log(res, "置顶");
    proxy.$modal.msgSuccess("置顶成功");
    getLessonList();
  });

  // let data={
  //   taskId:e.id
  // }
  // totop(data).then(res=>{
  //   // console.log(res,"")
  //   proxy.$modal.msgSuccess("置顶成功");
  //   getTaskList()
  // })
}
/**
 * !取消置顶
 */
const unhandletop = async (row) => {
  lessonId.value = row.id;
  await untotop({ lessonId: lessonId.value }).then((res) => {
    console.log(res, "取消置顶");
    proxy.$modal.msgSuccess("取消置顶成功");
    getLessonList()
  });
};
function handlecopy(e) {
  let data = {
    taskId: e.id,
  };
  copy22(data).then((res) => {
    console.log(res, "复制");
    proxy.$modal.msgSuccess("复制成功");
    getTaskList();
  });
  //   console.log("复制")
  //   let save = function (e) {
  //   e.clipboardData.setData('text/plain', event.target.innerText);
  //   e.preventDefault();  //阻止默认行为
  // }
  // document.addEventListener('copy', save);//添加一个copy事件
  // document.execCommand("copy");//执行copy方法
}
function setSort() {
  const el = document.querySelector("#dragTable table tbody");
  new Sortable(el, {
    sort: true,
    ghostClass: "sortable-ghost",
    forceFallback: true,
    onEnd: (e) => {
      console.log(e, "成交额", courseList);
      console.log(courseList.value[e.oldIndex].sort);
      console.log(courseList.value[e.newIndex].sort);
      console.log(e.oldIndex);
      console.log(e.newIndex);
      let data = {
        lessonSort: courseList.value[e.oldIndex].sort,
        orderSort: courseList.value[e.newIndex].sort,
      };
      let aee = courseList.value;
      const targetRow = aee.splice(e.oldIndex, 1)[0];
      aee.splice(e.newIndex, 0, targetRow);
      // console.log(aee.splice(e.newIndex,0,targetRow))
      courseList.value = [];
      setTimeout(() => {
        courseList.value = aee;
      }, 60);
      console.log(aee);
      // console.log(roleList.value.splice(e.oldIndex, 1))
      // roleList.value= roleList.value.splice(e.oldIndex, 1)
      // const targetRow = roleList.value.splice(e.oldIndex, 1)[0]
      // let data=roleList.value
      // console.log(roleList.value.splice(e.newIndex, 0,{id:1}),"[[[]]]")
      // let ss=data.splice(e.newIndex,0,targetRow)
      //  console.log(ss)
      // roleList.value.splice(e.newIndex, 0, targetRow)
      // console.log(roleList.value)

      //   console.log(targetRow,"出来")
      //   roleList.value.splice(e.newIndex, 0, targetRow)
      // console.log(data,"需要传的只")
      sortList(data).then((res) => {
        // //   console.log("成功排序")
        // // // location.reload()
        //   // const targetRow = roleList.value.splice(e.oldIndex, 1)[0]
        //   // console.log(targetRow,"出来")
        //   // roleList.value.splice(e.newIndex, 0, targetRow)
        // // // console.log(tableData)
        //   // getTaskList()
        // //   // roleList.value=[]
      });
    },
  });
}
/**
 * !表单数据
 */
const datas = ref({
  fromData : {
    "id":null,
    // "title":'',       // "文章标题",
    "sourceUrl":'原文URL',   // "原文URL",
    "content":'',     // "<p>文章内容</p>\n<p>这里是富文本可以有图片</p>\n",
    "imgs":"[]",        // "[https://www.midou55.com/wp-content/uploads/2023/04/1681393735-40e2e77848ca267.jpg]",
    "img":'',         // "https://www.midou55.com/wp-content/uploads/2023/04/1681393735-40e2e77848ca267.jpg",
    "assets": '收费查看内容',     //"收费查看内容",
    "classify": '',   //"免费项目",
    "keywords":'免费项目',    // "免费项目,",
    "price":'0',       // "0",
    "status": 1,
    "top": 0
  },
  rules: {
    img: [{ required: true, message: "请上传icon", trigger: "blur" }],
    price: [{ required: true, message: "请上传icon", trigger: "blur" }],
    title: [
      { required: true, message: "请输入任务标题", trigger: "blur" },
      { min: 5, max: 30, message: "长度在5到30个字符", trigger: "blur" },
    ],
    classify: [{ required: true, message: "请选择分类", trigger: "blur" }],
  },
})
const options = [
  {
    value: '会员专区',
    label: '会员专区',
    children: [
      {
        value: '实操项目',
        label: '实操项目',
      },
      {
        value: 'TikTok教程',
        label: 'TikTok教程',
      },
      {
        value: '网站源码',
        label: '网站源码',
      }
    ]
  }
]

const dialogFormVisible = ref(false) //控制弹窗开关
const num = ref('');  // 新增/编辑
// 新增  打开弹框
// const openA = (name) => {
//   console.log("打开弹窗");
//   num.value = name
//   dialogFormVisible.value = true;
// }
// 编辑  打开弹框
const change = async (name,row) => {
  // console.log(name,row.id, "编辑");
  lessonId.value = row.id;
  datas.value.fromData.id= row.id;  // 传入id 用于编辑
  num.value = name
  dialogFormVisible.value = true;

  const res = await viewDetail({lessonId:lessonId.value})
  console.log(res.data.title, "获取到的编辑信息");
  console.log(datas.value, "111111111111");
  //  回填数据

  const a=res.data.classify;
  datas.value.fromData.title = res.data.title;
  datas.value.fromData.price = res.data.price;
  datas.value.fromData.img = res.data.img;
  datas.value.fromData.content = res.data.content;

   const b= a.split(',');
   datas.value.fromData.classify=b
};

// 点击确定
const addChange = async () => {
  console.log(num.value);
  dialogFormVisible.value = false;
  if (num.value === "新增") {
    // addLesson(datas.value.fromData).then((res) => {
    //   console.log(res, "新增");
    //   proxy.$modal.msgSuccess("新增成功");
    //   getTaskList();
    // });
  } else {
   await changeApi(datas.value.fromData).then((res) => {
      console.log(res, "编辑");
      proxy.$modal.msgSuccess("编辑成功");
      getLessonList()
    })
  }
}
// 一二级联动
const handleChange = (value) => {
  console.log(value)
  const newStrings = value.join(',');
  console.log(newStrings);
  datas.value.fromData.classify = newStrings;
 
}


onMounted(() => {
  setSort();
  getLessonList();
});
getrea();
getTaskList();
selectClass();
// getList();
</script>
 <style lang="scss" scoped>
.el-form-item {
  margin: 0 10px 20px 0;
}
.editor {
  height: 500px !important;
}
.el-upload--picture-card {
  width: 40px !important;
  height: 40px !important;
}
.el-upload-list--picture-card {
  el-upload-list-picture-card-size: 80px;
}
// .el-upload-list--picture-card .el-upload-list__item-actions{
//   width: 60px !important;
//   height: 60px !important;
// }
// :deep(.el-upload-list){
//   width: 40px !important;
//   height: 40px !important;
// }
:deep(.el-upload-list--picture-card) {
  width: 40px !important;
  height: 40px !important;
}
:deep(.el-upload--picture-card) {
  width: 40px !important;
  height: 40px !important;
}
.tagInput {
  width: 60px;
}
:deep(.el-drawer__header) {
  margin-bottom: 0;
}
:deep(.el-drawer) {
  width: 40% !important;
}
// :deep(.el-button){
//   height: 30px;
//   line-height: 30px;
//   width: 66px;
//   font-size: 14px;
//   border: none;
//   color: #fff;
//   margin-left:5px
// }
.btn {
  height: 30px;
  line-height: 30px;
  width: 66px;
  font-size: 14px;
  border: none;
  color: #fff;
  margin-left: 5px;
}
:deep(.el-pagination) {
  left: 0;
  margin-left: 20px;
}
// .el-upload-list__item img{
//   width: 60px;
//   height: 60px;
// }
// .el-upload-list{
//   display: flex;
// }
// :deep(.hide) {
//   width: 60px;
//   height: 60px;
// }
// :deep(.el-upload-list__item-actions){
//   display: none;
// }

// :deep(.el-upload-list__item-status-label){
//   display: none !important;
// }
// :deep(.el-upload-list){
//   width: 60px;
//   height: 60px;
// }
// :deep(.el-upload-list){
//   width: 60px !important;
//   height: 60px !important;
// }
// :deep(.el-upload-list__item){
//   width: 60px;
//   height: 60px;
// }
.avatar {
  width: 60px;
  height: 60px;
}
.content {
  width: 100%;
}
.content img {
  width: 60px;
  height: 60px;
}

:deep(.content img) {
  width: 120px;
  height: 120px;
}
</style>
 