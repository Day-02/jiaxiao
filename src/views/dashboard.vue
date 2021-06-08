<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ name }}</div>
    <el-row :gutter="20">
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-card shadow="hover" class="card">
            <el-row>
              <el-col :span="12"
                ><div class="grid-content bg-purple">
                  <el-image
                    src="https://z3.ax1x.com/2021/04/30/gAUPcq.png"
                    class="icon"
                  ></el-image></div
              ></el-col>
              <el-col :span="12"
                ><div class="grid-content bg-purple">
                  <h2>用户</h2>
                  <h3>{{ userCount }}</h3>
                </div></el-col
              >
            </el-row>
          </el-card>
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-card shadow="hover" class="card">
            <el-row>
              <el-col :span="12"
                ><div class="grid-content bg-purple">
                  <el-image
                    src="https://z3.ax1x.com/2021/04/30/gAUeN4.png"
                    class="icon"
                  ></el-image></div
              ></el-col>
              <el-col :span="12"
                ><div class="grid-content bg-purple">
                  <h2>学员</h2>
                  <h3>{{ studentCount }}</h3>
                </div></el-col
              >
            </el-row>
          </el-card>
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-card shadow="hover" class="card">
            <el-row>
              <el-col :span="12"
                ><div class="grid-content bg-purple">
                  <el-image
                    src="https://z3.ax1x.com/2021/04/30/gAUZEF.png"
                    class="icon"
                  ></el-image></div
              ></el-col>
              <el-col :span="12"
                ><div class="grid-content bg-purple">
                  <h2>代理</h2>
                  <h3>{{ proxyCount }}</h3>
                </div></el-col
              >
            </el-row>
          </el-card>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const { baseurl } = require("../utils/request");
import Cookies from 'js-cookie'

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      userCount: 0,
      studentCount: 0,
      proxyCount: 0,
    };
  },
  created() {
    this.reload();
  },
  methods: {
    reload() {
      let that = this;
      this.axios.post(baseurl + "/student/selectCount").then((res) => {
        that.studentCount = res.data;
      });
      this.axios.post(baseurl + "/proxy/selectCount").then((res) => {
        that.proxyCount = res.data;
      });
      this.axios.post(baseurl + "/user/selectCount").then((res) => {
        that.userCount = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.card {
  height: 150px;
}
.icon {
  width: 90px;
  height: 90px;
}

.dashboard-text {
  text-align: center;
  margin-bottom: 40px;
}
h3 {
  color: #666666;
}
</style>
