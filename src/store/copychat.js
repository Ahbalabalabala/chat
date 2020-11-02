// import Vue from 'vue'

const { WebIM } = window
const chat={
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
		//当前消息
		currentMsgs: []
    },
    mutations: {
		//更新用户列表
        updateUserList(state, payload){
			const { userList, type } = payload;
			state.userList[type] = userList;
		},
		//更新消息列表
		updateMsgList(state, payload){
			const { chatType, chatId, msg, bySelf, type, id } = payload;
			const { params } = Vue.$route;
			let status = "unread";
			if(payload.chatType == "contact"){
				if(params.id == payload.from){
					status = "read";
				}
			}
			else if(payload.chatType == "group"){
				if(params.id == payload.chatId){
					status = "read";
				}
			}

			if(!state.msgList[chatType][chatId]){
				state.msgList[chatType][chatId] = [{
					msg,
					bySelf,
					type: type || "",
					mid: id,
					status: status,
					...payload
				}];
			}
			else{
				state.msgList[chatType][chatId].push({
					msg,
					bySelf,
					type: type || "",
					mid: id,
					status,
					...payload
				});
				state.msgList[chatType][chatId] = state.msgList[chatType][chatId].sort((a, b) => {
					return a.time - b.time;
				});
				// state.msgList[chatType][chatId] = _unique(state.msgList[chatType][chatId])
			}

			if(chatType === "chatroom" && !bySelf){ // 聊天室消息去重处理
				state.currentMsgs = _.uniqBy(state.msgList[chatType][chatId], "mid");
			}
			else{
				state.currentMsgs = Object.assign({}, state.msgList[chatType][params.id || chatId]); // 这里params.id在路由跳转的时候会undefind，取chatId兼容
			}
			state.msgList = Object.assign({}, state.msgList);
		},
		//更新当前消息列表
		updateCurrentMsgList(state, messages){
			state.currentMsgs = messages;
		},
		//更新消息Mid
		updateMessageMid(state, message){
			const { id, mid } = message;
			const { name, params } = Vue.$route;
			// state.currentMsgs.forEach((item) => {
			//     if(item.mid == id){
			//         item.mid = mid
			//     }
			// })
			Object.keys(state.msgList[name]).forEach((user) => {
				if(state.msgList[name][user].length){
					state.msgList[name][user].forEach((msg) => {
						if(msg.mid == id){
							msg.mid = mid;
						}
					});
				}
			});
		},
		//更新消息状态
		updateMessageStatus(state, message){
			const { id, mid, action, readUser } = message;
			const { name, params } = Vue.$route;
			Object.keys(state.msgList[name]).forEach((user) => {
				// console.log(state.msgList[name][user]);
                
				if(action == "oneUserReadMsgs"){
					if(state.msgList[name][readUser]){
						state.msgList[name][readUser].forEach((msg) => {
							if(msg.status != "recall"){
								msg.status = "read";
							}
						});
					}
				}
				else if(state.msgList[name][user].length){
					state.msgList[name][user].forEach((msg) => {
						if(action === "readMsgs" && !msg.bySelf){
							if(msg.status != "recall"){
								msg.status = "read";
							}
						}
						else if(msg.mid == id || msg.mid == mid){
							msg.status = message.status;
							if(message.msg){
								msg.msg = message.msg;
							}
						}
					});
				}
			});
		},
		// 黑名单筛选用户列表
		changeUserList(state, payload){
			let ary = [];
			_.forIn(payload, function(value, key){
				ary.push({ name: key });
			});
			state.userList.contactUserList = _.pullAllBy(state.userList.contactUserList, ary, "name");
		},
		//初始化聊天状态
		initChatState(state){
			state.userList = {
				contactUserList: [],
				groupUserList: [],
				chatroomUserList: []
			}

			state.msgList = {
				contact: {},
				group: {},
				chatroom: {},
			}

			state.currentMsgs = []
		}
    },
    actions:{
		//获取联系人用户列表
        onGetContactUserList: function(context, payload){
			try{
				WebIM.conn.getRoster({
					success: function(roster){
						// console.log("roster", roster);
						const userList = roster.filter(user => ["both", "to"].includes(user.subscription));
						context.commit("updateUserList", {
							userList,
							type: "contactUserList",
							black: payload
						});
					}
				});
			}
			catch(e){
				console.log("error", e);
			}
		},
		//在获取组用户列表上
		onGetGroupUserList: function(context, payload){
			var options = {
				success: function(resp){
					let userList = resp.data;
					userList.forEach((user, index) => {
						userList[index].name = user.groupname;
					});
					context.commit("updateUserList", {
						userList,
						type: "groupUserList"
					});
				},
				error: function(e){ },
			};
			WebIM.conn.getGroup(options);
		},
		//获取聊天室用户列表
		onGetChatroomUserList: function(context, payload){
			var option = {
				apiUrl: "https://a1.easemob.com",
				pagenum: 1,                                 // 页数
				pagesize: 20,                               // 每页个数
				success: function(list){
					context.commit("updateUserList", {
						userList: list.data,
						type: "chatroomUserList"
					});
				},
				error: function(){
					console.log("List chat room error");
				}
			};
			WebIM.conn.getChatRooms(option);
		},
		// 获取当前聊天对象的记录 @payload： {key, type}
		onGetCurrentChatObjMsg: function(context, payload){
			const { id, type } = payload;
			context.commit("updateCurrentMsgList", context.state.msgList[type][id]);
		},
		//发送文本时
		onSendText: function(context, payload){
			const { chatType, chatId, message } = payload;
			const id = WebIM.conn.getUniqueId();
			const time = +new Date();
			const chatroom = chatType === "chatroom";
			const type = chatType === "contact" ? "singleChat" : "groupChat";
			const jid = {
				contact: "name",
				group: "groupid",
				chatroom: "id"
			};
			const msgObj = new WebIM.message("txt", id);
			msgObj.set({
				msg: message,
				to: chatId[jid[chatType]],
				chatType: type,
				roomType: chatroom,
				success: function(){
					context.commit("updateMsgList", {
						chatType,
						chatId: chatId[jid[chatType]],
						msg: message,
						bySelf: true,
						time: time,
						mid: id,
						status: "sending"
					});
				},
				fail: function(e){
					console.log("Send private text error", e);
				}
			});
			if(chatType === "group" || chatType === "chatroom"){
				msgObj.setGroup("groupchat");
			}
			WebIM.conn.send(msgObj.body);
		},
		//发送Img消息
		sendImgMessage: function(context, payload){
			const { chatType, chatId, roomType, file, callback } = payload;
			const id = WebIM.conn.getUniqueId();
			const jid = {
				contact: "name",
				group: "groupid",
				chatroom: "id"
			};
			const msgObj = new WebIM.message("img", id);
			msgObj.set({
				apiUrl: WebIM.config.apiURL,
				file: file,
				to: chatId[jid[chatType]],
				roomType: roomType,
				onFileUploadError: function(error){
					console.log("图片上传失败", error);
					callback();
				},
				onFileUploadComplete: function(data){
					let url = data.uri + "/" + data.entities[0].uuid;
					context.commit("updateMsgList", {
						msg: url,
						chatType,
						chatId: chatId[jid[chatType]],
						bySelf: true,
						type: "img",
						time: data.timestamp,
						mid: id,
						status: "sending"
					});
					callback();
				},
				success: function(){
					console.log("图片发送成功");
				}
			});
			if(chatType === "group" || chatType === "chatroom"){
				msgObj.setGroup("groupchat");
			}
			WebIM.conn.send(msgObj.body);
		},
		//发送文件消息
		sendFileMessage: function(context, payload){
			const { chatType, chatId, roomType, file, callback } = payload;
			const id = WebIM.conn.getUniqueId();
			const jid = {
				contact: "name",
				group: "groupid",
				chatroom: "id"
			};
			const msgObj = new WebIM.message("file", id);
			msgObj.set({
				apiUrl: WebIM.config.apiURL,
				file: file,
				ext: {
					file_length: file.data.size
				},
				to: chatId[jid[chatType]],
				roomType: roomType,
				onFileUploadError: function(error){
					console.log("文件上传失败", error);
					callback();
				},
				onFileUploadComplete: function(data){
					let url = data.uri + "/" + data.entities[0].uuid;
					context.commit("updateMsgList", {
						msg: url,
						chatType,
						chatId: chatId[jid[chatType]],
						bySelf: true,
						type: "file",
						filename: file.data.name,
						file_length: file.data.size,
						time: data.timestamp,
						mid: id,
						status: "sending"
					});
					callback();
				},
				success: function(){
					console.log("文件发送成功");
				}
			});
			if(chatType === "group" || chatType === "chatroom"){
				msgObj.setGroup("groupchat");
			}
			WebIM.conn.send(msgObj.body);
		},
		//发送记录器
		sendRecorder: function(context, payload){
			const { useId, type, file } = payload;
			const id = WebIM.conn.getUniqueId();
			const msgObj = new WebIM.message("audio", id);
			let isRoom = type == "chatroom" || type == "groupchat";
            
			const jid = {
				contact: "name",
				group: "groupid",
				chatroom: "id"
			};
            
			// console.log('bold>>>', bold);
			// console.log('newBold>>', WebIM.utils.parseDownloadResponse.call(WebIM.conn, bold));
			// let newBold = WebIM.utils.parseDownloadResponse.call(WebIM.conn, bold)
			// var file = WebIM.utils.getFileUrl(input);
			msgObj.set({
				apiUrl: WebIM.config.apiURL,
				file: file,
				to: useId,
				type: "audio",
				roomType: isRoom,

				onFileUploadError: function(error){
					console.log("语音上传失败", error);
				},
				onFileUploadComplete: function(data){
					console.log("上传成功", data);
                    
					let url = data.uri + "/" + data.entities[0].uuid;
					context.commit("updateMsgList", {
						msg: url,
						chatType: type,
						chatId: useId,
						bySelf: true,
						type: "audio",
						filename: file.data.name,
						// file_length: file.data.size,
						// time: data.timestamp,
						mid: id,
						status: "sending"
					});
				},
				success: function(data){
					console.log("语音发送成功", data);
				},
				flashUpload: WebIM.flashUpload
			});
            
			if(type === "group" || type === "chatroom"){
				msgObj.setGroup("groupchat");
			}
			WebIM.conn.send(msgObj.body);
		},
		//获取历史信息
		getHistoryMessage: function(context, payload){
			const options = {
				queue: payload.name,
				isGroup: payload.isGroup,
				count: 10, // 每次获取消息条数
				success: function(msgs){
					try{
						payload.success && payload.success(msgs);
						if(msgs.length){
							const userInfo = JSON.parse(localStorage.getItem("userInfo"));
							const userId = userInfo && userInfo.userId;
							msgs.forEach((item) => {
								let time = Number(item.time);
								let msg = {};
								const bySelf = item.from == userId;
								if(!item.filename){
									msg = {
										chatType: payload.isGroup ? "group" : "contact",
										chatId: bySelf ? item.to : item.from,
										msg: item.data,
										bySelf: bySelf,
										time: time,
										mid: item.id,
										status: "read"
									};
									if(payload.isGroup){
										msg.chatId = item.to;
									}
									else{
										msg.chatId = bySelf ? item.to : item.from;
									}
								}
								else if(!item.ext.file_length && item.filename !== "audio" && item.filename.substring(item.filename.length - 3) !== "mp4"){ // 为图片的情况
									msg = {
										msg: item.url,
										chatType: payload.isGroup ? "group" : "contact",
										chatId: bySelf ? item.to : item.from,
										bySelf: bySelf,
										type: "img",
										time: time,
										mid: item.id,
										status: "read"
									};
									if(payload.isGroup){
										msg.chatId = item.to;
									}
									else{
										msg.chatId = bySelf ? item.to : item.from;
									}
								}
								else if(item.filename === "audio"){
									msg = {
										msg: item.url,
										chatType: payload.isGroup ? "group" : "contact",
										chatId: bySelf ? item.to : item.from,
										bySelf: bySelf,
										type: "audio"
									};
									if(payload.isGroup){
										msg.chatId = item.to;
									}
									else{
										msg.chatId = bySelf ? item.to : item.from;
									}
								}
								else if(item.filename.substring(item.filename.length - 3) === "mp4"){
									msg = {
										msg: item.url,
										chatType: payload.isGroup ? "group" : "contact",
										chatId: bySelf ? item.to : item.from,
										bySelf: bySelf,
										type: "video"
									};
									if(payload.isGroup){
										msg.chatId = item.to;
									}
									else{
										msg.chatId = bySelf ? item.to : item.from;
									}
								}
								else{
									msg = {
										msg: item.url,
										chatType: payload.isGroup ? "group" : "contact",
										chatId: bySelf ? item.to : item.from,
										bySelf: bySelf,
										type: "file",
										filename: item.filename,
										file_length: item.file_length,
										time: time,
										mid: item.id,
										status: "read"
									};
									if(payload.isGroup){
										msg.chatId = item.to;
									}
									else{
										msg.chatId = bySelf ? item.to : item.from;
									}
								}
								msg.isHistory = true;
								context.commit("updateMsgList", msg);
							});
							context.commit("updateMessageStatus", { action: "readMsgs" });
						}
					}
					catch(e){
						console.log("error", e);
					}
				},
				fail: function(){ }
			};
			WebIM.conn.fetchHistoryMessages(options);
		},
		//召回信息
		recallMessage: function(context, payload){
			const { chatType, mid } = payload.message;
			const to = payload.to;
			const me = this;
			const chatTypeObj = {
				contact: "chat",
				group: "groupchat",
				chatroom: "chatroom"
			};
			const option = {
				mid,
				to,
				type: chatTypeObj[chatType],
				success: function(){
					payload.message.status = "recall";
					payload.message.msg = "消息已撤回";
					Vue.$store.commit("updateMessageStatus", payload.message);
				},
				fail: function(){
					// me.$message('消息撤回失败');
				},
			};
			WebIM.conn.recallMessage(option);
		},
		//初始化聊天
		initChatState: function(context, payload){
			context.commit("initChatState")
		}
    },
    getters: {
		//联系人列表
		onGetContactUserList(state){
			return state.userList.contactUserList;
		},
		//在获取组用户列表上
		onGetGroupUserList(state){
			return state.userList.groupUserList;
		},
		//获取聊天室用户列表
		onGetChatroomUserList(state){
			return state.userList.chatroomUserList;
		},
		//获取当前聊天对象
		onGetCurrentChatObjMsg(state){
			return state.currentMsgs;
		},
		//获取历史消息
		fetchHistoryMessages(state){
			return state.currentMsgs;
		}
    }
}
export default chat;