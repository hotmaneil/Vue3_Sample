<template>
    <Menu />

    <h3>MQTT測試2-使用precompiled</h3>

    <p>
        參閱：
        https://www.npmjs.com/package/precompiled-mqtt
    </p>

    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>訊息內容</span>
            </div>
        </template>
        <div v-for="dataItem in messageArray" :key="dataItem" class="text item">{{  dataItem }}</div>
    </el-card>

    <el-button @click="publishMsg()">發佈訊息</el-button>
</template>

<script>
import Menu from '@/views/Layout/menu.vue'
import mqtt from "precompiled-mqtt"
export default {
    components: {
        Menu
    },

    data() {
        return {

            /** 訊息陣列 */
            messageArray: []
        }
    },

    created() {
        this.buildConnection()
    },

    methods: {
        buildConnection() {

            const vm = this

            //Local broker
            const URL = "ws://127.0.0.1:15675/ws";

            const client = mqtt.connect(URL);
            client.on('connect', () => {
                console.log("連到broker");
                client.subscribe('home/workStation2')
            });

            client.on('message', function (topic, msg) {
                var result = `收到${topic}主題，訊息：${msg}`
                const obj = JSON.parse(msg);
                vm.messageArray.push(obj.context)
                console.log(result)
            })
        },

        /**
         * 發佈訊息測試
         */
        publishMsg(){
            const URL = "ws://127.0.0.1:15675/ws";
            const client = mqtt.connect(URL);

            var topic= 'home/workStation2'
            var payload= '{ "context": "內傳訊息" }'
            client.publish(topic,payload)
        }
    }
}
</script>