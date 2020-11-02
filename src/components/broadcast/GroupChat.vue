<template>
  <div class="groupChat">
    <van-nav-bar left-text="返回" left-arrow class="nve" :title="getmultiPopulationName"  @click-left="back" @click-right="oninfo">
      <template #right>
        <van-icon name="contact" size="18"  />
      </template>
    </van-nav-bar>
    <div class="content">
      <div class="news">
        <div class="news-box">
          <div
            :class="[{ rowleft: item.from }, { rowright: !item.from }]"
            v-for="(item) in getGroupChatRecords"
            :key="item.id"
          >
            <div class="portrait">
              <img src="../../assets/logo.png" alt="" />
            </div>
            <div class="word">
              {{ item.msg || item.data }}
            </div>
          </div>
        </div>
      </div>
      <div class="send">
        <van-field
          v-model="text"
          center
          clearable
          placeholder="请输入聊天内容"
          @keyup.enter="send"
        >
          <template #button>
            <van-button size="small" type="primary" @click="send"
              >发送</van-button
            >
          </template>
        </van-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      text: "",
    };
  },
  computed:{
      ...mapGetters(["getGroupChatRecords","getmultiPopulationName"])
  },
  methods: {
    ...mapActions(["sendGroupChatTextMessage"]),
    back() {
      this.$router.go(-1);
    },
    send() {
      this.sendGroupChatTextMessage(this.text);
      this.text = "";
    },
    oninfo(){
      this.$router.push("/groupInformation");
    }
  },
};
</script>
<style lang="scss" scoped>
.groupChat {
  .nve {
    background-color: #ccc;
    overflow: scroll;
  }
  .content {
    width: 100%;
    position: absolute;
    top: 46px;
    bottom: 0px;
    background-color: rgba(204, 204, 204, 0.548);

    .news {
      width: 100%;
      background-color: #f2f2f2;
      position: absolute;
      top: 0px;
      bottom: 52px;
      overflow: scroll;
      .news-box {
        width: 100%;
        .rowleft {
          width: 100%;
          // height: 50px;
          display: flex;
          align-items: center;
          padding: 10px 40px;
          box-sizing: border-box;
          position: relative;
          .portrait {
            position: absolute;
            width: 30px;
            height: 30px;
            left: 5px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .word {
            padding: 10px;
            background-color: #fff;
            border-radius: 4px;
            word-break: break-all;
            word-wrap: break-word;
          }
        }
        .rowright {
          width: 100%;
          // height: 50px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 10px 40px;
          box-sizing: border-box;
          position: relative;
          .portrait {
            position: absolute;
            width: 30px;
            height: 30px;
            right: 5px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .word {
            padding: 10px;
            background-color: #92ed62;
            border-radius: 4px;
            word-break: break-all;
            word-wrap: break-word;
          }
        }
      }
    }
    .send {
      width: 100%;
      position: absolute;
      bottom: 0px;
    }
  }
}
</style>