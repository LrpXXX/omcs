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
        <el-form-item label="终端编号" prop="caCode">
          <el-input v-model="idFrom.caCode" placeholder="终端编号"></el-input>
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
        <el-form-item label="终端编号" prop="caCode">
          <el-input v-model="openFrom.caCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="发放车辆" prop="fhcar">
          <el-input v-model="openFrom.fhcar"></el-input>
        </el-form-item>
        <el-form-item label="领用人员" prop="lyName">
          <el-input v-model="openFrom.khName"></el-input>
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
            prop: "zdId",
            label: "终端编号",
            align: "center",
            width: "150",
            sortable: true,
          },
          {
            text: true,
            prop: "fhType",
            label: "发放状态",
            align: "center",
            width: "100",
          },
          {
            text: true,
            prop: "lyName",
            label: "领用人员",
            align: "center",
            width: "300",
          },
          {
            text: true,
            prop: "tel",
            label: "联系电话",
            align: "center",
            width: "350",
          },
          {
            text: true,
            prop: "time",
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
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.fhType === "未发放";
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
                  return row.fhType === "已发放";
                },
              },
              {
                operation: "see",
                type: "text",
                label: "领取记录",
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
        caCode: [{ required: true, message: "请输入通行卡物面ID", trigger: "blur" }],
      },
      openVisible: false,
      openFrom: {},
      openRul: {
        tel: [{ required: true, message: "请选择车辆类型", trigger: "blur" }],
        time: [{ required: true, message: "请选择发放时间", trigger: "change" }],
        lyName: [{ required: true, message: "请填写领用人员", trigger: "blur" }],
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
            this.$router.push('/issue/interPhoneList')
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
    sureFrom(fromName) {
      this.$refs[fromName].validate().then((res) => {
        this.idFrom;
        console.log(this.idFrom.caCode);
        if (res) {
          this.tableData.push({
            zdId: this.idFrom.caCode,
            fhType: "未发放",
            lyName: undefined,
            tel: undefined,
            time: undefined,
          });
          this.dialogFormVisible = false;
        }
      });
    },
    submitForm(fromName) {
      this.$refs[fromName].validate().then((res) => {
        this.openVisible = false;
      });
    },
    resetForm(fromName) {
      this.$refs[fromName].resetFields();
      this.openVisible = false;
    },
    resetCloseForm(fromName) {
      this.$refs[fromName].resetFields();
      this.closeVisible = false;
    },
    submitCloseForm(fromName) {
      this.$refs[fromName].validate().then((res) => {
        this.closeVisible = false;
        this.closeFrom={}
      });
    },
  },
};
</script>

<style></style>
