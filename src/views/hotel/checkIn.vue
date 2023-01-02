<template>
  <topbar_h></topbar_h>
  <div>
    <!-- 操作区域 使用fixed固定在页面左边 -->
    <div class="box">
      <h3>入住办理:</h3>
      <el-steps :active="active" :space="100" finish-status="success">
        <el-step title="选择订单"></el-step>
        <el-step title="确定房间"></el-step>
        <el-step title="信息登记"></el-step>
      </el-steps>

      <!-- 第1步显示区域 -->
      <div class="one" v-if="active==0">
        <div class="item">
          <div class="title">开始日期:</div>
          <el-date-picker v-model="startDate" type="date" value-format="YYYY-MM-DD" placeholder="搜索开始日期之后的订单" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">结束日期:</div>
          <el-date-picker v-model="endDate" type="date" value-format="YYYY-MM-DD" placeholder="搜索结束日期之前的订单" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">姓名:</div>
          <el-input v-model="customerName" placeholder="预定人姓名（选填）" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">手机号:</div>
          <el-input v-model="phone" placeholder="预定人手机号（选填）" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">身份证号:</div>
          <el-input v-model="idcard" placeholder="预定人身份证号（选填）" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <el-button type="primary" style="width:70%;margin-left:15%" @click="sOrder">搜索预定订单</el-button>
        </div>
      </div>

      <!-- 第2步显示区域 -->
      <div class="one" v-if="active==1">
        <div class="item">
          <div class="title">订单号:</div>
          <el-input v-model="orderID" placeholder="预定单号" style="width:200px;height:30px" @blur="change"/>
        </div>
        <div class="item">
          <div class="title">入住日期:</div>
          <el-date-picker v-model="checkInDate" disabled type="date" value-format="YYYY-MM-DD" placeholder="入住日期" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">离开日期:</div>
          <el-date-picker v-model="checkOutDate" disabled type="date" value-format="YYYY-MM-DD" placeholder="退房日期" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">房间类型:</div>
          <el-input v-model="roomType" disabled placeholder="房间类型" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">选择房号:</div>
          <el-select v-model="finalRoom" placeholder="对应房型房间号">
            <el-option
              v-for="item in roomNoList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="item">
          <el-button type="primary" style="width:70%;margin-left:15%" @click="nnext">下一步</el-button>
        </div>
        <div class="item">
          <el-button style="width:70%;margin-left:15%" @click="cancel">取消</el-button>
        </div>
      </div>

      <!-- 第3步显示区域 -->
      <div class="one" v-if="active==2">
        <div class="item">
          <div class="title">订单号:</div>
          <el-input v-model="orderID" disabled placeholder="预定单号" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">房间号:</div>
          <el-input v-model="finalRoom" disabled placeholder="房间号" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">宾客姓名:</div>
          <el-input v-model="customerName1" placeholder="入住人姓名1" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">身份证号:</div>
          <el-input v-model="idcard1" placeholder="入住人身份证号1" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">宾客姓名:</div>
          <el-input v-model="customerName2" placeholder="入住人姓名2" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">身份证号:</div>
          <el-input v-model="idcard2" placeholder="入住人身份证号2" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <el-button type="primary" style="width:70%;margin-left:15%" @click="checkIn">办理入住</el-button>
        </div>
        <div class="item">
          <el-button style="width:70%;margin-left:15%" @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
    <!-- 显示表格区域 -->
    <div class="content">
      <div>
        <el-table :data="orderList" border v-loading=loading>
          <el-table-column
            prop="orderID"
            label="订单号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="customerName"
            label="预定人姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
            width="60">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="idcard"
            label="身份证号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="payment"
            label="订单金额"
            width="90">
          </el-table-column>
          <el-table-column
            prop="roomType"
            label="预定房型"
            width="100">
          </el-table-column>
          <el-table-column
            prop="count"
            label="预定数量"
            width="90">
          </el-table-column>
          <el-table-column
            prop="countLeft"
            label="可用数量"
            width="90">
          </el-table-column>
          <el-table-column
            prop="checkInDate"
            label="入住日期"
            width="110">
          </el-table-column>
          <el-table-column
            prop="checkOutDate"
            label="离开日期"
            width="110">
          </el-table-column>
          <el-table-column
            prop="condition"
            label="订单状态"
            width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template #default="scope">
              <el-button @click="check(scope.$index)" type="primary" text size="small">办理入住</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../network/axios"
import { ElMessage,ElNotification,ElMessageBox } from 'element-plus'
import topbar_h from '@/components/topbar_h.vue'
import { h } from 'vue'
export default {
  components: { topbar_h },
  data(){
    return{
      loading:false,
      active:0,
      startDate:"",
      endDate:"",
      customerName:"",
      phone:"",
      idcard:"",
      orderID:"",
      orderID2:"",
      roomType:"",
      checkInDate:"",
      checkOutDate:"",
      roomNoList:["201","202","203"],
      finalRoom:"",
      customerName1:"",
      customerName2:"",
      idcard1:"",
      idcard2:"",
      orderList:[{"orderID":"123", "customerName":"张三",gender:"M","phone":"12345678900",idcard:"333333333332222333","payment":"998元", "roomType":"大床房","count":"2","countLeft":"1", "checkInDate":"2022-05-02", "checkOutDate":"2022-05-03","condition":"未入住"},
      {"orderID":"124", "customerName":"王五",gender:"F","phone":"12341678900",idcard:"333312333332222333","payment":"600元", "roomType":"高级大床房","count":"1","countLeft":"1", "checkInDate":"2022-05-25", "checkOutDate":"2022-05-30",  "condition":"未入住"}]
    }
  },
  methods:{
    sOrder(){
      if(!(this.startDate && this.endDate)){
        ElNotification({
          title: '错误',
          type: 'warning',
          message: h('i', { style: 'color: teal' }, '开始日期和结束日期不能为空'),
        })
        return
      }
      var d1 = new Date(this.startDate);
      var d2 = new Date(this.endDate);
      if(d1 > d2){
        ElNotification({
          title: '错误',
          type: 'warning',
          message: h('i', { style: 'color: teal' }, '开始日期不能晚于结束日期'),
        })
        return;
      }
      this.loading = true
      axios({
        method:'get',
        url:'/hotel/viewbook',
        params:{
          'startDate':this.startDate,
          'endDate':this.endDate,
          'customerName':this.customerName,
          'phone':this.phone,
          'idcard':this.idcard
        }
      }).then(res => {
        if(res.status==="1"){
          this.orderList = res.orderList
        }else if(res.status==="0") {
          ElMessage({
            showClose: true,
            message: '您尚未登录',
            type: 'error'
          })
        }else if(res.status==="2") {
          ElMessage({
            showClose: true,
            message: '没有空房',
            type: 'error'
          })
        }else{
          ElMessage({
            showClose: true,
            message: '请检查网络',
            type: 'error'
          })
        }
      }).catch(err => {
        ElMessage({
          showClose: true,
          message: '系统出错',
          type: 'error'
        })
        console.log(err)
      })
      this.loading = false
    },
    check(row){
      // 入住日期是当天才能进行下一步
      var dd = new Date();
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      var hDate = y + "-" + m + "-" + d;
      if(hDate != this.orderList[row].checkInDate){
        ElNotification({
          title: '错误',
          type: 'warning',
          message: h('i', { style: 'color: teal' }, '必须按照预定记录的入住日期办理手续'),
        })
        return;
      }
      this.orderID = this.orderList[row].orderID
      this.orderID2 = this.orderList[row].orderID
      this.roomType = this.orderList[row].roomType
      this.checkInDate = this.orderList[row].checkInDate
      this.checkOutDate = this.orderList[row].checkOutDate
      this.getRoomNo()
      this.active = 1
    },
    change(){
      // 只在第一步的搜索结果中搜索
      for(let item of this.orderList){
        if(item.orderID == this.orderID){
          var dd = new Date();
          var y = dd.getFullYear();
          var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
          var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
          var hDate = y + "-" + m + "-" + d;
          if(hDate != item.checkInDate){
            this.orderID = this.orderID2;
            ElNotification({
              title: '错误',
              type: 'warning',
              message: h('i', { style: 'color: teal' }, '必须按照预定记录的入住日期办理手续'),
            })
            return;
          }
          this.checkInDate = item.checkInDate;
          this.checkOutDate = item.checkOutDate;
          this.roomType = item.roomType
          this.orderID2 = this.orderID
          this.getRoomNo()
          return
        }
      }
      this.orderID = this.orderID2;
      ElNotification({
        title: '错误',
        type: 'warning',
        message: h('i', { style: 'color: teal' }, '在第一步的搜索记录中不存在此订单号'),
      })
    },
    getRoomNo(){
      // 发送网络请求获取该房型的可用房间
      axios({
        method:'get',
        url:'/hotel/availableRoomNo',
        params:{
          'startDate':this.checkInDate,
          'endDate':this.checkOutDate,
          'roomType':this.roomType,
        }
      }).then(res => {
        if(res.status==="1"){
          this.roomNoList = res.roomNoList
        }else if(res.status==="0") {
          ElMessage({
            showClose: true,
            message: '您尚未登录',
            type: 'error'
          })
        }else if(res.status==="2") {
          ElMessage({
            showClose: true,
            message: '服务端获取信息失败',
            type: 'error'
          })
        }else{
          ElMessage({
            showClose: true,
            message: '请检查网络',
            type: 'error'
          })
        }
      }).catch(err => {
        ElMessage({
          showClose: true,
          message: '系统出错',
          type: 'error'
        })
        console.log(err)
      })
    },
    nnext(){
      if(! this.finalRoom){
        ElNotification({
          title: '错误',
          type: 'warning',
          message: h('i', { style: 'color: teal' }, '请选择房间号'),
        })
        return
      }
      this.active = 2
    },
    cancel(){
      this.active = 0;
      this.customerName = "";
      this.phone = "";
      this.idcard = "";
      this.orderID = "";
      this.orderID2 = "";
      this.roomType = "";
      this.checkInDate = "";
      this.checkOutDate = "";
      this.roomNoList = [];
      this.finalRoom = "";
      this.customerName1 = "";
      this.customerName2 = "";
      this.idcard1 = "";
      this.idcard2 = ""
    },
    checkIn(){
      if(!(this.customerName1 && this.idcard1)){
        ElNotification({
          title: '错误',
          type: 'warning',
          message: h('i', { style: 'color: teal' }, '入住信息填写不完整'),
        })
        return
      }
      axios({
        method:'get',
        url:'/hotel/checkIn',
        params:{
          'orderID':this.orderID,
          'roomNo':this.finalRoom,
          'customerName1':this.customerName1,
          'customerName2':this.customerName2,
          'idcard1':this.idcard1,
          'idcard2':this.idcard2
        }
      }).then(res => {
        if(res.status==='1'){
          ElMessage({
            showClose: true,
            message: '入住成功',
            type: 'success'
          })
          this.cancel()
        }else if(res.status==="0") {
          ElMessage({
            showClose: true,
            message: '您尚未登录',
            type: 'error'
          })
        }else if(res.status==="2") {
          ElMessage({
            showClose: true,
            message: '操作失败',
            type: 'error'
          })
          ElMessageBox.alert(res.reason, '操作失败', {
            confirmButtonText: '确认'
          })
        }else{
          ElMessage({
            showClose: true,
            message: '请检查网络',
            type: 'error'
          })
        }
      }).catch(err => {
        ElMessage({
          showClose: true,
          message: '系统出错',
          type: 'error'
        })
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

.box{
  position: fixed;
  height: calc(100vh - 150px);
  width: 350px;
  background-color: aliceblue;
  top:0;
  left:0;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: 80px;
}

.el-steps{
  margin-top: 30px;
  margin-left: 35px;
}

h3{
  margin-left: 35px;
}

.one{
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 20px auto;
}

.item{
  height: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.title{
  width: 100px;
}

.content{
  margin-left: 350px;
}

.el-select{
  margin-left: 9px;
}
</style>