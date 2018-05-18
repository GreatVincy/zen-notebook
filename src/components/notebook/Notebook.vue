<template lang="pug">
div.notebook(:style="{width: width, height: height}")
  notebook-editor(:initialText="initialText" :initialTitle="initialTitle" @textChange="text=$event" @titleChange="title=$event")
  notebook-viewer(:raw="text" :title="title")
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
      text: this.initialText
    }
  }
}
</script>

<style lang="scss">
.notebook {
  overflow: hidden;
  display: flex;
}
.notebook-editor, .notebook-viewer {
  flex: 1 0 50% !important;
}
.notebook-editor {
  border-top: none !important;
  border-left: none !important;
  border-bottom: none !important;

}
.notebook-viewer {
  border: none !important;
}
</style>