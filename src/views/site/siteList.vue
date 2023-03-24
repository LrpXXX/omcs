<template>
  <div class="search">
    <el-form v-model="serchFrom" :inline="true">
      <el-form-item label="场地名称" prop="name">
        <el-input v-model.trim="serchFrom.name"></el-input>
      </el-form-item>
      <el-form-item label="封场状态" prop="zt">
        <el-select v-model.trim="serchFrom.zt" placeholder="封场状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已封场" value="已封场"></el-option>
          <el-option label="未封场" value="未封场"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSuReg">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="onSubAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <commonTable
      :tableData="tableData"
      :columObj="columObj"
      :pageObj="pageObj"
      @rowOperation="rowOperation"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></commonTable>
    <!-- 新增编辑弹窗页面 -->
    <el-dialog title="新增/编辑场地" :visible.sync="dialogFormVisible">
      <el-form :model="eidtFrom" :rules="eidtRules" ref="eidtFrom" label-width="100px">
        <el-form-item label="场地名称" prop="cdname">
          <el-input v-model="eidtFrom.cdname"></el-input>
        </el-form-item>
        <el-form-item label="场地容量" prop="cdrl">
          <el-input text="number" v-model="eidtFrom.cdrl"></el-input>
        </el-form-item>
        <el-form-item label="场地等级" prop="cddj">
          <el-radio-group v-model="eidtFrom.cddj">
            <el-radio label="一级"></el-radio>
            <el-radio label="二级"></el-radio>
            <el-radio label="三级"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="计费模式" prop="jfms">
          <el-radio-group v-model="eidtFrom.jfms">
            <el-radio label="时长 "></el-radio>
            <el-radio label="里程"></el-radio>
            <el-radio label="次数"></el-radio>
            <el-radio label="天数"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否包场" prop="iscine">
          <el-radio-group v-model="eidtFrom.iscine">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="eidtFrom.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('eidtFrom')">确定</el-button>
          <el-button @click="resetForm('eidtFrom')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改容量 -->
    <el-dialog title="清除容量" :visible.sync="dialogRlVisible">
      <el-form :model="rlFrom" :rules="rlRules" ref="rlFrom" label-width="150px">
        <el-form-item label="当前场地容量" prop="cdrl">
          <el-input disabled v-model="rlFrom.cdrl"></el-input>
        </el-form-item>
        <el-form-item label="容量修改为" prop="ncdrl">
          <el-input text="number" v-model="rlFrom.ncdrl"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import commonTable from "@/components/common-table/index.vue";
import { Site } from "@/service/api/site/site"; 
export default {
  components: {
    commonTable,
  },
  data() {
    return {
      // 搜索表单实例
      serchFrom: {},
      // 修改表单实例
      eidtFrom: {},
      rlFrom: {},
      rlRules: {
        cdrl: [{ required: true, message: "请输入场地容量", trigger: "blur" }],
        ncdrl: [{ required: true, message: "请输入场地容量", trigger: "blur" }],
      },
      eidtRules: {
        cdname: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        cdrl: [{ required: true, message: "请输入场地容量", trigger: "blur" }],
        cddj: [{ required: true, message: "请选择场地等级", trigger: "change" }],
        jfms: [{ required: true, message: "请选择计费模式", trigger: "change" }],
        iscine: [{ required: true, message: "是否包场", trigger: "change" }],
      },
      dialogFormVisible: false,
      dialogRlVisible: false,
      tableData: [],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "siteName",
            label: "场地名称",
            align: "center",
            width: "150",
          },
          {
            text: true,
            prop: "blockBooking",
            label: "支持包场",
            align: "center",
            width: "300",
          },
          {
            text: true,
            prop: "blockState",
            label: "包场状态",
            align: "center",
            width: "150",
          },
          {
            text: true,
            prop: "billingMode",
            label: "计费模式",
            width: "300",
            align: "center",
          },

          {
            text: true,
            prop: "siteLevel",
            label: "场地等级",
            width: "200",
            align: "center",
          },
          {
            text: true,
            prop: "siteCapacity",
            label: "场地容量",
            width: "200",
            align: "center",
          },
          {
            text: true,
            prop: "currentCapacity",
            label: "当前容量",
            width: "200",
            align: "center",
          },
          {
            text: true,
            prop: "closeState",
            label: "封场状态",
            width: "200",
            align: "center",
          },
          {
            text: true,
            prop: "daoz",
            label: "道闸",
            width: "200",
            align: "center",
          },
          {
            text: true,
            prop: "flag",
            label: "状态",
            width: "200",
            align: "center",
          },  {
            text: true,
            prop: "remark",
            label: "备注",
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
                operation: "jfgz",
                type: "text",
                label: "计费规则",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "seejie",
                type: "text",
                label: "解封",
                icon: "",
                isShow: (row, $index) => {
                  return row.fctt !== "未封场";
                },
              },
              {
                operation: "seeopen",
                type: "text",
                label: "封场",
                icon: "",
                isShow: (row, $index) => {
                  return row.fctt === "未封场";
                },
              },
              {
                operation: "",
                type: "text",
                label: "清除容量",
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
                label: "启用",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.zt === "启用";
                },
              },
              {
                operation: "delete",
                type: "text",
                label: "禁用",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.zt === "禁用";
                },
              },
            ],
          },
        ],
      },
      pageObj: {
        position: "right", //分页组件位置
        total: 50,
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    rowOperation(row, $index, now) {
      console.log(row, now);
      switch (now) {
        case "edit":
          this.eidtFrom = JSON.parse(JSON.stringify(row));
          this.dialogFormVisible = true;
          break;
        case "":
          this.dialogRlVisible = true;
          this.rlFrom = JSON.parse(JSON.stringify(row));
          break;
        case "see":
          break;
        case "jfgz":
          this.$router.push("/site/cinema");
          break;
        case "delet":
          break;
        default:
          break;
      }
    },
    // 总页数发生改变
    handleSizeChange(e) {
      this.$emit("handleSizeChange", e);
    },
    // 页码变化
    handleCurrentChange(e) {
      this.$emit("handleCurrentChange", e);
    },
    // 查询数据
    onSubmit() {
      console.log(this.serchFrom);
      if (this.serchFrom.zt !== undefined || this.serchFrom.name !== undefined) {
        console.log("其中有一个不为空");
        this.tableData = this.tableData.filter((item) => item.cdname === this.serchFrom.name || item.fctt === this.serchFrom.zt);
      } else {
        console.log("两个为空");
        this.tableData = [...this.tableData];
      }
    },
    onSuReg() {
      this.serchFrom = {};
      this.tableData = [...this.tableData];
    },
    // 点击新增弹出模态框
    onSubAdd() {
      this.dialogFormVisible = true;
    },
    // 获取新增/修改表单是咧
    submitForm(fromName) {
      this.$refs[fromName].validate().then((res) => {
        console.log(res);
        console.log(this.eidtFrom);
        if(res){
          if(this.eidtFrom.id!==undefined){
           const index= this.tableData.findIndex(item=>item.id===this.eidtFrom.id)
           console.log(index,'index');
            this.$set(this.tableData,index,this.eidtFrom)
            this.tableData=JSON.parse(JSON.stringify(this.tableData))
          }else{
            this.tableData.push(        {
          id: this.tableData.length+1,
          cdname: this.eidtFrom.cdname,
          iscine: this.eidtFrom.iscine,
          cineType: this.eidtFrom.iscine?'已包场':'未包场',
          timem: this.eidtFrom.jfms,
          cddj: this.eidtFrom.cddj,
          cdrl: this.eidtFrom.cdrl,
          dqrl: undefined,
          fctt: this.eidtFrom.fctt,
          daoz: "",
          zt: "",
          beizhu: this.eidtFrom.desc
        },)
          }
        }
        this.dialogFormVisible = false;
      });
    },
    // 清楚新增/修改表单实例
    resetForm(fromName) {
      this.dialogFormVisible = false;
    },
    // 查询场地数据
    getSiteLsit(){
      Site.getList().then(res=>{
        if(res.code===200){
          this.tableData=res.data.map(item=>{
            item.blockBooking===1?item.blockBooking='是':item.blockBooking='否'
            item.blockState===0?item.blockState='未包场':item.blockState='已包场'
            item.closeState===0?item.closeState='未封场':item.closeState='已封场'
            item.flag===0?item.flag='启用':item.flag='禁用'
            return   item
          })
        }
      }).catch(err=>{console.log(err);})
    }
  },
  created(){
    this.getSiteLsit()
  }
};
</script>

<style></style>
