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
        textarea(v-model="article" @input="markIt")
    div.editor-preview
      div.editor-preview-title {{title}}
      div.editor-preview-content(class="markdown-body" v-html="markedArticle")
</template>
<script>
import md from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "github-markdown-css/github-markdown.css";
const markdown = new md({
  highlight: function (text, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, text).value;
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        return hljs.highlightAuto(text).value;
      } catch (e) {
        console.error(e);
      }
    }
  }
});
export default {
  data() {
    return {
      title: "未命名笔记",
      article: "",
      markedArticle: ""
    };
  },
  methods: {
    markIt(){
      this.markedArticle = markdown.render(this.article);
    }
  }
};
</script>
<style scoped lang="scss">
$tools-bar-height: 45px;
$border-color: #d9d9d9;
$editor-font-color: #333;
$editor-font-size: 16px;
$editor-font-weight: 400;
$editor-line-height: 30px;
$editor-background-color: #fcfaf2;
$preview-background-color: #fefefe;
$editor-title-background-color: #f5f2f2;
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
        height: calc(100vh - #{$tools-bar-height});
        textarea {
          display: block;
          height: 100%;
          width: 100%;
          padding: 10px;
          resize: none;
          color: $editor-font-color;
          background-color: $editor-background-color;
          font-size: $editor-font-size;
          font-weight: $editor-font-weight;
          line-height: $editor-line-height;
          border: none;
          outline: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          overflow: auto;
        }
      }
    }
    .editor-preview {
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: 50%;
      overflow: auto;
      display: flex;
      background-color: $preview-background-color;
      flex-direction: column;
      .editor-preview-title {
        height: $tools-bar-height;
        padding: 0 10px 0;
        flex: none;
        background-color: $editor-title-background-color;
        border-bottom: 1px solid $border-color;
        font-size: 22px;
        text-align: left;
        line-height: $tools-bar-height;
      }
      .editor-preview-content {
        flex: auto;
        padding: 10px;
      }
    }
  }
}
</style>