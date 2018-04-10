<template>
  <div id="app">
    <el-menu
      :default-active="activeMenu"
      class="app-menu"
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
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
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
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
