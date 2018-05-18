<template lang="pug">
div.editor(:style="{width: width, height: height, flex: flex ? 'auto' : 'none'}")
  textarea(ref="editor")
</template>

<script>
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import "codemirror/mode/markdown/markdown.js";

export default {
  props: {
    width: {
      type: String,
      default: "auto"
    },
    height: {
      type: String,
      default: "auto"
    },
    flex: {
      type: Boolean,
      default: true
    },
    initialText: {
      type: String,
      default: ""
    }
  },

  mounted() {
    this.init();
  },

  data() {
    return {};
  },

  methods: {
    init() {
      const textArea = this.$refs.editor;
      const editor = CodeMirror.fromTextArea(textArea, {
        lineNumbers: true,
        mode: "markdown",
        theme: "default",
        tabSize: "2",
        scrollbarStyle: "native",
        value: this.initialText
      });
      this.editor = editor;
      editor.on("change", event => this.updateArticle(editor, event));
    },
    updateArticle(editor, event) {
      this.$emit("textChange", editor.getValue());
    },
    undo() {
      this.editor && this.editor.undo();
    },
    redo() {
      this.editor && this.editor.redo();
    },
    insertImage() {}
  }
};
</script>

<style lang="scss">
.editor {
  position: relative;
  overflow: hidden;
  .CodeMirror {
    height: 100% !important;
    background-color: #fefefe;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
}
</style>