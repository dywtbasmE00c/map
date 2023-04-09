<template>
  <div class="loginContainer">
    <div class="loginBox">
      <h1>用户登录</h1>
      <form>
        <div class="form-control">
          <input type="text" required v-model="params.userName">
          <label>
            <span v-for="(item, idx) in ['用' ,'户', '名']" :key="idx" :style="{'transition-delay': idx*50 + 'ms'}">{{ item }}</span>
          </label>
        </div>
        <div class="form-control">
          <input type="password" required v-model="params.password">
          <label>
            <span v-for="(item, idx) in ['密', '码']" :key="idx" :style="{ 'transition-delay': idx * 50 + 'ms' }">{{ item }}</span>
          </label>
        </div>
        <div class="form-control">
          <input type="text" required placeholder="验证码" v-model="params.imgCode">
          <img :src="base64Code" alt="11"  class="base64_img" @click="getCodeImg">
        </div>
        <button class="btn" @click.prevent="login">登录</button>
        <!-- <p>没有账户？<a href="#">注册</a></p> -->
      </form>
    </div>
  </div>
</template>
<script>
import { errorMsg } from '@/common/utils/msgBox.js'
export default {
  created(){
    this.getCodeImg();
  },
  data(){
    return {
      base64Code: '',
      params: {
        userName: '',
        password: '',
        uuid: '',
        imgCode: ''
      }
    } 
  },
  methods: {
    login(){
      this.$http.get('/login/check',{
        params: this.params
      })
        .then(res => {
          if(res.data.code == '0') {
            this.$store.commit({
              type: 'getUserInfo',
              token: res.data.token,
              userInfo: res.data.userInfo
            })
            this.$router.push("/cockpit");
          } else {
            errorMsg(res.data.msg);
            this.getCodeImg();
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    toCockpit() {
      this.$router.push("/cockpit");
    },
    // toPlatform() {
    //   this.$router.push("/platform");
    // }
    getCodeImg() {
      this.$http.get('/login/captchaImage')
        .then(res => {
          this.base64Code = 'data:image/png;base64,' + res.data.data.img
          this.params.uuid = res.data.data.uuid
        })
        .catch(e => {
          console.error(e)
        })
    }
  },
};
</script>
<style lang="less" scoped>
.loginContainer{
  margin: 0;
  background-color: steelblue;
  color: #fff;
  font-family: 'Muli', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: auto;
  .loginBox {
    background-color: rgba(0, 0, 0, 0.4);
    padding: 20px 40px;
    border-radius: 5px;
    & h1 {
      text-align: center;
      margin-bottom: 30PX;
    }
    & a {
      text-decoration: none;
      color: lightblue;
    }
    .btn{
      display: inline-block;
      cursor: pointer;
      width: 100%;
      padding: 15px;
      font-size: 16px;
      background-color: lightblue;
      border: none;
      border-radius: 5px;
      &:focus{
        outline: 0;
      }
      &:active{
        transform: scale(0.98);
      }
    }
    .form-control{
      position: relative;
      display: flex;
      margin: 20px 0 40px;
      width: 300px;
      & input {
        background-color: transparent;
        border: 0;
        border-bottom: 2px #fff solid;
        display: block;
        width: 100%;
        padding: 12px 0;
        font-size: 18px;
        color: #fff;
        &:focus, &:valid {
          outline: 0;
          border-bottom-color: lightblue;
        }
      }
      & label {
        position: absolute;
        top: 15px;
        left: 0;
        pointer-events: none;/*鼠标事件去除*/
        & span {
          display: inline-block;
          font-size: 18px;
          min-width: 5px;
          transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      }
    }
    .form-control input:focus + label span,
    .form-control input:valid + label span {
      color: lightblue;
      transform: translateY(-40px);
    }
  }
  p{
    margin-top: 30px;
  }
  .base64_img {
    display: block;
    width: 100%;
    height: 100%;
    margin-left: 10px;
    cursor: pointer;
  }
}

input::-webkit-input-placeholder {
 color: inherit;
}
</style>