<template>
  <div class="chat">
    <div class="news">
      <div class="news-title">消息</div>
      <div class="news-friends">
        <router-link to="/follow">
          <van-icon color="#000" size="25px" name="friends" />
        </router-link>
      </div>
    </div>
    <div class="friends">
      <router-link to="/search" tag="div">
        <van-search shape="round" background="#fff" placeholder="搜索" />
      </router-link>

      <div
        class="friends-list"
        v-for="itme in sandContactUserList"
        :key="itme.name"
        @click="onName(itme.name)"
      >
        <div class="friends-portrait" >
          <router-link :to="`/chatobject/${itme.name}`" tag="div">
            <van-image lazy-load class="portrait" round :src="require('../../assets/logo.png')" />
          </router-link>
        </div>
        <div class="friends-information" >
          <router-link :to="`/chatobject/${itme.name}`" tag="div">
            <div class="friends-name">{{ itme.name }}</div>
            <div class="friends-last"></div>
          </router-link>
        </div>
        <div class="friends-operation" >
          <van-icon class="operation-ico" color="#ccc" name="weapp-nav" @click="show=true" />
          <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }" @click-overlay="show=false" >
           <div class="malice" @click="deleteFriends">删除好友</div>
           <!-- <div class="malice">拉入黑名单</div> -->
            </van-popup>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data(){
    return {
      show:false
    }
  },
  computed: {
    ...mapGetters(["sandContactUserList", "getTheLastChatRecord"]),
  },
  created() {
    this.onGetContactUserList();
  },
  methods: {
    ...mapActions(["onGetContactUserList", "replaceCurrentObject"]),
    onName(name) {
      this.replaceCurrentObject(name);
    },
    deleteFriends (){
      console.log(this.$store.state.chat.currentMsgs);
      this.WebIM.conn.deleteContact(this.$store.state.chat.currentMsgs);
      this.show=false;
      this.onGetContactUserList();
    },
  },
};
</script>
<style lang="scss" scoped>
.chat {
  width: 100vw;
  position: absolute;
  top: 0;
  bottom: 45px;

  .news {
    width: 100%;
    height: 55px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: inline-block;
    }
    .news-title {
      font-size: 20px;
      padding: 20px;
    }
    .news-friends {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin: 10px;
      margin-right: 20px;
      background-color: rgba(151, 147, 147, 0.966);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .friends {
    position: absolute;
    width: 100%;
    overflow: scroll;
    top: 55px;
    bottom: 0;
    .friends-list {
      width: 100%;
      height: 80px;
      display: flex;
      // align-items: center;
      justify-content: space-between;
      .friends-portrait {
        width: 60px;
        height: 60px;
        padding: 10px;
        flex: 0 0 60px;
        .portrait {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .friends-information {
        flex: 1 1 auto;
        .friends-name {
          font-weight: bold;
          padding: 10px;
          font-size: 18px;
        }
        .friends-last {
          height: 20px;
          padding-left: 10px;
          color: rgb(124, 122, 122);
          font-size: 14px;
          overflow: hidden;
        }
      }
      .friends-operation {
        width: 60px;
        height: 60px;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 60px;
        .malice{
          width: 100%;
          height: 25px;
          padding: 10px;
          text-align: center;
        }
        .operation-ico {
          transform: rotate(90deg);
          
        }
      }
    }
  }
}

</style>