<template>
  <div class="AdminLogin" :style="{width:width+'px',height:height+'px'}">
    <div class="content">
      <!--<h1>蛋糕店后台</h1>-->
      <P>后台管理系统</P>
      <input v-model="account" type="text" placeholder="账号" />
      <input v-model="pwd" type="password" placeholder="密码" />
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {getClientSize} from '../../util/util';
import {login} from '../../api/admin';

export default {
  name: 'AdminLogin',
  computed:{
    width(){
      return getClientSize().width;
    },
    height(){
      return getClientSize().height;
    },
  },
  data () {
    return {
      account:'',
      pwd:''
    }
  },
  methods:{
    login(){
      if(this.account=='admin'&&this.pwd=='admin'){
        this.$router.push('/backstage');
      }else{
        alert('登录失败')
      }

     /* const account = this.$refs.account.value;
      const pwd = this.$refs.pwd.value;
      const res = login({
        account:account,
        pwd:pwd
      });
      res
      .then((data)=>{

        this.$router.push('/backstage');
      })
      .catch((e)=>{
        alert('登录失败')
      })*/
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.AdminLogin{
  background-color: @bgColor;
  position: relative;
  .content{
    width: 300px;
    height: 360px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -180px;
    margin-left: -150px;
    text-align: center;
    overflow: hidden;
    h3{
      color:@secondColor;
      font-size: 50px;
    }
    p{
      margin-top: 20px;
      color:@fontDefaultColor;
      margin-bottom: 20px;
    }
    input{
      border-radius: 0;
      box-shadow: none;
      background: #fff;
      padding: 14px;
      width: 80%;
      border: 1px solid @borderColor;
    }
    button{
      width: 90%;
      background: @secondColor;
      box-shadow: none;
      border: 0;
      border-radius: 3px;
      line-height: 41px;
      color: #fff;
      cursor: pointer;
      margin-top: 20px;
    }
  }
}
</style>
