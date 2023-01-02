<template>
  <div>
    <!-- 占位专用 -->
    <div class="homelayout"></div>
    <div class="Head">
      <div class="logo">
        <el-image style="width: 50px; height: 70px"  :src="require('../assets/Wlogo2.png')"  :fit="'cover'"  class="icon"></el-image>
      </div>
      <div class="name">
        <div class="logoinfo">鹿&nbsp;&nbsp;&nbsp;兮</div>
        <div class="w2">后台管理系统</div>
      </div>
      <el-divider direction="vertical" />
      <div class="logotitle w08 nav"><router-link :to="'/hotel/basicInfoManage'">酒店基本信息管理</router-link></div>
      <div class="logotitle w08 nav"><router-link :to="'/hotel/checkIn'">预定订单查看&入住手续办理</router-link></div>
      <div class="logotitle w08 nav"><router-link :to="'/hotel/checkOut'">房间占用情况查看&退房手续办理</router-link></div>
      <div class="logotitle w08 nav"><router-link :to="'/hotel/commentManage'">酒店评论</router-link></div>
      <div class="btn">
        <!-- 显示酒店bar的所有页面均需要登录, 因此不用登录按钮 -->
        <!-- <div class="logotitle w1" v-if="this.$store.state.type!='hotel'">
          <el-button color="rgb(86,120,168)" title="加盟商登录" class="btnhead" plain round :icon="Avatar" @click="goLoginH">加盟商服务平台</el-button>
        </div> -->
        <!-- 已登录 -->
        <div class="text" v-if="this.$store.state.type=='hotel'">分店名：{{this.$store.state.hotelName}}</div>
        <div class="text2" v-if= "this.$store.state.type=='hotel'" @click="logout">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Avatar } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
export default{
  data(){
    return{
      // name: this.$store.state.nickName,
      // h_name: this.$store.state.hotelName,
      // type: this.$store.state.type,
      Avatar
    }
  },
  methods:{
    logout(){
      this.$store.commit("logout")
      ElMessage({
        showClose: true,
        message: '您已退出登录',
        type: 'success'
      })
      if(this.$route.path.substring(0,7)=="/hotel/"){
        this.$router.push("/login_h")  // 不能停留在需要登录的页面，返回登录页
      }
    },
    goLoginH(){
      this.$store.state.lastPage = this.$route.path
      this.$router.push("/login_h")
    }
  }
}
</script>

<style scoped>
/*头部logo */
.Head{
  background-color:white;
  height: 80px;
  display: flex;
  align-items: center;
  width: 100%;
  position: absolute;
  top:0;
  z-index: 5;
}

.logo{
  margin-left: 20px;
}

/*头部logo文字 */
.logoinfo{
  font-size: 20px;
  font-weight: bold;
  color: rgb(101,28,77);
  font-family: 'STFangsong';
}

.w2{
  margin: 0;
  padding: 0;
  font-size: xx-small;
  font-weight: bold;
  color: rgb(101,28,77);
  font-family:"Times New Roman";
}

.w1{
  width: 100px;
}

.w08{
  margin: 30px;
}

.logotitle{
  font-size: 15px;
  font-weight: bold;
}

/*取消下划线 */
a {
  text-decoration: none;
  color: rgb(86,120,168);
}
 
.router-link-active {
  text-decoration: none;
  color: rgb(82,155,250);
}

/*右侧按钮区域*/
.btnhead{
  min-width: 80px;
  min-height: 25px;
  font-size: 15px;
  font-weight: bold;
}

.el-divider{
  font-size: 60px;
  font-weight: bold;
  color: rgb(82,155,250);
  line-height: 80px;
  margin-left: 30px;
}

.name{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.btn{
  display: flex;
  position: absolute;
  right: 50px;
  align-items: center;
}

.homelayout{
  height: 80px;
}

.text{
  margin: 10px;
  font-size: 13px;
  font-weight: bold;
  color: rgb(82,155,250);
}

.text2{
  margin: 20px;
  font-size: 13px;
  font-weight: bold;
  color: rgb(82,155,250);
  cursor: pointer;
  text-decoration:underline
}

</style>