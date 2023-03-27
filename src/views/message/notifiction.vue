<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="标题" prop="rfid">
        <el-input v-model.trim="formInline.rfid"></el-input>
      </el-form-item>
      <el-form-item label="发放状态" prop="ffzt">
        <el-select v-model.trim="formInline.ffzt" placeholder="发放状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已发放" value="已发放"></el-option>
          <el-option label="未发放" value="未发放"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-date-picker v-model="formInline.time" type="date" placeholder="选择日期"></el-date-picker>
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
    <commonTale :tableData="tableData" :columObj="columObj" :pageObj="pageObj"></commonTale>
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
          main: "为了向您提供稳定和更优质的服务，我们计划在2018年6月29日0点—2点",
          time: "2015-09-27 14:30:21",
          system: "admin",
          ffzt: "草稿",
        },
        {id:2,title:'升级系统维护通知',main:'为了向您提供稳定和更优质的服务，我们计划在2018年6月29日0点—2点',time:'2015-09-27 14:30:21',system:'admin',ffzt:'已发布'}
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "title",
            label: "标题",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "内容",
            align: "center",
          },
          {
            text: true,
            prop: "time",
            label: "时间",
            align: "center",
          },
          {
            text: true,
            prop: "system",
            label: "发放人",
            align: "center",
          },
          {
            text: true,
            prop: "ffzt",
            label: "发放状态",
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
                  return row.ffzt === "草稿";
                },
              },
              {
                operation: "editClose",
                type: "text",
                label: "发布",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.ffzt === "草稿";
                },
              },
              {
                operation: "see",
                type: "text",
                label: "查看",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "delet",
                type: "text",
                label: "删除",
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
                label: "撤回",
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
        total: 20,
      },
    };
  },
  methods: {
    onSerch() {},
    onSuReg() {},
    onAdd() {},
  },
};
</script>

<style></style>
