<template>
  <topbar_h></topbar_h>
  <div>
    <div class="box">
      <div class="one">
        <h3>房间占用情况查看&退房:</h3>
        <div class="item">
          <div class="title">搜索房号:</div>
          <el-input
            v-model="roomNo"
            placeholder="根据房号快速搜索"
            style="width:200px;height:30px"
            @input="is = true"
          >
            <template #append>
              <el-button :icon="Search" @click="search"/>
            </template>
          </el-input>
        </div>
        <div class="item">
          <div class="title">订单号:</div>
          <el-input v-model="orderID" disabled placeholder="对应订单号" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">宾客姓名1:</div>
          <el-input v-model="customerName1" disabled placeholder="入住人姓名1" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">身份证号1:</div>
          <el-input v-model="idcard1" disabled placeholder="入住人身份证号1" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">宾客姓名2:</div>
          <el-input v-model="customerName2" disabled placeholder="入住人姓名2" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">身份证号2:</div>
          <el-input v-model="idcard2" disabled placeholder="入住人身份证号2" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">入住日期:</div>
          <el-date-picker v-model="checkInDate" disabled type="date" value-format="YYYY-MM-DD" placeholder="入住日期" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <div class="title">离开日期:</div>
          <el-date-picker v-model="checkOutDate" disabled type="date" value-format="YYYY-MM-DD" placeholder="预计退房日期" style="width:200px;height:30px"/>
        </div>
        <div class="item">
          <el-button type="primary" style="width:70%;margin-left:15%" @click="checkOut" :disabled="is">退房</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div v-for="(item,index) in roomList" :key="item.roomNo" @click="detail(index);handle($event)">
        <el-button type="warning" v-if="item.isOccupied=='1'" plain class="hh">{{item.roomNo}}</el-button>
        <el-button type="info" v-else plain class="hh">{{item.roomNo}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../network/axios"
import { ElMessage,ElNotification,ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import topbar_h from '@/components/topbar_h.vue'
import { h } from 'vue'
export default {
  components: { topbar_h },
  data(){
    return{
      roomList:[
        {roomNo:"809",isOccupied:"0"},
        {roomNo:"810",isOccupied:"1",orderID:"123",customerName1:"小明",customerName2:"小红",idcard1:"330702222222220000",idcard2:"33070311111111999X",checkInDate:"2022-05-24",checkOutDate:"2022-06-01"},
        {roomNo:"814",isOccupied:"1",orderID:"124",customerName1:"小兰",customerName2:"张三",idcard1:"330702222112220000",idcard2:"33070312211111999X",checkInDate:"2022-05-25",checkOutDate:"2022-06-01"},
        {roomNo:"817",isOccupied:"1",orderID:"127",customerName1:"李四",customerName2:"",idcard1:"330702222112220000",idcard2:"",checkInDate:"2022-05-26",checkOutDate:"2022-06-01"},
        {roomNo:"829",isOccupied:"0"},
        {roomNo:"8129",isOccupied:"0"},
        {roomNo:"8229",isOccupied:"0"},
        {roomNo:"8239",isOccupied:"0"},
        {roomNo:"8249",isOccupied:"0"},
        {roomNo:"8529",isOccupied:"0"}
      ],
      Search,
      roomNo:"",
      customerName1:"",
      customerName2:"",
      idcard1:"",
      idcard2:"",
      checkInDate:"",
      checkOutDate:"",
      orderID:"",
      is:true
    }
  },
  methods:{
    checkOut(){
      axios({
        method:'get',
        url:'/hotel/checkOut',
        params:{
          roomNo:this.roomNo
        }
      }).then(res => {
        if(res.status==="1"){
          // this.roomList = res.roomList
          ElMessage({
            showClose: true,
            message: '退房成功',
            type: 'success'
          })
          this.fresh()
          this.customerName1 = ""
          this.customerName2 = ""
          this.idcard1 = ""
          this.idcard2 = ""
          this.checkInDate = ""
          this.checkOutDate = ""
          this.orderID = ""
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
          ElNotification({
            title: '退房失败',
            type: 'warning',
            message: h('i', { style: 'color: teal' }, res.reason)
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
    search(){
      for(let item of this.roomList){
        if(this.roomNo == item.roomNo){
          if(item.isOccupied=="1"){
            this.customerName1 = item.customerName1
            this.customerName2 = item.customerName2
            this.idcard1 = item.idcard1
            this.idcard2 = item.idcard2
            this.checkInDate = item.checkInDate
            this.checkOutDate = item.checkOutDate
            this.orderID = item.orderID
            this.is = false
          }else{
            this.customerName1 = ""
            this.customerName2 = ""
            this.idcard1 = ""
            this.idcard2 = ""
            this.checkInDate = ""
            this.checkOutDate = ""
            this.orderID = ""
            ElNotification({
              title: '错误',
              type: 'warning',
              message: h('i', { style: 'color: teal' }, '该房间尚未被占用，没有入住信息'),
            })
            this.is = true
          }
          return
        }
      }
      ElNotification({
        title: '错误',
        type: 'warning',
        message: h('i', { style: 'color: teal' }, '该房间号不存在！')
      })
      this.customerName1 = ""
      this.customerName2 = ""
      this.idcard1 = ""
      this.idcard2 = ""
      this.checkInDate = ""
      this.checkOutDate = ""
      this.orderID = ""
      this.is = true
    },
    fresh(){
      // 发送网络请求
      axios({
        method:'get',
        url:'/hotel/viewRoomState'
      }).then(res => {
        if(res.status==="1"){
          this.roomList = res.roomList
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
    detail(index){
      if(this.roomList[index].isOccupied=="0"){
        ElNotification({
          title: '错误',
          type: 'warning',
          message: h('i', { style: 'color: teal' }, '该房间尚未被占用，没有入住信息'),
        })
        return;
      }
      this.roomNo = this.roomList[index].roomNo
      this.customerName1 = this.roomList[index].customerName1
      this.customerName2 = this.roomList[index].customerName2
      this.idcard1 = this.roomList[index].idcard1
      this.idcard2 = this.roomList[index].idcard2
      this.checkInDate = this.roomList[index].checkInDate
      this.checkOutDate = this.roomList[index].checkOutDate
      this.orderID = this.roomList[index].orderID
      ElNotification({
        title: '提示',
        type: 'success',
        message: h('i', { style: 'color: teal' }, '该房间入住信息已展现在屏幕左侧'),
      })
      this.is = false
    },
    handle(e){
      let target = e.target
      target.blur()
    }
  },
  mounted(){
    this.fresh()
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

.content{
  margin-left: 350px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-right: 50px;
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

.hh{
  width: 100px;
  height: 40px;
  font-size: 16px;
  margin: 20px;
}
</style>