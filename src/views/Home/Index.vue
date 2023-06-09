<template>
  <Menu/>

  <img alt="Vue logo" src="@/assets/logo.png" />

  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <h3>現在登入者：{{ user.account }}</h3>
  <el-button @click="logout()">登出</el-button>
</template>

<script>
// mport HelloWorld from '@/components/HelloWorld.vue'
import Menu from '@/views/Layout/menu.vue'
import axios from 'axios'
export default {
  name: 'AppHome',
  components: {
    //   HelloWorld
    Menu
  },
  data() {
    return {
      user: {}
    }
  },

  created() {
    this.getUserIndfo()
  },

  methods: {
    getUserIndfo() {
      var token = sessionStorage.getItem('token')
      const apiUrl = `http://${window._config.API_DOMAIN}/api/SystemUser/GetInfo`
      const payload = {
        Token: token
      }

      axios.post(apiUrl, payload).then((response) => {
        if (response.data.statusCode == 200) {
          this.user = response.data.payload
        }
      })
    },

    logout() {
      const vm = this
      sessionStorage.removeItem('token')
      vm.$router.push('/login')
    }
  }
}
</script>

<style></style>
