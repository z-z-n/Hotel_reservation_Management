<template>
  <div>
    <topbar></topbar>
    <!-- 图片 -->
    <div class="h2">感&nbsp;受&nbsp;东&nbsp;方&nbsp;的&nbsp;自&nbsp;然&nbsp;得&nbsp;体</div>
    <div class="intro2">
      <div class="left">
        <img src="../../assets/arrow.png" style="margin-top:40px" />
      </div>
      <div class="middle">
        <div class="up">鹿兮酒店</div>
        <div class="line"></div>
        <div class="center">Luxi Hotel</div>
        <div class="down">
          从东方智慧中汲取人文精神，从当代生活中提炼价值内涵，鹿兮通过亲朋服务创造优质体验，在东方土地上，让更多人感受东方的自然得体，提升旅途生活品质。
        </div>
        <h3 class="fff">探索优质旅行服务</h3>
        <div class="search">
          <el-cascader :options="options" style="width:150px" v-model="selectedOptions" placeholder="入住城市" @change="handleChange" ></el-cascader>
          <el-input
            v-model="content"
            placeholder="酒店名或其它关键字"
          >
            <template #append>
              <el-button :icon="Search" @click="goSearch"/>
            </template>
          </el-input>
        </div>
      </div>
      <div class="right">
        <el-carousel height="360px">
          <el-carousel-item v-for="(img,index) in imgList" :key="index">
            <img class="Imgcarousel" :src="img.url" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
      <div class="labelbox">
      <div class="label l1">
        <div class="labelbtn"><el-button :icon="User" size="large" circle disabled /></div>
        <div class="labelinfo"><b>东方</b><br>秉承“仁义礼智信”的“五常”，<br>坚守“温良恭俭让”的“五德”。</div>
      </div>
      <div class="label l2">
        <div class="labelbtn"><el-button :icon="Moon" size="large" circle disabled /></div>
        <div class="labelinfo"><b>舒适</b><br>感到一切正好，<br>人就无比自在。</div>
      </div>
      <div class="label l3">
        <div class="labelbtn"><el-button :icon="Reading" size="large" circle disabled /></div>
        <div class="labelinfo"><b>人文</b><br>承东方自然美学，<br>坚守“温良恭俭让”的“五德”。</div>
      </div>
    </div>
  </div>
</template>

<script>
import topbar from '../../components/topbar.vue';
import { provinceAndCityData,CodeToText } from "element-china-area-data";
import { Search,Reading,Moon,User } from '@element-plus/icons-vue';
export default{
  data(){
    return{
      imgList:[
      {url:require("../../assets/carousel_quanji1.jpg")}, 
      {url:require("../../assets/carousel_quanji2.jpg")},
      {url:require("../../assets/carousel_quanji3.jpg")},
      {url:require("../../assets/carousel_quanji4.jpg")}
      ],
      content:'',
      city:'',
      province:'',
      Search,Reading,Moon,User,
      options: provinceAndCityData,
      selectedOptions: []
    }
  },
  methods:{
    goSearch:function(){
      // 城市不能为空
        if(! this.city){
          window.alert("入住城市不能为空")
          return
        }

      // 设立临时城市变量
      let temp = ""
      if(this.province == "北京市" || this.province == "天津市" || this.province == "上海市" || this.province == "重庆市"){
        temp = this.province
      }else{
        temp = this.city
      }
      temp = temp.substring(0,temp.length - 1)

      // 跳转至搜索页面
      this.$router.push({
        path:"/search",
        query:{
          city:temp,
          content:this.content
        }
      });
    },
    handleChange() {
      var loc = "";
      for (let i = 0; i < this.selectedOptions.length; i++) {
          loc += CodeToText[this.selectedOptions[i]];
          if(i==0){this.province=CodeToText[this.selectedOptions[i]];}
          else if(i==1){this.city=CodeToText[this.selectedOptions[i]];}
      }
    },
  },
  components:{
    topbar
  }
}
</script>

<style scoped>
/*头部图片 */
.Imghead{
  height: 300px;
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 10%;
  /* position: relative; */
}

.h2{
  color: white;
  width: 100%;
  min-width: 1200px;
  height: 280px;
  background-image: url(../../assets/brand_quanji.jpg);
  background-size: 100% 100%;
  text-align: center;
  font-size: 30px;
  padding-top:220px;
  font-family: "SimSun";
}

/*介绍卡片 */
.introduction{
  height: 300px;
  display: flex;
  margin-top: 2%;
  margin-left: 10%;
  /* margin-right: 10%; */
  width: 80%;
  min-width: 600px;
}

div[class~="w34h21"]{
  width: 500px;
  height: 260px;
}

/*左边酒店信息和搜索 */
div[class~="item1"]{
  border-color: rgb(245,240,242);
  border-style: solid;
}

h4,h5{
  margin-left: 40px;
  color: rgb(101,28,77);
}

h5{
  margin-block-end: 1.2em;
}

h4 b{
  font-size: 1px;
}

div[class="intro"]{
  margin-left: 40px;
  margin-right: 80px;
  font-family: 'STFangsong';
  font-size: 1px;
  line-height: 200%;
}

.w-27{
  width: 270px;
}

.btnsearch{
  display: inline-block;
  margin-left: 40px;
}

/*右侧走马灯 */
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 210px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.labelbox{
  height: 120px;
  display: flex;
  /* margin-top: 2%;
  margin-bottom: 2%;
  margin-left: 10%;
  margin-right: 10%; */
  border-color: rgb(245,240,242);
  border-top-style: solid;
  border-bottom-style: solid;
  align-items: center;
  width: 1200px;
  margin: 40px auto
}

.label{
  width: 33%;
  height: 100px;
  text-align: center;
  display: flex;
}

.labelbtn{
  display:inline-block;
  margin-top: 30px;
  margin-left: 50px;
}

.l2{
  margin-left: 50px;
}

.labelinfo{
  display:inline-block;
  margin-left: 10px;
  margin-top: 30px;
  font-family: 'STFangsong';
  font-size: 13px;
  color: grey;
  text-align: left;
}



.intro2{
  display: flex;
  height: 360px;
  /* background-color: aliceblue; */
  width: 1200px;
  margin: 100px auto;
  border: 1px solid rgb(238, 234, 233);
}

.left{
  width: 65px;
  /* background-color: aliceblue; */
}

.middle{
  width: 550px;
  background:url(../../assets/stone.png)  no-repeat;
  background-position: right bottom;
  display: flex;
  flex-direction: column;
}

.up{
  font-size: 20px;
  font-weight: bold;
  color: rgb(101,28,77);
  font-family: 'STFangsong';
  margin-top: 20px;
}

.line{
  background-color:rgb(207, 207, 207);
  height: 2.5px;
  width: 40px;
  margin-top: 5px;
}

.center{
  font-size: 28px;
  font-weight: bold;
  color: rgb(101,28,77);
}

.down{
  color: rgb(141,141,141);
  margin-top: 30px;
  margin-right: 80px;
  font-size: 14px;
  line-height: 28px;
}

.fff{
  color: rgb(101,28,77);
  margin-top:40px
}

/* .el-cascader{
 padding: 0;
} */

.el-input{
  width: 200px;
  margin-left: 10px;
}

.Imgcarousel{
  width: 610px;
  height: 360px;
}

.right{
  width: 610px;
}
</style>