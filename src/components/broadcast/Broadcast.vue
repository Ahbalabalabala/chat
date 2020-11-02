<template>
  <div class="broadcast">
    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '30%' }"
      @click-overlay="show = false"
    >
      <div class="malice">
        <router-link to="/groupsearch" tag="div"> 加入群组 </router-link>
      </div>
      <div
        class="malice"
        @click="
          show = false;
          establishShow = true;
        "
      >
        创建群组
      </div>
    </van-popup>
    <van-popup
      v-model="establishShow"
      :close-on-click-overlay="false"
      closeable
      :style="{ height: '60%', width: '80%' }"
    >
      <van-cell title="创建群组" />
      <div class="createContent">
        <van-field
          v-model="nickname"
          :style="{
            border: '1px solid #ccc',
            padding: '5px 15px',
            borderRadius: '5px',
            margin: '5px 0px',
          }"
          placeholder="请输入群昵称"
        />
        <van-field
          v-model="introduce"
          :style="{
            border: '1px solid #ccc',
            padding: '5px 15px',
            borderRadius: '5px',
            height: '25%',
          }"
          placeholder="简介"
        />
        <p class="paragraph">群组类型</p>
        <van-radio-group v-model="type" direction="horizontal">
          <van-radio name="false">私有群</van-radio>
          <van-radio name="true">公有群</van-radio>
        </van-radio-group>
        <p class="paragraph">加群权限</p>
        <van-radio-group v-model="jurisdiction" direction="horizontal">
          <van-radio name="true">审批</van-radio>
          <van-radio name="false">随便加</van-radio>
        </van-radio-group>
        <div class="ok">
          <van-button type="primary" @click="establish">创建群组</van-button>
        </div>
      </div>
    </van-popup>
    <div class="news">
      <div class="news-title">群聊</div>
      <div class="news-friends">
        <van-icon color="#000" size="25px" name="plus" @click="show = true" />
      </div>
    </div>
    <div class="group-content">
      <div
        class="friends-list"
        @click="onName(item.name)"
        v-for="item in sandGroupUserList"
        :key="item.name"
      >
        <div class="friends-portrait">
          <router-link :to="`/groupChat/${item.name}`" tag="div">
            <van-image
              lazy-load
              class="portrait"
              round
              :src="require('../../assets/logo.png')"
            />
          </router-link>
        </div>
        <div class="friends-information">
          <router-link :to="`/groupChat/${item.name}`" tag="div">
            <div class="friends-name">{{ item.name }}</div>
          </router-link>
        </div>
        <div class="friends-operation">
          <router-link :to="`/groupChat/${item.name}`" tag="div"> </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Notify } from "vant";
export default {
  data() {
    return {
      show: false,
      establishShow: false,
      nickname: "",
      introduce: "",
      type: 0,
      jurisdiction: 0,
    };
  },
  computed: {
    ...mapGetters(["sandGroupUserList",]),
  },
  created() {
    this.onGetGroupUserList();
  },
  methods: {
    ...mapActions([
      "onGetGroupUserList",
      "changeGroupAndChatRoomCurrentObject",
      "createGroupNew",
    ]),
    onName(name) {
      this.changeGroupAndChatRoomCurrentObject(name);
    },
    establish() {
      // console.log(this.nickname,this.introduce,this.type,this.jurisdiction,);
      if (
        this.nickname == "" ||
        this.introduce == "" ||
        this.type == 0 ||
        this.jurisdiction == 0
      ) {
        Notify({ type: "warning", message: "请完善信息" });
        return;
      }
      this.createGroupNew({
        nickname: this.nickname,
        introduce: this.introduce,
        type: this.type == "true",
        jurisdiction: this.jurisdiction !== "false",
      });
      this.establishShow = false;
      this.nickname = "";
      this.introduce = "";
      this.type = 0;
      this.jurisdiction = 0;
      this.onGetGroupUserList();
      // this.$router.push("/broadcast");
    },
  },
};
</script>
<style lang="scss" scoped>
.broadcast {
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 45px;
  .createContent {
    width: 100%;
    position: absolute;
    top: 44px;
    bottom: 0px;
    padding: 20px;
    box-sizing: border-box;
    .paragraph {
      margin: 7px 0px;
    }
    .ok {
      display: flex;
      justify-content: flex-end;
      margin-top: 15px;
    }
  }
  .malice {
    width: 100%;
    height: 25px;
    padding: 10px;
    text-align: center;
  }
  .news {
    width: 100%;
    height: 55px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 5px solid #ccc;
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
  .group-content {
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 0px;
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
        .malice {
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