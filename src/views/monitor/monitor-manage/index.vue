<template>
    <el-card :body-style="{height: 'calc(100vh - 230px)'}">
        <div slot="header" class="clearfix">
            <span>实时监控</span>
        </div>
        <div class="card-body">
            <div class="header">
                <clxTab @tabChange="tabChange($event)"></clxTab>
            </div>

            <div class="body">
                <div class="left">
                    <clxTree></clxTree>
                </div>
                <div class="right">
                    <clxVideo></clxVideo>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
import ClxTab from './components/clx-tab';
import ClxTree from './components/clx-tree';
import ClxVideo from './components/clx-video';
    export default {
        data(){
            return {
                
            }
        },
        components:{
            clxTab: ClxTab,
            clxTree: ClxTree,
            clxVideo: ClxVideo
        },
        methods: {
            tabChange(e){
                console.log(e);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card-body{
        height: 100%;
        .body{
            height: 100%;
            margin-top: 20px;
            display: flex;
            .left{
                overflow-y: auto;
                width: 260px;
                margin-right: 28px;
                padding: 10px;
                background: #F2F2F2;
                height: calc(100% - 72px);
            }
            .right{
                flex: 1;
                overflow-y: auto;
                height: calc(100% - 52px);
            }
        }
    }
</style>