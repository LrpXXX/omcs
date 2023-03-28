<template>
  <div class="personnel">
    <el-card class="card-demo">
      驾驶人员配置
      <div class="stu"></div>
      <el-form :model="timeFrom" :rules="timeFromRul" :inline="true">
        <el-form-item label="培训有效时间" prop="paramValue">
          <el-input v-model="timeFrom.paramValue" placeholder="请填入驾驶有效时间，单位为年"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="card-demo">
      巡检人员/车辆配置
      <div class="buttom"></div>
      <el-form :model="timeFrom" :rules="timeFromRul" :inline="true">
        <el-form-item label="人员/车辆类型" prop="time">
          <el-button @click="save">添加</el-button>
          <template v-if="CODE_TEXT.length>0">
            <span v-for="(item,index) in CODE_TEXT" :key="index" style="margin: 15px;" >{{ item.codeText }}</span>
          </template>
          
        </el-form-item>
      </el-form>
    </el-card>
    <div style="text-align: center">
      <el-button type="primary" @click="staffingAdd">保存</el-button>
      <el-button>取消</el-button>
    </div>
    <el-dialog title="新增人员配置" :visible.sync="addVisible">
      <el-card :span="18">
        <el-input v-model="codeText" placeholder="请输入新增配置项"></el-input>
        <el-button type="primary" @click="sure">确认</el-button>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { System } from "@/service/api/config/system";
export default {
  data() {
    return {
      addVisible: false,
      CODE_TEXT: [],
      codeText:'',
      timeFrom: {},
      timeFromRul: {
        paramValue: [{ required: true, message: "请输入培训时间", tigger: "blur" }],
      },
    };
  },
  methods: {
    save() {
      this.addVisible = true;
    },
    sure(){
      this.CODE_TEXT.push({codeText:this.codeText})
      this.codeText=''
      this.addVisible=false
    },
    staffingAdd() {
      const data = {
        codeList:this.CODE_TEXT,
        smConfig:this.timeFrom
      };
      System.staffigAdd(data)
        .then((res) => {
          if (res.code === 200) {
            console.log(111);
            this.getStafList()
          }
        })
        .catch((err) => err);
      
    },
    getStafList(){
      System.staffing().then((res) => {
      console.log(res);
      this.timeFrom = res.data.smConfig;
    });
    }
  },
  created() {
    this.getStafList()
  },
};
</script>

<style lang="scss" scoped>
.personnel {
  width: 1200px;
  margin: auto;
}
.card-demo {
  background-color: #ccc;
  margin: 0 auto;
  margin-bottom: 20px;
  height: 20vh;
  .buttom {
    border-bottom: 2px solid #494747;
    margin: 20px -30px;
  }
  .stu {
    margin: 20px;
  }
}
</style>
