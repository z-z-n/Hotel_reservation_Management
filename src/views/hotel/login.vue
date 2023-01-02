<template>
    <div>
        <topbar_h></topbar_h>
        <!-- 模块: 登录 -->
        <div class="HloginLayout">
            <div class="logo">
                <el-image style="width: 86px; height: 120px"  :src="require('../../assets/Wlogo2.png')"  :fit="'cover'"  class="icon"></el-image>
            </div>
            <div class="text">
                <h2 class="text">欢迎您加入鹿兮<br><p>一起成就伟大事业！</p></h2>
            </div>
            <div class="cardbox">
                <el-card class="box-card">
                    <div class="cardcontext">
                        <h2>登录</h2>
                        <div class="item">
                            <el-input v-model="hotelID" class="input" size="meduim" maxlength="20" placeholder="请输入酒店账号" :prefix-icon="Avatar" ></el-input>
                        </div>
                        <div class="item">
                            <el-input v-model="pwd" class="input" type="password" show-password size="meduim" maxlength="20" placeholder="请输入账号密码" :prefix-icon="Lock" ></el-input>
                        </div>
                        <div class="itembtn">
                            <el-button color="rgb(86,120,168)" size="large" @click="fbtnLogin">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
                        </div>
                        <div class="iteminfo">
                            提示：请使用注册时分配的账号ID，如果忘记账号ID请联系加盟客服咨询。
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import topbar_h from '@/components/topbar_h.vue'
import { Avatar,Lock } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import axios from "../../network/axios"
export default {
  components: { topbar_h },
  data(){
      return{
          Avatar,Lock,
          hotelID:'',
          pwd:'',
      }
  },
  methods:{
    fbtnLogin:function(){//点击登录按钮
      var reg1 = /^[0-9a-zA-Z]{8,20}$/;//正则表达式数字和字母结合,8-20次
      if(this.hotelID==''){alert("请检查酒店账号");}
      else if(!reg1.test(this.pwd)){alert("请检查密码");}
      else{this.sendRequst();}
    },
    sendRequst(){
      axios({
        method:'post',
        url:'/login_h',
        data:{
          'hotelID':this.hotelID,
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
          window.alert("登录成功! 为您跳转至管理平台")
          localStorage.setItem('Authorization', res.token)
          localStorage.setItem('type', "hotel")
          this.$store.state.hotelName = res.hotelName
          this.$store.state.Authorization = res.token
          this.$store.state.type = "hotel" 
          this.$router.push("/hotel/basicInfoManage")
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
/* 背景图 */
div[class="HloginLayout"]{
    display: flex;
    background-size: 100% 100%;
    background-image: url(../../assets/brand_huazhu.jpg);
    width: 100%;
    height: 600px;
}

/* 左侧图标和文字 */
div[class="logo"]{
    display: flex;
    position: absolute;
    left: 250px;
    margin-top: 50px;
}

div[class="text"]{
    display: flex;
    position: absolute;
    left: 250px;
    margin-top: 400px;
}

h2[class="text"]{
    color: white;
}

h2[class="text"] p{
    font-size: xx-small;
}

/* 卡片 */
div[class="cardbox"]{
    display: flex;
    position: absolute;
    right: 300px;
    height: 600px;
    align-items: center;
}

h2{
    font-family:"Times New Roman";
    font-weight: normal;
    color: rgb(86,120,168);
}

.item {
  padding: 10px 0;
}

.box-card {
  width: 350px;
  height: 70%;
}

.el-card {
    --el-card-padding: 30px;
}

/* 登录按钮 */
div[class="itembtn"]{
    display: flex;
    position: absolute;
    width: 290px;
    margin-top: 80px;
}

.el-button{
    width: 290px;
}

div[class="iteminfo"]{
    display: flex;
    position: absolute;
    width: 290px;
    margin-top: 120px;
    color: gray;
    font-size: xx-small;
}

</style>