<template>
  <div class="registerview">
    <img class="bigLogo" src="../../assets/Slogo.png" title="网站首页" @click="goHome"/>
    <div class="Head">
      <el-divider direction="vertical" />
      <div class="mbox">
        <!-- <a href="http://localhost:8080/" title="首页" class="logo"></a> -->
        
        <div id="logotile">用户注册</div>
      </div>
    </div>
    <section class="form">
      <h2>用户注册</h2>
      <div class="infoitem">
        <span class="info"><i>*</i> 姓&nbsp;&nbsp;&nbsp;名</span>
        <div class="inputbox signUp_userName">
          <input type="text" placeholder=" 请填写身份证中的姓名" class="input1" maxlength="25" v-model="name" @blur="fnamecheck">
        </div>
        <span class="check" id="userNamecheck"></span>
      </div>
      <div class="infoitem">
        <span class="info"><i>*</i> 身份证号</span>
        <div class="inputbox signUp_useridcard">
          <input type="text" placeholder=" 请填写身份证号" class="input1" maxlength="18" v-model="idcard" @blur="fidcheck">
        </div>
        <span class="check" id="idcardcheck"></span>
      </div>
      <div class="infoitem">
        <span class="info"><i>*</i> 性&nbsp;&nbsp;&nbsp;别</span>
        <div class="inputbox gender">
          <input type="radio" name="gender" value="M" v-model="gender" checked/><span class="boy">男</span>
          <input type="radio" name="gender" value="F" v-model="gender" /><span class="girl">女</span>
        </div>
      </div>
      <div class="infoitem">
        <span class="info"><i>*</i> 手 机 号</span>
        <div class="inputbox signUp_userphone">
          <input type="text" placeholder=" 请填写手机号" class="input1" maxlength="18" v-model="phone" @blur="fphonecheck">
        </div>
        <span class="check" id="phonecheck"></span>
      </div>
      <div class="infoitem">
        <span class="info"><i>*</i> 昵&nbsp;&nbsp;&nbsp;称</span>
        <div class="inputbox signUp_nickname">
          <input type="text" placeholder=" 请填写账号使用的昵称" class="input1" maxlength="25" v-model="nickName" @blur="fnickcheck">
        </div>
        <span class="check" id="nicknamecheck"></span>
      </div>
      <div class="infoitem">
        <span class="info"><i>*</i> 密&nbsp;&nbsp;&nbsp;码</span>
        <div class="inputbox signUp_pwd">
          <input type="password" placeholder=" 请设置8-20位字母和数字组合" class="input1" maxlength="20" v-model="pwd" @blur="fpwdcheck">
        </div>
        <span class="check" id="pwdcheck"></span>
      </div>
      <div class="infoitem">
        <span class="info"><i>*</i> 确认密码</span>
        <div class="inputbox signUp_repwd">
          <input type="password" placeholder=" 请再次输入密码" class="input1" maxlength="20" v-model="repwd" @blur="frepwdcheck">
        </div>
        <span class="check" id="repwdcheck"></span>
      </div>
      <div class="infoitem">
        <span class="info"> </span>
        <div class="btnbox">
          <button @click="fbtnRegister" type="button" class="Cbtn register" style="cursor:pointer">注册</button>
        </div>
        <div class="note" @click="gotoLogin">已有帐号？ →立即登录</div>
      </div>
      <!-- <div class="infologin">
        <div class="alogin">
          <a href="http://localhost:8080/" title="登录" class="login">已有帐号？ →立即登录</a>
        </div>
      </div> -->
    </section>
    <img class="bg" src="../../assets/brand_quanji.jpg" />
    <img class="whiteDeer" src="../../assets/Wlogo.png" />
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import axios from "../../network/axios"
export default {
  name: 'RegisterView',
  data(){
    return{
      name:"",    //用户姓名
      idcard:"",  //身份证号
      gender:"M",  //性别
      phone:"",   //手机号
      nickName:"",//(用户昵称)
      pwd:"",     //密码
      repwd:""    //确认密码
    }
  },
  methods:{
    fnamecheck:function(){
      if(this.name==""){
        document.getElementById("userNamecheck").innerHTML= '×请输入您身份证中的姓名';
      }
      else{
        document.getElementById("userNamecheck").innerHTML= '';
      }
    },
    fidcheck:function(){
      var reg = /^[\d]{17}[\d|X]$/;//正则表达式数字和字母结合,18位身份证且数字（最后一位可是X)
      if(!reg.test(this.idcard)){
        document.getElementById("idcardcheck").innerHTML= '×请输入正确身份证号！';
      }
      else{
        document.getElementById("idcardcheck").innerHTML= '';
      }
    },
    fphonecheck:function(){
      var reg = /^[\d]{11}$/;//正则表达式全为数字且11位
      if(!reg.test(this.phone)){
        document.getElementById("phonecheck").innerHTML= '×请填写正确的手机号';
      }
      else{
        document.getElementById("phonecheck").innerHTML= '';
      }
    },
    fnickcheck:function(){
      if(this.nickName==""){
        document.getElementById("nicknamecheck").innerHTML= '×请填写账号昵称';
      }
      else{
        document.getElementById("nicknamecheck").innerHTML= '';
      }
    },
    fpwdcheck:function(){
      var reg = /^[0-9a-zA-Z]{8,20}$/;//正则表达式数字和字母结合,8-20次
      if(!reg.test(this.pwd)){
        document.getElementById("pwdcheck").innerHTML= '×请设置8-20位字母和数字的组合';
      }
      else{
        document.getElementById("pwdcheck").innerHTML= '';
      }
    },
    frepwdcheck:function(){
      if(this.repwd!=this.pwd){
        document.getElementById("repwdcheck").innerHTML= '×请输入相同的密码';
      }
      else{
        document.getElementById("repwdcheck").innerHTML= '';
      }
    },
    fbtnRegister:function(){//点击注册按钮
      var reg1 = /^[\d]{17}[\d|X]$/;//正则表达式数字和字母结合,18位身份证且数字（最后一位可是X)
      var reg2 = /^[\d]{11}$/;//正则表达式全为数字且11位
      var reg3 = /^[0-9a-zA-Z]{8,20}$/;//正则表达式数字和字母结合,8-20次
      if(this.name==""){alert("请检查姓名");}
      else if(!reg1.test(this.idcard)){alert("请检查身份证账号");}
      else if(!reg2.test(this.phone)){alert("请检查手机号");}
      else if(this.nickName==""){alert("请检查昵称");}
      else if(!reg3.test(this.pwd)){alert("请检查密码");}
      else if(this.repwd!=this.pwd){alert("请检查密码是否一致");}
      else{this.sendRequst()}
    },
    gotoLogin(){
      this.$router.push("/login")
    },
    goHome(){
      this.$router.push("/")
    },
    sendRequst(){
      axios({
        method:'post',
        url:'/register',
        data:{
          'name':this.name,
          'gender':this.gender,
          'idcard':this.idcard,
          'phone':this.phone,
          'nickName':this.nickName,
          'pwd':this.pwd
        }
      }).then(res => {
        if(res.status === "1"){
          ElMessage({
            showClose: true,
            message: '注册成功',
            type: 'success'
          })
          window.alert("注册成功! 为您跳转至登录页面")
          this.$router.push("/login")
        }else if (res.status === "0") {
          ElMessage({
            showClose: true,
            message: '注册失败',
            type: 'error'
          })
          window.alert("注册失败。"+ res.reason)
        }else{
          ElMessage({
            showClose: true,
            message: '注册失败，请检查网络',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*头部 */
.Head{
  background-color:rgb(245,240,242);
  height: 100px;
  /* text-align: left; */
  position: fixed;
  flex-direction: row;
  width: 100%;
  z-index: 0;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}
/* .mbox{
  height: 100px;
  left: 300px;
} */
/*输入栏图标链接绝对位置 */
/* .mbox a{
  position: absolute;
  left: 700px;
} */
/*链接图片 */
.logo{
  display: block;
  /* 设置行内元素为块状元素才能设置宽高 */
  width: 70px;
  height: 100px;
  background-image: url("../../assets/Hlogo.png");
}
.mbox div{
  font-size: 25px;
  font-weight: bold;
  color: rgb(101,28,77);
  line-height: 100px;
  margin-left: 10px;
}

.el-divider{
  font-size: 50px;
  font-weight: bold;
  color: rgb(101,28,77);
  line-height: 100px;
  margin-left: 230px;
}

/*
section{
  border-top-style: solid;
  border-width: 1px;
} */

div[class="infoitem"]{
  height: 50px;
  padding-left: 20px;
}

div[class="infoitem"] i{
  color: red;
}

span[class="info"]{
  line-height:50px;
  /* position:fixed; */
  left: 700px;
  color: rgb(101,28,77);
  font-weight:bold;
}

span[class="check"]{
  color: red;
  display: inline; 
  line-height:50px;
  position:absolute;
  left: 390px;
  z-index: 10;
}

div[class="note"]{
  color: rgb(127,31,89);
  /* display: inline; 
  line-height:50px; */
  position:absolute;
  left: 440px;
  z-index: 10;
  font-size: 14px;
  margin-top: 18px;
  cursor: pointer;
}

span[class="girl"]{
  line-height:50px;
  position:relative;
  left: 80px;
}

div[class~="inputbox"],div[class="btnbox"]{
  /*不独占一行*/
  display: inline; 
  line-height:50px;
  position: absolute;
  left: 120px;
}

/*输入栏 */
input[class="input1"]{
  height: 30px;
  width: 250px;
  border:rgb(245,240,242) 2px solid;
}

input[value="F"]{
  position:relative;
  left: 80px;
}

input[class="input1"]:focus {
  outline: none;
  box-shadow:0 0 10px rgb(101,28,77);
}

input{
  border-radius: 5px;
}

/*注册按钮 */
button[class="Cbtn register"]{
  height: 40px;
  width: 258px;
  background-color: rgb(127,31,89);
  color:white;
  border: none;
  font-size: 15px;
  font-weight: bold;
  border-radius: 5px;
  margin-top: 10px;
}

/*已有账户对应文字 */
div[class="infologin"]{
  height: 10px;
}

div[class="alogin"]{
  font-size: 10px;
  color: rgb(101,28,77);
  position: absolute;
  left: 800px;
}

a.login{
  text-decoration: none;
}

.bigLogo{
  position: fixed;
  top: 0px;
  left:30px;
  height: 200px;
  width: 200px;
  border-radius: 100px;
  z-index: 2;
  cursor: pointer;
}

.form{
  position: fixed;
  top:150px;
  right: 100px;
  display: flex;
  flex-direction: column;
  /* height: 500px; */
  width: 650px;
  background-color: rgba(227, 227, 221, 0.700);
  border-radius: 10px;
  padding-bottom: 15px;
}

h2{
  color: rgb(101,28,77);
  margin: 13px auto 10px;
}

.bg{
  top: 100px;
  position: fixed;
  z-index: -1;
  width:100%;
  min-height: 500px;
  bottom: 0;
  height: calc(100vh - 100px);
}

.whiteDeer{
  position: fixed;
  right: 110px;
  top:210px;
  z-index: -1;
  width: 250px;
  opacity:0.5;
  border-radius: 10px;
}
</style>