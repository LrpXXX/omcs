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
        <el-form-item label="设备编号" prop="equipmentNumber">
          <el-input v-model="openFrom.equipmentNumber" disabled></el-input>
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
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="openFrom.customerName"></el-input>
        </el-form-item>
        <el-form-item label="领用人员" prop="recipient">
          <el-input v-model="openFrom.recipient"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactNumber">
          <el-input v-model="openFrom.contactNumber"></el-input>
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
        <el-form-item label="归还时间" prop="issueTime">
          <el-date-picker v-model="closeFrom.issueTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="归还人员" prop="recipient">
          <el-input v-model="closeFrom.recipient" placeholder="输入归还人员"></el-input>
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
import { Devcise } from "@/service/api/issue/devcise";
import { InterPhone } from "@/service/api/issue/interPhone";
import { formatDate } from "@/common/filters";
import { Message } from "element-ui";

export default {
  components: { commonTale },
  data() {
    return {
      formInline: {},
      pageObj: {
        total: 20,
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: [
        {
          equipmentNumber: "123",
          equipmentId: "tx2023001",
          onlineState: "在线",
          issueState: "未发放",
          customerName: "",
          recipient: "",
          contactNumber: undefined,
          issueTime: "",
        },
        {
          equipmentNumber: "124",
          equipmentId: "tx2023002",
          onlineState: "离线",
          issueState: "已发放",
          customerName: "长安",
          recipient: "赵武",
          contactNumber: 15736288040,
          issueTime: "2022-10-15 17:24:15",
        },
        {
          sbID: "125",
          equipmentId: "tx2023003",
          onlineState: "离线",
          issueState: "已发放",
          customerName: "柳汽",
          recipient: "王二",
          contactNumber: 13452364866,
          issueTime: "2023-03-01 08:45:36",
        },
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "equipmentNumber",
            label: "设备编号",
            align: "center",
          },
          {
            text: true,
            prop: "equipmentId",
            label: "定位设备ID",
            align: "center",
          },
          {
            text: true,
            prop: "onlineState",
            label: "在线状态",
            align: "center",
          },
          {
            text: true,
            prop: "issueState",
            label: "发放状态",
            align: "center",
          },
          {
            text: true,
            prop: "customerName",
            label: "客户名称",
            align: "center",
          },
          {
            text: true,
            prop: "recipient",
            label: "领用人员",
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
            prop: "issueTime",
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
                  return row.issueState === "未发放";
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
                  return row.issueState === "已发放";
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
                  return row.issueState === "已发放";
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
                  return row.issueState === "未发放";
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
        contactPerson: [{ required: true, message: "请输入归还人员", trigger: "blur" }],
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
          this.$router.push("/issue/devciseList");
          break;
        case "editClose":
          this.closeVisible = true;
          this.closeFrom = JSON.parse(JSON.stringify(row));
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
      console.log(this.formInline);
      let condition = [];
      if (this.formInline.rfid && this.formInline.ffzt && this.formInline.lyname) {
        condition = [
          { column: "equipmentNumber", type: "like", value: this.formInline.rfid },
          { column: " issueState", type: "eq", value: this.formInline.ffzt === "已发放" ? 1 : 0 },
          { column: "recipient", type: "like", value: this.formInline.lyname },
        ];
      } else if (this.formInline.ffzt) {
        condition = [{ column: " issueState", type: "eq", value: this.formInline.ffzt === "已发放" ? 1 : 0 }];
      } else if (this.formInline.rfid) {
        condition = [{ column: "equipmentNumber", type: "like", value: this.formInline.rfid }];
      } else if (this.formInline.lyname) {
        condition = [{ column: "recipient", type: "like", value: this.formInline.lyname }];
      }
      console.log(condition);
      const data = {
        condition: JSON.stringify(condition),
        pageSize: 10,
        pageNum: 1,
      };
      this.getTableList(data);
      this.formInline = {};
    },
    onSuReg() {
      this.formInline = {};
      this.getTableList();
    },
    submitForm(fromName) {
      console.log(fromName);
      console.log(this.openFrom);
      // this.openVisible = false;
      const data = {
        equipmentId: this.openFrom.id,
        equipmentNumber: this.openFrom.equipmentNumber,
        occouredTime: formatDate(this.openFrom.issueTime),
        contactPerson: this.openFrom.recipient,
        contactNumber: this.openFrom.contactNumber,
        isReturn: 0,
        // contactName:this.openFrom.contactName,
        bookingId: 1,
        equipmentType: "定位设备",
      };
      console.log(data);
      InterPhone.getIusse(data)
        .then((res) => {
          if (res.code == 200) {
            Message.success("设备发放成功");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((min) => {
          this.openVisible = false;
          this.getTableList();
        });
    },
    resetForm(fromName) {
      this.$refs[fromName].resetFields();
      this.openVisible = false;
    },
    sure(formName) {
      console.log("确定归还吗？");
      this.$refs[formName].validate().then((res) => {
        if (res) {
          console.log(this.closeFrom);
          const data = {
            equipmentId: this.closeFrom.id,
            equipmentNumber: this.closeFrom.equipmentNumber,
            occouredTime: formatDate(this.closeFrom.issueTime),
            contactPerson: this.closeFrom.recipient,
            contactNumber: this.closeFrom.contactNumber,
            isReturn: 1,
            bookingId: 1,
            equipmentType: "定位设备",
            returnType: this.closeFrom.type === "实验结束" ? 1 : 2,
          };
          console.log(data);
          InterPhone.getIusseClose(data).then((res) => {
            if (res.code === 200) {
              Message.success("设备回收成功");
              this.getTableList();
              this.closeVisible = false;
            }
          });
          // console.log(data)
        }
      });
    },
    claer(fromName) {
      this.$refs[fromName].resetFields();
      this.closeVisible = false;
    },
    //  获取定位设备数据
    async getTableList(data) {
      try {
        const res = await Devcise.getFixedListPage(data);
        if (res.code === 200) {
          this.tableData = res.data.records.map((item) => {
            item.onlineState === 0 ? (item.onlineState = "离线") : (item.onlineState = "在线");
            item.issueState === 0 ? (item.issueState = "未发放") : (item.issueState = "已发放");
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
    this.getTableList();
  },
};
</script>

<style></style>
