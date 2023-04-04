<template>
  <div class="main">
    <div style="margin-bottom: 30px">
      <el-input v-model="title" placeholder="请填写问题标题"></el-input>
    </div>
    <div style="border: 1px solid black; margin-bottom: 20px">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor style="height: 500px; overflow-y: hidden" v-model="html" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
    </div>
    <div style="text-align: center">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="publish">发布</el-button>
    </div>
  </div>
</template>
<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import documentService from "@/service/api/message/document";
import auth from '@/common/auth';
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
      mode: "simple", // or 'simple'
      helpRow: ""
    };
  },
  props: ["helpEntity"],
  watch: {
    helpEntity:{
      immediate:true,
      handler(cur, old) {
        if (cur != undefined && cur != "" && cur != null) {
          console.log("传值成功!");
          this.title = cur.title;
          this.html = cur.content;
          this.helpRow = cur;
        } else {
          this.title = "";
          this.html = "";
          this.helpRow = "";
        }
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
      if (this.helpRow != undefined && this.helpRow != "") {
        data = this.helpRow;
        data.title = this.title;
        data.content = editor.getHtml();
        data.publishState = 0;
      } else {
        data = {
          title: this.title,
          content: editor.getHtml(),
          publishPerson: userInfo.userName == undefined ? null : userInfo.userName,
          publishState: 0,
          aticleType: "1"
        };
      }
      if (this.helpRow != undefined && this.helpRow != "") {
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
    /**发布 */
    publish() {
        const editor = this.editor;
      if (editor == null) return;
      if (this.checkItemEmpty(editor)) {
        this.$message.warning("表单不能为空!");
        return;
      }
      let userInfo = JSON.parse(auth.getUserInfo().data.userInfo);
      let data = {};
      if (this.helpRow != undefined && this.helpRow != "") {
        data = this.helpRow;
        data.title = this.title;
        data.content = editor.getHtml();
        data.publishState = 1;
      } else {
        data = {
          title: this.title,
          content: editor.getHtml(),
          publishPerson: userInfo.userName == undefined ? null : userInfo.userName,
          publishState: 1,
          aticleType: "1"
        };
      }
      if (this.helpRow != undefined && this.helpRow != "") {
        //编辑
        documentService
          .updateById(JSON.stringify(data))
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("发布成功!");
            } else {
              this.$message.error("发布失败!");
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      } else {
        // 新增
        documentService
          .add(JSON.stringify(data))
          .then((result) => {
            if (result.code == 200) {
              this.$message.success("发布成功!");
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

