import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import axios from 'axios';

createApp(App)
.use(router)
.mount('#app')

router.beforeEach((to,from,next)=>{
    console.log('to',to,'from',from,'next',next)
    if(to.meta.requiresAuth){
        var token=sessionStorage.getItem('token')

        if(token==null){
            next({path:'/login'})
        }else{
            const apiUrl=`http://${window._config.API_DOMAIN}/api/SystemUser/GetInfo`
            const payload={
                Token:token
            }
    
            axios
                .post(apiUrl,payload)
                .then(response=>{
                    if(response.data.statusCode==200){
                        console.log('驗證成功')
                        next()
                    }else{
                        next({path:'/login'})
                    }
                })
        }

       
        
    }else{
        next()
    }
})
