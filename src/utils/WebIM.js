/* eslint-disable */
import websdk from "easemob-websdk"
import config from './WebIM.config'
import store from '../store'

let WebIM = {};
WebIM = window.WebIM = websdk;
WebIM.config = config;
let conn = {};
conn = WebIM.conn = new WebIM.connection({
    appKey: WebIM.config.appkey,
    isHttpDNS: WebIM.config.isHttpDNS,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: WebIM.config.https,
    url: WebIM.config.socketServer,
    apiUrl: WebIM.config.restServer,
    isAutoLogin: WebIM.config.isAutoLogin,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    delivery: WebIM.config.delivery,
    useOwnUploadFun: WebIM.config.useOwnUploadFun
})


conn.listen({
    onOpened: function () { // 登录成功的监听事件

        // 判断localstorage中是否包含userInfo判断本次登录是否是自动登录
        let userInfo = localStorage.getItem('userInfo')

        if (userInfo) { //自动登录成功进来的
            let username = JSON.parse(userInfo).username
            vm.$store.commit('SET_USERNAME', username)
        }

        console.log('登录成功')

        // 登录成功后自动跳转至聊天页面
        vm.$router.push({ path: '/chat' });

    },         //连接成功回调 
    onClosed: function (message) { },         //连接关闭回调
    onTextMessage: function (message) { 
        store.commit('GET_TEXT_MESSAGE',message)
    },    //收到文本消息
    onEmojiMessage: function (message) { },   //收到表情消息
    onPictureMessage: function (message) { }, //收到图片消息
    onCmdMessage: function (message) { },     //收到命令消息
    onAudioMessage: function (message) { },   //收到音频消息
    onLocationMessage: function (message) { },//收到位置消息
    onFileMessage: function (message) { },    //收到文件消息
    onVideoMessage: function (message) {
        var node = document.getElementById('privateVideo');
        var option = {
            url: message.url,
            headers: {
                'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function (response) {
                var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                node.src = objectURL;
            },
            onFileDownloadError: function () {
                console.log('File down load error.')
            }
        };
        WebIM.utils.download.call(conn, option);
    },   //收到视频消息
    onPresence: function (message) {
        console.log(message)
    },       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
    onRoster: function (message) {
        // 这里的 message为什么是一个空数组
        // console.log('有好友申请', message, arguments)
       
    },         //处理好友申请
    onContactInvited: function (msg) {
        console.log('有好友申请', msg)
        store.commit('ADD_CONTACT_INVITED', msg)
    }, // 在线收到好友邀请 
    onContactAdded: function(){
        store.dispatch('onRefreshFriendList')
    }, // 增加了联系人时回调此方法

    onContactAgreed: function(){
        store.dispatch('onRefreshFriendList')
    }, // 好友请求被同意

    onInviteMessage: function (message) { },  //处理群组邀请
    onOnline: function () { },                  //本机网络连接成功
    onOffline: function () { },                 //本机网络掉线
    onError: function (message) { },          //失败回调
    onBlacklistUpdate: function (list) {       //黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log(list);
    },
    onRecallMessage: function (message) { },      //收到撤回消息回调
    onReceivedMessage: function (message) { },    //收到消息送达服务器回执
    onDeliveredMessage: function (message) { },   //收到消息送达客户端回执
    onReadMessage: function (message) { },        //收到消息已读回执
    onCreateGroup: function (message) { },        //创建群组成功回执（需调用createGroupNew）
    onMutedMessage: function (message) { }        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
});


export default WebIM

