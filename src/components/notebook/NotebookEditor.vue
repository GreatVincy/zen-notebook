<template lang="pug">
div.notebook-editor(:style="{width: width, height: height}")
  div.notebook-editor-title-wrap
    div.notebook-editor-title
      input.notebook-editor-title-input(type="text" placeholder="请输入标题" :value="initialTitle" @input="$emit('titleChange', $event.target.value)")
    div.notebook-editor-title-icons
      i.fa.fa-image(title="插入图片")
      i.fa.fa-undo(title="撤销")
      i.fa.fa-repeat(title="重做")
      i.fa.fa-save(title="保存")
      i.fa.fa-columns(title="显示/关闭预览")
      i.fa.fa-mail-forward(title="发布")
  div.notebook-editor-wrap
    editor(:initialText="initialText" @textChange="$emit('textChange', $event)")
</template>

<script>
import Editor from "../commons/Editor.vue";
import "font-awesome/css/font-awesome.css";

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
    initialTitle: {
      type: String,
      default: ""
    },
    initialText: {
      type: String,
      default: ""
    }
  },

  components: {
    "editor": Editor
  },

  mounted() {

  },

  data() {
    return {
    };
  }
}
</script>

<style lang="scss">
.notebook-editor {
  border: 1px solid #d9d9d9;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .notebook-editor-title-wrap {
    flex: none;
    height: 45px;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    .notebook-editor-title {
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: 40%;
      .notebook-editor-title-input {
        width: 100%;
        height: 100%;
        padding: 0 10px 0;
        border: none;
        outline: none;
        appearance: none;
      }
    }
    .notebook-editor-title-icons {
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
        color: gray;
        text-align: center;
        cursor: pointer;            
      }
    }    
  }
  .notebook-editor-wrap {
    flex: auto;
    display: flex;
    overflow: hidden;
  }
}
</style>