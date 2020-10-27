<template>
  <div class="logout">
    <van-nav-bar left-text="设置" left-arrow @click-left="back" />
    <div class="purpose">
      <router-link tag="div" to="/logout">
        <div class="purpose-list" @click="onLogout">
          <!-- <van-icon name="setting-o" class="purpose-left-ico" /> -->
          <span class="purpose-name">退出</span>
          <van-icon name="arrow" class="purpose-right-ico" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
      ...mapActions(["onLogout"]),
    back() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
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
      padding-left: 20px;
    }
    .purpose-right-ico {
      position: absolute;
      top: 17px;
      right: 10px;
    }
  }
}
</style>