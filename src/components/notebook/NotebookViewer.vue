<template lang="pug">
div.notebook-viewer(:style="rootStyle")
  div.notebook-viewer-title-wrap
    div.notebook-viewer-title(class="text-ellipsis") {{title}}
    div.notebook-viewer-title-icons
      i.fa(:class="fullscreen ? 'fa-compress' : 'fa-expand'" title="全屏预览" @click="toggleFullScreen")
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

  mounted() {
    window.onresize = () => {
      this.fullscreen = this.isFullScreen();
    };
  },

  data() {
    return {
      fullscreen: false
    };
  },
  methods: {
    toggleFullScreen() {
      if (this.isFullScreen()) {
        this.exitFullScreen();
      } else {
        this.requestFullScreen();
      }
    },
    isFullScreen() {
      return (
        document.fullScreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenElement
      );
    },
    requestFullScreen() {
      const el = this.$el;
      const fn =
        el.requestFullscreen ||
        el.mozRequestFullScreen ||
        el.webkitRequestFullscreen ||
        el.msRequestFullscreen;
      if (fn) {
        el[fn.name || fn.toString().match(/function\s*([^\s(]+)/)[1]]();
        this.fullscreen = true;
      } else {
        alert("当前浏览器不支持全屏！");
      }
    },
    exitFullScreen() {
      const fn =
        document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen;
      fn &&
        document[fn.name || fn.toString().match(/function\s*([^\s(]+)/)[1]]();
      this.fullscreen = false;
    }
  },
  computed: {
    rootStyle() {
      const style = {
        backgroundColor: this.backgroundColor
      };
      if (this.fullscreen) {
        style.position = "fixed";
        style.width = "100vw";
        style.height = "100vh";
        style.top = "0";
        style.left = "0";
        style.zIndex = "999";
      } else {
        style.width = this.width;
        style.height = this.height;
      }
      return style;
    }
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