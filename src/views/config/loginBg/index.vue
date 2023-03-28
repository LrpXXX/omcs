<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>小程序登录底图配置</span>
      </div>
      <div>
        <el-upload
          class="upload-demo"
          action=""
          ref="carupload"
          :on-preview="CarPicPreview"
          list-type="picture"
          :http-request="CarPic"
          :limit="1"
          :on-exceed="onExceed"
          :before-upload="beforeAvatarUpload"
          accept=".bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,
            .webp,.avif,.apng,.heic"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <el-dialog :visible.sync="CarPicDialogVisible" :modal="false" :close-on-click-modal="false">
            <el-img :src="CarPicImageUrl" />
          </el-dialog>
        </el-upload>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 80vw;
  margin: 0 auto;
}
</style>
