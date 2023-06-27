<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#F9F900"
    active-text-color="#ffd04b"
  >
    <!-- @select="handleSelect" -->
    <el-menu-item index="1">
      <router-link to="/">Susda Home</router-link>
    </el-menu-item>
    <!-- <el-menu-item index="2">
      <router-link to="/Mqtt">MQTT測試</router-link>
    </el-menu-item> -->
    <el-sub-menu index="2">
      <template #title>MQTT測試</template>
      <el-menu-item index="2-1">
        <router-link to="/Mqtt1">MQTT測試1</router-link>
      </el-menu-item>
      <el-menu-item index="/2-2">
        <router-link to="/Mqtt2">MQTT測試2</router-link>
      </el-menu-item>
    </el-sub-menu>
    <!-- <el-sub-menu index="2">
      <template #title>工作站</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
    </el-sub-menu> -->
    <el-menu-item index="3" disabled>
      <router-link to="/about">About</router-link>
    </el-menu-item>
  </el-menu>
</template>

<!-- <script lang="ts" setup>
import { ref } from 'vue'
const activeIndex2 = ref('1')

// const handleSelect = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
</script>
 -->

<script>
// import { ref } from 'vue'
// const activeIndex2 = ref('1')
// const handleSelect = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
export default {
  name: 'appMenu'
}
</script>
