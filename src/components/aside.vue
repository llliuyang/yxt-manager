<template>
    <el-aside class="left" width='200'>
      <div class="avatar"></div>
      <p class="juese">管理员</p>
      <el-col :span="24">
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="doSomething"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-opportunity"></i>
              <span>功能区</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-refresh"></i>刷新数据</el-menu-item
              >
              <el-menu-item index="1-2">
                <i class="el-icon-s-data"></i>修改数据</el-menu-item
              >
              <el-menu-item index="1-3">
                <i class="el-icon-camera-solid"></i>一键截图</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>

      <div class="copyright">
        策划：王金&emsp;编写：刘洋<br />
        仅供学习，滥用后果自负<br />
        最终解释权归作者所有
      </div>
    </el-aside>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: "aside",
  data() {
    return {};
  },
  methods:{
    doSomething(index) {
      switch (index) {
        case "1-1":
          this.refresh(this);
          break;
        case "1-2":
          this.change()
          break;
        case "1-3":
          this.capture();
          break;
      }
    },
    ...mapMutations(['refresh','change','capture'])
  }
};
</script>

<style scoped lang='scss'>
.left {
  width: 200px;
  height: 100%;
  background: #2a2a2a;
  box-sizing: border-box;
  border-right: 1px solid #eee;
  overflow-y: scroll;
  overflow-x: height;
  position: relative;
}
.left::-webkit-scrollbar,
.right .main::-webkit-scrollbar {
  display: none;
}
.left .avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin: 20px auto;
  background-image: url('../assets/avatar.jpg');
  background-size: contain;
  box-shadow: 0px 0px 4px #fff;
}
.left .juese {
  text-align: center;
  color: #fff;
  margin-bottom: 20px;
}
.left .copyright {
  width: 100%;
  text-align: center;
  color: #666;
  font-size: 14px;
  position: absolute;
  bottom: 10px;
}
</style>