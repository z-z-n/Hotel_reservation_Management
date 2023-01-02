<template>
  <div>
    <!-- 占位专用 -->
    <div class="homelayout"></div>
    <div class="Head">
      <div class="logo">
        <el-image style="width: 70px; height: 91px"  :src="require('../assets/Hlogo.png')"  :fit="'cover'"  class="icon"></el-image>
      </div>
      <div class="name">
        <div class="logoinfo">鹿兮酒店</div>
        <div class="w2">Luxi&nbsp;&nbsp;&nbsp;Hotel</div>
      </div>
      <el-divider direction="vertical" />
      <div class="logotitle w08 nav"><router-link :to="'/'" title="首页">首 页</router-link></div>
      <div class="logotitle w08 nav"><router-link :to="'/search'" title="搜索预定">搜索预定</router-link></div>
      <div class="logotitle w08 nav"><router-link :to="'/ads'" title="加盟入驻">加盟入驻</router-link></div>
      <div class="logotitle w08 nav"><router-link :to="'/login_h'" title="酒店管理">管理平台</router-link></div>
      <div class="btn">
        <div class="logotitle w1" v-if="this.$store.state.type==''"><el-button color="rgb(74,49,107)" plain title="登录" class="btnhead" @click="goLogin">登录</el-button></div>
        <div class="logotitle w1" v-if="this.$store.state.type==''"><el-button color="rgb(127,31,89)" title="注册" class="btnhead" @click="goRegister">注册</el-button></div>
        <!-- 已登录 -->
        <div class="text" v-if="this.$store.state.type=='user'">欢迎，{{this.$store.state.nickName}}</div>
        <div class="text" v-if="this.$store.state.type=='hotel'">分店名：{{this.$store.state.hotelName}}</div>
        <div class="text2" v-if="this.$store.state.type=='user'||this.$store.state.type=='hotel'" @click="logout">退出登录</div>
        <div class="logotitle w1" v-if="this.$store.state.type=='user'"><el-button color="rgb(86,120,168)" title="个人中心" class="btnhead person" round :icon="Avatar" @click="goPerson">个人</el-button></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Avatar } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
export default{
  name: 'HomeView',
  data(){
    return{
      // name: this.$store.state.nickName,
      // h_name: this.$store.state.hotelName,
      // type: this.$store.state.type,
      Avatar
    }
  },
  methods:{
    goPerson(){
      this.$router.push("/user/personalCenter")
    },
    logout(){
      this.$store.commit("logout")
      ElMessage({
        showClose: true,
        message: '您已退出登录',
        type: 'success'
      })
      if(this.$route.path.substring(0,6)=="/user/" || this.$route.path.substring(0,7)=="/hotel/"){
        this.$router.push("/")  // 不能停留在需要登录的页面，返回首页
      }
    },
    goLogin(){
      if(JSON.stringify(this.$route.query) != "{}"){
        let temp = JSON.stringify(this.$route.query)
        let temp2 = this.$route.path + "?" + temp.replace(/\"/g, "").replace(/:/g, "=").replace(/,/g, "&").replace(/{/g, "").replace(/}/g, "")
        this.$store.state.lastPage = temp2
      }
      else{
        this.$store.state.lastPage = this.$route.path
      }
      this.$router.push("/login")
    },
    goRegister(){
      this.$store.state.lastPage = this.$route.path
      this.$router.push("/register")
    }
  }
}
</script>

<style scoped>
/*头部 */
.Head{
  background-color:rgb(245,240,242);
  height: 100px;
  display: flex;
  align-items: center;
  width: 100%;
  position: absolute;
  top:0;
}

.mbox{
  height: 100px;
}

.logo{
  margin-left: 20px;
}

.logoinfo{
  font-size: 30px;
  font-weight: bold;
  color: rgb(101,28,77);
  /* line-height: 100px; */
  font-family: 'STFangsong';
}


.w1{
  width: 100px;
  /* line-height: 100px; */
  
}

.w08{
  margin: 10px;
}

.logotitle{
  font-size: 15px;
  font-weight: bold;
  /* line-height: 80px; */
}

/*取消下划线 */
a {
  text-decoration: none;
  color: rgb(86,120,168);
}
 
.router-link-active {
  text-decoration: none;
  color: rgb(101,28,77);
}

.btnhead{
  min-width: 80px;
  min-height: 25px;
  font-size: 15px;
  font-weight: bold;
}

.el-divider{
  font-size: 80px;
  font-weight: bold;
  color: rgb(101,28,77);
  line-height: 100px;
  margin-left: 30px;
}

.name{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.w2{
  margin: 0;
  padding: 0;
  font-size: 15px;
  font-weight: bold;
  color: rgb(101,28,77);
  font-family:"Times New Roman";
  /* font-family: 'STFangsong'; */
}

.btn{
  display: flex;
  /* text-align: right; */
  /* float: right; */
  position: absolute;
  right: 0;
  align-items: center;
}

.homelayout{
  height: 100px;
}

.text{
  margin: 10px;
  font-size: 13px;
  color: rgb(101,28,77);
}

.text2{
  margin: 20px;
  font-size: 13px;
  color: rgb(101,28,77);
  cursor: pointer;
  text-decoration:underline
}

</style>