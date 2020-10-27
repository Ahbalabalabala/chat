
const { WebIM } = window
const chat={
    state: {
        userList: {
			contactUserList: [],
			groupUserList: [],
			chatroomUserList: []
		},
    },
    mutations: {
        updateUserList(state, payload){
			const { userList, type } = payload;
			state.userList[type] = userList;
		},
    },
    actions:{
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
    },
    getters: {
    }
}
export default chat;