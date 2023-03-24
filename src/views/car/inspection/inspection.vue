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
    <!-- 新增/修改 -->
    <el-dialog title="新增/编辑巡检车辆" :visible.sync="openVisible">
      <el-form :model="openFrom" :rules="openRul" ref="openFrom" label-width="150px">
        <el-form-item label="车辆名称" prop="vehicleName">
          <el-input v-model="openFrom.vehicleName"></el-input>
        </el-form-item>
        <el-form-item label="车牌号" prop="contactNumber">
          <el-input v-model="openFrom.vehicleNumber"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactPerson">
          <el-input v-model="openFrom.contactPerson"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactNumber">
          <el-input v-model="openFrom.contactNumber"></el-input>
        </el-form-item>
        <el-form-item label="车辆类型" prop="patrolType">
          <el-select v-model="openFrom.patrolType" placeholder="请选择车辆类型">
            <el-option label="试验样车" value="试验样车"></el-option>
            <el-option label="巡检车辆" value="巡检车辆"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="openFrom.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('openFrom')">取消</el-button>
          <el-button type="primary" @click="submitForm('openFrom')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 同行权限 -->
    <el-dialog title="选择通行权限" :visible.sync="roluesVisible" class="auth">
      <el-checkbox-group v-model="checkedAuthe">
        <el-checkbox v-for="item in authe" :label="item.siteName" :key="item.id" style="display: block">{{ item.siteName }}</el-checkbox>
      </el-checkbox-group>
      <span>有效时间</span>
      <el-date-picker
        v-model="value"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="btn"
      ></el-date-picker>
      <div class="btn">
        <el-button @click="exit">取消</el-button>
        <el-button type="primary" @click="authAdd">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * @param tableDate={vehicleName:车辆名称 ,vehicleNumber :车牌号 ,contactPerson : 联系人 ,contactNumber: 联系电话 ,patrolType : 车辆类型 ,remaker :备注 }
 *
 */
import commonTale from "@/components/common-table";
import { Ispection } from "@/service/api/issue/ispection";
import { Message } from "element-ui";
import { Site } from "@/service/api/site/site";
import { formatDate } from "@/service/zdk/timeTime";
export default {
  components: { commonTale },
  data() {
    return {
      formInline: {},
      tableData: [
        {
          vehicleName: "1002",
          vehicleNumber: "tx2023001",
          time: "2015-09-31  15:31:02",
          patrolType: "发放",
          contactPerson: "刘强",
          contactNumber: 15736288040,
          khName: "中国长安",
        },
        {
          vehicleName: "1002",
          vehicleNumber: "tx2023002",
          time: "2015-09-31  15:31:02",
          patrolType: "发放",
          contactPerson: "",
          contactNumber: undefined,
          khName: "中国汽研",
        },
        {
          vehicleName: "1003",
          vehicleNumber: "tx2023003",
          time: "2018-09-31  15:31:02",
          patrolType: "收回",
          contactPerson: "",
          contactNumber: undefined,
          khName: "lims",
        },
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "vehicleName",
            label: "车辆名称",
            align: "center",
          },
          {
            text: true,
            prop: "vehicleNumber",
            label: "车牌号",
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
      openRul: {},
      roluesVisible: false,
      // authe: ["直线性能路", "制动评价路", "NVH评价路", "噪声路", "强化坏路", "坡道路", "动态圆广场A", "动态圆广场B"],
      auth:[],
      value: "",
      checkedAuthe: ["直线性能路线"],
      vehicleId:'',
      id:''
    };
  },
  methods: {
    rowOperation(row, $index, now) {
      switch (now) {
        case "see":
          this.roluesVisible = true;
          // this.authList(row.id)
          this.vehicleId=row.id
          this.authChecked(row.id)
          break;
        case "delete":
          this.$confirm("是否删除该巡检车辆？", {
            distinguishCancelAndClose: true,
            confirmButtonText: "确认",
            cancelButtonText: "取消",
          })
            .then(() => {
              this.delIspection(row.id);
            })
            .catch((action) => {
              this.$message({
                message: action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面",
              });
            });
          break;
        case "edit":
          console.log(row);
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
    // 取消表单数据
    resetForm(fromName) {
      // this.$refs[fromName].res
      this.openVisible = false;
      this.openFrom = {};
    },
    // 表单校验通过进行逻辑处理
    submitForm(fromName) {
      if (this.openFrom.id !== undefined) {
        const data = {
          id: this.openFrom.id,
          vehicleName: this.openFrom.vehicleName,
          vehicleNumber: this.openFrom.vehicleNumber,
          contactPerson: this.openFrom.contactPerson,
          contactNumber: this.openFrom.contactNumber,
          patrolType: this.openFrom.patrolType,
          remaker: this.openFrom.remaker,
        };
        Ispection.ispectionListUpdate(data)
          .then((res) => {
            if (res.code === 200) {
              Message.success("修改成功");
              this.openVisible = false;
              this.sercheIspection();
              this.openFrom = {};
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const data = {
          vehicleName: this.openFrom.vehicleName,
          vehicleNumber: this.openFrom.vehicleNumber,
          contactPerson: this.openFrom.contactPerson,
          contactNumber: this.openFrom.contactNumber,
          patrolType: this.openFrom.patrolType,
          remaker: this.openFrom.remaker,
        };
        Ispection.ispectionListAdd(data)
          .then((res) => {
            if (res.code === 200) {
              Message.success("添加成功");
              this.openVisible = false;
              // 添加成功之后重新查询数据
              this.sercheIspection();
              this.openFrom = {};
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 查询巡检车辆数据
    sercheIspection(data) {
      Ispection.ispectionList(data)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.records;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 根据ID删除数据逻辑删除
    delIspection(id) {
      Ispection.ispectionListDelId(id)
        .then((res) => {
          if (res.code === 200) {
            Message.success("删除成功");
            this.sercheIspection();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 根据VehicleId查询权限列表进行判断回显
    authChecked(id){
      Ispection.getVehicleId(id).then(res=>{
        console.log(res);
        if(res.code===200){
          // 判断id得值
          this.id=res.data.id
          // 对siteI的进行处理回显
          // const auth=[...res.data.siteId]
          const auth=(res.data.siteId).split(',')
            // 选中得数组
          this.checkedAuthe=  this.authe.map(item=>{
              for(const i of auth){
                if(item.id===i){
                  return  item.siteName
                }
              }
            }).filter(item=>item)
          console.log(this.checkedAuthe);
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    // 查询所有道路权限列表
    authList() {
      Site.getList()
        .then((res) => {
          if (res.code === 200) {
            this.authe = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 修改查询权限
    saveOrUpate(date) {
      Ispection.saveOrUpate(date).then(res=>{
        if(res.code===200){
          Message.success('修改成功')
          this.roluesVisible=false
        }
      }).catch(err=>{
        console.log(err);
      });
    },
    // 取消权限管理
    exit() {
      this.roluesVisible = false;
      this.value=''
    },
    // 新增或修改权限管理处理数据
    authAdd() {
      const autheId = this.authe
        .map((item) => {
          for (const i of this.checkedAuthe) {
            if (i === item.siteName) {
              return item.id;
            }
          }
        })
        .filter((item) => item);
      const timeArr = [];
      for (const item of this.value) {
        timeArr.push(formatDate(item))
      }
      console.log(timeArr);
      const data={id:this.id,vehicleId:this.vehicleId,siteId:autheId.join(),timeStart:timeArr[0],timeEnd:timeArr[1]}
      this.saveOrUpate(data)
    },
  },
  created() {
    // 获取表单数据
    this.sercheIspection();
    // 获取道路权限列表数据
    this.authList()
  },
};
</script>

<style lang="scss" scoped>
.auth {
  width: 60vw;
  margin: auto;
  font-size: 46px;
  .btn {
    margin-top: 10px;
  }
}
</style>
