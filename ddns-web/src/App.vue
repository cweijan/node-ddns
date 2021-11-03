

<template>
  <div id="app">
    <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="/">设置</el-menu-item>
      <el-menu-item index="/explain">配置说明</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const activeIndex = ref("/");
router.afterEach((to, from) => {
  activeIndex.value = to.fullPath;
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  /* color: #2c3e50; */
}
</style>
