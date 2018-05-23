<template lang="pug">
div.notebook-editor(:style="{width: width, height: height}")
  div.notebook-editor-title-wrap
    div.notebook-editor-title
      input.notebook-editor-title-input(type="text" placeholder="请输入标题" :value="initialTitle" @input="$emit('titleChange', $event.target.value)")
    div.notebook-editor-title-icons
      i.fa.fa-image(title="插入图片" @click.prevent="showImageDialog=true")
      i.fa.fa-undo(title="撤销" @click.prevent="undo")
      i.fa.fa-repeat(title="重做" @click.prevent="redo")
      i.fa.fa-save(title="保存")
      i.fa.fa-columns(title="显示/关闭预览" @click.prevent="toggleViewer")
      i.fa.fa-mail-forward(title="发布")
  div.notebook-editor-wrap
    editor(:initialText="initialText" @textChange="$emit('textChange', $event)" ref="editor")
  el-dialog(title="插入图片" :visible.sync="showImageDialog" width="60%" :lock-scroll="false")
    el-form(label-width="5em")
      el-form-item(label="图片地址")
        el-col(:span="18")
          el-input(v-model="image.imageUrl" placeholder="请输入图片地址")
        el-col(:span="2" style="text-align: center;")
          span 或    
        el-col(:span="4")
          el-upload(action="")
            el-button(size="small" type="primary") 点击上传
      el-form-item(label="替代文字")
        el-input(v-model="image.altText" placeholder="请输入替代文字")
      el-form-item(label="悬浮标题")
        el-input(v-model="image.optionalTitle" placeholder="请输入悬浮标题")   
    span(slot="footer" class="dialog-footer")
      el-button(@click="showImageDialog=false") 取消
      el-button(type="primary" @click="insertImage") 确定
  </span>
</el-dialog>  
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
    editor: Editor
  },

  data() {
    return {
      showImageDialog: false,
      image: {
        url: "",
        altText: "",
        optionalTitle: ""
      }
    };
  },

  methods: {
    getEditor() {
      return this.$refs.editor;
    },
    undo() {
      this.getEditor().undo();
    },
    redo() {
      this.getEditor().redo();
    },
    insertImage() {
      const options = {
        url: this.image.imageUrl,
        altText: this.image.altText,
        optionalTitle: this.image.optionalTitle
      };
      this.getEditor().insertImage(options);
      this.showImageDialog = false;
    },
    toggleViewer() {
      this.$emit("toggleViewer");
    }
  }
};
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