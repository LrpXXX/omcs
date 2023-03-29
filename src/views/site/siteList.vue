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
    <el-dialog title="新增场地" :visible.sync="addVisible">
      <el-form :model="addFrom" :rules="eidtRules" ref="addFrom" label-width="100px">
        <el-form-item label="场地名称" prop="siteName">
          <el-input v-model="addFrom.siteName"></el-input>
        </el-form-item>
        <el-form-item label="场地容量" prop="siteCapacity">
          <el-input text="number" v-model="addFrom.siteCapacity"></el-input>
        </el-form-item>
        <el-form-item label="场地等级" prop="siteLevel">
          <el-radio-group v-model="addFrom.siteLevel">
            <el-radio v-for="item in  CDDJList" :key="item.id" :label="item.codeValue" >{{ item.codeText }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="计费模式" prop="billingMode">
          <el-radio-group v-model="addFrom.billingMode">
            <el-radio v-for="item in  JFMSList" :key="item.id" :label="item.codeValue" >{{ item.codeText }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否包场" prop="blockBooking">
          <el-radio-group v-model="addFrom.blockBooking">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addFrom.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addFrom')">确定</el-button>
          <el-button @click="resetForm('addFrom')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑场地 -->
    <el-dialog title="编辑场地" :visible.sync="dialogFormVisible">
      <el-form :model="eidtFrom" :rules="eidtRules" ref="eidtFrom" label-width="100px">
        <el-form-item label="场地名称" prop="siteName">
          <el-input v-model="eidtFrom.siteName"></el-input>
        </el-form-item>
        <el-form-item label="场地容量" prop="siteCapacity">
          <el-input text="number" v-model="eidtFrom.siteCapacity"></el-input>
        </el-form-item>
        <el-form-item label="场地等级" prop="siteLevel">
          <el-radio-group v-model="eidtFrom.siteLevel">
            <el-radio v-for="item in  CDDJList" :key="item.id" :label="item.codeValue" >{{ item.codeText }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="计费模式" prop="billingMode">
          <el-radio-group v-model="eidtFrom.billingMode" disabled>
            <el-radio v-for="item in  JFMSList" :key="item.id" :label="item.codeValue" >{{ item.codeText }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否包场" prop="blockBooking">
          <el-radio-group v-model="eidtFrom.blockBooking">
            <el-radio label="是" :value="eidtFrom.blockBooking"></el-radio>
            <el-radio label="否" :value="eidtFrom.blockBooking"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="eidtFrom.remark"></el-input>
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
import { Message } from "element-ui";
import { Allasig } from "@/service/api/all";
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
        siteName: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        siteCapacity: [{ required: true, message: "请输入场地容量", trigger: "blur" }],
        siteLevel: [{ required: true, message: "请选择场地等级", trigger: "change" }],
        billingMode: [{ required: true, message: "请选择计费模式", trigger: "change" }],
        blockBooking: [{ required: true, message: "是否包场", trigger: "change" }],
      },
      // 编辑弹窗
      dialogFormVisible: false,
      dialogRlVisible: false,
      addVisible: false,
      addFrom: {},
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
          },
          {
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
        total: 10,
        pageIndex: 1,
        pageSize: 10,
      },
      // 计费模式数据
      JFMSList:[],
      // 场地等级数据
      CDDJList:[]
    };
  },
  methods: {
    rowOperation(row, $index, now) {
      console.log(row, now);
      switch (now) {
        case "edit":
          console.log(row);
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
    // 重置数据
    onSuReg() {
      this.serchFrom = {};
      this.getSiteLsit();
    },
    // 点击新增弹出模态框
    onSubAdd() {
      this.addVisible = true;
    },
    // 获取新增/修改表单是咧
    submitForm(fromName) {
      this.$refs[fromName].validate().then((res) => {
        if (res) {
          if (fromName === "addFrom") {
            console.log("新增呀");
            const siteLevel=this.CDDJList.map(item=>{
              if(item.codeValue===this.addFrom.siteLevel){
                return  item.codeValue
              }
            }).filter(item=>item).toString()
            const billingMode=this.JFMSList.map(item=>{
              if(item.codeValue===this.addFrom.siteLevel){
                return  item.codeValue
              }
            }).filter(item=>item).toString()
            const data = {
              siteName: this.addFrom.siteName,
              siteCapacity: this.addFrom.siteCapacity,
              siteLevel,
              billingMode,
              blockBooking: this.addFrom.blockBooking === "是" ? 0 : 1,
              remark: this.addFrom.remark,
            };
            console.log(data);
            this.addSitelist(data);
            this.addVisible=false
            console.log(data);
          } else if (fromName === "eidtFrom") {
            const siteLevel=this.CDDJList.map(item=>{
              if(item.codeValue===this.eidtFrom.siteLevel){
                return  item.codeValue
              }
            }).filter(item=>item).toString()
            const data={
              siteName:this.eidtFrom.siteName,
              siteCapacity:this.eidtFrom.siteCapacity,
              siteLevel,
              billingMode:this.eidtFrom.billingMode,
              blockBooking:this.eidtFrom.blockBooking ==='是'?0:1,
              remark:this.eidtFrom.remark
            }
            console.log("修改呀",data);
            this.updateSiteList(data)
            this.dialogFormVisible=false
          }
        }
      });
    },
    // 清楚新增/修改表单实例
    resetForm(fromName) {
      if (fromName === "addfFrom") {
        this.addVisible = false;
      } else if (fromName === "editFrom") {
        this.dialogFormVisible = false;
      }
    },
    // 查询场地数据
    getSiteLsit() {
      Site.getPageList()
        .then((res) => {
          if (res.code === 200) {
            let newData = res.data.records.map((item) => {
              item.blockBooking === 1 ? (item.blockBooking = "是") : (item.blockBooking = "否");
              item.blockState === 0 ? (item.blockState = "未包场") : (item.blockState = "已包场");
              item.closeState === 0 ? (item.closeState = "未封场") : (item.closeState = "已封场");
              item.flag === 0 ? (item.flag = "启用") : (item.flag = "禁用");
              return item;
            });
            console.log(this.tableData);
            // this.tableData=newData.map(item=>{})
            // 处理CDDJ
           this.tableData= newData.map(items=>{
              for (const item of this.CDDJList) {
                  if(item.codeValue===items.siteLevel){
                    return  item.codeText
                  }
            }
            }).map(items=>{
              for (const item of this.JFMSList) {
                  if(item.codeValue===items.siteLevel){
                    return  item.codeText
                  }
            }
            })
            // 处理计费模式

          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 添加场地管理数据
    addSitelist(data) {
      Site.addSiteLsit(data).then((res) => {
        if (res.code === 200) {
          Message.success("添加成功");
          this.addVisible = false;
          this.addFrom = {};
          this.getSiteLsit();
        }
      });
    },
    // 查询字典表
    siteCode() {
      // CDDJ字典表
      Allasig.siteCdCode().then(res=>{
        if(res.code===200){
          this.CDDJList=res.data
        }
      })
      // 计费模式字典表
      Allasig.siteCdCode({ codeValue: "JFMS" }).then(res=>{
        if(res.code===200){
          this.JFMSList=res.data
        }
      })
    },
    // 修改管理数据
    updateSiteList(data) {
      Site.updateByID(data).then((res) => {
        if (res.code === 200) {
          Message.success("修改成功");
          this.getSiteLsit();
        }
      });
    },
  },
  created() {
    this.getSiteLsit();
    // 获取场地和计费模式的字典表数据
    this.siteCode();
  },
};
</script>

<style></style>
