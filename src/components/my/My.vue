<template>
  <div class="my">
    <div class="information">
      <div class="portrait">
        <van-image
          lazy-load
          class="portrait"
          :src="require('../../assets/logo.png')"
        />
        <div class="portrait-name">
          <div class="portrait-title">尼酱</div>
          <div class="portrait-ID">ID:111</div>
          <van-icon
            class="portrait-ico"
            name="arrow"
            size="20px"
            color="#ccc"
          />
        </div>
      </div>
      <div class="follow">
        <div>
          <router-link to="/follow/companion" tag="div"> 好友 </router-link>
        </div>
        <span>{{ sandContactUserList.length }}</span>

        <div>
          <router-link to="/follow/like" tag="div"> 黑名单 </router-link>
        </div>
        <span>0</span>
        <div>
          <router-link to="/follow/group" tag="div"> 群组 </router-link>
        </div>
        <span>{{sandGroupUserList.length}}</span>
        <div>
          <router-link to="/follow/broadcast" tag="div"> 聊天室 </router-link>
        </div>
        <span>0</span>
      </div>
    </div>
    <div class="purpose">
      <router-link tag="div" to="/logout">
        <div class="purpose-list">
          <van-icon name="setting-o" class="purpose-left-ico" />
          <span class="purpose-name">设置</span>
          <van-icon name="arrow" class="purpose-right-ico" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["sandContactUserList","sandGroupUserList"]),
  },
  created() {
    this.onGetContactUserList();
    this.onGetGroupUserList();
  },
  methods: {
    ...mapActions(["onGetContactUserList","onGetGroupUserList"]),
  },
};
</script>
<style lang="scss" scoped>
.my {
  background-color: #ccc;
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 45px;
  overflow: scroll;
  .information {
    height: 130px;
    margin: 10px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    .portrait {
      height: 70px;
      position: relative;
      .portrait {
        width: 70px;
        height: 70px;
        padding: 5px;
        box-sizing: border-box;
        display: block;
      }
      .portrait-name {
        position: absolute;
        left: 70px;
        right: 0;
        top: 0;
        height: 100%;
        .portrait-title {
          margin: 10px;
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 5px;
        }
        .portrait-ID {
          padding-left: 10px;
          font-size: 14px;
          color: rgba(175, 170, 170, 0.897);
        }
        .portrait-ico {
          position: absolute;
          right: 10px;
          top: 25px;
        }
      }
    }
    .follow {
      width: 100%;
      position: absolute;
      top: 70px;
      bottom: 0;
      display: flex;
      align-items: center;

      div {
        font-size: 14px;
        padding-left: 10px;
        color: rgba(194, 187, 187, 0.897);
      }
      span {
        margin: 10px;
      }
    }
  }
  .purpose {
    margin: 10px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    .purpose-list {
      height: 50px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(219, 216, 216, 0.781);
      position: relative;
      .purpose-left-ico {
        margin: 15px;
        padding-left: 10px;
      }
      .purpose-name {
        color: #000;
      }
      .purpose-right-ico {
        position: absolute;
        top: 17px;
        right: 10px;
      }
    }
  }
}
</style>