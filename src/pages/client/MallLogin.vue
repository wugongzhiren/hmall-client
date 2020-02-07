<template>
  <div class="ClientLogin" :style="{width:width+'px',height:height+'px'}">
    <div class="content">
      <h1>蛋糕店网购平台</h1>
      <div class="tag">
        <span @click="setIndex(0)" :class="{selected:curIndex===0}">登录</span>
        <span @click="setIndex(1)" :class="{selected:curIndex===1}">注册</span>
      </div>
      <div class="formBox" v-show="curIndex===0">
        <input v-model="userid" type="text" placeholder="账号" />
        <input v-model="signPwd" type="password" placeholder="密码" />
        <button @click="login">登录</button>
      </div>
      <div class="formBox" v-show="curIndex===1">
        <input v-model="userid" type="text" placeholder="请输入邮箱或者手机号" />
        <input v-model="signPwd" type="password" placeholder="请输入密码" />
        <input v-model="signName" type="text" placeholder="请输入收件人姓名" />
        <input v-model="phone" type="text" placeholder="请输入联系电话" />
        <input v-model="signAddress" type="text" placeholder="请输入收件地址" />
        <button @click="signup">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {getClientSize} from '../../util/util';
import {login,signup} from '../../api/client';

export default {
  name: 'ClientLogin',
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
      curIndex:0,
      userid:"",
      signPwd:"",
      signName:"",
      signAddress:"",
      phone:''
    }
  },
  methods:{
    ...mapMutations({
     // setClientName: 'SET_CLIENT_NAME',
      setClientToken: 'SET_CLIENT_TOKEN'
    }),
    setIndex(index){
      if(index===this.curIndex){
        return;
      }
      this.curIndex = index;
    },
    login(){
      const res = login({
        userid:this.userid,
        pwd:this.signPwd
      });
      res
      .then((data)=>{
        if(data.code==200){
          this.setClientToken(data.t.userid);
          this.$router.push('/');
        }else{
          alert("账号或者密码错误，请重试")
        }

      })
      .catch((e)=>{
        alert(e)
      })
    },
    signup(){
      const res = signup({
        userid:this.userid,
        username:this.signName,
        pwd:this.signPwd,
        address:this.signAddress,
        phone:this.phone
      });
      res
      .then((data)=>{
        if(data.code==201){
          alert("该用户已经被注册!");
        }else{
          this.curIndex=0;
          alert("注册成功，欢迎登陆!");
        }
      })
      .catch((e)=>{
        alert('出错了')
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.ClientLogin{
  background-color: @bgColor;
  position: relative;
  .content{
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -260px;
    margin-left: -150px;
    text-align: center;
    overflow: hidden;
    h3{
      color:@secondColor;
      font-size: 50px;
    }
    .tag{
      margin-top: 20px;
      color:@fontDefaultColor;
      margin-bottom: 20px;
      span{
        display: inline-block;
        width: 50px;
        text-align: center;
        margin: 0 10px;
        padding: 10px 0;
        cursor: pointer;
      }
      .selected{
        border-bottom: 2px solid @secondColor;
        color:@secondColor
      }
    }
    input{
      border-radius: 0;
      box-shadow: none;
      background: #fff;
      padding: 14px;
      width: 80%;
      border: 1px solid @borderColor;
      margin-bottom: 10px;
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
