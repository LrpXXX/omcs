<template>
  <div>
    <el-card class="box-card" style="margin-top:30px" :key="cardKey">
      <div slot="header" class="clearfix">
        <span>小程序登录底图配置</span>
      </div>
      <div>
        <el-row :gutter="2">
          <el-col :span="3">选择文件:</el-col>
          <el-col :span="6">
            <el-upload
              action=""
              class="upload-demo"
              ref="appImgUpload"
              :auto-upload="false"
              :on-change="handleAppFileChange"
              list-type="picture"
              :limit="1"
              accept=".jpeg,.jpg,.pdf"
              :disabled="appImgVisible == false ? false : true"
            >
              <el-button size="small" type="primary" :style="appImgVisible == false ? '' : 'background-color: gray;'">上传图片</el-button>
              <div slot="tip" class="el-upload__tip">说明：允许上传.jpg .jpeg .pdf格式文件,不超过10M</div>
              <div slot="tip" class="el-upload__tip">图片尺寸：1000*1000</div>
            </el-upload>
          </el-col>
          <el-col :span="12">
            <div class="demo-image" v-if="appImgVisible">
              <el-image style="width: 150px; height: 150px" :src="appImageUrl" :key="appKey-1"></el-image>
              <span class="el-icon-error" @click="handleAppRemove"></span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 70px">
      <div slot="header" class="clearfix">
        <span>pc端登录底图配置</span>
      </div>
      <div>
        <el-row :gutter="2">
          <el-col :span="3">选择文件:</el-col>
          <el-col :span="6">
            <el-upload
              action=""
              class="upload-demo"
              ref="pcImgUpload"
              :auto-upload="false"
              :on-change="handlePcFileChange"
              :show-file-list="false"
              list-type="picture"
              :limit="1"
              accept=".jpeg,.jpg,.pdf"
              :disabled="pcImgVisible == false ? false : true"
            >
              <el-button size="small" type="primary" :style="pcImgVisible == false ? '' : 'background-color: gray;'">上传图片</el-button>
              <div slot="tip" class="el-upload__tip">说明：允许上传.jpg .jpeg .pdf格式文件,不超过10M</div>
              <div slot="tip" class="el-upload__tip">图片尺寸：1000*1000</div>
            </el-upload>
          </el-col>
          <el-col :span="12">
            <div class="demo-image" v-if="pcImgVisible">
              <el-image style="width: 150px; height: 150px" :src="pcImageUrl"></el-image>
              <span class="el-icon-error" @click="handlePcRemove"></span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-row type="flex" justify="center" style="margin-top:70px">
      <el-col :span="8"></el-col>
      <el-col :span="4">
          <el-button type="primary" @click="save">保存</el-button>
      </el-col>
      <el-col :span="4"><el-button type="primary" plain @click="reset">取消</el-button></el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </div>
</template>

<script>
import logBgService from "@/service/api/config/logBg";
export default {
  data() {
    return {
      appEntity: "",
      pcEntity: "",
      appImageUrl: "",
      pcImageUrl: "",
      appImgVisible: false,
      pcImgVisible: false,
      appLoginBgFile: "",
      pcLoginBgFile: "",
      cardKey: "",
      appKey: "",
      pcKey: "",
    };
  },
  created() {
    this.initLoginImage();
  },
  methods: {
    initLoginImage() {
      logBgService
        .getLogBgList()
        .then((res) => {
          if (res.code == 200) {
            const prefix = process.env.VUE_APP_URL.split(":")[0] + ":" + process.env.VUE_APP_URL.split(":")[1] + ":9876";
            res.data.forEach((element) => {
              if (element.clientType == 1) {
                this.appImageUrl = prefix + element.picUrl;
                this.appImgVisible = true;
                this.appEntity = element;
                this.appLoginBgFile = "1";
              } else {
                this.pcImageUrl = prefix + element.picUrl;
                this.pcImgVisible = true;
                this.pcEntity = element;
                this.pcLoginBgFile = "1";
              }
            });
            this.appKey = Date.now();
            this.pcKey = this.appKey + 1;
            console.log(this);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleAppFileChange(file, fileList) {
      console.log(file);
      this.appLoginBgFile = file.raw;
      this.appImageUrl = file.url;
      this.appImgVisible = true;
      this.$refs.appImgUpload.clearFiles(); //去掉文件列表
    },
    handleAppFilePreview(file, fileList) {
      console.log(file, fileList);
    },
    // 移除小程序图片
    handleAppRemove(file) {
      this.appLoginBgFile = "";
      this.appImgVisible = false;
      this.appImageUrl = "";
    },
    handlePcFileChange(file, fileList) {
      this.pcLoginBgFile = file.raw;
      this.pcImageUrl = file.url;
      this.pcImgVisible = true;
      this.$refs.pcImgUpload.clearFiles(); //去掉文件列表
    },
    // 移除PC端图片
    handlePcRemove(file) {
      this.pcLoginBgFile = "";
      this.pcImgVisible = false;
      this.pcImageUrl = "";
    },
    async addOrUpdateAppIamge() {
      if (this.appLoginBgFile == "1"){
        return new Promise((reslove, reject)=>{reslove(true)});
      }
      let appFd = new FormData();
      appFd.append("file", this.appLoginBgFile);
      let id = this.appEntity.id == undefined ? null : this.appEntity.id;
      let smConfigBackground = { id, clientType: "1" };
      appFd.append("smConfigBackground", new Blob([JSON.stringify(smConfigBackground)], { type: "application/json" }));
      let res = await logBgService.add(appFd);
      return new Promise((resolve, reject)=>{
        if (res.code == 200) {
          resolve(true);
        }
        resolve(false)
      });
    },
    async addOrUpdatePcIamge() {
      if (this.pcLoginBgFile == "1"){
        return new Promise((reslove, reject)=>{reslove(true)});
      }
      let pcFd = new FormData();
      pcFd.append("file", this.pcLoginBgFile == "" ? null : this.pcLoginBgFile);
      let id = this.pcEntity.id == undefined ? null : this.pcEntity.id;
      let smConfigBackground = { id, clientType: "2" };
      pcFd.append("smConfigBackground", new Blob([JSON.stringify(smConfigBackground)], { type: "application/json" }));
      const res = await logBgService.add(pcFd);
      return new Promise((resolve, reject)=>{
        if (res.code == 200) {
          resolve(true);
        }
        resolve(false)
      });
    },
    async save() {
      if (this.appLoginBgFile == "" && this.appEntity != "") {
        this.$message.warning("请先上传小程序登录底图!");
        return;
      }
      if (this.pcLoginBgFile == "" && this.pcEntity != ""){
        this.$message.warning("请先上传PC端登录底图!");
        return;
      }
      if(this.appLoginBgFile == "1" && this.pcLoginBgFile == "1") {
        this.$message.success("保存成功!");
        return;
      }
      // 保存小程序登录底图
      let appSave = await this.addOrUpdateAppIamge();
      // 保存pc端登录底图
      let pcSave = await this.addOrUpdatePcIamge();
      console.log(appSave);
      console.log(pcSave);
      if (appSave && pcSave) {
        this.$message.success("保存成功!");
        this.initLoginImage();
      } else {
        this.$message.error("系统故障!");
      }
    },
    // 取消操作
    reset() {
      this.initLoginImage();
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 80vw;
  margin: 0 auto;
}
.mycard {
  width: 100px;
}
.demo-image {
  width: 150px;
  height: 150px;
  border-radius: 5px;
}
span.el-icon-error {
  float: right;
  position: relative;
  top: -158px;
  right: -5px;
}
</style>
