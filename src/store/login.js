import {Toast} from 'vant'
const { WebIM } = window
const Login = {
	state: {
		username: null,
		token: null,
		isRegister: false,
	},
	mutations: {
		//设置用户名
		setUsername(state, username) {
			state.username = username
		},
		//设置token
		setToken(state, token) {
			state.token = token
		},
		//切换注册/登录
		setRegisterFlag(state, flag) {
			state.isRegister = flag;
		}
	},
	actions: {
		//注册
		onRegisterUser(context, { username, password, nickname }) {
			// 进行了es6 Promise封装,就可以根据注册成功,失败执行对应的回调
			return new Promise((resolve, reject) => {

				let options = {
					username,
					password,
					nickname,
					appKey: WebIM.config.appkey,
					success: function (res) {
						resolve(res)
						Toast.success('注册成功');
						context.commit("setRegisterFlag", false);
					},
					error: function (err) {
						reject(err)
						if (JSON.parse(err.data).error == "duplicate_unique_property_exists") {
							Toast.fail('用户已存在！');
						} else if (JSON.parse(err.data).error == "illegal_argument") {
							if (JSON.parse(err.data).error_description === 'USERNAME_TOO_LONG') {
								return Toast.fail('用户名超过64个字节！');
							}
							Toast.fail('用户名不合法！');
						} else if (JSON.parse(err.data).error == "unauthorized") {
							Toast.fail('注册失败，无权限！');
						} else if (JSON.parse(err.data).error == "resource_limited") {
							Toast.fail('用户注册数量已达上限！');
						}
						
					},
					apiUrl: WebIM.config.apiURL
				};

				WebIM.conn.registerUser(options);

			})

		},
		//登录
		onLoginUser({ commit }, { username, password }) {
			return new Promise((resolve, reject) => {
				// 注意登录推荐使用token登录, 只有可以实现断线重连
				let options = {
					apiUrl: WebIM.config.apiURL,
					user: username,
					pwd: password,
					appKey: WebIM.config.appkey,
					success: function (res) {
						let token = res.access_token
						// 登陆成功自动修改当前vuex username为当前登录的用户
						commit('setUsername', username)
						commit('setToken', res.access_token)
						// console.log(token)
						resolve(token)
						Toast.success('登录成功');
					},
					error: function (err) {
						reject(err)
						Toast.fail('登录失败');
					}
				};
				WebIM.conn.open(options);
			})
		},
		//自动登录
		onAutoLoginUser(context, { username, token }) {
			// token登录没有成功失败的回调
			var options = {
				// apiUrl: WebIM.config.apiURL,
				user: username,
				accessToken: token,
				appKey: WebIM.config.appkey
			};
			WebIM.conn.open(options);
			// console.log(context);
			context.commit('setUsername', username)
			context.commit('setToken', token)


		},
		//退出
		onLogout: function (context) {
			// console.log(context);
			context.commit("setUsername", "");
			context.commit("setToken", "");
			localStorage.setItem("userInfo", "");
			WebIM.conn.close();
		},
		//切换登录注册
		onRegisterFlag: function (context, flag) {
			context.commit("setRegisterFlag", flag);
		}
	},
	getters: {

	}
};
export default Login;