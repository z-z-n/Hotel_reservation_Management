<template>
  <topbar></topbar>
  <div class="general">
    <div class="up">个人中心</div>
    <div class="center">我的订单</div>
    <img src="../../assets/Wlogo.png" />
  </div>
  <div v-if="orderList.length == 0" style="margin-top:200px; margin-left:600px">您还没有历史订单哦~</div>
  <div class="lst">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in orderList"
        :key="item.orderID"
        color="rgb(101,28,77)"
        :timestamp="item.orderDate"
        placement="top"
      >
        <el-card>
          <div class="other">
            <h4>{{ item.orderDate }} 预定的订单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单状态：{{item.condition}}</h4>
            <el-button v-if="item.condition=='未入住'" color="rgb(101,28,77)" plain  class="btnhead" @click="cancel(index)" id="aa">取消订单</el-button>
            <el-button v-else-if="item.condition=='已完成' && item.comment==''" color="rgb(101,28,77)" plain  class="btnhead" id="bb" @click="write(index)">填写评论</el-button>
          </div>
          <el-divider></el-divider>
          <div class="info">
            <div class="itm">
              <el-icon><Document /></el-icon><div>订单号：{{item.orderID}}</div>
            </div>
            <div class="itm">
              <el-icon><Money /></el-icon><div>订单金额：{{item.payment}}</div>
            </div>
            <div class="itm">
              <el-icon><LocationInformation /></el-icon><div>酒店：{{item.hotelName}}</div>  
            </div>
            <div class="itm">
              <el-icon><House /></el-icon><div>房间类型：{{item.roomType}}</div> 
            </div>
            <div class="itm">
              <el-icon><Files /></el-icon><div>预定间数：{{item.count}}</div> 
            </div>
            <div class="itm" v-if="item.checkInDate">
              <el-icon><Calendar /></el-icon><div>入住日期：{{item.checkInDate}}</div> 
            </div>
            <div class="itm" v-if="item.checkOutDate">
              <el-icon><Calendar /></el-icon><div>退房日期：{{item.checkOutDate}}</div> 
            </div>
            <div class="itm" v-if="item.chargeBackDate">
              <el-icon><Calendar /></el-icon><div>取消订单日期：{{item.chargeBackDate}}</div> 
            </div>
          </div>
          <div class="com" v-if="item.comment">
            <el-icon><ChatDotSquare /></el-icon><div>我的评论：</div> 
          </div> 
          <div class="down" v-if="item.comment">{{item.comment}}</div>
          <div v-if="item.reply" class="spn">酒店回复：{{item.reply}}</div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  <el-drawer
    v-model="drawer"
    title="填写评论"
    direction="rtl"
  >
    <el-input
      v-model="text"
      :autosize="{ minRows: 15, maxRows: 20 }"
      type="textarea"
      placeholder="请输入订单评价……"
    />
    <el-button color="rgb(101,28,77)" plain style="margin-top:30px;margin-left:165px"  @click="submit" id="cc">提交评论</el-button>
  </el-drawer>
  </div>
</template>

<script>
import axios from "../../network/axios"
import { ElMessage } from 'element-plus'
import topbar from '@/components/topbar.vue'
import {LocationInformation,Document,Money,House,Files,Calendar,ChatDotSquare} from '@element-plus/icons-vue'
export default {
  data(){
    return{
      orderList:[
        {orderID:"154",payment:"1399元",orderDate:"2022-05-26",roomType:"商务套房",count:"1",checkInDate:"",checkOutDate:"",hotelName:"鹿兮酒店新街口店",chargeBackDate:"",comment:"",reply:"",condition:"未入住"},
        {orderID:"152",payment:"598元",orderDate:"2022-05-25",roomType:"双床房",count:"2",checkInDate:"2022-05-26",checkOutDate:"",hotelName:"鹿兮酒店东大店",chargeBackDate:"",comment:"",reply:"",condition:"正在入住"},
        {orderID:"146",payment:"184元",orderDate:"2022-05-12",roomType:"大床房",count:"1",checkInDate:"",checkOutDate:"",hotelName:"鹿兮酒店兴隆大街店",chargeBackDate:"2022-05-20",comment:"",reply:"",condition:"已取消"},
        {orderID:"144",payment:"399元",orderDate:"2022-05-07",roomType:"高级双床房",count:"1",checkInDate:"2022-05-10",checkOutDate:"2022-05-11",hotelName:"鹿兮酒店奥体中心店",chargeBackDate:"",comment:"辣鸡",reply:"",condition:"已完成"},
        {orderID:"132",payment:"598元",orderDate:"2022-05-03",roomType:"双床房",count:"2",checkInDate:"2022-05-03",checkOutDate:"2022-05-05",hotelName:"鹿兮酒店兴隆大街店",chargeBackDate:"",comment:"",reply:"",condition:"已完成"},
        {orderID:"123",payment:"299元",orderDate:"2022-05-01",roomType:"双床房",count:"1",checkInDate:"2022-05-04",checkOutDate:"2022-05-07",hotelName:"鹿兮酒店兴隆大街店",chargeBackDate:"",comment:"还行吧哈哈哈哈哈哈哈哈哈哈哈哈哈\
        哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",reply:"感谢亲的支持",condition:"已完成"}     
      ],
      drawer:false,
      orderIndex:"",
      text:""     
    }
  },
  components:{
    topbar,LocationInformation,Document,Money,House,Files,Calendar,ChatDotSquare
  },
  methods:{
    cancel(index){
      document.getElementById("aa").blur()
      axios({
        method:'get',
        url:'/user/cancel',
        params:{
          orderID:this.orderList[index].orderID,
        }
      }).then(res => {
        if(res.status==="1"){
          ElMessage({
            showClose: true,
            message: '取消成功',
            type: 'success'
          })
          this.orderList[index].condition = "已取消"
          var dd = new Date();
          var y = dd.getFullYear();
          var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
          var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
          this.orderList[index].chargeBackDate = y + "-" + m + "-" + d;
        }else if(res.status==="0") {
          ElMessage({
            showClose: true,
            message: '您尚未登录',
            type: 'error'
          })
        }else if(res.status==="2") {
          ElMessage({
            showClose: true,
            message: "距离预定入住日期不足一天，不允许取消",
            type: 'error'
          })
        }else if(res.status==="3") {
          ElMessage({
            showClose: true,
            message: "订单已过期，不允许取消",
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
    write(i){
      document.getElementById("bb").blur()
      this.text = ""
      this.orderIndex = i
      this.drawer = true
    },
    submit(){
      document.getElementById("cc").blur()
      if(! this.text){
        ElMessage({
          showClose: true,
          message: '评论内容不能为空',
          type: 'error'
        })
        return
      }
      axios({
        method:'get',
        url:'/user/comment',
        params:{
          orderID:this.orderList[this.orderIndex].orderID,
          content:this.text
        }
      }).then(res => {
        if(res.status==="1"){
          ElMessage({
            showClose: true,
            message: '提交成功',
            type: 'success'
          })
          this.orderList[this.orderIndex].comment = this.text
          this.text = ""
          this.drawer = false
        }else if(res.status==="0") {
          ElMessage({
            showClose: true,
            message: '您尚未登录',
            type: 'error'
          })
        }else if(res.status==="2") {
          ElMessage({
            showClose: true,
            message: res.reason,
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
    }
  },
  mounted(){
    axios({
      method:'get',
      url:'/user/orderList',
    }).then(res => {
      if(res.status==="1"){
        // 后期看情况要不要根据时间进行排序
        this.orderList = res.orderList
      }else if(res.status==="0") {
        ElMessage({
          showClose: true,
          message: '您尚未登录',
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
  }
}
</script>

<style scoped>
.up{
  font-size: 32px;
  font-weight: bold;
  color: rgb(101,28,77);
  /* font-family: 'STFangsong'; */
  margin-top: 20px;
  margin-left: 55px;
}

.center{
  font-size: 23px;
  font-weight: bold;
  color: rgb(101,28,77);
  margin-left: 55px;
}

.general{
  position: absolute;
  width: 240px;
  height: 400px;
  /* background-color: aliceblue; */
  top:150px;
  border-right: 1px solid gray;
}

img{
  width: 150px;
  margin-left: 35px;
  /* margin: auto; */
  margin-top: 50px;
}

.lst{
  /* background-color: aliceblue; */
  margin-left: 300px;
  width: 800px;
  margin-top: 40px;
  margin-bottom: 40px;
}

h4{
  /* margin-top: 30px; */
  width: 400px;
}

.info{
  display: flex;
  width: 700px;
  /* height: 100px; */
  margin: auto;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.itm{
  width: 300px;
  margin: 20px;
  display: flex;
  align-items: center;
}

.com{
  width: 300px;
  margin: 20px;
  display: flex;
  align-items: center;
}

.el-icon{
  color: rgb(101,28,77);
  font-size: 20px;
  margin-right: 10px;
}

.other{
  display: flex;
  align-items: center;
}

.btnhead{
  margin-left: 200px;
}

.down{
  color: rgb(141,141,141);
  margin-right: 55px;
  margin-left: 53px;
  font-size: 14px;
  line-height: 28px;
}

.spn{
  font-size: 12px;
  color: gray;
  margin-left: 53px;
  margin-right: 55px;
}
</style>