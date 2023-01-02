<template>
  <div>
    <topbar></topbar>
    <el-backtop :right="100" :bottom="100" />
    <!-- 搜索部分 -->
    <div class="sarea">
      <div class="sa">
        <el-input v-model="city" placeholder="城市" style="width:130px;height:45px;margin:4px"/>
        <el-date-picker v-model="startDate" type="date" value-format="YYYY-MM-DD" placeholder="预计入住日期" style="width:130px;height:45px;margin:4px"/>
        <el-date-picker v-model="endDate" type="date" value-format="YYYY-MM-DD" placeholder="预计退房日期" style="width:130px;height:45px;margin:4px"/>
        <el-input v-model="hotelName" placeholder="酒店名等其他关键词" style="width:300px;height:45px;margin:4px"/>
        <el-button color="rgb(127,31,89)" @click="search">查询</el-button>
      </div>
      <div class="sb">
        <div class="sb1">
          <span style="margin-right:10px; font-size:14px">按价格区间筛选</span>
          <el-radio-group v-model="priceRange">
            <el-radio label="E" style="margin-left:10px">不限</el-radio>
            <el-radio label="A" style="margin-left:10px">150元以下</el-radio>
            <el-radio label="B" style="margin-left:10px">150-300元</el-radio>
            <el-radio label="C" style="margin-left:10px">300-450元</el-radio>
            <el-radio label="D" style="margin-left:10px">450元以上</el-radio>
          </el-radio-group>
        </div>
        <div class="sb2">
          <span style="margin-right:30px; font-size:14px">按房型筛选</span>
          <el-checkbox-group v-model="roomType2">
            <el-checkbox v-for="item in lst" :key="item" :label="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="container">
      <!-- 循环遍历单元 -->
      <div class="ttt" v-for="item in roomList" :key="item.roomType+item.hotelID">
        <div class="test"><div class="out">{{item.hotelName}}</div></div>
        <el-card :body-style="{ padding: '0px' }"  @click="goRoom(item.hotelID,item.roomType)">
          <div style="overflow: hidden;height: 260px;">
            <img v-if="item.imgUrl" :src="item.imgUrl" class="image"/>
            <img v-else src="../../assets/noPic.png" class="image"/>
          </div>
          <div class="bottom">
            <div class="left">{{item.hotelName}}-{{item.roomType}}</div>
            <el-divider direction="vertical"/>
            <div class="right">￥{{item.price}}</div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import topbar from '@/components/topbar.vue'
import axios from "../../network/axios"
import { ElMessage } from 'element-plus'
export default {
  data(){
    return{
      city:this.$route.query.city,
      startDate:"",
      endDate:"",
      roomType2:["双床房","大床房","高级双床房","高级大床房","商务套房"],
      priceRange:"E",
      hotelName:this.$route.query.content,
      lst:["双床房","大床房","高级双床房","高级大床房","商务套房"],
      // 酒店搜索结果
      roomList:[{"hotelName":"鹿兮酒店百家湖店","hotelID":"2","roomType":"大床房","price":"298",
      imgUrl:"https://wshantinghotels.huazhu.com/hworld/NewWeb/img/quanji_beijingtiantan.jpg"},
      {"hotelName":"鹿兮酒店东大店","hotelID":"1","roomType":"双床房","price":"298",
      "imgUrl":"https://wshantinghotels.huazhu.com/hworld/NewWeb/img/quanji_tianjin.jpg"},
      {"hotelName":"鹿兮酒店百家湖店","hotelID":"2","roomType":"双床房","price":"298",
      "imgUrl":"http://www.shby.cn/news_file/2019041213581180.jpg"},
      {"hotelName":"鹿兮酒店浮桥店","hotelID":"3","roomType":"高级双床房","price":"298",
      "imgUrl":"http://admin.weikeniu.com/img/39519/20141011103355_6508.jpg"},
      {"hotelName":"鹿兮酒店新街口店","hotelID":"4","roomType":"双床房","price":"298",
      "imgUrl":"http://admin.weikeniu.com/img/39519/20141011103355_6508.jpg"},
      {"hotelName":"鹿兮酒店兴隆大街店","hotelID":"5","roomType":"商务套房","price":"298",
      "imgUrl":"http://www.shby.cn/news_file/2019041213581180.jpg"},
      {"hotelName":"鹿兮酒店奥体中心店","hotelID":"6","roomType":"高级大床房","price":"298",
      "imgUrl":"http://admin.weikeniu.com/img/39519/20141011103355_6508.jpg"}]
    }
  },
  components:{
    topbar
  },
  methods:{
    search(){
      if(! this.city){
        window.alert("请填写入住城市");
        return;
      }
      // 校验日期合法性
      var d1 = new Date(this.startDate);
      var d2 = new Date(this.endDate);
      var d3 = new Date()
      d3.setDate(d3.getDate()-1);
      if(d1 >= d2){
        window.alert("离开日期必须在入住日期后");
        return;
      }
      if(!(d1 > d3)){
        window.alert("入住日期不能在今天及之前");
        return;
      }
      // if(substr(this.city.length -1,1) != "市"){
      //   this.city = this.city + "市"
      // }
      let temp = ""
      for (let i in this.roomType2){
        if(i != this.roomType2.length - 1){
          temp = temp + this.roomType2[i] + ","
        }
        else{
          temp = temp + this.roomType2[i]
        }
      }

      // 发送网络请求
      axios({
        method:'get',
        url:'/search',
        params:{
          'city':this.city,
          'startDate':this.startDate,
          'endDate':this.endDate,
          'roomType':temp,
          'priceRange':this.priceRange,
          'hotelName':this.hotelName
        }
      }).then(res => {
        if(res.roomList){
          this.roomList = res.roomList
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
    getNextDate(date, day) { 
      var dd = new Date(date);
      dd.setDate(dd.getDate() + day);
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return y + "-" + m + "-" + d;
    },
    goRoom(hid,rom){
      this.$router.push({path:"/room", query:{
        "room":rom,
        "startDate":this.startDate,
        "endDate":this.endDate,
        "hid":hid
      }})
    }
  },
  mounted(){
    if(this.city){
      // 如果可以从url获取城市名，说明是从首页进来的，立刻搜索一次
      var dd = new Date();
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      this.startDate = y + "-" + m + "-" + d; // 默认日期为当前日期
      this.endDate = this.getNextDate(this.startDate,1) // 默认结束日期为开始日期后一天
      // 发送网络请求
      this.search()
    }
  }
}
</script>

<style scoped>
.sarea{
  /* height: 150px; */
  width: 100%;
  background-color: rgb(245, 240, 242);
  position: sticky;
  top:0;
  z-index: 11;
}

.sa{
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-button{
  font-size: 17px;
  font-weight: bold;
  width: 120px;
  height: 44px;
  margin-left: 4px;
}

.sb{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70px;
}

.sb1{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

.sb2{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}

.image{
  width: 400px;
  height: 260px;
  transition: all 1s;
}

.image:hover{
  transform: scale(1.1);
  z-index: -1;
  padding-bottom: 0;
  height: 260px;
}

.el-card{
  width: 400px;
  height: 360px;
  cursor: pointer;
}

.out{
  font-size: 20px;
  color: white;
  padding: 5px 25px;
  background-color: rgba(61, 55, 54, 0.8);
  position: relative;
  top:240px;
  left: -4px;
  z-index: 3;
}

.bottom{
  padding: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  z-index: 4;
  /* background-color: aliceblue; */
}

.left{
  width: 280px;
  /* background-color: antiquewhite; */
  font-size: 20px;
}

.right{
  color: rgb(127,31,89);
  font-size: 28px;
}

.test{
  display: flex;
}

.el-divider{
  font-size: 72px;
}

.container{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 1270px;
  margin: 0 auto 20px;
}

.ttt{
  flex: 1;
  margin: 0 10px;
}

</style>