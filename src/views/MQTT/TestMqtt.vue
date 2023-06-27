<template>
    <Menu />

    <h3>MQTT測試-有用到ws(web socket)</h3>

    <p>
        參閱：
        <br>
        https://dev.to/emqx/how-to-use-mqtt-in-the-vue-project-1em7
        <br>
        https://www.rabbitmq.com/web-mqtt.html
    </p>

    <p>{{ connectResult }}</p>

    <el-button @click="createConnection()">開始連線</el-button>
    <el-button @click="doSubscribe()">開始訂閱</el-button>
    <el-button @click="doUnSubscribe()">取消訂閱</el-button>

    <el-button @click="doPublish()">發佈訊息</el-button>

    <el-button @click="destroyConnection()">關閉連線</el-button>
</template>

<script>
import Menu from '@/views/Layout/menu.vue'
// import mqtt from 'mqtt'
import mqtt from "mqtt/dist/mqtt"
export default {
    components: {
        Menu
    },
    data() {
        return {
            connection: {
                host: '127.0.0.1',
                port: 15675,
                endpoint: '/ws',
                clean: true, // Reserved session
                connectTimeout: 4000, // Time out
                reconnectPeriod: 4000, // Reconnection interval
                // Certification Information
                clientId: 'mqttjs_3be2c321',
                // username: 'emqx_test',
                // password: 'emqx_test',
            },

            subscription: {
                topic: 'home/workStation2',
                qos: 0,
            },

            publish: {
                topic: 'home/workStation2',
                qos: 0,
                payload: '{ "context": "Hello." }',
            },

            receiveNews: '',
            client: {
                connected: false,
            },
            subscribeSuccess: false,
            connecting: false,
            connectResult: null,
            msg: null
        }
    },

    created() {
    },

    methods: {

        /**
         * 建立連結
         */
        createConnection() {
            // Connect string, and specify the connection method used through protocol
            // ws unencrypted WebSocket connection
            // wss encrypted WebSocket connection
            // mqtt unencrypted TCP connection
            // mqtts encrypted TCP connection
            // wxs WeChat mini app connection
            // alis Alipay mini app connection

            // const { host, port, endpoint, ...options } = this.connection
            // const connectUrl = `ws://${host}:${port}${endpoint}`

            try {
                this.connecting = true
                const { protocol, host, port, endpoint, ...options } = this.connection
                const connectUrl = `${protocol}://${host}:${port}${endpoint}`
                console.log('connectUrl', connectUrl)
                this.client = mqtt.connect(connectUrl, options)
                if (this.client.on) {
                    this.client.on('connect', () => {
                        this.connecting = false
                        this.connectResult = 'Connection succeeded!'
                        console.log('Connection succeeded!')
                    })

                    this.client.on('reconnect', this.handleOnReConnect)

                    this.client.on('error', error => {
                        console.log('Connection failed', error)
                    })

                    //沒收到作用，不知道是mqtt的Bug?
                    this.client.on('message', (topic, message) => {
                        if (message) {
                            console.log('收到', topic, '的訊息', message.toString())
                            this.receiveNews = this.receiveNews.concat(message)
                            var msg = `Received message ${message} from topic ${topic}`
                            this.connectResult += msg
                            console.log(msg)
                        } else {
                            console.log('沒接收到訊息！')
                        }
                    })

                } else {
                    console.log('this.client.on', this.client.on)
                }

            } catch (error) {
                this.connecting = false
                console.log('mqtt.connect error', error)
            }
        },

        /**
         * 進行訂閱
         */
        doSubscribe() {
            const { topic, qos } = this.subscription
            this.client.subscribe(topic, { qos }, (error, res) => {
                if (error) {
                    console.log('Subscribe to topics error', error)
                    return
                }
                this.subscribeSuccess = true
                console.log('Subscribe to topics res', res)
            })
        },

        /**
         * 取消訂閱
         */
        doUnSubscribe() {
            const { topic } = this.subscription
            this.client.unsubscribe(topic, error => {
                if (error) {
                    console.log('Unsubscribe error', error)
                }
            })
        },

        /**
         * 發佈訊息
         */
        doPublish() {
            const { topic, qos, payload } = this.publish
            this.client.publish(topic, payload, { qos }, error => {
                console.log('doPublish topic', topic)
                console.log('doPublish payload', payload)
                if (error) {
                    console.log('Publish error', error)
                }
            })
        },

        /**
         * 斷開連線
         */
        destroyConnection() {
            if (this.client.connected) {
                try {
                    this.client.end()
                    this.client = {
                        connected: false,
                    }
                    console.log('Successfully disconnected!')
                } catch (error) {
                    console.log('Disconnect failed', error.toString())
                }
            }
        }
    }
}
</script>