<template>
  <div>
    <el-form v-model="formInline" ref="serchFrom" :inline="true">
      <el-form-item label="通行卡ID" prop="rfid">
        <el-input v-model.trim="formInline.rfid"></el-input>
      </el-form-item>
      <el-form-item label="发放状态" prop="ffzt">
        <el-select v-model.trim="formInline.ffzt" placeholder="发放状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已发送" value="已发送"></el-option>
          <el-option label="未发送" value="未发送"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车辆类型" prop="region">
        <el-select v-model.trim="formInline.region" placeholder="车辆类型">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="试验样车" value="实验车辆"></el-option>
          <el-option label="巡检车辆" value="巡检车辆"></el-option>
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
      <el-form-item style="float: right">
        <el-button type="primary" @click="onSubAdd">制卡</el-button>
      </el-form-item>
    </el-form>
    <commonTable :pageObj="pageObj" :tableData="tableData" :columObj="columObj" @rowOperation="rowOperation" />
    <!-- 制卡 -->
    <el-dialog title="制卡" :visible.sync="dialogFormVisible">
      <el-form :model="idFrom" :rules="idFromRul" ref="idFrom" label-width="150px">
        <!-- <el-form-item label="通行卡ID" prop="rfid">
          <el-input v-model="idFrom.rfid" disabled placeholder="物面卡ID自动生成"></el-input>
        </el-form-item> -->
        <el-form-item label="物面卡号" prop="surfaceNumber">
          <el-input v-model="idFrom.surfaceNumber" placeholder="填写通行卡物面卡号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="exitFrom('idFrom')">取消</el-button>
          <el-button type="primary" @click="sureFrom('idFrom')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 发放通行卡 -->
    <el-dialog title="发放通行证" :visible.sync="openVisible">
      <el-form :model="openFrom" :rules="openRul" ref="openFrom" label-width="150px">
        <el-form-item label="通行卡ID" prop="rfid">
          <el-input v-model="openFrom.rfid" disabled></el-input>
        </el-form-item>
        <el-form-item label="车辆类型" prop="carType">
          <el-select v-model="openFrom.carType" placeholder="请选择车辆类型">
            <el-option label="试验样车" value="试验样车"></el-option>
            <el-option label="巡检车辆" value="巡检车辆"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发放车辆" prop="fhcar">
          <el-input v-model="openFrom.fhcar"></el-input>
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
    <!-- 回收通行卡 -->
    <el-dialog title="收回通行证" :visible.sync="closeVisible">
      <el-form :model="closeFrom" :rules="closeRul" ref="sureFrom" label-width="150px">
        <el-form-item label="归还类型" prop="type">
          <el-radio-group v-model="closeFrom.type">
            <el-radio label="实验结束"></el-radio>
            <el-radio label="设备损坏"></el-radio>
          </el-radio-group>
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
import commonTable from "@/components/common-table/index.vue";
import { SunCard } from "@/service/api/issue/sunCard";
import { Message } from "element-ui";
export default {
  components: { commonTable },
  data() {
    return {
      formInline: {
        rfid: "",
        ffzt: "",
        lyname: "",
        region: "",
      },
      tableData: [
        {
          rfid: "tx2023001",
          IDcard: "987654321",
          idType: "已发放",
          carType: "巡检车辆",
          carVIM: "",
          khName: "",
          fhcar: "东风",
          lyName: "赵三",
          tel: "15736288040",
          time: "2023-03-21 10:48:15",
        },
        {
          rfid: "tx2023002",
          IDcard: "987654320",
          idType: "未发放",
          carType: "实验样车",
          carVIM: "",
          khName: "",
          fhcar: "东风",
          lyName: "李四",
          tel: "15736288048",
          time: "2023-03-21 10:48:15",
        },
        {
          rfid: "tx2023003",
          IDcard: "987654311",
          idType: "未发放",
          carType: "巡检车辆",
          carVIM: "",
          khName: "长安",
          fhcar: "东风",
          lyName: "王五",
          tel: "15736288045",
          time: "2023-03-21 10:48:15",
        },
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "physicalId",
            label: "通行卡ID",
            align: "center",
            width: "150",
            sortable: true,
          },
          {
            text: true,
            prop: "surfaceNumber",
            label: "物面卡号",
            align: "center",
            width: "300",
          },
          {
            text: true,
            prop: "issueState",
            label: "发放状态",
            align: "center",
            width: "150",
          },
          {
            text: true,
            prop: "vehicleType",
            label: "车辆类型",
            width: "300",
            align: "center",
          },
          {
            text: true,
            prop: "khName",
            label: "客户名称",
            width: "200",
            align: "center",
          },
          {
            text: true,
            prop: "issueVehicle",
            label: "发放车辆",
            width: "200",
            align: "center",
          },
          {
            text: true,
            prop: "recipient",
            label: "领用人员",
            width: "200",
            align: "center",
          },
          {
            text: true,
            prop: "contactNumber",
            label: "联系电话",
            width: "200",
            align: "center",
          },
          {
            text: true,
            prop: "issueTime",
            label: "发放时间",
            width: "200",
            align: "center",
          },
          //如果为操作列,则需要填写需要的操作按钮,类型为Object。operation(操作类型,可选edit,delete,see),type(按钮样式,参考el—botton类型),label(按钮文字)icon(参考el-icon),color(字体颜色)
          {
            isOperation: true,
            fixed: "right",
            label: "操作",
            width: "480",
            align: "center",
            sortable: false,
            operation: [
              {
                operation: "editOpen",
                type: "text",
                label: "发卡",
                icon: "",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.issueState === "未发放";
                },
              },
              {
                operation: "eidtClose",
                type: "text",
                label: "收卡",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.issueState === "已发放";
                },
              },
            ],
          },
        ],
      },
      pageObj: {
        position: "right", //分页组件位置
        total: 20,
        pageIndex: 1,
        pageSize: 10,
      },
      dialogFormVisible: false,
      idFrom: {
        surfaceNumber: "",
      },
      idFromRul: {
        surfaceNumber: [{ required: true, message: "请输入通行卡物面ID", trigger: "blur" }],
      },
      closeFrom: {},
      closeRul: {
        type: [{ required: true, message: "请选择归还类型", trigger: "change" }],
      },
      closeVisible: false,
      openVisible: false,
      openFrom: {},
      openRul: {
        carType: [{ required: true, message: "请选择车辆类型", trigger: "change" }],
        fhcar: [{ required: true, message: "请选择归还类型", trigger: "change" }],
        lyName: [{ required: true, message: "请选择归还类型", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 操作列
    rowOperation(row, $index, now) {
      switch (now) {
        case "editOpen":
          this.openVisible = true;
          break;
        case "eidtClose":
          this.closeVisible = true;
          break;
        default:
          break;
      }
    },
    // s搜索按钮
    onSerch() {
      console.log(this.formInline);
      this.formInline = {};
    },
    // 搜索框重置按钮
    onSuReg() {
      this.formInline = {};
    },
    onSubAdd() {
      this.dialogFormVisible = true;
    },
    // 制卡确认按钮
    sureFrom(fromName) {
      console.log(this.$refs[fromName]);
      this.$refs[fromName].validate().then((res) => {
        if (res) {
          const data = {
            surfaceNumber: this.idFrom.surfaceNumber,
          };
          console.log(data);
          this.addSunCard(data);
          this.dialogFormVisible = false;
        }
      });
    },
    exitFrom(fromName) {
      // this.idFrom[fromName].resetFields();
      this.dialogFormVisible = false;
    },
    sure(formName) {
      console.log("确定归还吗？");
      console.log(this.closeFrom);
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
    // 发放数据
    submitForm(fromName) {
      console.log(fromName);
      this.openVisible = false;
    },
    resetForm(fromName) {
      console.log(fromName);
      this.openVisible = false;
    },
    // 获取通信卡数据
    getListPage(data) {
      SunCard.getListPage(data)
        .then((res) => {
          console.log(res);
          this.tableData = res.data.records.map((item) => {
            item.issueState === 0 ? (item.issueState = "未发放") : (item.issueState = "已发放");
            return  item
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取
    // 异步新增通信卡数据
    async addSunCard(data) {
      let res = await SunCard.addCard(data);
      if (res.code === 200) {
        Message.success("通行卡新增成功");
        this.getListPage();
      }
    },
  },
  created() {
    this.getListPage();
  },
};
</script>

<style></style>
