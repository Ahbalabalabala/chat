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
      <div class="text-box" v-show="isRegister">
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
      <div class="btn" v-show="!isRegister">
        <van-button type="primary" round size="large" @click="toLoginUser"
          >登录账号</van-button
        >
      </div>
      <div class="btn" v-show="isRegister">
        <van-button type="primary" round size="large" @click="toRegisterUser"
          >注册账号</van-button
        >
      </div>
      <span class="change" @click="changeType">账号{{ replace }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions,  } from "vuex";
export default {
  data() {
    return {
      value: "",
      password: "",
      name: "",
      eye: true,
      change: false,
      focus: null,
    };
  },
  computed: {
    isRegister() {
      return this.$store.state.login.isRegister;
    },
    title() {
      if (this.$store.state.isRegister) {
        return "注册";
      } else {
        return "登录";
      }
    },
    replace() {
      if (!this.$store.state.isRegister) {
        return "注册";
      } else {
        return "登录";
      }
    },
  },
  methods: {
    ...mapActions(["onLoginUser", "onRegisterUser", "onRegisterFlag"]),
    changeType(){
      this.onRegisterFlag(!this.isRegister)
    },
    back() {
      this.$router.push({ path: "/nearby" });
    },
    //登录
    toLoginUser() {
      if (this.value && this.password) {
        this.onLoginUser({
          username: this.value.toLowerCase(),
          password: this.password,
        }).then(this.loginSuccess);
      }
    },
    //注册
    toRegisterUser() {
      if (this.value && this.password && this.name) {
        this.onRegisterUser({
          username: this.value.toLowerCase(),
          password: this.password,
          nickname: this.name.toLowerCase(),
        });
        this.value=""
        this.password=""
        this.name=""
      }
      // this.change=false
    },
    loginSuccess(token) {
      // 登陆成功后
      // 将 用户名 与 token 保存到 locationStorage 中,实现自动登录
      // console.log(token, this.value)
      let userInfo = {
        username: this.value,
        token,
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
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