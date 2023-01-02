<template>
    <div>
        <topbar></topbar>
        <!-- 第一部分：图片轮播 -->
        <div class="one">
            <div class="carouselbox">
                <el-carousel height="400px">
                    <el-carousel-item v-for="(img,index) in imgList" :key="index">
                        <img class="Imgcarousel" :src="img.url" />
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="carouselLogo">
                Luxi®
            </div>
        </div>
        <!-- 第二部分：标签 -->
        <div class="two carouseltitle">
            <div class="l1">
                <div class="titleitem">
                    <h4>精&nbsp;品&nbsp;住&nbsp;宿</h4>
                    甄&nbsp;选&nbsp;高&nbsp;品&nbsp;质&nbsp;中&nbsp;国&nbsp;住&nbsp;宿&nbsp;空&nbsp;间
                </div>
                <div class="titleitem">
                    <h4>精&nbsp;选&nbsp;文&nbsp;创</h4>
                    以&nbsp;定&nbsp;制&nbsp;旅&nbsp;行&nbsp;赋&nbsp;能&nbsp;精&nbsp;品&nbsp;住&nbsp;宿
                </div>
                <div class="titleitem">
                    <h4>精&nbsp;细&nbsp;管&nbsp;理</h4>
                    每&nbsp;年&nbsp;复&nbsp;核&nbsp;认&nbsp;证&nbsp;成&nbsp;员&nbsp;酒&nbsp;店&nbsp;资&nbsp;格
                </div>
            </div>
            <div class="l2">
                <div class="titlebtn">
                    <el-button color="rgb(82,155,250)" size="meduim" plain title="加盟入驻" @click="fbtnSettled">加&nbsp;入&nbsp;我&nbsp;们</el-button>
                </div>
            </div>
            
        </div>
        <!-- 第3部分：图片卡片 -->
        <div class="three">
            <div class="cardbox">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-card class="box-card">
                            <div class="imgcard"> <img class="Imgcarousel" src="../../assets/hotel_modern.jpg" title="现代设计" @click="goHome"/></div>
                            <div class="imgtitle">现代设计</div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card class="box-card">
                            <div class="imgcard"> <img class="Imgcarousel" src="../../assets/hotel_sport.jpg" title="运动健康" @click="goHome"/></div>
                            <div class="imgtitle">运动健康</div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card class="box-card">
                            <div class="imgcard"> <img class="Imgcarousel" src="../../assets/hotel_holiday.jpg" title="休闲度假" @click="goHome"/></div>
                            <div class="imgtitle">休闲度假</div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card class="box-card">
                            <div class="imgcard"> <img class="Imgcarousel" src="../../assets/hotel_season.jpg" title="感受四季" @click="goHome"/></div>
                            <div class="imgtitle">感受四季</div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 第4部分：尾部 -->
        <div class="four">
            <div class="bottomlogo">
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
import topbar from '@/components/topbar.vue'
import { Moon } from '@element-plus/icons-vue';
export default {
    components: { topbar },
    name:'hotelhome',
    data(){
        return{
            imgList:[
            {url:"https://www.relaischateaux.cn/img/slider/hangzhou.jpg"}, 
            {url:"https://www.relaischateaux.cn/img/slider/yihe.jpg"},
            {url:"https://www.relaischateaux.cn/img/slider/volando.jpg"}
            ],
            Moon
        }
    },
    methods:{
        goHome:function(){
            this.$router.push("/");
        },
        fbtnSettled:function(){
            this.$router.push("/settled");
        }
    }
}
</script>

<style scoped>
/* 第一部分 */
div[class="one"]{
    display: flex;
    width: 100%;
    height: 420px;
    align-items: center;
    border-top-color: rgb(240,238,237);
    border-top-style: solid;
    border-top-width: 1px;
}

div[class="carouselbox"]{
    position: absolute;
    width: 80%;
    left: 10%;
    height: 400px;
}

/* 走马灯中间图标 */
div[class="carouselLogo"]{
    display: flex;
    position: absolute;
    left: 47%;
    color: white;
    font-size: 20px;
    font-family: "Segoe Script";
}

img[class="Imgcarousel"]{
    height: 100%;
    width: 100%;
}

/* 第二部分：走马灯下标 */
div[class~="carouseltitle"]{
    width: 100%;
    height: 120px;
    border-top-color: rgb(240,238,237);
    border-top-style: solid;
    border-top-width: 1px;
    background-color: rgb(241,248,254);
}

/* 第一行文字部分 */
div[class="l1"]{
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
}

div[class="titleitem"]{
    display:inline-block;
    align-items: center;
    text-align: center;
    width: 33%;
    font-size: xx-small;
    font-family: "KaiTi";
}

div[class="titleitem"] h4 {
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    font-weight: bold;
    font-size: 15px;
}

/* 第二行加入按钮 */
div[class="l2"]{
    width: 100%;
    height: 40px;
    align-items: center;
}

div[class="titlebtn"]{
    margin-left: 46%;
    width: 100px;
}

/* 第三部分 */
div[class="three"]{
    display: flex;
    align-items: center;
    height: 440px;
    width: 100%;
    margin-top: 10px;
}

div[class="cardbox"]{
    height: 400px;
    width: 80%;
    margin-left: 10%;
    align-items: center;
}

div[class="imgcard"]{
    height: 390px;
    width: 240px;
    position: absolute;
    /* 隐藏放大多出来的图片 */
    overflow: hidden;
}

/* 鼠标移动上变手指+缓慢放大 */
div[class="imgcard"] img{
    cursor: pointer;
    /* 耗时0.5s */
	transition: all 0.5s;
}

/* 鼠标移动上放大 */
div[class="imgcard"] img:hover{
    transform: scale(1.1);
}

div[class="imgtitle"]{
    display: flex;
    position: relative;
    color: white;
    font-size: 30px;
    text-align: center;
    margin-top: 100%;
    margin-left: 30%;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 250px;
  height: 400px;
}

.el-card {
    --el-card-padding: 5px;
}


/* 第四部分 */
div[class="four"]{
    display: flex;
    /* position: absolute; */
    /* bottom: 80px; */
    align-items: center;
    height: 80px;
    width: 100%;
    border-top-color: rgb(240,238,237);
    border-top-style: solid;
    border-top-width: 1px;
}

.bottomlogo{
    left: 33%;
    position: relative;
}

.name{
    display: flex;
    left: 33%;
    position: relative;
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
    position: relative;
    left: 48%;
}

.labelinfo{
    display:inline-block;
    position: relative;
    left: 50%;
    font-family: 'STFangsong';
    font-size: 13px;
    color: grey;
    text-align: left;
}
</style>