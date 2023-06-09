<template>
  <div>
    <h1>登入頁面</h1>
    <el-form :model="form">
      <el-form-item label="帳號">
        <!-- <el-input v-model="user.account" /> -->
        <el-select
          v-model="user.account"
          class="m-2"
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.account"
            :value="item.account"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="密碼">
        <el-input type="password" v-model="user.password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.prevent="signin()">登入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app_login',
  data() {
    return {
      user: {
        account: '',
        password: ''
      },

      userList: []
    }
  },

  created() {
    this.getUserList()
  },

  methods: {
    /**
     * 登入
     */
    signin() {
      console.log('window._config', window._config)
      const apiUrl = `http://${window._config.API_DOMAIN}/api/SystemUser/Login`
      const vm = this
      const payload = {
        Account: vm.user.account,
        Password: vm.user.password
      }

      axios
        .post(apiUrl, payload)
        .then((response) => {
          console.log('response', response)
          if (response.data.statusCode == 200) {
            sessionStorage.setItem('token', response.data.payload.token)
            vm.$router.push('/')
          } else {
            alert('帳號密碼錯誤!登入失敗!')
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error)
        })
    },

    /**
     * 取得帳號清單
     */
    getUserList() {
      const apiUrl = `http://${window._config.API_DOMAIN}/api/SystemUser/GetUserList`
      axios.get(apiUrl).then((response) => {
        console.log('response.data.payload', response.data.payload)
        this.userList = response.data.payload
      })
    }
  }
}
</script>
