<template>
  <div>
    <h1 style="margin-top: 80px; text-align: center">驾校智慧管理系统</h1>
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="80px"
      class="login-box"
    >
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="用户名" prop="userTel">
        <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="userPwd">
        <!-- <el-input v-model="form.userPwd"></el-input> -->

        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { validuserName } from '@/utils/validate'
const { baseurl } = require("../utils/request");

export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 8, message: "5-8个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 50,
            message: "长度在 5 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    onSubmit(formName) {
      // var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post(baseurl + "/backLogin", this.form).then((res) => {
            console.log(res.data.admin);
            if (res.data.isSuccess == 1) {
              // this.$store.dispatch("initAdmin",res.data.admin);
              localStorage.setItem('admin',JSON.stringify(res.data.admin));
              this.$store
                .dispatch("user/login", this.form)
                .then(() => {
                  this.$router.push({ path: this.redirect || "/" });
                  this.loading = false;
                })
                .catch(() => {
                  this.loading = false;
                });
            } else {
              this.$message({
                message: "用户名和密码错误",
                type: "error",
              });
            }
          });
        } else {
          this.$message({
            message: "电话号码或密码不能为空！",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
};
</script>

<style>
/* body { */
/* background-image: linear-gradient(90deg,#f5f7fa,#c3cfe2); */
/* background-image: url(img/80553a646e09d0d2cec40c43b4d7884.jpg); */
/* background-repeat: no-repeat;
		 background-size: 100%;   */
/* } */
.login-box {
  width: 400px;
  margin: 80px auto;
  border: #dcdfe6 solid 1px;
  padding: 30px 40px 20px 20px;
  border-radius: 20px;
  /* box-shadow: 0px 0px 20px #DCDFE6; */
  /* background-color: white; */
}
.login-title {
  text-align: center;
  margin-bottom: 30px;
}
</style>