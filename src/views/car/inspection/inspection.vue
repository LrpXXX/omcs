<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="车辆名称" prop="name">
        <el-input v-model.trim="formInline.name"></el-input>
      </el-form-item>
      <el-form-item label="车牌号" prop="carCode">
        <el-input v-model.trim="formInline.carCode" placeholder="车牌号码"></el-input>
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
            <el-option v-for="item in selectList" :key="item.id" :label="item.codeText" :value="item.codeValue"></el-option>
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
    <!-- 通行权限 -->
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
        <el-button type="primary" @click="authAddorSave">确认</el-button>
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
import { Ispection } from "@/service/api/car/ispection";
import { Message } from "element-ui";
import { Site } from "@/service/api/site/site";
import { formatDate } from "@/service/zdk/timeTime";
import { Allasig } from "@/service/api/all";
export default {
  components: { commonTale },
  data() {
    return {
      formInline: {},
      tableData: [],
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
            prop: `createTime`,
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
        total: 10,
        pageIndex: 1,
        pageSize: 10,
      },
      openVisible: false,
      openFrom: {},
      openRul: {},
      roluesVisible: false,
      // authe: ["直线性能路", "制动评价路", "NVH评价路", "噪声路", "强化坏路", "坡道路", "动态圆广场A", "动态圆广场B"],
      authe: [],
      value: "",
      checkedAuthe: [],
      // 巡检车辆ID
      vehicleId: "",
      // checkedAuthe是否拥有ID
      id: "",
      selectList: [],
    };
  },
  methods: {
    rowOperation(row, $index, now) {
      switch (now) {
        case "see":
          this.roluesVisible = true;
          // this.authList(row.id)
          // 获取到的巡检车辆ID
          this.vehicleId = row.id;
          this.authChecked(row.id);
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
    // 模糊匹配
    onSerch() {
      console.log(this.formInline);
      const data = {
        contactPerson: this.formInline.lyname,
        vehicleNumber: this.formInline.carCode,
        vehicleName: this.formInline.name,
        pageSize: 1,
        pageNumber: 10,
      };
      console.log(data);
      this.sercheIspection(data);
      this.formInline={}
    },
    // 重置表单查询
    onSuReg() {
      // 重置表单数据
      this.sercheIspection();
      this.formInline={}
    },
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
          console.log(res, "巡检车辆数据");
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
    async authChecked(id) {
      console.log(id);
      let res = await Ispection.getVehicleId(id);
      // 回显选中auth
      console.log(res.data);
      if (res.code === 200) {
        if (res.data.length > 0) {
          this.id = 1;
          // 选中得数组
          this.checkedAuthe = this.authe
            .map((item) => {
              for (const i of res.data) {
                if (item.id === i.siteId) {
                  return item.siteName;
                }
              }
            })
            .filter((item) => item);
          console.log(this.checkedAuthe);
        } else {
          this.id = undefined;
          this.checkedAuthe = [];
        }
      }
    },
    // 查询所有道路权限列表
    async authList() {
      try {
        let res = await Site.getList();
        if (res.code === 200) {
          this.authe = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 查询XJRYCLPZ数据
    async getPZList() {
      try {
        let res = await Allasig.siteCdCode({ codeValue: "XJRYCLPZ" });
        if (res.code === 200) {
          this.selectList = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 修改或者道路权限
    async saveOrUpate(data, saveData) {
      console.log(saveData);
      // 新增为undefind  否则为修改
      if (this.id === undefined) {
        // 先进行规则校验
        const siteRule = await Allasig.siteRuleValidation(data);
        console.log(siteRule.code);
        if (siteRule.code == 200) {
          console.log("新增十八", saveData);
          this.addVehcl(saveData);
        }
      } else {
        const siteRule = await Allasig.siteRuleValidation(data);
        if (siteRule.code == 200) {
          console.log("修改对吧", saveData);
          this.updateVehclAdd(saveData);
        }
      }
    },
    // 新增权限管理
    async addVehcl(data) {
      try {
        let res = await Ispection.vehicledAdd(data);
        if (res.code === 200) {
          Message.success("权限新增成功");
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 修改权限管理
    async updateVehclAdd(data) {
      try {
        let res = await Ispection.vehicledUpade(data);
        if (res.code === 200) {
          Message.success("权限修改成功");
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 取消权限管理
    exit() {
      this.roluesVisible = false;
      this.value = "";
    },
    // 新增或修改权限管理处理数据确认确认按钮
    authAddorSave() {
      const timeArr = [];
      for (const item of this.value) {
        timeArr.push(formatDate(item));
      }
      let smPatrolVehicleRightList = [];
      smPatrolVehicleRightList = this.authe
        .map((item) => {
          for (const i of this.checkedAuthe) {
            if (i === item.siteName) {
              return item;
            }
          }
        })
        .filter((item) => item);
      let data = [];
      if (this.id === undefined) {
        data = this.authe
          .map((item) => {
            for (const i of this.checkedAuthe) {
              if (i === item.siteName) {
                return { siteId: item.id, timeEnd: timeArr[1], timeStart: timeArr[0], vehicleId: this.vehicleId };
              }
            }
          })
          .filter((item) => item);
        console.log(data);
      } else {
        let newData = this.authe
          .map((item) => {
            for (const i of this.checkedAuthe) {
              if (i === item.siteName) {
                return { siteId: item.id, timeEnd: timeArr[1], timeStart: timeArr[0], vehicleId: this.vehicleId };
              }
            }
          })
          .filter((item) => item);
        data = {
          smPatrolVehicleRightList: newData,
          vehicleId: this.vehicleId,
        };
      }
      this.saveOrUpate(smPatrolVehicleRightList, data);
      this.roluesVisible = false;
    },
  },
  // 生命周期开发
  created() {
    // 获取表单数据
    this.sercheIspection();
    // 获取道路权限列表数据
    this.authList();
    // 获取车辆类型数据
    this.getPZList();
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
