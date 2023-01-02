<template>
    <div>
        <topbar_h></topbar_h>
        <!-- 第一部分酒店介绍 -->
        <step id="0"></step>
        <div class="one">
            <h2>酒店基本信息</h2>
            <!-- 介绍 -->
            <div class="introduction">
                <div class="inputbox">
                    <el-row>
                        <el-col :span="4">
                            <b>酒店介绍:</b>
                        </el-col>
                        <el-col :span="20">
                            <el-input v-model="profile"  :autosize="{ minRows: 6, maxRows: 6 }" type="textarea" placeholder="请输入酒店介绍" :disabled="pro_index == 0 ? true : false" />
                        </el-col>
                    </el-row>
                </div>
                <div class="btnbox">
                    <el-button color="rgb(86,120,168)" title="修改" plain @click="btnpro" v-if="pro_index==0">修改</el-button> 
                    <el-button color="rgb(0,188,0)" title="提交" plain @click="btnpro" v-if="pro_index==1">提交</el-button>
                </div>
            </div>
            <!-- 具体位置 -->
            <div class="Location">
                <div class="inputbox">
                    <el-row>
                        <el-col :span="4">
                            <b>具体位置:</b>
                        </el-col>
                        <el-col :span="20">
                            <el-input v-model="location"  :autosize="{ minRows: 3, maxRows: 3 }" type="textarea" placeholder="请输入具体位置" :disabled="loc_index == 0 ? true : false" />
                        </el-col>
                    </el-row>
                </div>
                <div class="btnbox">
                    <el-button color="rgb(86,120,168)" title="修改" plain @click="btnloc" v-if="loc_index==0">修改</el-button>
                    <el-button color="rgb(0,188,0)" title="提交" plain @click="btnloc" v-if="loc_index==1">提交</el-button> 
                </div>
            </div>
            <!-- 效果图 -->
            <div class="HotelImg">
                <div class="inputbox">
                    <el-row>
                        <el-col :span="4">
                            <b>酒店图片:</b>
                        </el-col>
                        <el-col :span="20">
                            <div class="demo-image__lazy">
                                <el-image v-for="(img,index) in imgList" :key="index" :src="img" lazy />
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <!-- 第二部分：修改图片 -->
        <div class="two">
            <h2 class="t2">图片管理</h2>
             <!-- 删除图片 -->
            <div class="delphoto">
                <div class="inputbox">
                    <el-row>
                        <el-col :span="4">
                            <b>删除图片:</b>
                        </el-col>
                        <el-col :span="20">
                            <el-select style="width:100%" v-model="value" class="m-2" placeholder="请选择删除的图片" size="large">
                                <el-option v-for="(img,index) in imgList" :key="index" :label="img" :value="img" />
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
                <div class="showImg">
                     <el-image style="width: 100%; height: 200px"  :src="value"  :fit="'fill'"></el-image>
                </div>
                <div class="btnbox">
                    <el-button color="rgb(86,120,168)" title="删除" plain @click="getDelPhoto">删除</el-button> 
                </div>
            </div>
            <!-- 新增图片 -->
            <div class="addphoto">
                <div class="inputbox">
                    <el-row>
                        <el-col :span="4">
                            <b>添加图片:</b>
                        </el-col>
                        <el-col :span="20">
                            <b v-if="putImg">已选择图片：{{newImg.name}}</b>
                            <b v-else>(请在提交之前先上传图片)</b>
                        </el-col>
                    </el-row>
                </div>
                <div class="showImg">
                     <el-image style="width: 100%; height: 200px"  :src="newUrl"  :fit="'fill'"></el-image>
                </div>
                <div class="btnbox">
                    <input type="file" ref="upload" id="upload-file" @change="uploadImg($event)" multiple="false"/>
                    <el-button color="rgb(86,120,168)" title="上传" plain  @click="submitImg">上传</el-button> 
                    <el-button color="rgb(86,120,168)" title="提交" plain  :disabled="!putImg?true:false"  @click="getNewImg">提交</el-button>
                </div>
               
            </div>
        </div>
    </div>
</template>

<script>
import topbar_h from '@/components/topbar_h.vue'
import step from '@/components/step.vue'
import axios from "../../network/axios"
import { ElMessage } from 'element-plus'
export default {
    components: { topbar_h,step },
    data(){
        return{
            profile:'',
            location:'',
            imgList:[],
            value:'',       //选择删除的图片
            pro_index:'0',  //状态0 不可输入
            loc_index:'0',  //状态0 不可输入
            putImg: false,
            newImg:'',      //新增图片文件
            newUrl:'',      //新增图片url
            epicture:"",
      }
  },
  methods:{
        btnpro:function(){
            //校验合法性且修改状态
            if(this.pro_index==1){
                if(this.profile!=''){
                    //上传介绍
                    this.getInfo(0);
                    this.pro_index=0;
                    //alert("酒店修改成功！");
                }
                else{alert("请填写介绍内容！");return;}
            }
            else{//可修改
                this.pro_index=1;
                return;
            }
        },
        btnloc:function(){
            if(this.loc_index==1){
                if(this.location!=''){
                    //上传地址
                    this.getInfo(1);
                    this.loc_index=0;
                }
                else{alert("请填写酒店位置！");return;}
            }
            else{//可修改
                this.loc_index=1;
                return;
            }
        },
        getInfo(info){
            // 修改酒店基本信息提交新的介绍/位置
            //info=0是介绍，1是位置
            axios({
                method:'get',
                url:'/hotel/modifyBasicInfo',
                params:{
                'field':info==0 ? 'profile' : 'location',
                'content':info==0 ? this.profile : this.location
                }
            }).then(res => {
                if(res.status==="1"){
                ElMessage({
                    showClose: true,
                    message: info==0 ? '介绍修改成功' : '位置改成功',
                    type: 'success'
                })
                window.alert("您已修改成功。")
                }else if(res.status==="0"){
                ElMessage({
                    showClose: true,
                    message: '您尚未登录',
                    type: 'error'
                })
                window.alert("请先登录")
                this.$store.state.lastPage = this.$route.path
                this.$router.push("/login_h")
                }else if(res.status==="2"){
                ElMessage({
                    showClose: true,
                    message: '其他错误',
                    type: 'error'
                })
                window.alert("修改成功失败："+res.reason)
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
        getDelPhoto(){
            //删除照片
            if(this.value==''){//校验合法性
                alert("请选择要删除的照片");
                return;
            }
            axios({
                method:'get',
                url:'/hotel/deleteHotelPic',
                params:{
                'path':this.value,
                }
            }).then(res => {
                if(res.status==="1"){
                ElMessage({
                    showClose: true,
                    message: '照片删除成功',
                    type: 'success'
                })
                window.alert("您已成功删除照片。")
                this.value='';//删除当前选择
                //更新imglist
                this.getNewImgList();
                }else if(res.status==="0"){
                ElMessage({
                    showClose: true,
                    message: '您尚未登录',
                    type: 'error'
                })
                window.alert("请先登录")
                this.$store.state.lastPage = this.$route.path
                this.$router.push("/login_h")
                }else if(res.status==="2"){
                ElMessage({
                    showClose: true,
                    message: '其他错误',
                    type: 'error'
                })
                window.alert("因其他原因删除失败"+res.reason)
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
        getNewImgList(){//更新图片列表，顺便直接更新所有
            axios({
            method:'get',
            url:'/hotel/getBasicInfo',
            //后端不接受参数
            }).then(res => {
            if(res.profile){
                this.profile = res.profile;
                this.location = res.location;
                this.imgList = res.imgList;
                ElMessage({
                showClose: true,
                message: '照片自动更新成功',
                type: 'success'
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
            // console.log(this.room)
        },
        uploadImg(event){
            let file = event.target.files[0]; //target事件
            this.newImg = file;
            var imgStr = /\.(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/;
            if (!imgStr.test(this.newImg.name)) { //如果不是图片格式
				window.alert("请选择图片")
			}
            else{
                this.putImg = true;
                const that = this;
                const reader = new FileReader(); // 创建读取文件对象
				reader.readAsDataURL(file); // 发起异步请求，读取文件
                reader.onload = function(){that.newUrl=this.result;};
            }
        },
        submitImg(){
            this.$refs.upload.click();
        },
        getNewImg(){//上传新增的图片
            if(!this.putImg){
                ElMessage({
                    showClose: true,
                    message: '未上传图片',
                    type: 'error'
                })
            }else{
                let param = new FormData()
                this.epicture = `${new Date().getTime()}${this.newImg.name}`
                param.append('file',this.newImg,this.epicture) //增加时间，防止重名
                axios({
                url:"/hotel/uploadPic",
                method:"post",
                headers:{'Content-Type':'multipart/form-data'},
                data:param
                }).then(res => {
                if(res.status==1){
                    axios({
                    url:"/hotel/addHotelPic",
                    method:"get",
                    params:{
                        // epicture:"picture/"+this.epicture
                        path:this.epicture
                    }
                    }).then(res => {
                        if(res.status==1){
                            ElMessage({
                            showClose: true,
                            message: '照片上传成功',
                            type: 'success'
                            })
                            window.alert("您已成功上传照片")
                            //清空图片选择
                            this.newImg='';
                            this.putImg=false;
                            this.newUrl='';
                            //更新imglist
                            this.getNewImgList();
                        }else if(res.status==="0"){
                        ElMessage({
                            showClose: true,
                            message: '您尚未登录',
                            type: 'error'
                        })
                        window.alert("请先登录")
                        this.$store.state.lastPage = this.$route.path
                        this.$router.push("/login_h")
                        }else if(res.status==="2"){
                        ElMessage({
                            showClose: true,
                            message: '其他错误',
                            type: 'error'
                        })
                        window.alert("因其他原因提交失败:"+res.reason)
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
                        message: '绑定系统出错',
                        type: 'error'
                        })
                        console.log(err)
                    })
                }
                else{
                    ElMessage({
                    showClose: true,
                    message: '上传时出错',
                    type: 'error'
                    })
                    console.log(err)
                }
                })
            }
        }
    },
    mounted(){
        // 使用此函数，该页面一打开就立刻发送请求获取后端数据
        // 简单处理，直接发送网络请求
        axios({
        method:'get',
        url:'/hotel/getBasicInfo',
        //后端不接受参数
        }).then(res => {
        if(res.profile){
            ElMessage({
                showClose: true,
                message: '成功获得酒店信息',
                type: 'success'
            })
            this.profile = res.profile;
            this.location = res.location;
            this.imgList = res.imgList;
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
/* 第一部分：酒店基本 */
div[class="one"]{
    width: 100%;
    height: 600px;
    text-align: center;
}

div[class="introduction"]{
    width: 100%;
    height: 180px;
}

div[class="inputbox"]{
    width: 70%;
    text-align: center;
    margin-left: 10%;
    padding-top: 10px;
    margin-top: 10px;
}

b{
    font-style: normal;
    font-size: small;
    color: rgb(86,120,168);
    font-family: 'STFangsong';
}

/* 按钮 */
div[class="btnbox"]{
    width: 60%;
    text-align: center;
    margin-left: 20%;
    margin-top: 10px;
}

/* 图片 */
div[class="HotelImg"]{
    /* background-color: rgb(240,238,237); */
    height: 245px;
}

div[class="HotelImg"] div[class="inputbox"]{
    width: 70%;
    text-align: center;
    margin-left: 10%;
    padding-top: 30px;
}

.demo-image__lazy {
  height: 200px;
  overflow-y: auto;
}

.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}

.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}

/* 第2部分：图片管理 */
div[class="two"]{
    width: 100%;
    height: 700px;
    text-align: center;
}

h2[class="t2"]{
    /* background-color: rgb(240,238,237); */
    margin-block-start: 0em;
    margin-block-end: 0em;
    padding-top: 0.83em;
    padding-bottom: 0.83em;
}

div[class="delphoto"],div[class="addphoto"]{
    /* background-color: rgb(240,238,237); */
    height: 300px;
}

div[class="showImg"]{
    height: 200px;
    border-style: solid;
    border-color: rgb(245,240,242);
    width: 58%;
    margin-left: 22%;
}

/* 选择文件按钮 */
#upload-file{
  display: none;
} 

</style>