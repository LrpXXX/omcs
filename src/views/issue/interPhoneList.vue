<template>
  <div>
    <el-form v-model="formInline" :inline="true">
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
      <el-form-item label="类型" prop="type">
        <el-select v-model.trim="formInline.type" placeholder="选择类型">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="发放" value="发放"></el-option>
          <el-option label="收回" value="收回"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领用/归还人员" prop="lyname">
        <el-input v-model.trim="formInline.lyname" placeholder="模糊匹配领用或归还人员"></el-input>
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
import { InterPhone } from "@/service/api/issue/interPhone";
import { formatDate } from "@/common/filters";
import {exportFile} from "@/common/common";
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
        { zdId: "1002", time: "2015-09-31  15:31:02", type: "发放", name: "刘强", tel: 15736288040, khName: "中国长安" },
        { zdId: "1002", time: "2015-09-31  15:31:02", type: "发放", name: "", tel: undefined, khName: "中国汽研" },
        { zdId: "1003", time: "2018-09-31  15:31:02", type: "收回", name: "", tel: undefined, khName: "lims" },
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "terminalNumber",
            label: "设备编号",
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
    onSerch() {
      let data = [];
      if (this.formInline.time && this.formInline.type && this.formInline.lyname) {
        data = {
          pageSize: 10,
          pageNum: 1,
          startTime: formatDate(this.formInline.time[0]),
          endTime: formatDate(this.formInline.time[1]),
          isReturn: this.formInline.type === "发放" ? 1 : 0,
          contactPerson: this.formInline.lyname,
        };
      } else if (this.formInline.type) {
        data = {
          pageSize: 10,
          pageNum: 1,
          isReturn: this.formInline.type === "发放" ? 1 : 0,
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
      }
      this.getInterPhoneList(data);
      this.formInline = {};
    },
    onSuReg() {
      console.log("搜索条件清空");
      this.getInterPhoneList();
      this.formInline = {};
    },
    goBack() {
      this.$router.push("/issue/interPhone");
    },
    //cha
    excl() {
      console.log("导出excl文件");
     const  data=  exportFile('/system/sm-equipment-interphone/export')
      console.log(data)
    },
    // 总页数发生改变
    handleSizeChange(e) {
      this.$emit("handleSizeChange", e);
      console.log(e);
      this.$set(this.pageObj, "pageSize", e);
      const data = {
        pageNum: this.pageObj.pageIndex,
        pageSize: this.pageObj.pageSize,
      };
      this.getInterPhoneList(data);
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
      this.getInterPhoneList(data);
    },
    //  查询对讲机使用记录
    async getInterPhoneList(data) {
      try {
        let res = await InterPhone.getWorkingRecordsList(data);
        if (res.code === 200) {
          this.tableData = res.data.records.map((item) => {
            item.isReturn === 0 ? (item.isReturn = "发放") : (item.isReturn = "收回");
            return item;
          });
          this.$set(this.pageObj, "total", res.data.total);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    this.getInterPhoneList();
  },
};
</script>

<style></style>
