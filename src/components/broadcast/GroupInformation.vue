<template>
  <div class="groupInformation">
    <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }" >
      <!-- <van-cell title="邀请群成员" is-link />
      <van-cell title="修改群信息" is-link /> -->
      <van-cell v-if="getgroupLeader==getusername" @click="disband" title="解散该群" is-link />
      <van-cell v-if="getgroupLeader!=getusername" @click="exit" title="退出该群" is-link />
    </van-popup>
    <div class="nav">
      <van-nav-bar
        left-text="返回"
        left-arrow
        title="群信息"
        class="nve"
        @click-left="back"
      />
    </div>
    <div class="info">
      <van-cell-group>
        <van-cell title="组群名称：">
          <template #right-icon >
            <van-icon name="setting-o" class="search-icon" size="20" @click="show=true"  />
          </template>
        </van-cell>
        <van-cell :value="getmultiPopulationName" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="组群成员："> </van-cell>
        <van-cell :value="item.owner?item.owner+'（管理员）':item.member||item.owner" v-for="item in sendteamMembers" :key="item.member" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
  data(){
    return{
      show:false,
      groupLeader:false,
      administration:false,

    }
  },
  components: {},
  computed: {
    ...mapGetters(["getmultiPopulationName","sendteamMembers","getgroupLeader","getusername",]),
  },
  created() {
      this.getTheGroupInformation()
  },
  methods: {
      ...mapActions(["getTheGroupInformation","exitGroup","disbandGroup","onGetGroupUserList"]),
    back() {
      this.$router.go(-1);
    },
    exit(){
      this.exitGroup()
      this.getTheGroupInformation()
      this.onGetGroupUserList()
      this.$router.push("/broadcast");
    },
    disband(){
      this.disbandGroup()
      this.getTheGroupInformation()
      this.onGetGroupUserList()
      this.$router.push("/broadcast");

    }
  },
};
</script>
<style lang="scss" scoped>
.groupInformation {
  width: 100vw;
  height: 100vh;
  .info {
    position: absolute;
    width: 100%;
    top: 46px;
    bottom: 0px;
    overflow: scroll;
  }
}
</style>