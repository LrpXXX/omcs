<template>
  <div>
    <el-form :model="formInline" :inline="true">
      <el-form-item label="鉴权状态" prop="publishState">
        <el-select v-model.trim="formInline.publishState" placeholder="道闸状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已发布" value="1"></el-option>
          <el-option label="未发布" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="道闸名称" prop="recodeState">
        <el-select v-model.trim="formInline.recodeState" placeholder="设备状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已发布" value="1"></el-option>
          <el-option label="未发布" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="鉴权时间" prop="time">
        <el-date-picker
          v-model="formInline.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="false">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="false">重置</el-button>
      </el-form-item>
      <el-form-item class="serch-right">
        <el-button type="primary" @click="false">导出</el-button>
      </el-form-item>
    </el-form>
    <commonTable
      :tableData="tableData"
      :columObj="columObj"
      :pageObj="pageObj"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></commonTable>
    <!-- 编辑道路数据 -->
    <el-dialog title="新增记录" :visible.sync="editVisble" width="30vw">
      <el-form :model="editFrom" label-width="80px">
        <el-form-item label="设备编号" prop="id">
          <el-input v-model="editFrom.id"></el-input>
        </el-form-item>
        <el-form-item label="道闸名称" prop="name">
          <el-input v-model="editFrom.id"></el-input>
        </el-form-item>
        <el-form-item label="进出类型" prop="publishState">
          <el-select v-model.trim="editFrom.publishState" placeholder="进出类型">
            <el-option label="进" value="1"></el-option>
            <el-option label="出" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="进出时间" prop="time">
          <el-date-picker v-model="editFrom.time"></el-date-picker>
        </el-form-item>
        <el-form-item label="进出车辆" prop="id">
          <el-input v-model="editFrom.id" placeholder="进出车辆预约单号"></el-input>
        </el-form-item>
        <el-form-item class="dilog">
          <el-button @click="editVisble = false">取消</el-button>
          <el-button type="primary" @click="editVisble = false">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import commonTable from "@/components/common-table";
import { formatDate } from "@/service/zdk/timeTime";
export default {
  components: {
    commonTable,
  },
  data() {
    return {
      formInline: {},
      editFrom: {},
      rule: [],
      editVisble: false,
      pageObj: {
        total: 10,
        pageIndex: 1,
        pageSize: 10,
      },
      columObj: {
        columnData: [
          {
            text: true,
            prop: "title",
            label: "设备编号",
            align: "center",
          },
          {
            text: true,
            prop: "title",
            label: "道闸名称",
            align: "center",
          },
          {
            text: true,
            prop: "type",
            label: "鉴权车辆",
            align: "center",
          },
          {
            text: true,
            prop: "type",
            label: "所属企业",
            align: "center",
          },
          {
            text: true,
            prop: "type",
            label: "鉴权状态",
            align: "center",
          },
      
          {
            text: true,
            label: "失败原因",
            align: "center",
          },
          {
            text: true,
            prop:'userNmae',
            label: "通信卡",
            align: "center",
      
          },
          {
            text: true,
            prop:'userNmae',
            label: "定位设备",
            align: "center",
      
          },
          {
            text: true,
            label: "鉴权时间",
            align: "center",
            ownDefined: true,
            ownDefinedReturn: (row, $index) => {
              return (row.publishState = formatDate(new Date()) + "-" + formatDate(new Date().getTime() + 3600 * 1000 * 24 * 30));
            },
          },
        ],
      },
      tableData: [{ id: 1, title: "道路11",userNmae:'admin' }],
    };
  },
  methods: {
    handleSizeChange(e) {
      console.log(e);
      this.$set(this.pageObj, "pageSize", e);
    },
    handleCurrentChange(e) {
      console.log(e);
      this.$set(this.pageObj, "pageIndex", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.dilog {
  text-align: center;
}
.serch-right {
  float: right;
}
</style>
