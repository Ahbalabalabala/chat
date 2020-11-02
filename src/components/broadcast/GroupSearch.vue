<template>
  <div class="search">
    <div class="search-top">
      <van-search
        v-model.trim="searchUserName"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        @search="searchFriends"
        @cancel="back"
      />
    </div>
    <div class="search-content">
      <div class="content-show">
        <div class="content-list" v-for="(item) in getOpenGroup.opengroupList" :key="item.groupid">
          <div class="information">
            <p><span>公开群：</span>{{item.groupname}}</p>
            <!-- <p><span>人数：</span>{{getOpenGroup.opengroupInfo[index].data[0].affiliations_count}}</p> -->
          </div>
          <div class="choice">
            <van-button size="small" type="primary" @click="addGroup(item.groupid)"
              >申请入群</van-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
import { Notify } from 'vant'
export default {
  data() {
    return {
      searchUserName: "",
    };
  },
  computed: {
      ...mapGetters(["getOpenGroup"])
  },
  created() {
    this.publicGroups();
  },
  methods: {
      ...mapActions(["publicGroups","applyToJoinTheGroup"]),
    back() {
      this.$router.push("/broadcast");
    },
    searchFriends() {
      if (!this.searchUserName) {
        return;
      }
    },
    addGroup(id) {
        this.applyToJoinTheGroup(id)
        Notify({ type: 'success', message: '已经成功发送申请！' });
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  width: 100vw;
  height: 100vh;
  position: relative;
  .search-top {
    width: 100%;
    padding-top: 25px;
    border-bottom: 5px solid #ccc;
  }
  .search-content {
    // border-top: 5px solid #ccc;
    width: 100%;
    position: absolute;
    top: 85px;
    bottom: 0px;
    overflow: scroll;
    padding: 20px;
    box-sizing: border-box;
    // background-color: #ccc;
    .content-show {
      width: 100%;
      height: 100%;
      .content-list {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #f7f8fa;
        border-radius: 5px;
        margin: 5px 0px;
        .information {
          max-width: 70%;
          overflow: hidden;
          p {
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>