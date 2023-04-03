<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="标题" prop="noticeTitle">
        <el-input v-model.trim="formInline.noticeTitle"></el-input>
      </el-form-item>
      <el-form-item label="发放状态" prop="publishState">
        <el-select v-model.trim="formInline.publishState" placeholder="发放状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="未发布" value="未发布"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="publishTime">
        <el-date-picker v-model="formInline.publishTime" type="date" placeholder="选择日期"></el-date-picker>
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
    <!-- 查看通知公告模态框 -->
    <el-dialog title="查看详情" :visible.sync="openSee">
      <h1 style="text-align: center">{{ seeData.noticeTitle }}</h1>
      <p style="text-indent: 2em; margin-top: 10px">{{ seeData.noticeContent }}</p>
    </el-dialog>
  </div>
</template>

<script>
import commonTale from "@/components/common-table/index.vue";
import notifiction from "@/service/api/message/notifiction.js";
export default {
  components: { commonTale },
  data() {
    return {
      openSee: false,
      formInline: {},
      seeData: {},
      tableData: [],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "noticeTitle",
            label: "标题",
            align: "center",
          },
          {
            text: true,
            prop: "noticeContent",
            label: "内容",
            align: "center",
          },
          {
            text: true,
            prop: "publishTime",
            label: "时间",
            align: "center",
          },
          {
            text: true,
            prop: "publishPerson",
            label: "发布人",
            align: "center",
          },
          {
            text: true,
            prop: "publishState",
            label: "发布状态",
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
                  return row.publishState === 0;
                },
              },
              {
                operation: "publish",
                type: "text",
                label: "发布",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.publishState === 0;
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
                operation: "delete",
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
                operation: "calback",
                type: "text",
                label: "撤回",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.publishState === 1;
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
  created() {
    this.initNotifiction();
  },
  methods: {
    initNotifiction(condition) {
      let parmary = {
        pageNum: 1,
        pageSize: 20,
        condition
      };
      notifiction
        .getNotificationByPage(parmary)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.tableData = res.data.records;
            this.pageObj = {
              pageIndex: res.data.current,
              pageSize: res.data.size,
              total: res.data.total,
            };
          } else {
            this.$message.error("系统故障!");
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    /**草稿发布 */
    publish(row) {
      let that = this;
      this.$confirm("是否确定发布该通知公告?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          row.publishState = 1;
          notifiction
            .updateById(row)
            .then((res) => {
              if (res.code == 200) {
                that.$message.success("发布成功!");
                that.initNotifiction();
              } else {
                that.$message.error("发布失败!");
              }
            })
            .catch((err) => {
              that.$message.error(err);
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消发布",
          });
        });
    },
    /**撤回公告 */
    calback(row) {
      let that = this;
      this.$confirm("是否确定撤回该通知公告?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          row.publishState = 0;
          notifiction
            .updateById(row)
            .then((res) => {
              if (res.code == 200) {
                that.$message.success("撤回成功!");
                that.initNotifiction();
              } else {
                that.$message.error("撤回公告失败!");
              }
            })
            .catch((err) => {
              that.$message.error(err);
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消撤回",
          });
        });
    },
    /**删除公告 */
    delete(row) {
      let that = this;
      this.$confirm("是否确定删除该通知公告?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          notifiction
            .deleteById(row.id)
            .then((res) => {
              if (res.code == 200) {
                that.$message.success("删除公告成功!");
                that.initNotifiction();
              } else {
                that.$message.error("删除公告失败!");
              }
            })
            .catch((err) => {
              that.$message.error(err);
            });
        })
        .catch((err) => {
          that.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**搜索 */
    onSerch() {
      console.log(this.formInline);
      let condition = [];
      if(this.formInline.noticeTitle != undefined && this.formInline.noticeTitle != ""){
        let title = {
          column: "notice_title",
          type: "like",
          value: this.formInline.noticeTitle
        }
        condition.push(title);
      }
      if(this.formInline.publishState != undefined && this.formInline.publishState != "" && this.formInline.publishState != "全部"){
        let state = {
          column: "publish_state",
          type: "eq",
          value: this.formInline.publishState=="未发布"?0:1
        }
        condition.push(state);
      }
      if(this.formInline.publishTime != undefined && this.formInline.publishTime != ""){
        let time = {
          column: "publish_time",
          type: "ge",
          value: this.formInline.publishTime
        }
        condition.push(time);
      }
      this.initNotifiction(JSON.stringify(condition));
    },
    /**重置搜索条件 */
    onSuReg() {
      this.formInline = {};
      this.initNotifiction();
    },
    /**跳转到新增页面 */
    onAdd() {
      this.$router.push("/message/messageAdd");
    },
    /**跳转到编辑页面 */
    onEdit(row) {
      this.$router.push({
                path:'/message/messageAdd',
                query:{
                    notificRow: row
                }
            })
    },
    rowOperation(row, $index, now) {
      switch (now) {
        case "see":
          this.openSee = true;
          this.seeData = row;
          break;
        case "editOpen":
          this.onEdit(row);
          break;
        case "publish":
          this.publish(row);
          break;
        case "calback":
          this.calback(row);
          break;
        case "delete":
          this.delete(row);
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style></style>
