
const { WebIM } = window
const chat = {
	state: {
		//用户列表
		userList: {
			contactUserList: [],//联系人用户列表
			groupUserList: [],//组用户列表
			chatroomUserList: []//聊天室用户列表
		},
		//消息列表
		msgList: {
			contact: {},//接触
			group: {},//组
			chatroom: {},//聊天室
		},
		//当前消息对象
		currentMsgs: '',
		//当前组群/聊天室名称
		multiPopulationName: "",
		//当前组群/聊天室成员
		teamMembers: [],
		//群主
		groupLeader: "",
		//公开群组
		opengroup: {
			opengroupList: [],
			opengroupInfo: [],
		},
	},
	mutations: {
		//更新用户列表
		updateUserList(state, payload) {
			const { userList, type } = payload;
			state.userList[type] = userList;
		},
		//收到文本消息
		textMessageReceived(state, msg) {
			let key = msg.from || msg.to
			console.log(msg)
			if (state.msgList.contact[key]) {

				state.msgList.contact[key].push(msg)

			} else {
				state.msgList.contact = {
					...state.msgList.contact,
					[key]: [msg]
				}
			}

		},
		//收到群组文本消息
		groupTextMessageReceived(state, msg) {
			console.log("state,msg", state, msg);
			let key = msg.to
			console.log(key)
			if (state.msgList.group[key]) {

				state.msgList.group[key].push(msg)

			} else {
				state.msgList.group = {
					...state.msgList.group,
					[key]: [msg]
				}
			}

		},
		//收到聊天室文本消息
		chatroomTextMessageReceived(state, msg) {
			console.log("state,msg", state, msg);
			let key = msg.to
			console.log(msg)
			if (state.msgList.chatroom[key]) {

				state.msgList.chatroom[key].push(msg)

			} else {
				state.msgList.chatroom = {
					...state.msgList.chatroom,
					[key]: [msg]
				}
			}

		},
		//更新消息对象
		updateMessageObject(state, name) {
			state.currentMsgs = name;
			// console.log(state.currentMsgs);
		},
		//更新群主信息
		updategroupLeader(state, name) {
			state.groupLeader = name;
		},
		//更新公开群组队列
		upOpenGroupObject(state, name) {
			state.opengroup.opengroupList = name;
		},
		//更新公开群组信息
		upOpenGroupInfo(state, info) {
			state.opengroup.opengroupInfo.push(info);
		},
		//更新当前多人聊天群名称
		changemultiPopulationName(state, name) {
			state.multiPopulationName = name;
		},
		//更新当前组群/聊天室成员
		changeteamMembers(state, data) {
			state.teamMembers = data;
		}
	},
	actions: {
		//获取联系人用户列表
		onGetContactUserList: function ({ commit, }, payload) {
			try {
				WebIM.conn.getRoster({
					success: function (roster) {
						// console.log("roster", roster);
						const userList = roster.filter(user => ["both", "to"].includes(user.subscription));
						commit("updateUserList", {
							userList,
							type: "contactUserList",
							black: payload
						});
						// console.log("state.chat", state, rootState)
					}
				});
			}
			catch (e) {
				console.log("error", e);
			}
		},
		// 单聊发送文本消息
		sendPrivateText: function ({ state, commit }, text) {
			let id = WebIM.conn.getUniqueId();                 // 生成本地消息id
			let msg = new WebIM.message('txt', id);      // 创建文本消息
			msg.set({
				msg: text,                  // 消息内容
				to: state.currentMsgs,                          // 接收消息对象（用户id）
				chatType: 'singleChat',                  // 设置为单聊
				success: function () {
					// console.log('send private text Success', id, serverMsgId);
					console.log('msg.body', msg.body);
					commit("textMessageReceived", msg.body)

				},                                       // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
				fail: function (err) {
					console.log("Send private text error", err);
				}                                        // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
			});
			WebIM.conn.send(msg.body);
		},
		// 群聊发送文本消息
		sendGroupChatTextMessage: function ({ state, commit }, text) {
			let id = WebIM.conn.getUniqueId();            // 生成本地消息id
			let msg = new WebIM.message('txt', id); // 创建文本消息
			console.log(text, state.currentMsgs);
			let option = {
				msg: text,             // 消息内容
				to: state.currentMsgs,                     // 接收消息对象(群组id)
				chatType: 'groupChat',              // 群聊类型设置为群聊
				success: function () {
					// console.log('send room text success',msg.body);
					console.log('state', state.msgList.group);
					commit("groupTextMessageReceived", msg.body)
				},                                  // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
				fail: function (e) {
					console.log('failed', e);
				}                                   // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
			};
			msg.set(option);
			WebIM.conn.send(msg.body);
		},
		//更换单聊当前对象
		replaceCurrentObject: function ({ commit }, name) {
			console.log('name=>', name)
			commit('updateMessageObject', name)
		},
		//更换群组和聊天室当前对象
		changeGroupAndChatRoomCurrentObject: function ({ commit, state }, name) {
			// console.log('name=>', name)
			commit('changemultiPopulationName', name)
			state.userList.groupUserList.forEach((item) => {
				// console.log(item,index);
				if (item.name === name) {
					name = item.groupid
				}
			})
			commit('updateMessageObject', name)

		},
		//获取组群列表
		onGetGroupUserList: function ({ commit, rootState }, payload) {
			// console.log(rootState.login.username);
			var options = {
				userName: rootState.login.username,
				success: function (resp) {
					let userList = resp.data;
					// console.log(userList);
					// console.log(resp);
					userList.forEach((user, index) => {
						userList[index].name = user.groupname;
					});
					commit("updateUserList", {
						userList,
						type: "groupUserList"
					});
				},
				error: function (e) {
					console.log(e);
					console.log(payload);
				},
			};
			WebIM.conn.getGroup(options);
		},
		//查询公开群组
		publicGroups: function ({ commit, }) {
			let limit = 20,
				cursor = 'globalCursor';
			let options = {
				limit: limit,                                            // 预期每页获取的记录数
				cursor: cursor,                                          // 游标
			};
			WebIM.conn.listGroups(options).then((res) => {
				// console.log(res.data)
				commit("upOpenGroupObject", res.data);
				res.data.forEach((item) => {
					// console.log(item, k);
					let options = {
						groupId: item.groupid
					}
					WebIM.conn.getGroupInfo(options).then((res) => {
						// console.log("res", res)
						commit("upOpenGroupInfo", res)
					})
				})
				// console.log(state.opengroup);
			})
		},
		//申请入群
		applyToJoinTheGroup: function (context, id) {
			let options = {
				groupId: id                         // 群组ID
			};
			WebIM.conn.joinGroup(options).then((res) => {
				console.log(res)
			}).catch((err) => {
				console.log(err);
			})

		},
		//创建群组
		createGroupNew: function ({ rootState }, { nickname, introduce, type, jurisdiction }) {
			// console.log(rootState.login.username,nickname,introduce,type,jurisdiction)
			let options = {
				data: {
					groupname: nickname,          // 群组名
					desc: introduce,       // 群组描述
					members: [rootState.login.username],     // 用户名组成的数组
					public: type,                    // pub等于true时，创建为公开群
					approval: jurisdiction,                  // approval为true，加群需审批，为false时加群无需审批
					// allowinvites: true,      // true：允许群成员邀请人加入此群，false：只有群主才可以往群里加人
					// inviteNeedConfirm: false         // 邀请加群，被邀请人是否需要确认。true 为需要被邀请者同意才会进群
				},
				success: function (resp) {
					console.log(resp);
				},
				error: function (err) {
					console.log(err);
				}
			};
			WebIM.conn.createGroupNew(options)
		},
		//获取该组群信息
		getTheGroupInformation: function ({ state, commit }) {
			let groupId = state.currentMsgs
			let options = {
				groupId,    // 群组id
			};
			WebIM.conn.getGroupInfo(options).then((res) => {
				// console.log(res)
				// console.log(res.data[0].affiliations)
				commit("changeteamMembers", res.data[0].affiliations)
				res.data[0].affiliations.forEach((item) => {
					if (item.owner) {
						commit("updategroupLeader", item.owner)
					}
				})
				// console.log(state.groupLeader);
			})
		},
		//退出群组
		exitGroup: function ({ state },) {
			// 成员主动退出群
			let groupId = state.currentMsgs
			let option = {
				groupId,
			};
			WebIM.conn.quitGroup(option).then((res) => {
				console.log(res)
			}).catch((err)=>{
				console.log(err);
			})
		},
		//解散群组
		disbandGroup: function ({ state },) {
			// 解散一个群组
			let groupId = state.currentMsgs
			console.log(state.currentMsgs);
			let option = {
				groupId,
			};
			WebIM.conn.dissolveGroup(option).then((res) => {
				console.log(res)
			}).catch((err)=>{
				console.log(err);
			})
		},
		// //获取聊天室用户列表
		// onGetChatroomUserList: function(context, payload){
		// 	var option = {
		// 		apiUrl: "https://a1.easemob.com",
		// 		pagenum: 1,                                 // 页数
		// 		pagesize: 20,                               // 每页个数
		// 		success: function(list){

		// 			context.commit("updateUserList", {
		// 				userList: list.data,
		// 				type: "chatroomUserList"
		// 			});
		// 		},
		// 		error: function(){
		// 			console.log("List chat room error");
		// 			console.log(payload);
		// 		}
		// 	};
		// 	WebIM.conn.getChatRooms(option);
		// },



	},
	getters: {
		//当前消息
		currentUserMsgList(state) {
			if (!state.currentMsgs) {
				return []
			}
			return state.msgList.contact[state.currentMsgs] || []
		},
		//联系人列表
		sandContactUserList(state) {
			return state.userList.contactUserList;
		},
		//在获取组用户列表上
		sandGroupUserList(state) {
			return state.userList.groupUserList;
		},
		//获取聊天室用户列表
		sandChatroomUserList(state) {
			return state.userList.chatroomUserList;
		},
		//获取当前聊天对象
		sandtCurrentChatObjMsg(state) {
			return state.currentMsgs;
		},
		//获取最后聊天记录
		getTheLastChatRecord(state) {
			return state.msgList.contact
		},
		//获取组群聊天记录
		getGroupChatRecords(state) {
			return state.msgList.group[state.currentMsgs]
		},
		//获取公开组群
		getOpenGroup(state) {
			return state.opengroup
		},
		//获取多人聊天群名
		getmultiPopulationName(state) {
			return state.multiPopulationName
		},
		//发送当前组群/聊天室成员信息
		sendteamMembers(state) {
			return state.teamMembers
		},
		//获取群主
		getgroupLeader(state) {
			return state.groupLeader
		},
	}
}
export default chat;