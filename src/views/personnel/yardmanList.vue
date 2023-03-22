<template>
  <div>
      <el-form v-model="formInline" ref="serchFrom" :inline="true">
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model.trim="formInline.tel" placeholder="联系电话"></el-input>
        </el-form-item>
        <el-form-item label="人员类别" prop="region">
          <el-select v-model.trim="formInline.region" placeholder="人员类别">
            <el-option label="保洁" value="保洁"></el-option>
            <el-option label="维修" value="维修"></el-option>
            <el-option label="管理" value="管理"></el-option>
            <el-option label="服务保障" value="服务保障"></el-option>
            <el-option label="场地维护" value="场地维护"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSuReg">重置</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" @click="onSubAdd">新增</el-button>
        </el-form-item>
      </el-form>
    <commonTable
      :tableData="tableData"
      :columObj="columObj"
      :pageObj="pageObj"
      @rowOperation="rowOperation"
      @rowClick="rowClick"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></commonTable>
    <!-- dialog弹窗 -->
    <el-dialog title="新增/编辑场地人员" :visible.sync="dialogFormVisible">
      <el-form :model="newRuleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="newRuleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="newRuleForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="人员类别" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域" default-first-option="其他">
            <el-option label="保洁" value="保洁"></el-option>
            <el-option label="维修" value="维修"></el-option>
            <el-option label="管理" value="管理"></el-option>
            <el-option label="服务保障" value="服务保障"></el-option>
            <el-option label="场地维护" value="场地维护"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 人脸采集模态框 -->
    <el-dialog title="人脸采集" :visible.sync="faceDlog">
      <el-form :model="face"  ref="face">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form>
      <div slot="footer" style="float: center">
        <el-button type="primary">确定</el-button>
        <el-button @click="faceDlog = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonTable from "@/components/common-table/index.vue";
import { Message } from "element-ui";
import { formatDate } from "@/common/filters";
export default {
  components: {
    commonTable,
  },
  data() {
    return {
      formInline: {
        name:'',
        tel:undefined,
        region:''
      },
      face: {},
      faceDlog: false,
      dialogFormVisible: false,
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      // 人员信息模态框
      ruleForm: {
        name: "",
        tel: undefined,
        region: "",
        desc: "",
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        tel: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
      },
      formLabelWidth: "120px",
      tableData: [
        { id: 1, name: "张三", tel: "1987655132", type: "管理", beizhu: "", date: "2015-09-27  9:30" },
        { id: 2, name: "李四", tel: "1897655132", type: "保洁", beizhu: "", date: "2015-09-27  9:30" },
        { id: 3, name: "王五", tel: "1387655132", type: "维修", beizhu: "", date: "2015-09-27  9:30" },
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "name",
            label: "姓名",
            align: "center",
            width: "150",
          },
          {
            text: true,
            prop: "tel",
            label: "联系电话",
            align: "center",
            width: "300",
          },
          {
            text: true,
            prop: "type",
            label: "人员类型",
            align: "center",
            width: "150",
          },
          {
            text: true,
            editRow: undefined,
            prop: "beizhu",
            label: "备注",
            width: "300",
            align: "center",
          },

          {
            text: true,
            editRow: undefined,
            prop: "date",
            label: "添加时间",
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
                operation: "edit",
                type: "text",
                label: "编辑",
                icon: "",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "see",
                type: "text",
                label: "人脸采集",
                icon: "",
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "",
                type: "text",
                label: "巡检记录",
                icon: "",
                color: "",
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
                  return  true
                },
              },
            ],
          },
        ],
      },
      pageObj: {
        position: "right", //分页组件位置
        total: 100,
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  computed:{
    newRuleForm(){
      return this.ruleForm
    }
  },
  methods: {
    rowOperation(row, $index, now) {
      switch (now) {
        case "see":
          this.faceDlog = true;
          break;
        case "edit":
          this.dialogFormVisible = true;
          this.ruleForm = JSON.parse(JSON.stringify(row));
          break;
        case "delete":  
          this.$confirm('是否删除该条数据？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.tableData = [...this.tableData.filter((item) => item.id !== row.id)];
            this.$message({
              type:'success',
              message: '删除成功'
            });
          })
          .catch(action => {
            this.$message({
              message: action === 'cancel'
                ? '放弃保存并离开页面'
                : '停留在当前页面'
            })
          });
          break;
        default:
          break;
      }
    },
    // 新增场地人员
    onSubAdd() {
      this.dialogFormVisible = true;
      this.submitForm("ruleForm");
    },
    // 点击行
    rowClick(row, column, event) {
      this.$emit("rowClick", row, column, event);
    },
    // 条数变化
    handleSizeChange(e) {
      this.$emit("handleSizeChange", e);
    },
    // 页码变化
    handleCurrentChange(e) {
      this.$emit("handleCurrentChange", e);
    },
    // 查询表单数据
    onSuReg() {
      this.formInline={}
    },
    // 查询数据
    onSubmit() {
      const  serchPrams={name:this.formInline.name,tel:this.formInline.tel,region:this.formInline.region}
      this.tableData=this.tableData.filter(item=>item.name===serchPrams.name)
    },
    // 提交表单校验规则对场地人员进行新增和修改操作
    submitForm(fromName) {
      console.log(fromName);
      this.$refs[fromName].validate().then((res) => {
        if (res) {
          console.log(this.ruleForm);
          if (this.ruleForm.id !== undefined) {
            for (const item in this.tableData) {
              if (this.tableData[item].id === this.ruleForm.id) {
                this.tableData[item].id = this.ruleForm.id;
                this.tableData[item].name = this.ruleForm.name;
                this.tableData[item].type = this.ruleForm.region;
                this.tableData[item].beizhu = this.ruleForm.desc;
                this.tableData[item].date = formatDate(new Date());
              }
            }
            Message.success("修改成功");
            this.dialogFormVisible = false;
          } else {
            this.tableData.push({
              id: this.tableData.length + 1,
              name: this.ruleForm.name,
              tel: this.ruleForm.tel,
              type: this.ruleForm.region,
              beizhu: this.ruleForm.desc,
              date: formatDate(new Date()),
            });
            Message.success("添加成功");
            this.$refs.ruleForm.resetFields();
            this.dialogFormVisible = false;
          }
        }
      });
    },
    // 清空表单数据
    resetForm(fromName) {
      this.$refs[fromName].resetFields();
      this.dialogFormVisible = false;
    },
    // 上传头像
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style></style>
