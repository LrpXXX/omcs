<template>
    <div class="main">
        <div style="margin-bottom: 30px;">
            <el-input v-model="title"  placeholder="请填写公告标题"></el-input>
        </div>
        <div style="border: 1px solid black;margin-bottom: 20px;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
        />
    </div>
    <div style="text-align: center;">
        <el-button type="primary" @click="save">存为草稿</el-button>
        <el-button @click="artilce">立即发布</el-button>
    </div>
    </div>
</template>
<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
    name: 'MyEditor',
    components: { Editor, Toolbar },
    data() {
        return {
            title:'',
            editor: null,
            html: '',
            toolbarConfig: { },
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'simple', // or 'simple'
        }
    },
    methods: {
        // 创建wangEditor实例对象
        onCreated(editor) {
            this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
            console.log(editor.getConfig());
        },
        printEditorHtml() {
            const editor = this.editor
            if (editor == null) return
            console.log(editor.getHtml())
        },
        // 发布草稿
        save(){
            console.log(!this.title);
            console.log(!this.html);
        },
        artilce(){
            console.log('立即发布');
        }
    },
    mounted() {
        // 模拟 ajax 请求，异步渲染编辑器
        // setTimeout(() => {
        //     this.html = '<p>Ajax 异步设置内容 HTML</p>'
        // }, 1500)
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
    },
}
</script>

<style lang="scss" scoped>
@import "@wangeditor/editor/dist/css/style.css";
.mian{
    width: 80vw;
    margin: 0 auto;
}
</style>

