<template lang="pug">
div.editor-root
  div.editor-tools-bar
  div.editor-container
    div.editor-input
    div.editor-preview
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>
<style scoped>
.editor-root {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.editor-tools-bar {
  height: 30px;
  flex: none;
}
.editor-container {
  flex: auto;
  display: flex;
}
.editor-input {
  flex :auto;
}
.editor-preview {
  flex: auto;
}
</style>