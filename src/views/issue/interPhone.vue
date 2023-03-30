<template>
  <div>
    <el-form v-model="formInline" :inline="true">
      <el-form-item label="终端编号" prop="rfid">
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
      <el-form-item style="float: right">
        <el-button type="primary" @click="onSubAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <commonTale :pageObj="pageObj" :tableData="tableData" :columObj="columObj" @rowOperation="rowOperation"></commonTale>
    <!-- 新增 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="idFrom" :rules="idFromRul" ref="idFrom" label-width="150px">
        <el-form-item label="终端编号" prop="terminalNumber">
          <el-input v-model="idFrom.terminalNumber" placeholder="终端编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="exitFrom('idFrom')">取消</el-button>
          <el-button type="primary" @click="sureFrom('idFrom')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 发放对讲机 -->
    <el-dialog title="发放对讲机" :visible.sync="openVisible">
      <el-form :model="openFrom" :rules="openRul" ref="openFrom" label-width="150px">
        <el-form-item label="终端编号" prop="terminalNumber">
          <el-input v-model="openFrom.terminalNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="领用人员" prop="recipient">
          <el-input v-model="openFrom.recipient"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactNumber">
          <el-input v-model="openFrom.contactNumber"></el-input>
        </el-form-item>
        <el-form-item label="发放时间" prop="issueTime">
          <el-date-picker v-model="openFrom.issueTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('openFrom')">取消</el-button>
          <el-button type="primary" @click="submitForm('openFrom')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 收回对讲机 -->
    <el-dialog title="收回对讲机" :visible.sync="closeVisible">
      <el-form :model="closeFrom" :rules="closeRul" ref="closeFrom" label-width="150px">
        <el-form-item label="归还时间" prop="time">
          <el-date-picker v-model="closeFrom.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="归还人员" prop="khName">
          <el-input v-model="closeFrom.khName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetCloseForm('closeFrom')">取消</el-button>
          <el-button type="primary" @click="submitCloseForm('closeFrom')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import commonTale from "@/components/common-table";
import { InterPhone } from "@/service/api/issue/interPhone";
import { formatDate } from "@/common/filters";
import { Message } from "element-ui";
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
      columObj: {
        columnData: [
          {
            text: true,
            prop: "terminalNumber",
            label: "终端编号",
            align: "center",
            width: "150",
            sortable: true,
          },
          {
            text: true,
            prop: "issueState",
            label: "发放状态",
            align: "center",
            width: "100",
          },
          {
            text: true,
            prop: "recipient",
            label: "领用人员",
            align: "center",
            width: "300",
          },
          {
            text: true,
            prop: "contactNumber",
            label: "联系电话",
            align: "center",
            width: "350",
          },
          {
            text: true,
            prop: "issueTime",
            label: "发放时间",
            width: "300",
            align: "center",
          },
          //如果为操作列,则需要填写需要的操作按钮,类型为Object。operation(操作类型,可选edit,delete,see),type(按钮样式,参考el—botton类型),label(按钮文字)icon(参考el-icon),color(字体颜色)
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
                isShow: (row) => {
                  return row.issueState === "未发放";
                },
              },
              {
                operation: "editClose",
                type: "text",
                label: "收回",
                icon: "",
                isShow: (row) => {
                  return row.issueState === "已发放";
                },
              },
              {
                operation: "see",
                type: "text",
                label: "领取记录",
                icon: "",
                isShow: () => {
                  return true;
                },
              },
            ],
          },
        ],
      },
      tableData: [
        {
          zdId: "99877231",
          fhType: "已发放",
          lyName: "小王",
          tel: "1536257965",
          time: "2021-09-15 09:15:14",
        },
        {
          zdId: "98876231",
          fhType: "未发放",
          lyName: "小刘",
          tel: "1536257765",
          time: "2021-09-15 09:15:14",
        },
        {
          zdId: "99866231",
          fhType: "已发放",
          lyName: "小梅",
          tel: "1533657965",
          time: "2022-08-15 09:15:14",
        },
      ],
      dialogFormVisible: false,
      idFrom: {},
      idFromRul: {
        terminalNumber: [{ required: true, message: "请输入设备编号", trigger: "blur" }],
      },
      openVisible: false,
      openFrom: {},
      openRul: {
        contactNumber: [{ required: true, message: "请选择车辆类型", trigger: "blur" }],
        issueTime: [{ required: true, message: "请选择发放时间", trigger: "change" }],
        recipient: [{ required: true, message: "请填写领用人员", trigger: "blur" }],
      },
      closeVisible: false,
      closeFrom: {},
      closeRul: {
        time: [{ required: true, message: "请选择发放时间", trigger: "change" }],
        khName: [{ required: true, message: "请填写归还人员", trigger: "blur" }],
      },
    };
  },
  methods: {
    rowOperation(row, $index, now) {
      console.log(row, $index, now);
      switch (now) {
        case "editClose":
          this.closeVisible = true;
          break;
        case "editOpen":
          this.openVisible = true;
          this.openFrom = JSON.parse(JSON.stringify(row));
          break;
        case "see":
          this.$router.push("/issue/interPhoneList");
          break;
        default:
          break;
      }
    },
    onSuReg() {},
    onSerch() {},
    onSubAdd() {
      this.dialogFormVisible = true;
    },
    exitFrom(fromName) {
      this.$refs[fromName].resetFields();
      this.dialogFormVisible = false;
    },
    // 新增模态框权限
    sureFrom(fromName) {
      this.$refs[fromName].validate().then((res) => {
        if (res) {
          const data = {
            terminalNumber: this.idFrom.terminalNumber,
          };
          this.addInterPhone(data);
          this.dialogFormVisible = false;
        }
      });
    },
    // 发放模态框确认
    submitForm(fromName) {
      this.$refs[fromName].validate().then((res) => {
        if (res) {
          const data = {
            id: this.openFrom.id,
            terminalNumber: this.openFrom.terminalNumber,
            issueTime: formatDate(this.openFrom.issueTime),
            recipient: this.openFrom.recipient,
            contactNumber: this.openFrom.contactNumber,
          };
          this.updateById(data);
          this.openVisible = false;
        }
      });
    },
    resetForm(fromName) {
      console.log(11111);
      this.$refs[fromName].resetFields();
      // this.openVisible = false;
    },
    resetCloseForm(fromName) {
      console.log(11);
      this.$refs[fromName].resetFields();
      this.closeVisible = false;
    },
    submitCloseForm(fromName) {
      console.log(11);
      this.$refs[fromName].validate().then((res) => {
        this.closeVisible = false;
        this.closeFrom = {};
      });
    },
    // 新增对讲机数据
    addInterPhone(data) {
      InterPhone.addListPage(data).then((res) => {
        if (res.code === 200) {
          Message.success("新增对讲机终端编号成功");
          this.getListInter();
        }
      });
    },
    // 查询对讲机数据
    async getListInter(data) {
      let res = await InterPhone.getListPage(data);
      if (res.code === 200) {
        this.tableData = res.data.records.map((item) => {
          item.issueState === 0 ? (item.issueState = "未发放") : (item.issueState = "已发放");
          return item;
        });
        this.$set(this.pageObj, "total", res.data.total);
      }
    },
    // 根据ID修改数据
   updateById(data) {
      InterPhone.updateListPage(data).then(res=>{
        if(res.code===200){
          Message.success('发放成功')
          this.getListInter()
        }
      })
    },
  },
  created() {
    this.getListInter();
  },
};
</script>

<style></style>
