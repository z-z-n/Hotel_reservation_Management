<template>
    <div class="steplayout">
        <div class="stepbox">
            <el-steps :active="active" align-center>
            <el-step title="酒店信息" description="酒店介绍 + 酒店图片" />
            <el-step title="房间信息" description="房型信息 + 房型图片" />
        </el-steps>
        </div>
        <div class="btnbox">
            <el-button color="rgb(86,120,168)" plain circle @click="prev" title="上一项" :disabled="active ==0?true:false" :icon="ArrowLeftBold"/>
            <el-button color="rgb(86,120,168)" plain circle @click="next" title="下一项" :disabled="active ==1?true:false" :icon="ArrowRightBold"/>
        </div>
    </div>
</template>

<script>
import { ArrowLeftBold,ArrowRightBold } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
export default{
    props:{
        id: { default: 0 }//0 表示酒店信息界面，1为房间信息
    },
    data(){
    return{
        ArrowLeftBold,ArrowRightBold,
        active : this.id,
    }
  },
  methods:{
    next:function(){
        this.$router.push("/hotel/roomInfoManage");
    },
    prev:function(){
        this.$router.push("/hotel/basicInfoManage");
    }
  }
}
</script>

<style scoped>
div[class="steplayout"]{
    align-items: center;
    border-top-color: rgb(240,238,237);
    border-top-style: solid;
    border-top-width: 1px;
    background-color: rgb(241,248,254);
}

div[class="stepbox"]{
    width: 60%;
    height: 60px;
    margin-left: 20%;
    margin-top: 20px;
}

div[class="btnbox"]{
    align-items: center;
    text-align: center;
    width: 60%;
    margin-left: 20%;
}

</style>