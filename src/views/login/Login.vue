<template>
  <div class="log-container" :style="{ backgroundColor: theme.loginTheme }">
    <div class="form-box">
      <el-form>
        <p class="title">{{ appName }}</p>
        <div class="field">
          <i class="left-icon iconfont icon-yonghu"></i>
          <div class="input-box">
            <input placeholder="输入用户名" v-model="username" />
          </div>
        </div>
        <div class="field">
          <i class="left-icon iconfont icon-iconfontlock"></i>
          <div class="input-box">
            <input
              placeholder="输入密码"
              v-model="password"
              :type="openPassword ? 'text' : 'password'"
            />
          </div>
          <i
            class="right-icon iconfont"
            @click="openPassword = !openPassword"
            :class="openPassword ? 'icon-yanjing' : 'icon-yanjing1'"
          ></i>
        </div>
        <el-button class="login-btn" @click="login" type="primary"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import ApiUser from './../../apis/user'

export default {
  name: 'Login',
  data() {
    return {
      openPassword: false,
      username: '',
      password: ''
    }
  },
  computed: {
    theme: function() {
      return this.$store.state.app.theme
    },
    appName: function() {
      return this.$store.state.app.appName
    }
  },
  methods: {
    login() {
      //检验 也可跳过
      //模仿 ajax
      ApiUser.login({
        username: this.username,
        password: this.password
      })
        .then((res) => {
          this.$store.dispatch('LogBackByToken', res)
          this.$router.push('/')
        })
        .catch((err) => {
          err.errMsg && this.$message.error(err.errMsg)
        })
    }
  }
}
</script>

<style scoped>
.log-container {
  width: 100%;
  height: 100%;
}
.form-box {
  padding: 160px 35px 0;
  overflow: hidden;
  margin: auto;
  width: 500px;
}
.form-box .title {
  font-size: 26px;
  color: #eee;
  margin: 0 auto 40px;
  text-align: center;
  font-weight: bold;
}
.field {
  border: 1px solid #fff1;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
  margin-bottom: 22px;
  position: relative;
}
.left-icon {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  width: 8%;
  display: inline-block;
  font-size: 20px;
}
.right-icon {
  color: #889aa4;
  padding: 6px 5px;
  cursor: pointer;
  vertical-align: middle;
  width: 8%;
  display: inline-block;
  font-size: 15px;
}
.input-box {
  display: inline-block;
  height: 47px;
  width: 81%;
}
.input-box input {
  background: transparent !important;
  border: 0;
  -webkit-appearance: none;
  border-radius: 0;
  padding: 12px 5px 12px 15px;
  color: #eee;
  height: 47px;
  font-size: 14px;
  line-height: 36px;
  width: 100%;
  outline: none;
}
.login-btn {
  width: 100%;
}
</style>
