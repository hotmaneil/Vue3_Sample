<template>
    <div>
        <h1>登入頁面</h1>

        <!-- <form>
            
        </form> -->

        <label>帳號</label>
        <input v-model="user.account"/>

        <label>密碼</label>
        <input type="password" v-model="user.password"/>

        <button @click.prevent="signin()">登入</button>
    </div>
    
</template>

<script>
import axios from 'axios';
export default{
    name: 'app_login',
    data(){
        return{
            user:{
                account:'',
                password:''
            }
        }
    },

    created(){

    },

    methods:{
        signin(){
            console.log('window._config',window._config)
            const apiUrl=`http://${window._config.API_DOMAIN}/api/SystemUser/Login`
            const vm=this
            const payload={
                Account:vm.user.account,
                Password:vm.user.password
            }

            axios
            .post(apiUrl,payload)
            .then(response => {
                console.log('response',response)
                if(response.data.statusCode==200){
                    sessionStorage.setItem('token', response.data.payload.token) 
                    vm.$router.push('/')
                }else{
                    alert('帳號密碼錯誤!登入失敗!')
                }
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            })
        }
    }
}
</script>
