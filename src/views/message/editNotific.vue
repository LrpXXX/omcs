<template>
  <div class="main">
    <div style="margin-bottom: 30px">
      <el-input v-model="noticeTitle" placeholder="请填写公告标题"></el-input>
    </div>
    <div style="border: 1px solid black; margin-bottom: 20px">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor style="height: 500px; overflow-y: hidden" v-model="html" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
    </div>
    <div style="text-align: center">
      <el-button type="primary" @click="save">存为草稿</el-button>
      <el-button @click="artilce">立即发布</el-button>
    </div>
  </div>
</template>
<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import notification from "@/service/api/message/notifiction";
import auth from "@/common/auth";
export default {
  name: "MyEditor",
  components: { Editor, Toolbar },
  data() {
    return {
      noticeTitle: this.$route.query.notificRow.noticeTitle == undefined ? "" : this.$route.query.notificRow.noticeTitle,
      notificRow: this.$route.query.notificRow == undefined ? "" : this.$route.query.notificRow,
      editor: null,
      html: this.$route.query.notificRow.noticeContent == undefined ? "" : this.$route.query.notificRow.noticeContent,
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "simple", // or 'simple'
    };
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
    // 发布草稿
    save() {
      const editor = this.editor;
      if (editor == null) return;
      if (this.checkItemEmpty(editor)) {
        this.$message.warning("表单不能为空!");
        return;
      }
      let userInfo = JSON.parse(auth.getUserInfo().data.userInfo);
      let data = {};
      if (this.notificRow == undefined || this.notificRow == "") {
        data = this.notificRow;
        data.noticeTitle = this.noticeTitle;
        data.noticeContent = editor.getHtml();
        data.publishState = 0;
      } else {
        data = {
          noticeTitle: this.noticeTitle,
          noticeContent: editor.getHtml(),
          publishPerson: userInfo.userName == undefined ? null : userInfo.userName,
          publishState: 0,
          displayClinet: "",
        };
      }
      if (this.notificRow != undefined && this.notificRow != "") {
        notification.updateById(JSON.stringify(data))
        .then((res) => {
            if (res.code == 200) {
              this.$message.success("发布存为草稿成功！!");
              this.$router.push("/message/notifiction");
            } else {
              this.$message.error("发布失败!");
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      } else {
        notification.add(JSON.stringify(data))
          .then((result) => {
            if (result.code == 200) {
              this.$message.success("发布存为草稿成功！");

              this.noticeTitle = "";
              this.editor.setHtml("");
              return;
            }
            this.$message.error("系统故障");
          })
          .catch((err) => {
            this.$message.error(err);
          });
      }
    },
    artilce() {
      const editor = this.editor;
      if (editor == null) return;
      if (this.checkItemEmpty(editor)) {
        this.$message.warning("表单不能为空!");
        return;
      }
      let userInfo = JSON.parse(auth.getUserInfo().data.userInfo);
      let data = {};
      if (this.notificRow != undefined && this.notificRow != "") {
        data = this.notificRow;
        data.noticeTitle = this.noticeTitle;
        data.noticeContent = editor.getHtml();
        data.publishState = 1;
        console.log(this.notificRow);
        console.log(data);
      } else {
        data = {
          noticeTitle: this.noticeTitle,
          noticeContent: editor.getHtml(),
          publishPerson: userInfo.userName == undefined ? null : userInfo.userName,
          publishState: 1,
          displayClinet: "",
        };
      }
      if (this.notificRow != undefined && this.notificRow != "") {
        debugger;
        notification
          .updateById(JSON.stringify(data))
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("发布公告成功！!");
              this.$router.push("/message/notifiction");
            } else {
              this.$message.error("发布失败!");
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      } else {
        notification
          .add(JSON.stringify(data))
          .then((result) => {
            if (result.code == 200) {
              this.$message.success("发布公告成功！");
              this.noticeTitle = "";
              this.editor.setHtml("");
              return;
            }
            this.$message.error("系统故障");
          })
          .catch((err) => {
            this.$message.error(err);
          });
      }
    },
    checkItemEmpty(editor) {
      console.log(editor.getHtml());
      if (this.noticeTitle == undefined || this.noticeTitle == "") {
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

