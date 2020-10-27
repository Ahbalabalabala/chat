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
      <van-search shape="round" background="#fff" placeholder="搜索" />
      <router-link to="chat/id" tag="div">
        <div class="friends-list">
          <div class="friends-portrait">
            <img src="../../assets/logo.png" alt="" />
          </div>
          <div class="friends-information">
            <div class="friends-name">陌陌</div>
            <div class="friends-last">你好吗</div>
          </div>
          <div class="friends-operation">
            <van-icon class="operation-ico" color="#ccc" name="weapp-nav" />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
        img {
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
        .operation-ico {
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>