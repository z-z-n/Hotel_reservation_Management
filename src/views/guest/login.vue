<template>
  <el-container>
    <el-header class="Head">
      <div class="mbox header">
        <el-row class="rowheader">
          <el-col :span="6" :offset="6">
            <img class="bigLogo" src="../../assets/Hlogo.png" title="网站首页" @click="goHome"/>
          </el-col>
          <el-col :span="6">
            <div class="logotile">用户登录</div>
          </el-col>
        </el-row>  
      </div>
    </el-header>
    <el-main>
      <div class="login">
        <el-row class="rowlogin">
          <el-col :span="6" :offset="6">
            <el-image :src="require('../../assets/phone.png')" class="icon">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <h3>个人登录</h3>
              <hr>
              <div class="inputbox">
                <el-row :gutter="10">
                  <el-col :span="4" :offset="1"><span class="info">手机号</span></el-col>
                  <el-col :span="14"><el-input v-model="phone" type="text" class="w-50 m-2" size="large" maxlength="11" placeholder="请输入手机号" :prefix-icon="Avatar" @blur="fphonecheck">
                  </el-input></el-col>
                  <el-col :span="4"><span class="error" id="phonecheck"></span></el-col>
                </el-row>
              </div>
              <div class="inputbox">
                <el-row :gutter="10">
                  <el-col :span="4" :offset="1"><span class="info">密&nbsp;&nbsp;&nbsp;码</span></el-col>
                  <el-col :span="14"><el-input v-model="pwd" type="password" class="w-50 m-2" size="large" maxlength="20" placeholder="请输入密码" show-password :prefix-icon="Lock" @blur="fpwdcheck">
                  </el-input></el-col>
                  <el-col :span="4"><span class="error" id="pwdcheck"></span></el-col>
                </el-row>
              </div>
              <div class="inputbox">
                <el-row :gutter="10">
                  <el-col :offset="0.5"><el-button color="rgb(127,31,89)" @click="fbtnLogin">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button></el-col>
                </el-row>
              </div>
              <div class="inputbox">
                <el-row :gutter="10">
                  <el-col :offset="0.5"><router-link :to="'register'" title="注册">享更多特权，立即注册→</router-link><span></span></el-col>
                </el-row>
              </div>
          </el-card>
        </el-col>
      </el-row>  
    </div>
    </el-main>
  </el-container>
</template>

<script>
import { Avatar,Lock,CircleClose } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import axios from "../../network/axios"
export default{
  name: 'UserLoginView',  
  data(){
    return{
      Avatar, Lock, CircleClose,
      phone:"",
      pwd:""
    }
  },
  methods:{
    fphonecheck:function(){
      var reg = /^[\d]{11}$/;//正则表达式全为数字且11位
      if(!reg.test(this.phone)){
        document.getElementById("phonecheck").innerHTML= '×请检查';
      }
      else{
        document.getElementById("phonecheck").innerHTML= '';
      }
    },
    fpwdcheck:function(){
      var reg = /^[0-9a-zA-Z]{8,20}$/;//正则表达式数字和字母结合,8-20次
      if(!reg.test(this.pwd)){
        document.getElementById("pwdcheck").innerHTML= '×请检查';
      }
      else{
        document.getElementById("pwdcheck").innerHTML= '';
      }
    },
    fbtnLogin:function(){//点击登录按钮
      var reg1 = /^[\d]{11}$/;//正则表达式全为数字且11位
      var reg2 = /^[0-9a-zA-Z]{8,20}$/;//正则表达式数字和字母结合,8-20次
      if(!reg1.test(this.phone)){alert("请检查手机号");}
      else if(!reg2.test(this.pwd)){alert("请检查密码");}
      else{this.sendRequst();}
    },
    goHome(){
      this.$router.push("/")
    },
    sendRequst(){
      axios({
        method:'post',
        url:'/login',
        data:{
          'phone':this.phone,
          'pwd':this.pwd
        }
      }).then(res => {
        if(res.status === "1"){
          ElMessage({
            showClose: true,
            message: '登录成功',
            type: 'success'            
          })
          // 将重要信息存储进入vuex保存
          localStorage.setItem('Authorization', res.token)
          localStorage.setItem('nickName', res.nickName)
          localStorage.setItem('type', "user")
          this.$store.state.nickName = res.nickName
          this.$store.state.Authorization = res.token
          this.$store.state.type = "user" 
          if(this.$store.state.lastPage){
            this.$router.push(this.$store.state.lastPage)
          }else{
            this.$router.push("/")
          } 
        }else if (res.status === "0") {
          ElMessage({
            showClose: true,
            message: '登录失败',
            type: 'error'
          })
          window.alert("登录失败。"+ res.reason)
        }else{
          ElMessage({
            showClose: true,
            message: '登录失败，请检查网络',
            type: 'error'
          })
        } 
      }).catch(err => {
        ElMessage({
          showClose: true,
          message: '系统出错',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style scoped>
/*头部 */
.Head{
  background-color:rgb(245,240,242);
  height: 100px;
}
.mbox{
  height: 100px;
}

/*链接图片 */
.logo{
  display: block;
  /* 设置行内元素为块状元素才能设置宽高 */
  width: 70px;
  height: 100px;
  background-image: url("../../assets/Hlogo.png");
  position: relative;
  left: 200px;
}

.logotile{
  font-size: 20px;
  font-weight: bold;
  color: rgb(101,28,77);
  line-height: 100px;
}

h3{
  color: rgb(101,28,77);
  text-align: center;
}

/*卡片 */
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    width: 480px;
    /*居中显示 */
    margin:auto;
    border-top-color: rgb(101,28,77);
}

/*输入div信息*/
div[class="inputbox"]{
    height: 60px;
    text-align: center;
    /*border-bottom: 3px solid #000;*/
    line-height:60px;
}

span[class="info"]{
  line-height:60px;
  color: rgb(101,28,77);
  font-weight:bold;
}

span[class="error"]{
  line-height:60px;
  color:red;
}

.el-input {
  --el-input-focus-border-color:rgb(101,28,77);
}

/*按钮*/
.el-button{
   min-width: 252px;
   min-height: 40px;
   font-size: 15px;
  font-weight: bold;
}

/*取消下划线 */
a {
  text-decoration: none;
}
 
.router-link-active {
  text-decoration: none;
}

.bigLogo{
  cursor: pointer;
}

.login{
  margin-top: 70px;
}

</style>