<template>
  <div class="app-container home">
    <el-row >
      <el-col :span="12" :lg="6" :xs="12">
        <div class="home-item ">
          <div style="display: flex;justify-content: center;align-items: center;" class="onlyimg">
            <el-icon size="64" color="#61BCA5"><Document /></el-icon>
          </div>
          <div class="hidden-xs-only">
            <div>待审核数量</div>
            <div style="text-align: center;">{{ detail.submitExamineNum }}</div>
          </div>
        </div>
      </el-col>
      <el-col :span="12" :lg="6" :xs="12">
        <div class="home-item ">
          <div style="display: flex;justify-content: center;align-items: center;" class="onlyimg">
            <el-icon size="64" color="#E35D6F"><WalletFilled /></el-icon>
          </div>
          <div class="hidden-xs-only">
            <div>待结算数量</div>
            <div style="text-align: center;">{{ detail.receiveNum }}</div>
          </div>
        </div>
      </el-col>
      <el-col :span="12" :lg="6" :xs="12">
        <div class="home-item ">
          <div style="display: flex;justify-content: center;align-items: center;" class="onlyimg">
            <el-icon size="64" color="#61BCA5"><OfficeBuilding /></el-icon>
          </div>
          <div class="hidden-xs-only">
            <div>今日领取数量</div>
            <div style="text-align: center;">{{ detail.settleNum }}</div>
          </div>
        </div>
      </el-col>
      <el-col :span="12" :lg="6" :xs="12">
        <div class="home-item ">
          <div style="display: flex;justify-content: center;align-items: center;" class="onlyimg">
            <el-icon size="64" color="#61BCA5"><Avatar /></el-icon>
          </div>
          <div class="hidden-xs-only">
            <div>今日完成数量</div>
            <div style="text-align: center;">{{ detail.finishNum }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Index">
import {indexDetail} from "@/api/assignment/index.js"

const version = ref('3.8.6')
const detail=ref({})
function goTarget(url) {
  window.open(url, '__blank')
}
function getdetail(){
  indexDetail().then(res=>{
    console.log(res,"获取首页数据")
    detail.value=res.data
  })
}
getdetail()
</script>

<style scoped lang="scss">

.home {
  background-color: #F0F2F5;
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
.home-item{
  display: flex;justify-content: space-between;margin: 40px;background-color: #fff;padding: 20px;height: 108px;align-items: center;
  min-width: 100px;
}
// @media (max-width: 768px){
//   .hidden-xs-only{
//     display: none !important;
//   }
// }
@media (max-width: 768px){
  .onlyimg{
    width: 100%;
  }
}
</style>

