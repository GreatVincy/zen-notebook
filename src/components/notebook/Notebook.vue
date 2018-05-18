<template lang="pug">
div.notebook(:style="{width: width, height: height}")
  notebook-editor(:initialText="initialText"
  :initialTitle="initialTitle" @textChange="text=$event" @titleChange="title=$event" @toggleViewer="showViewer=!showViewer")
  notebook-viewer(:raw="text" :title="title" v-show="showViewer")
</template>

<script>
import NotebookEditor from "./NotebookEditor";
import NotebookViewer from "./NotebookViewer";

export default {
  props: {
    width: {
      type: String,
      default: "auto"
    },
    height: {
      type: String,
      default: "100vh"
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
    "notebook-editor": NotebookEditor,
    "notebook-viewer": NotebookViewer
  },

  data() {
    return {
      title: this.initialTitle,
      text: this.initialText,
      showViewer: true
    };
  }
};
</script>

<style lang="scss">
.notebook {
  overflow: hidden;
  display: flex;
}
.notebook-editor,
.notebook-viewer {
  flex: 1 0 50% !important;
  border-top: none !important;
  border-right: none !important;
  border-bottom: none !important;
}
.notebook-editor {
  border-left: none !important;
}
</style>