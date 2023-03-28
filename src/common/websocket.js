class ClxWebsocket {
    constructor(){
        this.flag = false;
        this.timeOut = 4000;
        this.ws = null;
        this.heartTimeOut = null;
        this.closeTimeOut = null;
        this.reConnectTimeOut = null;
        this.url = process.env.VUE_APP_URL;
        this.$store = null;
    }

    // 创建websocket
    createWebsocket(){
        try{
            this.ws = new WebSocket(this.url);
            this.init();
        } catch(e) {
            // 重连
            console.log("websocket链接错误");
            this.reConnect();
        }
    }

    // 初始化
    init(){
        this.ws.open = () => {
            // 重置心跳机制
            this.heart()
        }

        this.ws.onmessage = function (event) {
            // 对数据进行操作
            console.log(event.data);
            // 收到消息表示连接正常，所以重置心跳机制
            this.heart()
        }
        this.ws.onerror = function () {
            // 报错+重连
            console.log('socket连接出错');
            this.reConnect();
        }
        this.ws.onclose = function () {
            console.log('socket连接关闭');
            this.reConnect();
        }
    }

    // 重连
    reConnect(){
        if (this.flag) {
            return;
        }
        this.flag = true;
        this.reConnectTimeOut && clearTimeout(this.reConnectTimeOut);
        this.reConnectTimeOut = setTimeout(() => {
            this.flag = false;
            this.createWebsocket();
        }, this.timeOut)
    }

    // 心跳机制
    heart(){
        console.log('heartbeat');
        // 清除延时器
        this.heartTimeOut && clearTimeout(this.heartTimeOut);
        this.closeTimeOut && clearTimeout(this.closeTimeOut);

        this.heartTimeOut = setTimeout(() =>{
            // 发送消息，服务端返回信息，即表示连接良好，可以在socket的onmessage事件重置心跳机制函数
            this.ws.send('heartbeat');

            // 定义一个延时器等待服务器响应，若超时，则关闭连接，重新请求server建立socket连接
            this.closeTimeOut = setTimeout(() =>{
                this.ws.close();
            }, this.timeOut)
        }, this.timeOut)
    }

    // 插件注册，获取vue实例属性
    install(Vue){
        let self = this;
        Vue.mixin({
            beforeCreate () {
                if(self.$store) return;
                // 获取store
                self.$store = this.$store;
               
            }
        })
    }
}

export default new ClxWebsocket();