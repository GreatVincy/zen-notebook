<template>
  <div id="zen-notebook-app">
    <div class="app-menu">
      <el-menu
        :default-active="activeMenu"
        mode="horizontal"
        :router="true"
        @select="handleSelect"
        background-color="#398dee"
        text-color="#fff"
        active-text-color="#fff">
        <el-menu-item index="editor">写笔记</el-menu-item>
        <el-menu-item index="settings">设置</el-menu-item>
        <el-menu-item index="personal">个人中心</el-menu-item>
      </el-menu>
    </div>
    <div class="app-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZenNotebookApp",
  data() {
    return {
      menus: ["editor", "settings", "personal"]
    }
  },
  methods: {
    handleSelect() {

    }
  },
  computed: {
    activeMenu() {
      return this.menus.filter(n => n === this.$route.name)[0];
    }
  }
};
</script>
<style>
#zen-notebook-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#zen-notebook-app > .app-menu {
 flex: none;
}

#zen-notebook-app > .app-content {
  flex: auto;
}
</style>
