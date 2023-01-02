<template>
  <div>
    <topbar></topbar>
    <!-- 模块1: 酒店轮播图+简介 -->
    <div class="one">
      <!-- <img :src="imgList[0]" class="onepic"/> -->
      <el-carousel height="380px" class="onepic" :interval="5000" v-if="imgList.length!=0">
        <el-carousel-item v-for="item in imgList" :key="item">
          <img :src="item" class="onepic"/>
        </el-carousel-item>
      </el-carousel>
      <img v-else src="../../assets/noPic.png" class="onepic">
      <div class="text">
        <div class="label">
          <img src="../../assets/Slogo.png" class="labelpic"/>
          <div class="labeltext">{{hotelName}}</div>
        </div>
        <div class="content">{{profile}}</div>
      </div>
    </div>
    <!-- 模块2: 白色色块 -->
    <div class="two">
      <div class="title">酒店房型</div>
      <div class="btnArea">
        <div v-for="item in roomList" :key="item" :class="{'btn':room == item, 'nobtn':room != item}" @click="getRoom(item)">{{item}}</div>
      </div>
    </div>     
    <!-- 模块3: 黑色色块 -->
    <div class="three">
      <div class="info">
        <div class="l1">
          <div class="infoPart">
            <div class="i1">房型</div>
            <div class="i2">{{room}}</div>
          </div>
          <div class="infoPart">
            <div class="i1">价格/晚</div>
            <div class="i2">{{price}}</div>
          </div>
          <div class="infoPart">
            <div class="i1">可用房间数量</div>
            <div class="i2">{{number}}间</div>
          </div>        
        </div>
        <div class="l1">
          <div class="infoPart">
            <div class="i1">wifi</div>
            <div class="i2">{{isWifi}}</div>
          </div>
          <div class="infoPart">
            <div class="i1">房间是否有窗</div>
            <div class="i2">{{isWindow}}</div>
          </div>
          <div class="infoPart">
            <div class="i1">是否包含早餐</div>
            <div class="i2">{{isBreakfast}}</div>
          </div>
        </div>
      </div>
      <el-divider direction="vertical" />
      <div class="book">
        <div class="l1">
          <div class="infoPart2">
            <div class="i1">入住日期</div>
            <!-- <div class="i2"></div> -->
            <el-date-picker v-model="startDate" type="date" value-format="YYYY-MM-DD" placeholder="预计入住日期" style="width:130px"/>
          </div>
          <div class="infoPart2">
            <div class="i1">离开日期</div>
            <el-date-picker v-model="endDate" type="date" value-format="YYYY-MM-DD" placeholder="预计退房日期" style="width:130px"/>
            <!-- <div class="i2">{{endDate}}</div> -->
          </div>
          <div class="infoPart2">
            <div class="i1">预定间数</div>
            <el-input-number v-model="num" :min="1" style="width:130px" />
          </div>
        </div>
        <el-button color="gray" title="预定" plain @click="gobook">即刻预定</el-button>  
      </div>
    </div>
    <!-- 模块4: 房间轮播图 -->
    <div class="four">
      <el-carousel height="450px" class="fourpic" :interval="5000" v-if="roomImgList.length != 0">
        <el-carousel-item v-for="item in roomImgList" :key="item">
          <img :src="item" class="fourpic"/>
        </el-carousel-item>
      </el-carousel> 
      <img v-else src="../../assets/noPic.png" class="fourpic">
    </div>
    <!-- 模块5 黑色色块 -->
    <div class="five">
      <div class="title">酒店信息</div>
      <div class="plainArea">
        <div class="plain">所在地：{{province}}{{city}}</div>
        <div class="plain">详细地址：{{location}}</div>
        <div class="plain">酒店拥有会议室、停车场</div>
      </div>
    </div>
    <!-- 模块6 顾客评论 -->
    <div class="six">
      <div class="title aa">顾客评论</div>
      <div class="comment" v-for="item in comment" :key="item.nickName">
        <span>用户昵称:{{item.nickName}}&nbsp;&nbsp;入住时间:{{item.date}}&nbsp;&nbsp;入住房型:{{item.roomType}}</span>
        <p>{{item.content}}</p>
        <span v-if="item.reply" class="bo">酒店回复:{{item.reply}}</span>
        <el-divider />
      </div>
      <div v-if="comment.length == 0" style="margin:30px">(暂无评论)</div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="30%"
    >
      <el-result
        icon="success"
        title="预定成功"
        :sub-title="textt"
      >
      </el-result>
    </el-dialog>
  </div>
</template>

<script>
import topbar from '@/components/topbar.vue'
import axios from "../../network/axios"
import { ElMessage} from 'element-plus'
export default {
  components: { topbar },
  data(){
    return{
      textt:"",
      dialogVisible:false,
      value1:"",
      hid:this.$route.query.hid,
      room:this.$route.query.room,
      startDate:this.$route.query.startDate,
      endDate:this.$route.query.endDate,
      // 前端测试数据，网络请求正常返回后可被覆盖
      // 酒店信息
      hotelName:"鹿兮酒店百家湖店",
      province:"江苏",
      city:"南京",
      profile:"本店全新开业，环境良好，硬件设施完备。地理位置优越，举例地铁1号线百家湖站步行5分钟可达。鹿兮酒店百家湖店，为您提供优质服务。\
      本店全新开业，环境良好，硬件设施完备。地理位置优越，举例地铁1号线百家湖站步行5分钟可达。鹿兮酒店百家湖店，为您提供优质服务。\
      本店全新开业，环境良好，硬件设施完备。地理位置优越，举例地铁1号线百家湖站步行5分钟可达。鹿兮酒店百家湖店，为您提供优质服务。\
      本店全新开业，环境良好，硬件设施完备。地理位置优越，举例地铁1号线百家湖站步行5分钟可达。鹿兮酒店百家湖店，为您提供优质服务。",
      longtitude:0, // 经纬度数据暂不使用
      latitude:0,
      location:"江苏省南京市江宁区双龙大道1000号",
      comment:[
        {"nickName":"小明","date":"2022-06-01","roomType":"双床房","content":"很不错。下次还选这家","reply":"感谢亲的支持~"},
        {"nickName":"小红","date":"2022-06-01","roomType":"双床房","content":"啊啊啊","reply":"暂无"},
        {"nickName":"小兰","date":"2022-06-03","roomType":"大床房","content":"不太行","reply":"抱歉"}
      ],
      roomList:["大床房","双床房","高级大床房","高级双床房","商务套房"],
      imgList:[], // 问题: 一张图片都没有怎么办?

      // 房间信息
      number:"10",
      price:"299",
      isBreakfast:"含有早餐",
      isWifi:"免费wifi",
      isWindow:"有窗",
      isHairDrier:"有电吹风",
      roomImgList:["http://n.sinaimg.cn/sinakd202149s/200/w1080h720/20210409/9f0d-knqqqmu1426620.jpg",
      "http://admin.weikeniu.com/img/39519/20141011103355_6508.jpg",
      "http://www.shby.cn/news_file/2019041213581180.jpg"],

      // 预定间数
      num:""
    }
  },
  methods:{
    getRoom(r){
      // 发送网络请求，并修改this.room的值
      this.room = r
      axios({
        method:'get',
        url:'/getRoomInfo',
        params:{
          "hotelID":this.hid,
          "roomType":this.room,
          "startDate":this.startDate,
          "endDate":this.endDate
        }
      }).then(res => {
        if(res.status === "1"){
          this.number = res.number;
          this.price = res.price;
          this.isBreakfast = res.isBreakfast;
          this.isWifi = res.isWifi;
          this.isWindow = res.isWindow;
          this.isHairDrier = res.isHairDrier;
          this.roomImgList = res.imgList
        }else if (res.status === "0") {
          ElMessage({
            showClose: true,
            message: '该房型不存在',
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
    getNextDate(date, day) { 
      var dd = new Date(date);
      dd.setDate(dd.getDate() + day);
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return y + "-" + m + "-" + d;
    },
    gobook(){
      // 校验日期合法性
      var d1 = new Date(this.startDate);
      var d2 = new Date(this.endDate);
      var d3 = new Date()
      d3.setDate(d3.getDate() -1);
      if(d1 >= d2){
        window.alert("离开日期必须在入住日期后");
        return;
      }
      if(d3 > d1){
        window.alert("入住日期不能在今天及之前");
        return;
      }
      // 确认是否登录
      if(this.$store.state.type !='user'){
        window.alert("请先登录")

        // 记录query参数

        let temp = JSON.stringify(this.$route.query)
        let temp2 = this.$route.path + "?" + temp.replace(/\"/g, "").replace(/:/g, "=").replace(/,/g, "&").replace(/{/g, "").replace(/}/g, "")
        this.$store.state.lastPage = temp2
        this.$router.push("/login")
        return
      }
      // 预定操作
      axios({
        method:'get',
        url:'/user/bookRoom',
        params:{
          'hotelID':this.hid,
          'roomType':this.room,
          'checkInDate':this.startDate,
          'checkOutDate':this.endDate,
          'bookNum':this.num
        }
      }).then(res => {
        if(res.status==="2"){
          ElMessage({
            showClose: true,
            message: '预定成功',
            type: 'success'
          })
          this.textt = "您已预定成功。订单号为:"+res.orderID
          this.dialogVisible = true
        }else if(res.status==="0"){
          ElMessage({
            showClose: true,
            message: '您尚未登录',
            type: 'error'
          })
          window.alert("请先登录")
          this.$router.push("/login")
        }else if(res.status==="1"){
          ElMessage({
            showClose: true,
            message: '房间数量不足',
            type: 'error'
          })
          window.alert("此酒店房间已经全部被定完了呢~要不再看看其他酒店房间？")
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
    // 使用此函数，该页面一打开就立刻发送请求获取后端数据
    // 先看url中是否携带以下信息,若没有采用默认值
    this.room = this.room ? this.room : this.roomList[0]
    if(!this.startDate){
      var dd = new Date();
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      this.startDate = y + "-" + m + "-" + d; // 默认日期为当前日期
    }
    if(!this.endDate){
      this.endDate = this.getNextDate(this.startDate,1) // 默认结束日期为开始日期后一天
    }
    // console.log(this.startDate+" "+this.endDate)
    // 发送网络请求
    axios({
      method:'get',
      url:'/getHotelInfo',
      params:{
        'hotelID':this.hid
      }
    }).then(res => {
      if(res.hotelName){
        this.hotelName = res.hotelName;
        this.province = res.province;
        this.city = res.city;
        this.profile = res.profile;
        this.longtitude = res.longtitude;
        this.latitude = res.latitude;
        this.location = res.location;
        this.roomList = res.roomList;
        this.comment = res.comment;
        this.imgList = res.imgList

        this.getRoom(this.room)
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
    // console.log(this.room)
  }
}
</script>

<style scoped>
.one{
  display: flex;
  background-color: rgb(244, 244, 244);
  height: 380px;
  width: 100%;
}

.onepic{
  height: 380px;
  width: 650px;
}

.text{
  height: 340px;
  width: calc(100% - 650px);
  margin: 20px 70px 20px;
  /* background-color: aliceblue; */
  display: flex;
  flex-direction: column;
}

.label{
  display: flex;
  align-items: center;
  height: 100px;
  /* background-color: aliceblue; */
}

.labelpic{
  height: 100px;
  width: 100px;
  border-radius: 50px;
  border: 2px solid rgb(101,28,77);
}

.labeltext{
  font-size: 30px;
  font-weight: bold;
  color: rgb(101,28,77);
  margin-left: 20px;
  /* font-family: 'STFangsong'; */
}

.content{
  margin-top: 30px;
  max-width: 500px;
  color:gray;
  font-size: 14px;
  max-height: 210px;
  overflow: hidden;
}

.two{
  display: flex;
  height: 500px;
  width: 100%;
  /* background-color: aliceblue; */
  flex-direction: column;
  align-items: center;
}

.title{
  font-size: 25px;
  margin-top: 80px;
}

.btnArea{
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}

.btn{
  width: 100px;
  padding: 10px;
  margin: 5px;
  background-color:rgb(57, 46, 44);
  text-align: center;
  border-radius: 25px;
  color: white;
}

.nobtn{
  width: 100px;
  padding: 10px;
  margin: 5px;
  background-color: rgb(235, 235, 235);
  text-align: center;
  border-radius: 25px;
  color: gray;
  cursor: pointer;
}

.three{
  width: 100%;
  height: 500px;
  background-color:rgb(57, 46, 44);
  display: flex;
  align-items: center;
  justify-content: center;
}

.four{
  position: absolute;
  top:700px;
  width: 800px;
  height: 450px;
  left: 50%;
  margin-left: -400px;
}

.fourpic{
  height: 450px;
  width: 800px;
  margin: auto;
}

.info{
  margin-top: 200px;
  /* background-color: aliceblue; */
  height: 200px;
  width: 400px;
}

.book{
  margin-top: 200px;
  /* background-color: aliceblue; */
  height: 200px;
  width: 500px;
}

.el-divider{
  margin-top: 200px;
  /* background-color: aliceblue; */
  height: 200px;
  color: white;
}

.l1{
  display: flex;
}

.i1{
  color: gray;
  font-size: 12px;
}

.i2{
  color: white;
  /* font-size: 14px; */
}

.infoPart{
  width: 110px;
  margin: 20px 10px;
}

.infoPart2{
  width: 130px;
  margin: 20px 10px;
}

.el-button{
  height: 40px;
  width: 200px;
  margin-top: 10px;
  margin-left: 127px;
}

.five{
  display: flex;
  width: 100%;
  height: 400px;
  background-color: rgb(244, 244, 244);
  flex-direction: column;
  align-items: center;
}

.plainArea{
  display: flex;
  margin: 40px;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.plain{
  background-color: white;
  width: 250px;
  height: 100px;
  margin: 10px;
  border-radius: 10px;
  font-size: 18px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.six{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.aa{
  margin-bottom: 40px;
}

.comment{
  display: flex;
  width: 100%;
  max-width: 1024px;
  /* background-color: aliceblue; */
  margin-bottom: 20px;
  flex-direction: column;
}

.el-divider--horizontal{
  margin: 0;
  padding: 0;
  height: 0;
}

span{
  color: gray;
  font-size: 12px;
  /* margin-bottom: 5px; */
}

.bo{
  margin-bottom: 5px;
}
</style>