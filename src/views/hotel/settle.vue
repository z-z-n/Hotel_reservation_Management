<template>
    <div id="settle">
        <!-- 模块1: 入驻标题 -->
        <div class="one">
            <h2>加入Luxi®鹿兮</h2>
        </div>
        <!-- 模块2: 入驻信息 -->
        <div class="two">
            <h2>填写信息</h2>
            <div class="prompt"><b>*</b>Indicates Required Field</div>
            <div class="item">
                <el-row>
                    <el-col :span="6">
                        <h4><b>*</b>省份/城市</h4>
                        <el-cascader size="meduim" :options="options" v-model="selectedOptions" placeholder="请选择省份/城市" @change="handleChange" ></el-cascader>
                    </el-col>
                    <el-col :span="6">
                        <h4><b>*</b>酒店分店名</h4>
                        <el-input v-model="hotelname" class="input" size="meduim" maxlength="20" placeholder="请输入名称" :prefix-icon="School" ></el-input>
                    </el-col>
                </el-row>
            </div>
            <div class="item">
                <el-row>
                    <el-col :span="6">
                        <h4><b>*</b>密码</h4>
                        <el-input v-model="pwd" type="password" show-password class="input" size="meduim" maxlength="20" placeholder="请设置8-20位字母数字组合" :prefix-icon="Lock" @blur="fpwdcheck"></el-input>
                        <b id="pwdcheck"></b>
                    </el-col>
                    <el-col :span="6">
                        <h4><b>*</b>确认密码</h4>
                        <el-input v-model="repwd" type="password" show-password class="input" size="meduim" maxlength="20" placeholder="请再次输入密码" :prefix-icon="Lock" @blur="frepwdcheck"></el-input>
                        <b id="repwdcheck"></b>
                    </el-col>
                </el-row>
           </div>


           <!-- 经纬度暂不填写，直接0值提交后端 -->
<!-- 
           <div class="item">
                <el-row>
                    <el-col :span="6">
                        <h4><b>*</b>经度</h4>
                        <el-input v-model="longitude" type="number" min="0" max="180" step="0.01" class="input" size="meduim" maxlength="20" placeholder="请输入经度" :prefix-icon="Location" @blur="flongitudecheck"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <h4><b>*</b>纬度</h4>
                        <el-input v-model="latitude" type="number" min="0" max="180" step="0.01"  class="input" size="meduim" maxlength="20" placeholder="请输入纬度" :prefix-icon="Location" @blur="flatitudecheck"></el-input>
                    </el-col>
                </el-row>
           </div>
            -->
           <div class="item">
                <el-button color="rgb(86,120,168)" size="large" @click="fbtnSettled">提&nbsp;&nbsp;&nbsp;&nbsp;交</el-button>
                <div class="iteminfo">提示：提交并通过认证后，您将会被分配账号ID用于登录，请您牢记该ID。</div>
           </div>
        </div>
        <div class="three">
            <div class="logo">
                <el-image style="width: 50px; height: 70px"  :src="require('../../assets/Wlogo2.png')"  :fit="'cover'"  class="icon"></el-image>
            </div>
            <div class="name">
                <div class="logoinfo">鹿&nbsp;&nbsp;&nbsp;兮</div>
                <div class="w2">成就美好生活</div>
            </div>
            <div class="labelbtn"><el-button :icon="Moon" size="large" circle disabled /></div>
            <div class="labelinfo"><b>舒适</b><br>感到一切正好，<br>人就无比自在。</div>
        </div>
    </div>
</template>

<script>
import { provinceAndCityData,CodeToText } from "element-china-area-data";
import { School,Lock,Location,Moon } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import axios from "../../network/axios"
export default {
  data(){
      return{
          options: provinceAndCityData,
          selectedOptions: [],
          School,Lock,Location,Moon,
          province:'',
          city:'',
          hotelname:'',
          pwd:'',
          repwd:'',
          longitude: 0.0,
          latitude: 0.0,
      }
  },
  methods:{
    handleChange() {
        var loc = "";
        for (let i = 0; i < this.selectedOptions.length; i++) {
            loc += CodeToText[this.selectedOptions[i]];
            if(i==0){this.province=CodeToText[this.selectedOptions[i]];}
            else if(i==1){this.city=CodeToText[this.selectedOptions[i]];}
        }
    },
    fpwdcheck:function(){
      var reg = /^[0-9a-zA-Z]{8,20}$/;//正则表达式数字和字母结合,8-20次
      if(!reg.test(this.pwd)){
        document.getElementById("pwdcheck").innerHTML= '×8-20位字母和数字';
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
    flongitudecheck:function(){
        if(this.longitude>180){this.longitude=180.00}
        else if(this.longitude<0){this.longitude=0.00}
    },
    flatitudecheck:function(){
        if(this.latitude>180){this.latitude=180.00}
        else if(this.latitude<0){this.latitude=0.00}
    },
    fbtnSettled:function(){
        var reg = /^[0-9a-zA-Z]{8,20}$/;//正则表达式数字和字母结合,8-20次
        if(this.province==""||this.city==""){alert("请选择省份/城市");}
        else if(this.hotelname==""){alert("请输入分店名");}
        else if(!reg.test(this.pwd)){alert("请检查密码");}
        else if(this.repwd!=this.pwd){alert("请检查密码是否一致");}
        else if(this.latitude>180||this.longitude>180||this.latitude<0||this.longitude<0){alert("请检查经纬度格式");}
        else{this.sendRequst()}
    },
    sendRequst(){
      //处理直辖市情况，同时去掉‘省’‘市’
      let tmp_province=""
      let tmp_city=""
      if(this.province == "北京市" || this.province == "天津市" || this.province == "上海市" || this.province == "重庆市"){
        tmp_city=this.province
        tmp_city=tmp_city.substring(0,tmp_city.length-1)
      }
      else{//去掉省市
        tmp_province=this.province
        tmp_city=this.city
        tmp_province=tmp_province.substring(0,tmp_province.length-1)
        tmp_city=tmp_city.substring(0,tmp_city.length-1)
      }
      axios({
        method:'post',
        url:'/settled',
        data:{
          'province':tmp_province,
          'city':tmp_city,
          'hotelName':this.hotelname,
          'pwd':this.pwd,
          'longitude':this.longitude,
          'latitude':this.latitude
        }
      }).then(res => {
        if(res.status === "1"){
          ElMessage({
            showClose: true,
            message: '加盟成功',
            type: 'success'
          })
          window.alert("加盟成功! 请您牢记您的账号ID: "+res.hotelID+" \n下面将为您跳转至管理登录页面")
          this.$router.push("/login_h")  //转到登录页
        }else if (res.status === "0") {
          ElMessage({
            showClose: true,
            message: '提交失败',
            type: 'error'
          })
          window.alert("提交失败："+ res.reason)
        }else{
          ElMessage({
            showClose: true,
            message: '提交失败，请检查网络',
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
/* 入驻标题 */
div[class="one"]{
    display: flex;
    width: 100%;
    height: 100px;
    background-color: rgb(240,238,237);
    align-items: center;
}

div[class="one"] h2{
    margin-left: 300px;
    font-size: 30px;
    font-family:"Times New Roman";
    font-weight: normal;
}

/* 入驻信息 */
div[class="two"]{
    height: 420px;
    width: 100%;
}

div[class="two"] h2{
    margin-left: 300px;
    margin-top: 40px;
    font-size: x-large;
    font-family:"Times New Roman";
    font-weight: normal;
}

div[class="prompt"]{
    margin-left: 300px;
    margin-top: 10px;
    font-size: 10px;
    font-family:"Times New Roman";
    font-weight: normal;
    color: gray;
}

/* 提示信息 */
div[class="prompt"] b{
    color: red;
}

/* 省市+酒店名 */
div[class="item"]{
    height: 65px;
    /* width: 100%; */
    margin-left: 300px;
    margin-top: 20px;
}

div[class="item"] h4{
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: normal;
    font-size: 12px;
    width: 215px;
}

div[class="item"] b{
    color: red;
}

div[class="cascader"]{
    width: 300px;
}

/* 输入框 */
.el-input{
    width: 215px;
}
#pwdcheck,#repwdcheck{
    color: red;
    font-size: xx-small;
}

/* 按钮 */
.el-button{
    width: 215px;
}

div[class="iteminfo"]{
    display: flex;
    position: absolute;
    /* width: 100%; */
    margin-top: 10px;
    color: gray;
    font-size: xx-small;
}

/* 第三部分 */
div[class="three"]{
    display: flex;
    /* position: absolute; */
    align-items: center;
    height: 80px;
    width: 100%;
    border-top-color: rgb(240,238,237);
    border-top-style: solid;
    border-top-width: 1px;

}

.logo{
  margin-left: 350px;
}

.name,.label{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/*头部logo文字 */
.logoinfo{
  font-size: 20px;
  font-weight: bold;
  color: rgb(127,31,89);
  font-family: 'STFangsong';
}

.w2{
  margin: 0;
  padding: 0;
  font-size: xx-small;
  font-weight: bold;
  color: rgb(127,31,89);
  font-family:"Times New Roman";
}

/* 标签信息 */
.labelbtn{
  display:inline-block;
  margin-left: 200px;
}

.labelinfo{
  display:inline-block;
  margin-left: 10px;
  font-family: 'STFangsong';
  font-size: 13px;
  color: grey;
  text-align: left;
}

</style>