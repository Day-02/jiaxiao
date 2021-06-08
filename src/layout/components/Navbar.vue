<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link to="/"> -->
            <el-dropdown-item @click.native="opendialog">
              修改密码
            </el-dropdown-item>
          <!-- </router-link> -->
          <el-dropdown-item  @click.native="logout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>


   <el-dialog
      title="密码修改"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
    > 
   <el-form label-width="20%">  
        </el-form-item>
        <el-form-item label="原密码">
          <el-input v-model="oldPwd" show-password clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="newPwd" show-password clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="confirmNewPwd" show-password clearable></el-input>
        </el-form-item>
      </el-form>
     <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="updatePwd">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
const { baseurl } = require("../../utils/request");

export default {
  data() {
    return {
      dialogVisible: false,
      oldPwd: "",
      newPwd: "",
      confirmNewPwd: "",
      dialogWidth: "30%",
      admin: JSON.parse(localStorage.getItem("admin")),
    };
  },
  created() {
    this.setDialogWidth();
  },

  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    opendialog() {
      this.dialogVisible = true;
    },
    updatePwd() {
      if (this.newPwd != this.confirmNewPwd) {
        this.$message.error("两次密码输入不同！请重新输入！");
      } else {
        this.axios
          .post(
            baseurl +
              "/admin/update?oldPwd=" +
              this.oldPwd +
              "&newPwd=" +
              this.newPwd +
              "&aId=" +
              this.admin.aid +
              "&userName=" +
              this.admin.userName
          )
          .then((res) => {
            if (res.data == 0) {
              this.$message.error("原密码错误！修改失败");
            } else {
              this.$message.success("密码修改成功！");
              this.logout();
              this.dialogVisible = false;
            }
          });
      }
    },
    cancle() {
      this.dialogVisible = false;
    },
    setDialogWidth() {
      console.log(document.body.clientWidth);
      var val = document.body.clientWidth;
      const def = 850; // 默认宽度
      if (val < def && val > 500) {
        this.dialogWidth = "70%";
      } else if (val < 500) {
        this.dialogWidth = "95%";
      } else {
        this.dialogWidth = "30%";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
