<template>
  <div>
    <el-form :model="formInline" :inline="true">
      <el-form-item label="设备编号" prop="title" class="first-input">
        <el-input v-model.trim="formInline.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="道闸状态" prop="publishState">
        <el-select v-model.trim="formInline.publishState" placeholder="道闸状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已发布" value="1"></el-option>
          <el-option label="未发布" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备状态" prop="recodeState">
        <el-select v-model.trim="formInline.recodeState" placeholder="设备状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已发布" value="1"></el-option>
          <el-option label="未发布" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="false">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="false">重置</el-button>
      </el-form-item>
    </el-form>
    <commonTable
      :tableData="tableData"
      :columObj="columObj"
      :pageObj="pageObj"
      @rowOperation="rowOperation"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></commonTable>
    <!-- 编辑道路数据 -->
    <el-dialog title="编辑道路信息" :visible.sync="editVisble" width="30vw">
      <el-form :model="editFrom" label-width="80px">
        <el-form-item label="道闸编号" prop="id">
          <el-input v-model="editFrom.id"></el-input>
        </el-form-item>
        <el-form-item label="道闸名称" prop="name">
          <el-input v-model="editFrom.id"></el-input>
        </el-form-item>
        <el-form-item label="所属道路" prop="publishState">
          <el-select v-model.trim="editFrom.publishState" placeholder="道闸状态">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="已发布" value="1"></el-option>
            <el-option label="未发布" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="道闸类型" prop="type">
          <el-radio-group v-model="editFrom.type">
            <el-radio label="进口"></el-radio>
            <el-radio label="出口"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="道闸位置" prop="id">
          <el-input v-model="editFrom.id" placeholder="这是地图"></el-input>
        </el-form-item>
        <el-form-item class="dilog">
          <el-button @click="editVisble = false">取消</el-button>
          <el-button type="primary" @click="editVisble = false">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 开关数据 -->
    <el-dialog title="道闸开关备注" :visible.sync="seeVisble" width="20vw">
      <el-form :model="seeFrom"  :inline="true">
        <el-form-item label="开关备注" prop="desc">
          <el-input type="textarea" v-model="seeFrom.desc"  placeholder="请填写开关备注信息"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item class="dilog">
          <el-button @click="seeVisble = false">取消</el-button>
          <el-button type="primary" @click="seeVisble = false">确认</el-button>
        </el-form-item>
      </el-form>
   
    </el-dialog>
  </div>
</template>

<script>
import commonTable from "@/components/common-table";
export default {
  components: {
    commonTable,
  },
  data() {
    return {
      formInline: {},
      editFrom: {},
      seeFrom: {},
      rule: [],
      editVisble: false,
      seeVisble: false,
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
            label: "道闸类型",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "所属场地",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "道闸位置",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "IP地址",
            align: "center",
          },
          {
            text: true,
            label: "设备状态",
            align: "center",
            ownDefined: true,
            ownDefinedReturn: (row, $index) => {
              return row.publishState == 0 ? "在线" : "离线";
            },
          },
          {
            text: true,
            label: "道闸状态",
            align: "center",
            ownDefined: true,
            ownDefinedReturn: (row, $index) => {
              return row.publishState == 0 ? "开启" : "关闭";
            },
          },
          {
            isOperation: true,
            fixed: "right",
            label: "操作",
            width: "300",
            align: "center",
            sortable: false,
            operation: [
              {
                operation: "editOpen",
                type: "text",
                label: "编辑",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "delete",
                type: "text",
                label: "开闸",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "delete",
                type: "text",
                label: "关闸",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "delete",
                type: "text",
                label: "常开",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
            ],
          },
        ],
      },
      tableData: [{ id: 1, title: "道路11" }],
    };
  },
  methods: {
    rowOperation(row, $index, now) {
      switch (now) {
        case "editOpen":
          this.editVisble = true;
          break;
        case "delete":
          this.seeVisble = true;
          break;
        default:
          break;
      }
    },
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

<style lang="scss"  scoped>
    .dilog{
        text-align: center;
    }
</style>
