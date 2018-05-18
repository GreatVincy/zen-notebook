<template lang="pug">
div.notebook-viewer(:style="{width: width, height: height, backgroundColor: backgroundColor}")
  div.notebook-viewer-title-wrap
    div.notebook-viewer-title(class="text-ellipsis") {{title}}
    div.notebook-viewer-title-icons
      i.fa.fa-expand(title="全屏预览")
  div.notebook-viewer-wrap 
    viewer(:raw="raw")    
</template>

<script>
import Viewer from "../commons/Viewer.vue";
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
    title: {
      type: String,
      default: ""
    },
    raw: {
      type: String,
      default: ""
    },
    backgroundColor: {
      type: String,
      default: "#FBF9F1"
    }
  },

  components: {
    viewer: Viewer
  },

  data() {
    return {
      fullscreen: false
    };
  }
};
</script>

<style lang="scss">
.notebook-viewer {
  border: 1px solid #d9d9d9;
  overflow: hidden;
  display: flex;
  background-color: #fefefe;
  flex-direction: column;
  .notebook-viewer-title-wrap {
    flex: none;
    height: 45px;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    .notebook-viewer-title {
      padding: 0 10px 0;
      font-size: 22px;
      text-align: left;
      line-height: 45px;
      flex: auto;
    }
    .notebook-viewer-title-icons {
      flex: none;
      display: flex;
      flex-wrap: nowrap;
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
  .notebook-viewer-wrap {
    flex: auto;
    overflow: hidden;
    display: flex;
  }
}
</style>