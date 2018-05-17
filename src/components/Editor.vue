<template lang="pug">
div.editor-root
  div.editor-container
    div.editor-input
      div.editor-tools-bar
        div.editor-tools-bar-title
          input.editor-title-input(type="text" placeholder="请输入标题" v-model="title")
        div.editor-tools-bar-icons
          i.el-icon-picture(title="插入图片")
          i.el-icon-arrow-left(title="撤销")
          i.el-icon-arrow-right(title="重做")
          i.el-icon-document(title="保存")
          i.el-icon-edit(title="预览/编辑")
          i.el-icon-success(title="发布")
      div.editor-textarea
        textarea(ref="editor")
    div.editor-preview
      div.editor-preview-title {{title}}
      div.editor-preview-content(class="markdown-body" v-html="markedArticle")
</template>

<script>
import Markdown from "markdown-it";
import Highlight from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "github-markdown-css/github-markdown.css";
import "../vendor/katex/katex.min.css";

import Emoji from "markdown-it-emoji";
import Subscript from "markdown-it-sub";
import Superscript from "markdown-it-sup";
import Footnote from "markdown-it-footnote";
import Deflist from "markdown-it-deflist";
import Abbreviation from "markdown-it-abbr";
import Insert from "markdown-it-ins";
import Mark from "markdown-it-mark";
import Katex from "markdown-it-katex";
import TaskLists from "markdown-it-task-lists";

import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import "codemirror/mode/markdown/markdown.js";

const markdown = new Markdown({
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: false,
  typographer:  false,
  quotes: "“”‘’",
  highlight: function (text, lang) {
    if (lang && Highlight.getLanguage(lang)) {
      try {
        return Highlight.highlight(lang, text).value;
      } catch (e) {
        console.error(e);
        return text;
      }
    } else {
      try {
        return Highlight.highlightAuto(text).value;
      } catch (e) {
        console.error(e);
        return text;
      }
    }
  }
});
markdown.use(Emoji)
  .use(Subscript)
  .use(Superscript)
  .use(Footnote)
  .use(Deflist)
  .use(Abbreviation)
  .use(Insert)
  .use(Mark)
  .use(Katex, { "throwOnError": false, "errorColor": " #cc0000" })
  .use(TaskLists);

export default {
  mounted() {
    const textArea = this.$refs.editor;
    const editor = CodeMirror.fromTextArea(textArea, {
              lineNumbers: true,
              mode: "markdown",
              theme: "default",
              tabSize: "2",
              scrollbarStyle: "native"
    });
    editor.on("change", () => this.markIt(editor));
  },
  data() {
    return {
      title: "未命名笔记",
      article: "",
      markedArticle: ""
    };
  },

  methods: {
    markIt(editor){
      this.article = editor.getValue();
      this.markedArticle = markdown.render(this.article);
    }
  }
};
</script>

<style lang="scss">
$tools-bar-height: 45px;
$border-color: #d9d9d9;
$editor-background-color: #fefefe;
$preview-background-color: #fefefe;
$editor-icon-color: gray;

.editor-root {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .editor-container {
    flex: auto;
    overflow: hidden;
    display: flex;
    .editor-input {
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: 50%;
      border-right: 1px solid $border-color;
      overflow: hidden;
      .editor-tools-bar {
        height: $tools-bar-height;
        border-bottom: 1px solid $border-color;
        display: flex;
        .editor-tools-bar-title {
          flex-grow: 1;
          flex-shrink: 0;
          flex-basis: 40%;
          .editor-title-input {
            width: 100%;
            height: 100%;
            padding: 0 10px 0;
            border: none;
            outline: none;
            -webkit-appearance: none;
            -moz-appearance: none;
          }
        }
        .editor-tools-bar-icons {
          flex-grow: 1;
          flex-shrink: 0;
          flex-basis: 60%;
          display: flex;
          flex-wrap: nowrap;
          justify-content: flex-end;
          align-items: center;
          i {
            margin: 0 20px 0;
            font-size: 20px;
            color: $editor-icon-color;
            text-align: center;
          }
        }
      }
      .editor-textarea {
        position: relative;
        height: calc(100vh - #{$tools-bar-height});
        .CodeMirror {
          height: 100% !important;
          background-color: $editor-background-color;
          font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;              
        }
      }
    }
    .editor-preview {
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: 50%;
      overflow: hidden;
      display: flex;
      background-color: $preview-background-color;
      flex-direction: column;
      .editor-preview-title {
        height: $tools-bar-height;
        padding: 0 10px 0;
        flex: none;
        border-bottom: 1px solid $border-color;
        font-size: 22px;
        text-align: left;
        line-height: $tools-bar-height;
      }
      .editor-preview-content {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;            
        flex: auto;
        overflow: auto;
        padding: 10px;
      }
    }
  }
}
</style>