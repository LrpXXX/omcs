<template>
  <div>
    <div class="seeTable">
      <div class="head">账单编号：账单明细</div>
      <div>
        <div> 项目信息</div>
       
        <div class="mesage">
            <div>实验单位</div>
            <div>{{ 'xxxxxxxx' }},{{ 'xxxxxxx' }}</div>
            <div>任务编号</div>
            <div>{{ 'xxxxxxxx' }},{{ 'xxxxxxx' }}</div>
        </div>
        <div class="mesage">
            <div>试验时间</div>
            <div>{{ 'xxxxxxxx' }},{{ 'xxxxxxx' }}</div>
            <div>实验项目</div>
            <div>{{ 'xxxxxxxx' }},{{ 'xxxxxxx' }}</div>
        </div>
        <div class="mesage1">
            <div>费用合计</div>
            <div>30000</div>
        </div>
      </div>

      <div>
       <div>项目合计</div>
        <el-table :data="tableData" style="width: 100%" max-height="250">
          <el-table-column fixed prop="id" label="序号" ></el-table-column>
          <el-table-column prop="name" label="场地使用费" ></el-table-column>
          <el-table-column prop="province" label="固定使用费" ></el-table-column>
          <el-table-column prop="city" label="停车费" ></el-table-column>
          <el-table-column prop="address" label="其他费用"></el-table-column>
        </el-table>
        <div class="mesage1">
            <div>费用合计</div>
            <div>30000</div>
        </div>
      </div>
    </div>
    <div class="flex-grop">
      <el-button type="primary" @click="save">下载</el-button>
      <el-button @click="cal">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
        tableData:[{id:1,name:2000,province:1000,city:500,address:500}]
    }
  },
  methods:{
    save(){
        this.$emit('closeSeeDialog')
    },
    cal(){
        this.$emit('closeSeeDialog')
    }
  }
};
</script>

<style lang="scss" scoped>
.seeTable {
  border: 1px solid #ccc;
  .head {
    font-weight: bold;
    text-align: center;
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #ccc;
  }
  .mesage,.mesage1{
    display: flex;
    justify-content: space-around;
    align-content: center;
    text-align: center;
  }
  .mesage>div{
    width: 25%;
    height: 35px;
    line-height: 35px;
    border: 1px solid #ccc;
  }
  .mesage1 >div{
    width: 50%;
    height: 35px;
    line-height: 35px;
    border: 1px solid #ccc;
  }
}
.flex-grop {
    display: flex;
    justify-content: center;
    align-content: center;
  }
</style>
