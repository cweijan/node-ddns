<template>
  <div >
    <el-space wrap style="margin:10px 0px">
      <el-card class="box-card">
        <div>
          <div>只支持三级域名</div>
          <div>暂时只支持阿里云</div>
        </div>
      </el-card>
    </el-space>
  </div>
</template>

<script lang="ts" setup>
import {  onMounted } from "vue";

const loadData = () => {
};

onMounted(async () => {
  loadData();
});
</script>

<style scoped>
</style>
