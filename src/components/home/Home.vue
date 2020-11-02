<template>
  <div class="home">
    <div class="navigation">
      <!-- <router-link to="/nearby" class="button" tag="div">
        <van-icon name="location-o" />附近
      </router-link> -->
      <!-- <router-link to="/chatRoom" class="button" tag="div">
        <van-icon name="friends-o" />聊天室
      </router-link> -->
      <router-link to="/chat" class="button" tag="div">
        <van-icon name="chat-o" />聊天
      </router-link>
      <router-link to="/broadcast" class="button" tag="div">
        <van-icon name="video-o" />群聊
      </router-link>
      <router-link to="/my" class="button" tag="div">
        <van-icon name="user-circle-o" />我的
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {},
};
</script>
<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  .navigation {
    width: 100%;
    height: 45px;
    position: fixed;
    bottom: 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .active{
      color: rgb(0, 255, 255);
    }
  }
}
</style>