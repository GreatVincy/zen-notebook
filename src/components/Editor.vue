<template lang="pug">
div.editor-root
  div.editor-container
    div.editor-input
      div.editor-tools-bar
        div.editor-tools-bar-title
          input.editor-title-input(type="text" placeholder="请输入标题" v-model="title")
        div.editor-tools-bar-icons
          i.fa.fa-image(title="插入图片")
          i.fa.fa-undo(title="撤销")
          i.fa.fa-repeat(title="重做")
          i.fa.fa-save(title="保存")
          i.fa.fa-columns(title="显示/关闭预览")
          i.fa.fa-mail-forward(title="发布")
      div.editor-textarea
        textarea(ref="editor")
    div.editor-preview
      div.editor-preview-title-wrap
        div.editor-preview-title(class="text-ellipsis") {{title}}
        div.editor-preview-icons
          i.fa.fa-expand(title="全屏预览")
      div.editor-preview-content(class="markdown-body" v-html="markedArticle")
</template>

<script>
import Markdown from "markdown-it";
import Highlight from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "github-markdown-css/github-markdown.css";
import "../vendor/katex/katex.min.css";
import "font-awesome/css/font-awesome.css";

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
            padding: 10px;
            margin: 0 10px 0;
            color: $editor-icon-color;
            text-align: center;
            cursor: pointer;            
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
      .editor-preview-title-wrap {
        flex: none;
        height: $tools-bar-height;
        border-bottom: 1px solid $border-color;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        .editor-preview-title {
          padding: 0 10px 0;
          font-size: 22px;
          text-align: left;
          line-height: $tools-bar-height;
          flex: auto;
        }
        .editor-preview-icons {
          flex: none;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
        }
        i {
          padding: 10px;
          margin: 0 10px 0;
          color: $editor-icon-color;
          text-align: center;
          cursor: pointer;
        }
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