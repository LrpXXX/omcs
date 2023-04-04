<template>
  <div class="main">
    <el-form :inline="true" :model="seletFrom">
      <el-form-item label="状态:">
        <el-select v-model="seletFrom.state">
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展示端:">
        <el-select v-model="seletFrom.client">
          <el-option v-for="item in clientOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="margin-bottom: 30px">
      <el-input v-model="title" placeholder="请填写公告标题"></el-input>
    </div>
    <div style="border: 1px solid black; margin-bottom: 20px">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor style="height: 500px; overflow-y: hidden" v-model="html" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
    </div>
    <div style="text-align: center">
      <el-button type="primary" @click="save">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import auth from '@/common/auth';
import documentService from '@/service/api/message/document';
export default {
  name: "MyEditor",
  components: { Editor, Toolbar },
  data() {
    return {
      title: "",
      editor: null,
      html: "",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "simple", // or 'simple',
      agreeRow: "",
      seletFrom: {
        state: "",
        client: ""
      },
      stateOptions: [
        {
          value: 0,
          label: "未发布",
        },
        {
          value: 1,
          label: "发布",
        },
      ],
      clientOptions: [
        {
          value: "PC端",
          label: "PC端",
        },
        {
          value: "小程序",
          label: "小程序",
        },
      ],
    };
  },
  watch: {
    agreeEntiy(cur, old) {
      if (cur != undefined && cur != "" && cur != null) {
        this.title = cur.title;
        this.html = cur.content;
        this.agreeRow = cur;
      }
    },
  },
  methods: {
    // 创建wangEditor实例对象
    onCreated(editor) {
      this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
      console.log(editor.getConfig());
    },
    printEditorHtml() {
      const editor = this.editor;
      if (editor == null) return;
      console.log(editor.getHtml());
    },
    /**保存为草稿 */
    save() {
      const editor = this.editor;
      if (editor == null) return;
      if (this.checkItemEmpty(editor)) {
        this.$message.warning("表单不能为空!");
        return;
      }
      let userInfo = JSON.parse(auth.getUserInfo().data.userInfo);
      let data = {};
      if (this.agreeRow != undefined && this.agreeRow != "") {
        data = this.agreeRow;
        data.title = this.title;
        data.content = editor.getHtml();
        data.publishState = this.seletFrom.state;
      } else {
        data = {
          title: this.title,
          content: editor.getHtml(),
          publishPerson: userInfo.userName == undefined ? null : userInfo.userName,
          publishState: this.seletFrom.state,
          aticleType: "2",
        };
      }
      if (this.agreeRow != undefined && this.agreeRow != "") {
        //编辑
        documentService
          .updateById(JSON.stringify(data))
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("保存为草稿成功!");
            } else {
              this.$message.error("保存失败!");
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      } else {
        //新增
        documentService
          .add(JSON.stringify(data))
          .then((result) => {
            if (result.code == 200) {
              this.$message.success("保存为草稿成功!");
              this.title = "";
              this.editor.setHtml("");
              return;
            }
            this.$message.error("系统故障");
          })
          .catch((err) => {
            this.$message.error(err);
          });
      }
      this.$emit("closeDialog");
    },
    /**取消 */
    cancel() {
        // 重置数据

        this.$emit("closeDialog");
    },
    checkItemEmpty(editor) {
      console.log(editor.getHtml());
      if (this.title == undefined || this.title == "") {
        return true;
      }
      if (editor.getHtml() == undefined || editor.getHtml() == "" || editor.getHtml() == "<p><br></p>") {
        return true;
      }
      return false;
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //     this.html = '<p>Ajax 异步设置内容 HTML</p>'
    // }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
  },
};
</script>

<style lang="scss" scoped>
@import "@wangeditor/editor/dist/css/style.css";
.mian {
  width: 80vw;
  margin: 0 auto;
}
</style>

