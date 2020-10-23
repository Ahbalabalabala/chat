<template>
  <div class="login">
    <van-icon class="back" name="cross" @click="back" />
    <div class="loginContainer">
      <p class="title">
        <b>账号{{ title }}</b>
      </p>
      <div class="text-box">
        <van-field
          v-model="value"
          class="user"
          clearable
          placeholder="请输入账号"
          @focus="focus = 0"
          @blur="focus = null"
          :class="{ text: focus == 0 }"
        />
      </div>
      <div class="text-box" v-show="change">
        <van-field
          v-model="name"
          class="user"
          clearable
          placeholder="请输入昵称"
          @focus="focus = 1"
          @blur="focus = null"
          :class="{ text: focus == 1 }"
        />
      </div>
      <div class="text-box">
        <van-field
          v-model="password"
          class="password"
          type="password"
          placeholder="请输入账号密码"
          right-icon="closed-eye"
          v-show="eye"
          @click-right-icon="eye = !eye"
          @focus="focus = 3"
          @blur="focus = null"
          :class="{ text: focus == 3 }"
        />
        <van-field
          v-model="password"
          class="password"
          right-icon="eye-o"
          placeholder="请输入账号密码"
          v-show="!eye"
          @click-right-icon="eye = !eye"
          @focus="focus = 3"
          @blur="focus = null"
          :class="{ text: focus == 3 }"
        />
      </div>
      <div class="btn">
        <van-button type="primary" round size="large"
          >{{ title }}账号</van-button
        >
      </div>
      <span class="change" @click="change = !change">账号注册/登录</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      password: "",
      name: "",
      eye: true,
      change: false,
      focus:null,
    };
  },
  computed: {
    title() {
      if (this.change) {
        return "注册";
      } else {
        return "登录";
      }
    },
  },
  methods: {
    back() {
      this.$router.push({path:"/nearby"})
    },
  },
};
</script>
<style lang="scss" scoped>
.back {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.loginContainer {
  padding: 0px 30px;
  .text-box {
    margin: 20px 0px;
  }
  .user {
    border-bottom: 1px solid #ccc;
  }
  .password {
    border-bottom: 1px solid #ccc;
  }
  .btn {
    margin: 10px;
  }
  .change {
    color: #00b8ff;
  }
  .text {
    border-bottom: 1px solid aqua;
  }
}
</style>