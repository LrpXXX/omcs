<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="类型" class="first-input">
        <el-select v-model.trim="formInline.messageType" placeholder="类型">
          <el-option label="预约通知" value="预约通知"></el-option>
          <el-option label="增加场地" value="增加场地"></el-option>
          <el-option label="驾驶员培训到期" value="驾驶员培训到期"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="开始时间" v-model.trim="formInline.startDate" style="width: 100%"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="结束时间" v-model="formInline.endDate" style="width: 100%"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSerch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSuReg">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单列 -->
    <common-table
      :table-data="tableData"
      :page-obj="pageObj"
      :colum-obj="columObj"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></common-table>
  </div>
</template>

<script>
import commonTable from "@/components/common-table/index.vue";
import message from "@/service/api/message/message";
export default {
  components: { commonTable },
  data() {
    return {
      formInline: {},
      tableData: [],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "createTime",
            label: "时间",
            width: "300",
            align: "center",
          },
          {
            text: true,
            prop: "messageType",
            label: "类型",
            width: "200",
            align: "center",
          },
          {
            text: true,
            prop: "messageContent",
            label: "内容",
            align: "center",
          },
        ],
      },
      pageObj: {
        pageIndex: 1,
        pageSize: 10,
        total: 20,
      },
      condition: []
    };
  },
  created() {
    this.initNotiMessage();
  },
  methods: {
    initNotiMessage(condition) {
      let parmary = {
        pageNum: this.pageObj.pageIndex,
        pageSize: this.pageObj.pageSize,
        condition,
      };
      message
        .getMessageByPage(parmary)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.tableData = res.data.records;
            this.pageObj = {
              pageIndex: res.data.current,
              pageSize: res.data.size,
              total: res.data.total,
            };
          } else {
            this.$message.error("系统故障!");
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    onSerch(pageIndex, pageSize) {
      if (!isNumber(pageIndex)) {
        this.pageObj.pageIndex = 1;
      }
      if (this.formInline.messageType != undefined && this.formInline.title != "") {
        let messageType = {
          column: "message_type",
          type: "eq",
          value: this.formInline.messageType,
        };
        this.condition.push(messageType);
      }
      if (this.formInline.startDate != undefined && this.formInline.startDate != "") {
        let startDate = {
          column: "create_time",
          type: "ge",
          value: this.formInline.startDate,
        };
        this.condition.push(startDate);
      }
      if (this.formInline.endDate != undefined && this.formInline.endDate != "") {
        let endDate = {
          column: "create_time",
          type: "le",
          value: this.formInline.endDate,
        };
        this.condition.push(endDate);
      }
      this.initNotiMessage(JSON.stringify(this.condition));
      // 重置条件数组
      this.condition = [];
    },
    onSuReg() {
      this.formInline = {};
      this.initNotiMessage();
    },
    //页码变化
    handleCurrentChange(e) {
      this.pageObj.pageIndex = e;
      this.onSerch(e);
    },
    //条数变化
    handleSizeChange(e) {
      this.pageObj.pageSize = e;
      this.pageObj.pageIndex = 1;
      this.onSerch(1, e);
    },
  },
};
</script>

<style lang="scss" scoped>
  .first-input {
    margin-left: 20px;
  }
</style>
