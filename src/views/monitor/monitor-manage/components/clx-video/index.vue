<template>
    <div class="clx-video">
        <ul>
            <li v-for="num in list" :key="num">
                <img src="./../../../../../assets/images/login-bg.png">

                <div class="bottom-mantle">
                    <span>1组1号摄像头 煤温380度</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                list: 9
            }
        }
    }
</script>

<style lang="scss" scoped>
.clx-video{
    width: 100%;
    ul{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li{
            width: calc((100% - 48px) / 3);
            margin-bottom: 24px;
            height: 240px;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
        }
        li:nth-child(3n-1){
            margin: 0 24px;
        }
        li:nth-last-child(1),
        li:nth-last-child(2),
        li:nth-last-child(3){
            margin-bottom:0;
        }

        .bottom-mantle{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 36px;
            line-height: 36px;
            background: rgba(0, 0, 0, 0.7);
            padding: 0 10px;
            font-size: 14px;
            color: #FFFFFF;
        }
    }
    
}
</style>