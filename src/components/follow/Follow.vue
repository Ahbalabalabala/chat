<template>
  <div class="follow">
    <van-nav-bar left-text="返回" left-arrow @click-left="back">
      <template #right>
        <van-icon name="user-circle-o" size="20" />
      </template>
    </van-nav-bar>
    <div class="navigation">
      <div @click="title = '好友'">
        <router-link to="/follow/companion" tag="div">好友</router-link>
      </div>
      <div @click="title = '黑名单'">
        <router-link to="/follow/like" tag="div">黑名单</router-link>
      </div>
      <div @click="title = '群组'">
        <router-link to="/follow/group" tag="div">群组</router-link>
      </div>
      <div @click="title = '聊天室'">
        <router-link to="/follow/broadcast" tag="div">聊天室</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      // title: "好友",
    };
  },
  computed:{
    // aaa(){
    //   return this.$store.state.title
    // }
  },
  components: {},
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="scss" scoped>
.navigation{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>