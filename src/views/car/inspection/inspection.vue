<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="车辆名称" prop="name">
        <el-input v-model.trim="formInline.name"></el-input>
      </el-form-item>
      <el-form-item label="车牌号" prop="carCode">
        <el-input v-model.trim="formInline.carcode" placeholder="车牌号码"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="lyname">
        <el-input v-model.trim="formInline.lyname" placeholder="联系人"></el-input>
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
    <!-- 新增 -->
    <el-dialog title="新增/编辑巡检车辆" :visible.sync="openVisible">
      <el-form :model="openFrom" :rules="openRul" ref="openFrom" label-width="150px">
        <el-form-item label="车辆名称" prop="name">
          <el-input v-model="openFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="车牌号" prop="carVIM">
          <el-input v-model="openFrom.carVIM"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="khName">
          <el-input v-model="openFrom.khName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="openFrom.tel"></el-input>
        </el-form-item>
        <el-form-item label="车辆类型" prop="carType">
          <el-select v-model="openFrom.carType" placeholder="请选择车辆类型">
            <el-option label="试验样车" value="试验样车"></el-option>
            <el-option label="巡检车辆" value="巡检车辆"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input v-model="openFrom.tel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('openFrom')">取消</el-button>
          <el-button type="primary" @click="submitForm('openFrom')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import commonTale from "@/components/common-table";
import { Ispection } from "@/service/api/issue/ispection";
export default {
  components: { commonTale },
  data() {
    return {
      formInline: {},
      tableData: [
        { zdId: "1002", sbId: "tx2023001", time: "2015-09-31  15:31:02", type: "发放", name: "刘强", tel: 15736288040, khName: "中国长安" },
        { zdId: "1002", sbId: "tx2023002", time: "2015-09-31  15:31:02", type: "发放", name: "", tel: undefined, khName: "中国汽研" },
        { zdId: "1003", sbId: "tx2023003", time: "2018-09-31  15:31:02", type: "收回", name: "", tel: undefined, khName: "lims" },
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "zdId",
            label: "车辆名称",
            align: "center",
          },
          {
            text: true,
            prop: "sbId",
            label: "车牌号",
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
            prop: "type",
            label: "联系电话",
            align: "center",
          },
          {
            text: true,
            prop: "time",
            label: "有效时间",
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
                operation: "see",
                type: "text",
                label: "通行权限",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "delete",
                type: "text",
                label: "删除",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "edit",
                type: "text",
                label: "编辑",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "sexj",
                type: "text",
                label: "巡检记录",
                // color: "red",
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
        position: "right", //分页组件位置
        total: 20,
        pageIndex: 1,
        pageSize: 10,
      },
      openVisible: false,
      openFrom: {},
      openRul: {

      },
    };
  },
  methods: {
    rowOperation(row, $index, now) {
      switch (now) {
        case "delete":
          this.$confirm("是否删除该巡检车辆？", {
            distinguishCancelAndClose: true,
            confirmButtonText: "确认",
            cancelButtonText: "取消",
          })
            .then(() => {
              this.$message({
                message: "删除成功",
              });
            })
            .catch((action) => {
              this.$message({
                message: action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面",
              });
            });
          break;
        case "edit":
          this.openVisible = true;
          this.openFrom = JSON.parse(JSON.stringify(row));
          break;
        default:
          break;
      }
    },
    onSerch() {},
    onSuReg() {},
    onAdd() {
      this.openVisible = true;
    },
    resetForm(fromName){
      // this.$refs[fromName].res
      this.openVisible=false
    },
    submitForm(fromName){
      // this.$refs[fromName].visible().then(res=>res).catch(err=>err)
      this.openVisible=false
    },
    // 查询巡检车辆数据
    sercheIspection() {
      Ispection.ispectionList()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    // Ispection.ispectionList().then(res=>{console.log(res);}).catch(err=>{console.log(err);})
    this.sercheIspection()
  },
};
</script>

<style></style>
