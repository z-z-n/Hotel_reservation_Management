<template>
    <div>
        <topbar_h></topbar_h>
        <div class="Commetlayout">
            <h1>评论管理</h1>
            <div class="one">
                <el-table :data="commentList" style="width: 100%" stripe="true">
                    <el-table-column fixed prop="orderID" label="订单编号" width="120" />
                    <el-table-column prop="date" label="入住日期" width="120" />
                    <el-table-column prop="roomType" label="房型" width="120" />
                    <el-table-column prop="content" label="评论" width="400" />
                    <el-table-column prop="reply" label="回复" width="400" :filters="headerSelect" :filter-method="filterHandler" :filter-multiple="false"/>
                    <el-table-column fixed="right" label="编辑" width="120">
                    <template #default="scope">
                        <el-button :icon="Edit" circle size="medium" title="回复" @click="btnReply(scope.$index)"/>
                    </template>
                    </el-table-column>
                </el-table>
                <!-- 回复的dialog -->
                <el-dialog title="回复评论" v-model="dialogFormVisible" width="60%">
                    <div class="item">
                        <el-row>
                            <el-col :span="2">
                                <b>评论:</b>
                            </el-col>
                            <el-col :span="22">
                                <el-input v-model="comment" :autosize="{ minRows: 7, maxRows: 7 }" type="textarea" :disabled="true" />
                            </el-col>
                        </el-row>
                    </div>
                    <div class="item">
                        <el-row>
                            <el-col :span="2">
                                <b>回复:</b>
                            </el-col>
                            <el-col :span="22">
                                <el-input v-model="editObj" :autosize="{ minRows: 7, maxRows: 7 }" type="textarea" maxlength="300" show-word-limit/>
                            </el-col>
                        </el-row>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button color="rgb(86,120,168)" size="large" @click="editDo">确 定</el-button>
                        <el-popconfirm confirm-button-text="是" cancel-button-text="否" :icon="InfoFilled" icon-color="#626AEF" title="是否退出?退出将不保存修改" @confirm="dialogFormVisible = false" >
                            <template #reference>
                                <el-button plain color="rgb(82,155,250)" size="large">取 消</el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import topbar_h from '@/components/topbar_h.vue'
import { Edit } from '@element-plus/icons-vue';
import axios from "../../network/axios"
import { ElMessage } from 'element-plus'
export default {
    components: { topbar_h },
    data(){
        return{
            Edit,
            commentList:[],
            headerSelect: [{text: '待回复',value: '暂无'}, {text: '已回复',value: '1'}],
            dialogFormVisible:false,
            listIndex:'',//下标
            editObj:'',//具体回复
            comment:'',//具体评论
      }
    },
    methods:{
        //筛选回复
        filterHandler(value, row, column) {
            const property = column['property']
            if(value=='暂无'){//待回复，默认为暂无
                return row[property] === value
            }
            else{
                return row[property] !== '暂无'
            }
            
        },
        //表格编辑按钮
        btnReply(index){
            //记录索引
            this.listIndex=index;
            //记录数据
            this.editObj=this.commentList[index].reply;
            this.comment=this.commentList[index].content;
            //显示弹窗
            this.dialogFormVisible=true;
        },
        //Dialog确定按钮
        editDo(){
            if(this.editObj==""){//校验合法性
                alert("请输入内容");
            }
            else{
                let i=this.listIndex
                //根据索引，赋值到list制定的数
                var oid=this.commentList[i].orderID;
                var word=this.editObj;
                //关闭弹窗
                this.dialogFormVisible=false;
                //get请求
                axios({
                    method:'get',
                    url:'/hotel/reply',
                    params:{
                    'orderID': oid,
                    'content': word
                    }
                }).then(res => {
                    if(res.status==="1"){
                    ElMessage({
                        showClose: true,
                        message: '回复成功',
                        type: 'success'
                    })
                    //window.alert("您已回复成功")
                    //赋值***************************
                    this.commentList[i].reply=word;
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
                    window.alert("回复失败："+res.reason)
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
    },
    mounted(){
        // 使用此函数，该页面一打开就立刻发送请求获取后端数据
        // 简单处理，直接发送网络请求获得回复信息
        axios({
            method:'get',
            url: '/hotel/getComment'
        }).then(res => {
            if(res.status==="1"){
                ElMessage({
                    showClose: true,
                    message: '成功获得回复订单信息',
                    type: 'success'
                })
                this.commentList=res.commentList;
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
    }
}
</script>

<style scoped>
div[class="Commetlayout"]{
    width: 100%;
    text-align: center;
}

div[class="one"]{
    width: 80%;
    margin-left: 10%;
}

div[class="item"]{
    width: 80%;
    margin-left: 10%;
    margin-top: 20px;
    margin-bottom: 10px;
}

h1{
    color: rgb(82,155,250);
}
</style>