<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="协议名称" prop="title">
        <el-input v-model.trim="formInline.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="publishState">
        <el-select v-model.trim="formInline.publishState" placeholder="状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="未发布" value="未发布"></el-option>
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
    <!-- 表单列 -->
    <common-table
      :table-data="tableData"
      :colum-obj="columObj"
      :page-obj="pageObj"
      @rowOperation="rowOperation"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></common-table>
    <el-dialog :title="this.agreeEntiy == '' ? '添加协议' : '编辑协议'" :visible.sync="openVislb">
      <el-card>
        <agreement :agreeEntiy="agreeEntiy" @closeDialog="closeHandle"></agreement>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import agreement from "@/views/message/components/agreement.vue";
import commonTable from "@/components/common-table/index.vue";
import documentService from "@/service/api/message/document";
export default {
  components: { commonTable, agreement },
  data() {
    return {
      openVislb: false,
      formInline: {},
      columObj: {
        columnData: [
          {
            text: true,
            prop: "title",
            label: "标题",
            width: "240",
            align: "center",
          },
          {
            text: true,
            prop: "content",
            label: "内容",
            align: "center",
          },
          {
            text: true,
            label: "状态",
            width: "240",
            align: "center",
            ownDefined: true,
            ownDefinedReturn: (row, $index) => {
              return row.publishState == 0 ? "未发布" : "已发布";
            },
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
                operation: "publish",
                type: "text",
                label: "发布",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.publishState === 0;
                },
              },
              {
                operation: "editOpen",
                type: "text",
                label: "编辑",
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
            ],
          },
        ],
      },
      tableData: [],
      pageObj: {
        pageIndex: 1,
        pageSize: 10,
        total: 20,
      },
      condition: [],
    };
  },
  props: {
    agreeEntiy: {},
  },
  created() {
    this.initAgreementMessage();
  },
  methods: {
    initAgreementMessage(condition) {
      let aticleType = {
        column: "aticle_type",
        type: "eq",
        value: 2,
      };
      if (condition == undefined) {
        condition = [];
        condition.push(aticleType);
      } else {
        condition.push(aticleType);
      }
      let parmary = {
        pageNum: this.pageObj.pageIndex,
        pageSize: this.pageObj.pageSize,
        condition: JSON.stringify(condition),
      };
      documentService
        .getDocumentByPage(parmary)
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
    onSerch() {
      if (this.formInline.title != undefined && this.formInline.title != "") {
        let title = {
          column: "title",
          type: "like",
          value: this.formInline.title,
        };
        this.condition.push(title);
      }
      if (this.formInline.publishState != undefined && this.formInline.publishState != "" && this.formInline.publishState != "全部") {
        let state = {
          column: "publish_state",
          type: "eq",
          value: this.formInline.publishState === "未发布" ? 0 : 1,
        };
        this.condition.push(state);
      }
      this.initAgreementMessage(this.condition);
      // 重置条件数组
      this.condition = [];
    },
    onSuReg() {
      this.formInline = {};
      this.initAgreementMessage();
    },
    onAdd() {
      this.openVislb = true;
    },
    closeHandle() {
      this.openVislb = false;
      // 关闭el-dialog,刷新表格
      this.initAgreementMessage();
    },
    /**打开编辑el-dialog */
    onEdit(row) {
      this.openVislb = true;
      this.agreeEntiy = row;
    },
    /**草稿发布 */
    publish(row) {
      let that = this;
      this.$confirm("是否确定发布该协议?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          row.publishState = 1;
          documentService
            .updateById(row)
            .then((res) => {
              if (res.code == 200) {
                that.$message.success("发布成功!");
                that.initAgreementMessage();
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
    /**删除协议 */
    delete(row) {
      let that = this;
      this.$confirm("是否确定删除该协议?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          documentService
            .deleteById(row.id)
            .then((res) => {
              if (res.code == 200) {
                that.$message.success("删除协议成功!");
                that.initAgreementMessage();
              } else {
                that.$message.error("删除失败!");
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
    rowOperation(row, $index, now) {
      switch (now) {
        case "editOpen":
          this.onEdit(row);
          break;
        case "publish":
          this.publish(row);
          break;
        case "delete":
          this.delete(row);
          break;
        default:
          break;
      }
    },
    //页码变化
    handleCurrentChange(e) {
      this.pageObj.pageIndex = e;
      this.onSerch();
    },
    //条数变化
    handleSizeChange(e) {
      this.pageObj.pageSize = e;
      this.pageObj.pageIndex = 1;
      this.onSerch();
    },
  },
};
</script>

<style></style>
