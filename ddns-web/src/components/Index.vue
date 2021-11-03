<template>
  <div class="setting">
    <el-form :model="config" class="demo-form-inline">
      <el-form-item label="域名提供商">
        <el-input v-model="config.provider" style="width: 400px;"> </el-input>
      </el-form-item>
      <el-form-item label="域名">
        <el-input v-model="config.domain" style="width: 400px;"> </el-input>
      </el-form-item>
      <el-form-item label="子域名">
        <el-input v-model="config.subDomain" style="width: 400px;"> </el-input>
      </el-form-item>
      <el-form-item label="记录类型">
        <el-input v-model="config.type" style="width: 400px;"> </el-input>
      </el-form-item>
      <el-form-item label="accessKey">
        <el-input v-model="config.accessKey" style="width: 400px;"> </el-input>
      </el-form-item>
      <el-form-item label="accessKeySecret">
        <el-input v-model="config.accessKeySecret" style="width: 400px;"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveConfig">保存设置</el-button>
        <el-button type="danger" @click="startDDNS">立刻更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
const config = ref({} as any);

const loadConfig = async () => {
  config.value = await axios.get("/config");
};

const saveConfig = () => {
  axios.post("/config", { ...config.value }).then(() => {
    loadConfig();
    ElMessage.success("保存成功!");
  });
};

onMounted(() => {
  loadConfig();
});

const startDDNS = () => {
  axios.get("/startDDNS").then(() => {
    ElMessage.success("开始更新DDNS!");
  });
};
</script>
<style>
.setting {
  padding-left: 20px;
}
</style>