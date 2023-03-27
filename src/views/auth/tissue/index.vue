<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="组织名称" prop="rfid">
        <el-input v-model.trim="formInline.rfid"></el-input>
      </el-form-item>
      <el-form-item label="组织类型" prop="ffzt">
        <el-select v-model.trim="formInline.ffzt" placeholder="发放状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已发放" value="已发放"></el-option>
          <el-option label="未发放" value="未发放"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="ffzt">
        <el-select v-model.trim="formInline.ffzt" placeholder="发放状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="启用" value="启用"></el-option>
          <el-option label="禁用" value="禁用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSerch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSuReg">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="onAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <commonTale :tableData="tableData" :columObj="columObj" :pageObj="pageObj" @rowOperation="rowOperation"></commonTale>
    <!-- 新增/编辑组织信息 -->
    <el-dialog title="新增/修改组织管理" :visible.sync="openVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" enctype="multipart/form-data">
        <el-form-item label="上级组织名称" prop="receivePerson">
          <el-input v-model="ruleForm.receivePerson" placeholder="填写还样人员"></el-input>
        </el-form-item>
        <el-form-item label="组织名称" prop="receiveContactNumber">
          <el-input v-model="ruleForm.receiveContactNumber" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="管理费率" prop="receiveIdentityNum">
          <el-input v-model="ruleForm.receiveIdentityNum" placeholder="请填写管理费率">
            <i slot="suffix" style="font-style: normal; margin-right: -35px">%</i>
          </el-input>
        </el-form-item>
        <el-form-item label="税率" prop="destination">
          <el-input v-model="ruleForm.destination" placeholder="请填写税率">
            <i slot="suffix" style="font-style: normal; margin-right: -35px">%</i>
          </el-input>
        </el-form-item>
        <el-form-item label="场地折扣" prop="receiveTrailer">
          <el-input v-model="ruleForm.receiveTrailer"></el-input>
        </el-form-item>
        <el-form-item label="联系人员" prop="receiveTrailer">
          <el-input v-model="ruleForm.receiveTrailer"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="receiveTrailer">
          <el-input v-model="ruleForm.receiveTrailer"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="ffzt">
          <el-radio-group v-model="ruleForm.ffzt">
            <el-radio :label="3">是</el-radio>
            <el-radio :label="6">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认预约</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import commonTale from "@/components/common-table/index.vue";
export default {
  components: { commonTale },
  data() {
    return {
      formInline: {},
      tableData: [
        {
          id: 1,
          title: "升级系统维护通知",
          main: "内部",
          time: "2015-09-27 14:30:21",
          system: "admin",
          ffzt: "禁用",
        },
        {
          id: 2,
          title: "升级系统维护通知",
          main: "外部",
          time: "2015-09-27 14:30:21",
          system: "admin",
          ffzt: "启用",
        },
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "title",
            label: "组织名称",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "组织类型",
            align: "center",
          },
          {
            text: true,
            prop: "time",
            label: "联系人",
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
            prop: "ffzt",
            label: "状态",
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
                label: "编辑",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "delet",
                type: "text",
                label: "启用",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "see",
                type: "text",
                label: "禁用",
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
      pageObj: {
        position: "right",
        total: 20,
      },
      openVisible: false,
      ruleForm:{},
      rules:{}
    };
  },
  methods: {
    rowOperation(row,$index,now){
      switch(now){
        case 'editOpen':
          this.openVisible=true;
          this.ruleForm=JSON.parse(JSON.stringify(row))
          break
        default: break
      }
    },
    onSerch() {},
    onSuReg() {},
    onAdd() {
      this.openVisible = true;
    },
  },
};
</script>

<style></style>
