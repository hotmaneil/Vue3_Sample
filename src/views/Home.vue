<template>
    <img alt="Vue logo" src="@/assets/logo.png">

    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h3>現在登入者：{{ user.account }}</h3>
    <button @click="logout()">登出</button>
</template>
  
<script>
// mport HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
  export default {
    name: 'AppHome',
    components: {
    //   HelloWorld
    },
    data(){
        return{
            user:{}
        }
    },

    created(){
        this.getUserIndfo()
    },

    methods:{
        getUserIndfo(){
            var token=sessionStorage.getItem('token')
            const apiUrl=`http://${window._config.API_DOMAIN}/api/SystemUser/GetInfo`
            const payload={
                Token:token
            }

            axios
                .post(apiUrl,payload)
                .then(response=>{
                    if(response.data.statusCode==200){
                        this.user=response.data.payload
                    }
                })
        },

        logout(){
            const vm=this
            sessionStorage.removeItem('token')
            vm.$router.push('/login')
        }
    }
  }
</script>
  
<style>

</style>
  