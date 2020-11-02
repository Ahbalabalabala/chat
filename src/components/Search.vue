<template>
  <div class="search">
    <div class="search-top">
      <van-search
        v-model.trim="searchUserName"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        @search="searchFriends"
        @cancel="back"
      />
    </div>
    <div class="search-content">
      <div class="content-show">
        <div class="content-list" v-show="searchUserName">
          <div class="information">
            <p><span>用户名：</span>{{searchUserName}}</p>
            <!-- <p><span>昵称：</span></p> -->
          </div>
          <div class="choice">
            <van-button size="small" type="primary" @click="addFriendd">添加好友</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant'
export default {
  data() {
    return {
      searchUserName: "",
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.push("/chat");
    },
    searchFriends() {
      if (!this.searchUserName) {
        return;
      }

    },
    addFriendd(){
      let value=""
      this.WebIM.conn.addContact(this.searchUserName, value);
      this.searchUserName=""
      Notify({ type: 'success', message: '已经成功发送好友邀请！' });
    }
  
  },
};
</script>
<style lang="scss" scoped>
.search {
  width: 100vw;
  height: 100vh;
  position: relative;
  .search-top {
    width: 100%;
    padding-top: 25px;
    border-bottom: 5px solid #ccc;
  }
  .search-content {
    // border-top: 5px solid #ccc;
    width: 100%;
    position: absolute;
    top: 85px;
    bottom: 0px;
    overflow: scroll;
    padding: 20px;
    box-sizing: border-box;
    // background-color: #ccc;
    .content-show {
      width: 100%;
      height: 100%;
      .content-list {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #f7f8fa;
        border-radius: 5px;
        .information {
          max-width: 70%;
          overflow: hidden;
          p {
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>