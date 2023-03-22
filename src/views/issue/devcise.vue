<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="设备编号" prop="rfid">
        <el-input v-model.trim="formInline.rfid"></el-input>
      </el-form-item>
      <el-form-item label="发放状态" prop="ffzt">
        <el-select v-model.trim="formInline.ffzt" placeholder="发放状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已发放" value="已发放"></el-option>
          <el-option label="未发放" value="未发放"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领用人员" prop="lyname">
        <el-input v-model.trim="formInline.lyname" placeholder="领用人员"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSerch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSuReg">重置</el-button>
      </el-form-item>
    </el-form>
    <commonTale :pageObj="pageObj" :tableData="tableData" :columObj="columObj" @rowOperation="rowOperation" />
    <!-- 发放设备 -->
    <el-dialog title="发放固定设备" :visible.sync="openVisible">
      <el-form :model="openFrom" :rules="openRul" ref="openFrom" label-width="150px">
        <el-form-item label="通行卡ID" prop="rfid">
          <el-input v-model="openFrom.rfid" disabled></el-input>
        </el-form-item>
        <el-form-item label="车辆类型" prop="carType">
          <el-input v-model="openFrom.carType" placeholder="请输入车辆类型"></el-input>
        </el-form-item>
        <el-form-item label="发放车辆" prop="fhcar">
          <el-input v-model="openFrom.fhcar" placeholder="请输入预约单号"></el-input>
        </el-form-item>
        <el-form-item label="车辆VIN/底盘号" prop="carVIM">
          <el-input v-model="openFrom.carVIM"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="khName">
          <el-input v-model="openFrom.khName"></el-input>
        </el-form-item>
        <el-form-item label="领用人员" prop="lyName">
          <el-input v-model="openFrom.lyName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="openFrom.tel"></el-input>
        </el-form-item>
        <el-form-item label="发放时间" prop="time">
          <el-date-picker v-model="openFrom.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('openFrom')">取消</el-button>
          <el-button type="primary" @click="submitForm('openFrom')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 回收设备 -->
    <el-dialog title="收回固定设备" :visible.sync="closeVisible">
      <el-form :model="closeFrom" :rules="closeRul" ref="sureFrom" label-width="150px">
        <el-form-item label="归还类型" prop="type">
          <el-radio-group v-model="closeFrom.type">
            <el-radio label="实验结束"></el-radio>
            <el-radio label="设备损坏"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="归还时间" prop="time">
          <el-date-picker v-model="closeFrom.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="归还人员" prop="lyName">
          <el-input v-model="closeFrom.lyName" placeholder="输入归还人员"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="claer('sureFrom')">取消</el-button>
          <el-button type="primary" @click="sure('sureFrom')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import commonTale from "@/components/common-table";
export default {
  components: { commonTale },
  data() {
    return {
      formInline: {},
      pageObj: {
        position: "right", //分页组件位置
        total: 20,
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: [
        { sbID: "123", zdId: "tx2023001", type: "在线", ffzt: "未发放", khname: "", lyname: "", tel: undefined, time: "" },
        {
          sbID: "124",
          zdId: "tx2023002",
          type: "离线",
          ffzt: "已发放",
          khname: "长安",
          lyname: "赵武",
          tel: 15736288040,
          time: "2022-10-15 17:24:15",
        },
        {
          sbID: "125",
          zdId: "tx2023003",
          type: "离线",
          ffzt: "已发放",
          khname: "柳汽",
          lyname: "王二",
          tel: 13452364866,
          time: "2023-03-01 08:45:36",
        },
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "sbID",
            label: "设备编号",
            align: "center",
          },
          {
            text: true,
            prop: "zdId",
            label: "定位设备ID",
            align: "center",
          },
          {
            text: true,
            prop: "type",
            label: "在线状态",
            align: "center",
          },
          {
            text: true,
            prop: "ffzt",
            label: "发放状态",
            align: "center",
          },
          {
            text: true,
            prop: "khname",
            label: "客户名称",
            align: "center",
          },
          {
            text: true,
            prop: "lyname",
            label: "领用人员",
            align: "center",
          },
          {
            text: true,
            prop: "tel",
            label: "联系电话",
            align: "center",
          },
          {
            text: true,
            prop: "time",
            label: "发放时间",
            align: "center",
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
                label: "发放",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.ffzt === "未发放";
                },
              },
              {
                operation: "editClose",
                type: "text",
                label: "收回",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.ffzt === "已发放";
                },
              },
              {
                operation: "see",
                type: "text",
                label: "发放记录",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.ffzt === "已发放";
                },
              },
              {
                operation: "see",
                type: "text",
                label: "使用记录",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.ffzt === "未发放";
                },
              },
            ],
          },
        ],
      },
      openVisible: false,
      openFrom: {},
      openRul: {
        fhcar: [{ required: true, message: "请选择归还类型", trigger: "change" }],
        lyName: [{ required: true, message: "请输入归还人员", trigger: "blur" }],
      },
      closeFrom: {},
      closeRul: {
        type: [{ required: true, message: "请选择归还类型", trigger: "change" }],
        time: [{ required: true, message: "请选择归还类型", trigger: "change" }],
        lyName: [{ required: true, message: "请填写归还人员", trigger: "blur" }],
      },
      closeVisible: false,
    };
  },
  methods: {
    rowOperation(row, $index, now) {
      switch (now) {
        case "see":
          this.$router.push('/issue/devciseList')
          break;
        case "editClose":
          this.closeVisible = true;
          break;
        case "editOpen":
          this.openVisible = true;
          this.openFrom = JSON.parse(JSON.stringify(row));
          this.openFrom.carType = "实验车辆";
          break;
        default:
          break;
      }
    },
    onSerch() {
      console.log("你倒是搜索下东西");
    },
    onSuReg() {
      this.formInline = {};
    },
    submitForm(fromName) {
      console.log(fromName);
      this.openVisible = false;
    },
    resetForm(fromName) {
      console.log(fromName);
      this.openVisible = false;
    },
    sure(formName) {
      console.log("确定归还吗？");
      this.$refs[formName].validate().then((res) => {
        if (res) {
          this.$refs[formName].resetFields();
          this.closeVisible = false;
        }
      });
    },
    claer(fromName) {
      this.$refs[fromName].resetFields();
      this.closeVisible = false;
    },
  },
};
</script>

<style></style>
