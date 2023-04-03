<template>
  <div>
    <el-form v-model="formInline" :inline="true">
      <el-form-item label="设备编号" prop="sbID">
        <el-input v-model.trim="formInline.sbID" placeholder="设备编号"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model.trim="formInline.type" placeholder="选择类型">
          <el-option label="发放" value="发放"></el-option>
          <el-option label="收回" value="收回"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领用/归还人员" prop="lyname">
        <el-input v-model.trim="formInline.lyname" placeholder="模糊匹配领用或归还人员"></el-input>
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-date-picker
          v-model="formInline.time"
          type="daterange"
          align="top"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSerch">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSuReg">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="goBack">返回</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="excl">导出</el-button>
      </el-form-item>
    </el-form>
    <commonTale
      :pageObj="pageObj"
      :tableData="tableData"
      :columObj="columObj"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></commonTale>
  </div>
</template>

<script>
import commonTale from "@/components/common-table";
import { Devcise } from "@/service/api/issue/devcise";
import {formatDate} from "@/common/filters";
export default {
  components: {
    commonTale,
  },
  data() {
    return {
      formInline: {},
      pageObj: {
        position: "right", //分页组件位置
        total: 20,
        pageIndex: 1,
        pageSize: 10,
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      tableData: [
        { zdId: "1002", sbId: "tx2023001", time: "2015-09-31  15:31:02", type: "发放", name: "刘强", tel: 15736288040, khName: "中国长安" },
        { zdId: "1002", sbId: "tx2023002", time: "2015-09-31  15:31:02", type: "发放", name: "", tel: undefined, khName: "中国汽研" },
        { zdId: "1003", sbId: "tx2023003", time: "2018-09-31  15:31:02", type: "收回", name: "", tel: undefined, khName: "lims" },
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "equipmentNumber",
            label: "终端编号",
            align: "center",
          },
          {
            text: true,
            prop: "equipmentId",
            label: "设备Id",
            align: "center",
          },
          {
            text: true,
            prop: "occouredTime",
            label: "时间",
            align: "center",

            sortable: true,
          },
          {
            text: true,
            prop: "isReturn",
            label: "类型",
            align: "center",
          },
          {
            text: true,
            prop: "contactPerson",
            label: "领用/归还人员",
            align: "center",
          },
          {
            text: true,
            prop: "contactNumber",
            label: "联系电话",
            align: "center",
          },
          {
            text: true,
            prop: "customerName",
            label: "客户名称",
            align: "center",
          },
        ],
      },
    };
  },
  methods: {
    // 总页数发生改变
    handleSizeChange(e) {
      this.$emit("handleSizeChange", e);
      console.log(e);
      this.$set(this.pageObj, "pageSize", e);
      const data = {
        pageNum: this.pageObj.pageIndex,
        pageSize: this.pageObj.pageSize,
      };
      this.getTableListt(data);
    },
    // 页码变化
    handleCurrentChange(e) {
      this.$emit("handleCurrentChange", e);
      console.log(e);
      this.$set(this.pageObj, "pageIndex", e);
      const data = {
        pageNum: this.pageObj.pageIndex,
        pageSize: this.pageObj.pageSize,
      };
      this.getTableListt(data);
    },
    //模糊查询
    onSerch() {
      console.log("搜索一下");
      let data = [];
      if (this.formInline.time && this.formInline.type && this.formInline.lyname&&this.formInline.sbID) {
        data = {
          pageSize: 10,
          pageNum: 1,
          startTime: formatDate(this.formInline.time[0]),
          endTime: formatDate(this.formInline.time[1]),
          isReturn: this.formInline.type === "发放" ? 0 : 1,
          contactPerson: this.formInline.lyname,
          equipmentNumber:this.formInline.rfid
        };
      } else if (this.formInline.type) {
        data = {
          pageSize: 10,
          pageNum: 1,
          isReturn: this.formInline.type === "发放" ? 0 : 1,
          contactPerson: this.formInline.lyname,
        };
      } else if (this.formInline.time) {
        data = {
          pageSize: 10,
          pageNum: 1,
          startTime: formatDate(this.formInline.time[0]),
          endTime: formatDate(this.formInline.time[1]),
          contactPerson: this.formInline.lyname,
        };
      } else if (this.formInline.lyname) {
        data = {
          pageSize: 10,
          pageNum: 1,
          contactPerson: this.formInline.lyname,
        };
      }else  if(this.formInline.sbID){
        data={
          equipmentNumber:this.formInline.sbID,
          pageSize: 10,
          pageNum: 1,
        }
      }
      this.getTableListt(data)
      this.formInline={}
    },
    onSuReg() {
      console.log("搜索条件清空");
      this.formInline={}
      this.getTableListt()
    },
    goBack() {
      this.$router.push("/issue/devcise");
    },
    excl() {
      console.log("导出excl文件");
    },
    //  查看定位i设备使用情况
    async getTableListt(data) {
      try {
        let res = await Devcise.getFixedUse(data);
        if (res.code === 200) {
          this.tableData = res.data.records.map(item=>{
            item.isReturn===0?item.isReturn='发放':item.isReturn='收回'
            return item
          });
          this.$set(this.pageObj, "total", res.data.total);
        }
      } catch (e) {
        console.log("错误了");
        console.log(e);
      }
    },
  //  获取固定设备使用情况

  },
  created() {
    this.getTableListt()
  },
};
</script>

<style></style>
