<template>
    <ul>
        <li
        :class="[{ 'active-tab': tabActive === index}, tabColor[tab.type]]"
        v-for="(tab, index) in tabList"
        :key="index"
        @click="tabChange(index)">
            {{tab.label}}
            <span v-if="tab.value">：{{tab.value}}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        data(){
            return {
                tabActive: 0,
                tabList: [
                    {
                        label: '全部',
                        type: 0
                    },
                    {
                        label: '正常',
                        type: 1,
                        value: 1
                    },
                    {
                        label: '煤温异常',
                        type: 2,
                        value: 1
                    },
                    {
                        label: '摄像头失效',
                        type: 3,
                        value: 1
                    }
                ],
                tabColor: {
                    1: 'tab-success',
                    2: 'tab-error',
                    3: 'tab-invalid'
                }
            }
        },
        methods: {
            tabChange(e){
                if(this.tabActive == e) return
                this.tabActive = e;
                this.$emit('tabChange', e)
            }
        }
    }
</script>

<style lang="scss" scoped>
    ul{
        display: flex;
        li{
            height: 30px;
            line-height: 30px;
            text-align: center;
            padding: 0 33px;
            background: #FFFFFF;
            border: 1px solid #D9D9D9;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
            position: relative;
            cursor: pointer;
            &:first-child{
                border-radius: 4px 0px 0px 4px;
            }
            &:last-child{
                border-radius: 0px 4px 4px 0px;
            }
            
            &:not(&:first-child)::after{
                content: '';
                position: absolute;
                width: 6px;
                height: 6px;
                border-radius: 100%;
                left: 16px;
                top: 50%;
                margin-top: -3px;
            }
        }
        .active-tab{
            height: 32px;
            line-height: 32px;
            border: none;
            background: #334761;
            color: #FFFFFF;
        }
        .tab-success,
        .tab-error,
        .tab-invalid{
            padding-right: 16px;
        }

        .tab-success::after{
            background-color: #2BD193;
        }
        .tab-error::after{
            background-color: #F45656;
        }
        .tab-invalid::after{
            background-color: #98A1AC;
        }
    }
</style>