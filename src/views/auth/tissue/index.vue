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
    <commonTale
      :tableData="tableData"
      :columObj="columObj"
      :pageObj="pageObj"
      @rowOperation="rowOperation"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></commonTale>
    <!-- 新增/编辑组织信息 -->
    <el-dialog title="新增/修改组织管理" :visible.sync="openVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" enctype="multipart/form-data">
        <el-form-item label="上级组织名称" prop="pid">
          <el-select v-model="ruleForm.pid">
            <el-option v-for="item in Tree" :key="item.id" :value="item.id" :label="item.orgName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组织名称" prop="orgName">
          <el-input v-model="ruleForm.orgName" placeholder="请输入组织名称"></el-input>
        </el-form-item>
        <el-form-item label="管理费率" prop="managementRate">
          <el-input v-model="ruleForm.managementRate" placeholder="请填写管理费率，默认为0，0不收取管理费用">
            <i slot="suffix" style="font-style: normal; margin-right: -35px">%</i>
          </el-input>
        </el-form-item>
        <el-form-item label="税率" prop="taxRate">
          <el-input v-model="ruleForm.taxRate" placeholder="默认6%,数字都是正整数">
            <i slot="suffix" style="font-style: normal; margin-right: -35px">%</i>
          </el-input>
        </el-form-item>
        <el-form-item label="场地折扣" prop="siteDiscount">
          <el-input v-model="ruleForm.siteDiscount" placeholder="两位小数默认为1"></el-input>
        </el-form-item>
        <el-form-item label="联系人员" prop="contactPerson">
          <el-input v-model="ruleForm.contactPerson"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactNumber">
          <el-input v-model="ruleForm.contactNumber"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="orgNumber">
          <el-radio-group v-model="ruleForm.orgNumber">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import reg from "@/common/reg";
import commonTale from "@/components/common-table/index.vue";
import { Tissue } from "@/service/api/auth/tissue";
import { Message } from "element-ui";
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
            prop: "orgName",
            label: "组织名称",
            align: "center",
          },
          {
            text: true,
            prop: "orgSource",
            label: "组织类型",
            align: "center",
          },
          {
            text: true,
            prop: "contactPerson",
            label: "联系人",
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
            prop: "orgNumber",
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
                  return row.orgNumber === "禁用";
                },
              },
              {
                operation: "delet",
                type: "text",
                label: "禁用",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.orgNumber === "启用";
                },
              },
            ],
          },
        ],
      },
      pageObj: {
        total: 20,
        pageIndex: 1,
        pageSize: 10,
      },
      openVisible: false,
      ruleForm: {
        managementRate: 0,
        taxRate: 6,
        siteDiscount: 1,
      },
      rules: {
        orgName: [{ required: true, message: "请输入组织名称", trigger: "blur" }],
        managementRate: [
          { required: true, message: "请输入管理费率", trigger: "blur" },
          {
            pattern: reg.pos,
            message: "请输入正确数字",
            trigger: "blur",
          },
        ],
        taxRate: [
          { required: true, message: "请输入税率", trigger: "blur" },
          {
            pattern: reg.pos,
            message: "请输入正确的正整数",
            trigger: "blur",
          },
        ],
        siteDiscount: [{ required: true, message: "请输入场地折扣", trigger: "blur" }],
        contactPerson: [{ required: true, message: "请输入联系人员", trigger: "blur" }],
        contactNumber: [
          { required: true, message: "请填写联系电话", trigger: "blur" },
          {
            pattern: reg.mobile,
            message: "请输入正确得手机号码",
            trigger: "blur",
          },
        ],
        orgNumber: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
      Tree: [],
    };
  },
  methods: {
    // 总页数发生改变
    handleSizeChange(e) {
      this.$emit("handleSizeChange", e);
      console.log(e);
      this.$set(this.pageObj, "pageSize", e);
      const data = {
        pageNum: this.pageObj.pageIndex,
        pageSize: this.pageObj.pageSize,
      };
      this.getTableList(data);
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
      this.getTableList(data);
    },
    rowOperation(row, $index, now) {
      switch (now) {
        case "editOpen":
          this.openVisible = true;
          for (const item of this.Tree) {
            if (item.id === row.pid) {
              row.pid = item.orgName;
              break;
            }
          }
          row.orgNumber === "启用" ? (row.orgNumber = "是") : (row.orgNumber = "否");
          this.ruleForm = JSON.parse(JSON.stringify(row));
          break;
        case "delet":
          console.log(row)
          break;
        default:
          break;
      }
    },
    onSerch() {
      console.log(this.Tree);
    },
    onSuReg() {
      this.getTableList();
      this.formInline = {};
    },
    onAdd() {
      this.openVisible = true;
    },
    submitForm(fromName) {
      this.$refs[fromName].validate().then((res) => {
        if (res) {
          console.log(this.ruleForm);
          let data = [];
          //修改
          if (this.ruleForm.id !== undefined) {
            data = {
              id: this.ruleForm.id,
              pid: this.ruleForm.pid,
              orgName: this.ruleForm.orgName,
              managementRate: this.ruleForm.managementRate,
              taxRate: this.ruleForm.taxRate,
              siteDiscount: parseFloat(this.ruleForm.siteDiscount).toFixed(2),
              contactPerson: this.ruleForm.contactPerson,
              contactNumber: this.ruleForm.contactNumber,
              orgNumber: this.ruleForm.orgNumber === "是" ? 1 : 0,
            };
            console.log("修改的rulfrom", data);
            this.tissueUpdate(data);
            this.ruleForm = {
              managementRate: 0,
              taxRate: 6,
              siteDiscount: 1,
            };
            this.openVisible = false;
          } else {
            data = {
              pid: this.ruleForm.pid,
              orgName: this.ruleForm.orgName,
              managementRate: this.ruleForm.managementRate,
              taxRate: this.ruleForm.taxRate,
              siteDiscount: parseFloat(this.ruleForm.siteDiscount).toFixed(2),
              contactPerson: this.ruleForm.contactPerson,
              contactNumber: this.ruleForm.contactNumber,
              orgNumber: this.ruleForm.orgNumber === "是" ? 1 : 0,
            };
            console.log(data, "新增的rufrom");
            this.tissueAdd(data);
            this.ruleForm = {
              managementRate: 0,
              taxRate: 6,
              siteDiscount: 1,
            };
            this.openVisible = false;
          }
        }
      });
    },
    //  查询组织树形数据并过滤出一级出口
    async getTreeList() {
      try {
        let res = await Tissue.getTissutList();
        if (res.code === 200) {
          this.Tree = res.data.map((item) => ({ id: item.id, orgName: item.orgName }));
        }
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //组织机构新增
    async tissueAdd(data) {
      try {
        let res = await Tissue.tissueAdd(data);
        if (res.code === 200) {
          Message.success("组织添加成功");
          this.getTableList();
        }
      } catch (e) {
        console.log(e);
      }
    },
    //组织机构修改
    async tissueUpdate(data) {
      try {
        let res = await Tissue.tissueUpdate(data);
        if (res.code === 200) {
          console.log(1111);
          Message.success("组织修改成功");
          this.getTableList();
        }
      } catch (e) {
        console.log(e);
      }
    },
    //分页数据查询
    async getTableList(data) {
      try {
        let res = await Tissue.getPageList(data);
        console.log(res);
        if (res.code === 200) {
          this.tableData = res.data.records.map((item) => {
            item.orgNumber === "0"
              ? (item.orgNumber = "禁用")
              : (item.orgNumber = "启用") || item.orgNumber === "是"
              ? (item.orgNumber = "启用")
              : (item.orgNumber = "禁用");
            return item;
          });
          this.$set(this.pageObj, "total", res.data.total);
        }
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    //获取到上级菜单数据
    this.getTreeList();
    this.getTableList();
  },
};
</script>

<style></style>
