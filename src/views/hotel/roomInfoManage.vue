<template>
    <div>
        <topbar_h></topbar_h>
        <step id="1"></step>
        <div class="RoomLayout">
            <h2>房型信息</h2>
            <!-- 第一部分新增房型 -->
            <div class="one">
                <div class="inputbox">
                    <el-row>
                        <el-col :span="4">
                            <b>新增房型:</b>
                        </el-col>
                        <el-col :span="20">
                            <div class="Roominfo">
                                <el-row>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px">房型</div>
                                        <el-select style="width:80%" v-model="atype" class="m-2" placeholder="请选择房型" size="medium" :disabled="ainfo_index==0?true:false">
                                            <el-option v-for="(Room,index) in atypeList" :key="index" :label="Room" :value="Room" />
                                        </el-select>
                                    </el-col>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px">价格</div>
                                        <el-input-number style="width:80%" v-model="aprice" :precision="1" :step="0.1" :max="3000" :disabled="ainfo_index==0?true:false"/>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px; font-size:smaller">起始房间号（将根据间数自动生成）</div>
                                        <el-input-number style="width:80%" v-model="abeginNum" :precision="0" :step="1" :max="1000" :disabled="ainfo_index==0?true:false" @change="Croomrange1"/>
                                    </el-col>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px">间数</div>
                                        <el-input-number style="width:80%" v-model="anumber" :precision="0" :step="1" :max="30" :disabled="ainfo_index==0?true:false" @change="Croomrange2"/>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <div style="margin-top: 10px">房间号范围</div>
                                        <el-input style="width:90%; text-align:center;" v-model="aroomrange" placeholder="" disabled="true"/>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px">早餐</div>
                                        <el-select style="width:80%" v-model="afood" class="m-2" placeholder="请选择" size="medium" :disabled="ainfo_index==0?true:false">
                                            <el-option v-for="item in foodList" :key="item.value" :label="item.id" :value="item.id" />
                                        </el-select>
                                    </el-col>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px">wifi</div>
                                        <el-select style="width:80%" v-model="awifi" class="m-2" placeholder="请选择" size="medium" :disabled="ainfo_index==0?true:false">
                                            <el-option v-for="item in wifiList" :key="item.value" :label="item.id" :value="item.id" />
                                        </el-select>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px">窗户</div>
                                        <el-select style="width:80%" v-model="awin" class="m-2" placeholder="请选择" size="medium" :disabled="ainfo_index==0?true:false">
                                            <el-option v-for="item in windowList" :key="item.value" :label="item.id" :value="item.id" />
                                        </el-select>
                                    </el-col>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px">电吹风</div>
                                         <el-select style="width:80%" v-model="ahair" class="m-2" placeholder="请选择" size="medium" :disabled="ainfo_index==0?true:false">
                                            <el-option v-for="item in hairList" :key="item.value" :label="item.id" :value="item.id" />
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="btnbox">
                    <el-button color="rgb(86,120,168)" title="添加" plain class="add" v-if="ainfo_index ==0?true:false" @click="btnAinfo">添加</el-button>
                    <el-button color="rgb(0,188,0)" title="提交" plain class="add" v-if="ainfo_index ==1?true:false" @click="btnAinfo">提交</el-button>
                </div>
            <!-- 第二部分房型修改信息 -->
            </div>
            <div class="two">
                <div class="inputbox">
                    <el-row>
                        <el-col :span="4">
                            <b>修改房型:</b>
                        </el-col>
                        <el-col :span="20">
                            <div class="Roominfo">
                                <el-row>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px">房型</div>
                                        <el-select style="width:80%" v-model="cgtype" class="m-2" placeholder="请选择房型" size="medium" :disabled="cinfo_index==0?true:false" @change="Croomtype">
                                            <el-option v-for="(Room,index) in roomList" :key="index" :label="Room.typeName" :value="Room.typeName"/>
                                        </el-select>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px">价格</div>
                                        <el-input-number style="width:80%" v-model="cgprice" :precision="1" :step="0.1" :max="3000" :disabled="cinfo_index==0?true:false"/>
                                    </el-col>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px">间数</div>
                                        <el-input-number style="width:80%" v-model="cgnumber" :precision="0" :step="1" :max="30" :disabled="true"/>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px">早餐</div>
                                        <el-select style="width:80%" v-model="cgfood" class="m-2" placeholder="请选择" size="medium" :disabled="cinfo_index==0?true:false">
                                            <el-option v-for="item in foodList" :key="item.value" :label="item.id" :value="item.id" />
                                        </el-select>
                                    </el-col>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px">wifi</div>
                                        <el-select style="width:80%" v-model="cgwifi" class="m-2" placeholder="请选择" size="medium" :disabled="cinfo_index==0?true:false">
                                            <el-option v-for="item in wifiList" :key="item.value" :label="item.id" :value="item.id" />
                                        </el-select>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px">窗户</div>
                                        <el-select style="width:80%" v-model="cgwin" class="m-2" placeholder="请选择" size="medium" :disabled="cinfo_index==0?true:false">
                                            <el-option v-for="item in windowList" :key="item.value" :label="item.id" :value="item.id" />
                                        </el-select>
                                    </el-col>
                                    <el-col :span="12">
                                        <div style="margin-top: 10px">电吹风</div>
                                        <el-select style="width:80%" v-model="cghair" class="m-2" placeholder="请选择" size="medium" :disabled="cinfo_index==0?true:false">
                                            <el-option v-for="item in hairList" :key="item.value" :label="item.id" :value="item.id" />
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="btnbox">
                    <el-button color="rgb(86,120,168)" title="修改" plain class="change" v-if="cinfo_index==0?true:false" @click="btnCinfo">修改</el-button>
                    <el-button color="rgb(0,188,0)" title="提交" plain class="change" v-if="cinfo_index==1?true:false" @click="btnCinfo">提交</el-button>
                    <!-- 删除按钮、需确认 -->
                    <el-popconfirm confirm-button-text="是" cancel-button-text="否, Thanks" :icon="InfoFilled" icon-color="#626AEF" title="确认删除该房型?" v-if="cinfo_index==1?true:false" @confirm="btnDinfo_Ok" @cancel="btnDinfo_No">
                        <template #reference>
                            <el-button color="rgb(252,30,30)" title="删除" plain class="change">删除</el-button>
                        </template>
                    </el-popconfirm>
                </div>
            </div>
            <!-- 增加房型图片 -->
            <div class="three">
                <div class="inputbox">
                    <el-row>
                        <el-col :span="4">
                            <b>添加图片:</b>
                        </el-col>
                        <el-col :span="10">
                            <el-select style="width:100%" v-model="addPhotoroom" class="m-2" placeholder="请选择房型" size="medium" @change="AddPicroom">
                                <el-option v-for="(Room,index) in roomList" :key="index" :label="Room.typeName" :value="Room.typeName"/>
                            </el-select>
                        </el-col>
                        <el-col :span="10">
                            <b v-if="addPhotoflag">(已选择房型：{{addPhotoroom}}</b>
                            <b v-else>(请在提交之前先选择房型</b>
                            <b v-if="putImg">，已选择图片：{{newImg.name}})</b>
                            <b v-else>，请上传图片)</b>
                        </el-col>
                    </el-row>
                </div>
                <div class="showImg">
                     <el-image style="width: 100%; height: 200px"  :src="newUrl"  :fit="'fill'"></el-image>
                </div>
                <div class="btnbox">
                    <input type="file" ref="upload" id="upload-file" @change="uploadImg($event)" multiple="false"/>
                    <el-button color="rgb(86,120,168)" title="上传" plain  @click="submitImg">上传</el-button> 
                    <el-button color="rgb(86,120,168)" title="提交" plain  :disabled="!putImg?true:false"  @click="btnAddPic">提交</el-button>
                </div>
               
            </div>
            <!-- 删除房型图片 -->
            <div class="four">
                <div class="inputbox">
                    <el-row>
                        <el-col :span="4">
                            <b>删除图片:</b>
                        </el-col>
                        <el-col :span="20">
                            <el-select style="width:50%" v-model="delPhotoroom" class="m-2" placeholder="请选择房型" size="medium" @change="DelPicroom">
                                <el-option v-for="(Room,index) in roomList" :key="index" :label="Room.typeName" :value="Room.typeName" />
                            </el-select>
                            <el-select style="width:50%" v-model="delphoto" class="m-2" placeholder="请选择删除的图片" size="medium">
                                <el-option v-for="(img,index) in delimgList" :key="index" :label="img" :value="img" />
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
                <div class="showImg">
                     <el-image style="width: 100%; height: 200px"  :src="delphoto"  :fit="'fill'"></el-image>
                </div>
                <div class="btnbox">
                    <el-button color="rgb(86,120,168)" title="删除" plain @click="btnDelPic">删除</el-button> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import topbar_h from '@/components/topbar_h.vue'
import step from '@/components/step.vue'
import { InfoFilled } from '@element-plus/icons-vue'
import axios from "../../network/axios"
import { ElMessage } from 'element-plus'
export default {
    components: { topbar_h,step },
    data(){
        return{
            InfoFilled,
            //增加房型信息
            aprice:'',anumber:'',afood:'',awifi:'',awin:'',ahair:'',atype:'',ainfo_index:'0',abeginNum:0,aroomrange:'',aroomNolist:[],
            //现没有的房间列表
            atypeList:[],
            //现有
            cgprice:'',cgnumber:'',cgfood:'',cgwifi:'',cgwin:'',cghair:'',cgtype:'',cinfo_index:'0',
            roomList:[],
            //选项
            foodList:[{value: '选项1',id:"含有早餐"},{value: '选项2',id:"不含早餐"}],
            wifiList:[{value: '选项1',id:"免费wifi"},{value: '选项2',id:"不含wifi"}],
            windowList:[{value: '选项1',id:"有窗"},{value: '选项2',id:"无窗"}],
            hairList:[{value: '选项1',id:"有电吹风"},{value: '选项2',id:"无电吹风"}],
            //增加房间照片
            addPhotoroom:'',
            addPhotoflag: false,
            putImg: false,
            newImg:'',      //新增图片文件
            newUrl:'',      //新增图片url
            epicture:"",
            //删除房间照片
            delPhotoroom:'',
            delphoto:'',
            delimgList:[],
      }
  },
    methods:{
        checkaddRoom(i){//检查房间信息合法性
            if(i==0){//添加房型
                if(this.atype==""){alert("请选择房间类型");return false;}
                else if(this.aprice==0){alert("请输入价格");return false;}
                else if(this.anumber==0){alert("请输入间数");return false;}
                else if(this.afood==""){alert("请选择早餐");return false;}
                else if(this.awifi==""){alert("请选择wifi");return false;}
                else if(this.awin==""){alert("请选择窗户");return false;}
                else if(this.ahair==""){alert("请选择电吹风");return false;}
                else{return true;}
            }
            else if(i==1){//修改房型
                if(this.cgtype==""){alert("请选择房间类型");return false;}
                else if(this.cgprice==0){alert("请输入价格");return false;}
                else if(this.cgnumber==0){alert("请输入间");return false;}
                else if(this.cgfood==""){alert("请选择早餐");return false;}
                else if(this.cgwifi==""){alert("请选择wifi");return false;}
                else if(this.cgwin==""){alert("请选择窗户");return false;}
                else if(this.cghair==""){alert("请选择电吹风");return false;}
                else{return true;}
            }
            else{//删除房型
                if(this.cgtype==""){alert("请选择房间类型");return false;}
                else{return true;}
            }
        },
        renew(i,that){//get请求成功，更新信息
            if(i==0){//添加房型
               //更新
                that.atype='';
                that.aprice=0;
                that.anumber=0;
                that.afood='';
                that.awifi='';
                that.awin='';
                that.ahair='';
                //房间号列表
                that.aroomNolist.length=0;
                that.abeginNum=0,
                that.aroomrange='',
                //更新所有房型信息
                that.getAllnewInfo();
            }
            else if(i==1){//修改房型和删除房型
               //更新
                that.cgtype='';
                that.cgprice=0;
                that.cgnumber=0;
                that.cgfood='';
                that.cgwifi='';
                that.cgwin='';
                that.cghair='';
                //更新所有房型信息
                that.getAllnewInfo();
            }
            else{//删除房型
                //更新
                that.delPhotoroom='';
                that.delphoto='';
                that.delimgList.length=0;//清空
                //更新所有房型信息
                that.getAllnewInfo();
            }
        },
        //get上传通用函数
        getinfo(url1,param1,word,i){//url、传递的信息、修改文本信息、哪个传递函数
            axios({
                method:'get',
                url: url1,
                params:param1
            }).then(res => {
                if(res.status==="1"){
                    ElMessage({
                        showClose: true,
                        message: '成功'+word,
                        type: 'success'
                    })
                    //window.alert("您已成功"+word)
                    this.renew(i,this)//更新所对应的信息
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
                    window.alert("因其他原因"+word+"失败："+res.reason)
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
        //修改房间范围
        Croomrange1(value){
            var end=value+this.anumber-1;
            this.abeginNum=value;
            this.aroomrange="No. "+this.abeginNum+" ~ "+end;
            this.aroomNolist.length=0;//清空
            for(var i=1;i<=this.anumber;i++){
                this.aroomNolist.push(this.abeginNum+i+"");
            }
        },
        Croomrange2(value){
            var end=value+this.abeginNum-1;
            this.anumber=value;
            this.aroomrange="No. "+this.abeginNum+" ~ "+end;
            this.aroomNolist.length=0;//清空
            for(var i=0;i<this.anumber;i++){
                this.aroomNolist.push(this.abeginNum+i+"");
                // console.log(this.abeginNum+i+"");
            }
        },
        btnAinfo:function(){//点击房型添加
            if(this.ainfo_index==1){
                //检查合法性
                if(this.checkaddRoom(0)){
                    this.ainfo_index=0;//后面上传
                }
                else{return;}
            }
            else{//可修改
                this.ainfo_index=1;
                this.getnewNoroom();
                return;
            }
            //上传并更新
            var url='/hotel/addRoomType';
            var param={'typeName':this.atype,
                    'price':this.aprice, 
                    'isBreakfast':this.afood,
                    'isWifi':this.awifi,
                    'isWindow':this.awin,
                    'isHairDrier':this.ahair,
                    'roomNo':this.aroomNolist+'',
                };
            var word="添加房型";
            this.getinfo(url,param,word,0);
        },
        btnCinfo:function(){//点击房型修改
            if(this.cinfo_index==1){
                //检查合法性
                if(this.checkaddRoom(1)){//后面上传
                    this.cinfo_index=0;
                }
                else{return;}
            }
            else{//可修改
                this.cinfo_index=1;
                return;
            }
            //上传并更新
            var url='/hotel/modifyRoomType';
            var param={'typeName':this.cgtype,
                    'price':this.cgprice, 
                    'isBreakfast':this.cgfood,
                    'isWifi':this.cgwifi,
                    'isWindow':this.cgwin,
                    'isHairDrier':this.cghair
                };
            var word="修改房型信息";
            this.getinfo(url,param,word,1);
        },
        btnDinfo_Ok:function(){//点击删除房型确认
            if(this.cinfo_index==1){
                if(this.checkaddRoom(2)){
                    this.cinfo_index=0;//后面上传
                }
                else{return;}
            }
            else{//可修改
                this.cinfo_index=1;
                return;
            }
            //上传数据并更新、清空选择
            var url='/hotel/deleteRoomType';
            var param={'typeName':this.cgtype};
            var word="删除房型";
            this.getinfo(url,param,word,1);
        },
        btnDinfo_No:function(){//点击删除房型取消
            this.cinfo_index=1;
            return;
        },
        Croomtype(value){//选择房型后更改显示内容
            for(var i=0;i<this.roomList.length;i++){
                if(value==this.roomList[i].typeName)
                {
                    this.cgtype=this.roomList[i].typeName;
                    this.cgnumber=this.roomList[i].number;
                    this.cgprice=this.roomList[i].price;
                    this.cgfood=this.roomList[i].isBreakfast;
                    this.cgwifi=this.roomList[i].isWifi;
                    this.cgwin=this.roomList[i].isWindow;
                    this.cghair=this.roomList[i].isHairDrier;
                }
            }
        },
        //选择添加图片的房型
        AddPicroom(value){
            if(value!=""){this.addPhotoflag=true;}
        },
        //上传照片
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
        //更改绑定
        submitImg(){
            this.$refs.upload.click();
        },
        //点击增加图片按钮
        btnAddPic:function(){
            //检查合法性
            if(!this.addPhotoflag){
                ElMessage({
                    showClose: true,
                    message: '未选择房型',
                    type: 'error'
                })
            }
            else if(!this.putImg){
                ElMessage({
                    showClose: true,
                    message: '未上传图片',
                    type: 'error'
                })
            }
            else{
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
                    url:"/hotel/addRoomPic",
                    method:"get",
                    params:{
                        // epicture:"picture/"+this.epicture
                        path:this.epicture,
                        roomType:this.addPhotoroom
                    }
                    }).then(res => {
                        if(res.status==1){
                            ElMessage({
                            showClose: true,
                            message: '照片上传成功',
                            type: 'success'
                            })
                            //window.alert("您已成功上传照片")
                            //清空图片选择
                            this.addPhotoroom='';
                            this.addPhotoflag=false;
                            this.newImg='';
                            this.putImg=false;
                            this.newUrl='';
                            //更新
                            this.getAllnewInfo();
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
                        window.alert("因其他原因提交成功失败")
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
        },
        //选择删除图片的房型
        DelPicroom(value){
            if(value!=""){
                for(var i=0;i<this.roomList.length;i++){
                    if(value==this.roomList[i].typeName)
                    {
                        this.delimgList=this.roomList[i].imgList;
                    }
                }
                this.delphoto='';//清空之前选择
            }
        },
        //点击删除图片按钮
        btnDelPic:function(){
            //检查合法性
            if(this.delPhotoroom==0){
                alert("请选择房型");
                return;
            }
            else if(this.delphoto==0){
                alert("请选择照片");
                return;
            }
            else{//合法，删除get
                //上传数据并更新、清空选择
                var url='/hotel/deleteRoomPic';
                var param={'path':this.delphoto};
                var word="删除房型照片";
                this.getinfo(url,param,word,2);
            }
        },
        //更新所有信息
        getAllnewInfo(){
            axios({
                method:'get',
                url: '/hotel/getRoomType'
            }).then(res => {
                if(res.status==="1"){
                    ElMessage({
                        showClose: true,
                        message: '成功更新所有信息',
                        type: 'success'
                    })
                    this.roomList=res.roomList;
                    this.getnewNoroom();//更新不含的房间
                    //window.alert("您已成功更新所有信息")
                }else if(res.status==="0"){
                    ElMessage({
                        showClose: true,
                        message: '您尚未登录',
                        type: 'error'
                    })
                    window.alert("请先登录")
                    this.$store.state.lastPage = this.$route.path
                    this.$router.push("/login_h")
                    return false;
                }else if(res.status==="2"){
                    ElMessage({
                        showClose: true,
                        message: '其他错误',
                        type: 'error'
                    })
                    window.alert("因其他原因更新失败")
                    return false;
                }else{
                    ElMessage({
                        showClose: true,
                        message: '请检查网络',
                        type: 'error'
                    })
                    return false;
                } 
            }).catch(err => {
                ElMessage({
                showClose: true,
                message: '系统出错',
                type: 'error'
                })
                console.log(err)
                return false;
            })
        },
        //更新没有的房型信息
        getnewNoroom(){
            var Allroom=["双床房","高级双床房","大床房","高级大床房","商务套房"];
            var Nowroom=[];
            for(var i=0;i<this.roomList.length;i++){
                Nowroom.push(this.roomList[i].typeName);
            }
            //过滤不含已有的
            let differ = Allroom.filter(item => Nowroom.indexOf(item) == -1);
            this.atypeList=differ;
        }
    },
    mounted(){
        // 使用此函数，该页面一打开就立刻发送请求获取后端数据
        // 简单处理，直接发送网络请求获得酒店信息
        axios({
            method:'get',
            url: '/hotel/getRoomType'
        }).then(res => {
            if(res.status==="1"){
                ElMessage({
                    showClose: true,
                    message: '成功更新所有信息',
                    type: 'success'
                })
                this.roomList=res.roomList;
                //window.alert("您已成功更新所有信息")
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
                window.alert("因其他原因更新失败")
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
}
</script>

<style scoped>
/* 第一部分：新增房型信息 */
div[class="RoomLayout"]{
    width: 100%;
    height: 1450px;
    text-align: center;
}

div[class="one"]{
    width: 100%;
    height: 400px;
}

div[class="two"]{
    width: 100%;
    height: 350px;
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
div[class="Roominfo"]{
    width: 100%;
    height: 100%;
    border-style: solid;
    border-color: rgb(245,240,242);
    padding-bottom: 10px;
}

/* 按钮 */
div[class="btnbox"]{
    width: 60%;
    height: 50px;
    text-align: center;
    margin-left: 20%;
    margin-top: 30px;
}

/* 房型图片 */
div[class="three"],div[class="four"]{
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