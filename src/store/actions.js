import Vue from 'vue'
let WebIM=Vue.WebIM
export default {
    onregisterUser() {
        //注册账号
        var options = {
            username: 'username',
            password: 'password',
            nickname: 'nickname',
            appKey: WebIM.config.appkey,
            success: function (res) { console.log(res) },
            error: function (err) {
                let errorData = JSON.parse(err.data);
                if (errorData.error === 'duplicate_unique_property_exists') {
                    console.log('用户已存在！');
                } else if (errorData.error === 'illegal_argument') {
                    if (errorData.error_description === 'USERNAME_TOO_LONG') {
                        console.log('用户名超过64个字节！')
                    } else {
                        console.log('用户名不合法！')
                    }
                } else if (errorData.error === 'unauthorized') {
                    console.log('注册失败，无权限！')
                } else if (errorData.error === 'resource_limited') {
                    console.log('您的App用户注册数量已达上限,请升级至企业版！')
                }
            },
            apiUrl: WebIM.config.apiURL
        };
        Vue.WebIMconn.registerUser(options);
    },
    // onLoginUser({ commit }, { username, password }) {
    //     return new Promise((resolve, reject) => {
    //         // 注意登录推荐使用token登录, 只有可以实现断线重连
    //         let options = {
    //             apiUrl: WebIM.config.apiURL,
    //             user: username,
    //             pwd: password,
    //             appKey: WebIM.config.appkey,
    //             success: function (res) {
    //                 let token = res.access_token
    //                 // 登陆成功自动修改当前vuex username为当前登录的用户
    //                 commit(SET_USERNAME, username)
    //                 // console.log(token)
    //                 resolve(token)
    //             },
    //             error: function (err) {
    //                 reject(err)
    //             }
    //         };
    //         WebIM.conn.open(options);
    //     })
    // },
}