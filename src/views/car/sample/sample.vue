<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="样车状态" prop="type">
        <el-select v-model="formInline.type">
          <el-option v-for="item in selecTion" :key="item.id" :label="item.codeText" :value="item.codeValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预约单号" prop="bookingNumber">
        <el-input v-model.trim="formInline.bookingNumber" placeholder="预约编号"></el-input>
      </el-form-item>
      <el-form-item label="车辆VIM/底盘号" prop="vinOrClassicNumber">
        <el-input v-model.trim="formInline.vinOrClassicNumber" placeholder="车辆VIM/底盘号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSerch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSuReg">重置</el-button>
      </el-form-item>
    </el-form>
    <commonTale :tableData="tableDate" :columObj="columObj" :pageObj="pageObj" @rowOperation="rowOperation"></commonTale>
  </div>
</template>

<script>
import commonTale from "@/components/common-table";
import { Sample } from "@/service/api/issue/sample";
export default {
  components: {
    commonTale,
  },
  data() {
    return {
      // 下拉选项数据
      selecTion: [],
      formInline: {},
      tableDate: [],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "bookingNumber",
            label: "预约单号",
            align: "center",
          },
          {
            text: true,
            prop: "vehicleNumber",
            label: "样车编号",
            align: "center",
          },
          {
            text: true,
            prop: "customerName",
            label: "客户名称",
            align: "center",
          },
          {
            text: true,
            prop: "vehicleName",
            label: "车辆名称",
            align: "center",
          },
          {
            text: true,
            prop: "vehicleModel",
            label: "车辆型号",
            align: "center",
          },
          {
            text: true,
            prop: "vinOrClassic",
            label: "车辆VIM/底盘号",
            align: "center",
          },
          {
            text: true,
            prop: "vehicleType",
            label: "车辆类型",
            align: "center",
          },
          {
            text: true,
            prop: "sampleState",
            label: "样车状态",
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
                operation: "seeSy",
                type: "text",
                label: "收样",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  // return row.sampleState==='待送样';
                  return true
                },
              },
              {
                operation: "seeHy",
                type: "text",
                label: "还样",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  // return row.sampleState==='试验中';
                  return true
                },
              },
              {
                operation: "Syjl",
                type: "text",
                label: "收样记录",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "Hyjl",
                type: "text",
                label: "还样记录",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "ewm",
                type: "text",
                label: "二维码打印",
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
    };
  },
  methods: {
    // 搜索数据
    onSerch() {
      console.log(this.formInline);
      let sampleStates=[]
      if(this.formInline.type===undefined){
        sampleStates=this.selecTion.map(item=>item.id)
      }else{
        sampleStates=this.selecTion.filter(item=>item.codeValue===this.formInline.type).map(item=>item.id)
      }
      console.log(sampleStates);
      const data={bookingNumber:this.formInline.bookingNumber,pageNum:1,pageSize:10,vinOrClassicNumber:this.formInline.vinOrClassicNumber,sampleStates}
      this.getSampleList(data)
    },
    onSuReg() {
      this.formInline={}
    },
    onAdd() {},
    rowOperation(row, $index, now) {
      switch(now){
        case 'seeSy':
          this.$router.push('/car/recpectRecod')
          break;
          case 'seeHy':
          this.$router.push('/car/returnRecod')
            break;
            default: break
      }
    },
    // 查询样车状态
    async getStatus() {
      const res = await Sample.getStates();
      if (res.code === 200) {
        this.selecTion = res.data;
      }
    },
    // 查询表单数据
    async getSampleList(data) {
      const res = await Sample.getSampleList(data);
      if (res.code === 200) {
        const arr = res.data.records.map((item) => {
          for (const s of this.selecTion) {
            if (s.id === item.sampleState) {
              item.sampleState = s.codeText;
            }
          }
          return item;
        });
       this.tableDate=arr
      }
    },
  },
  created() {
    this.getStatus();
    this.getSampleList();
  },
};
</script>

<style></style>
