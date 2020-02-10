<template>
  <div class="MyData">
    <ul>
      <li>
        <span>账号</span>
        <p>{{id}}</p>
      </li>
      <li>
        <span>昵称</span>
        <input type="text" v-model="nickname" />
      </li>
      <li>
        <span>收件地址</span>
        <input type="text" class="long" v-model="address" />
      </li>
      <li>
        <span>联系电话</span>
        <input type="text" v-model="phone" />
      </li>
      <li>
        <span>密码</span>
        <button @click="showPopup">修改密码</button>
      </li>
    </ul>
    <button @click="updateUserData" class="saveBtn">保存</button>
    <Popup title="修改密码" @popupClose="closePopup" v-show="popupShow">
      <div class="popupContent" slot="popupContent">
        <input type="password" v-model="oldPwd" placeholder="请输入原密码" />
        <input type="password" v-model="newPwd" placeholder="请输入新密码" />
        <input type="password" v-model="confirmPwd" placeholder="请再次输入新密码" />
        <button @click="updatePwd">确认修改</button>
      </div>
    </Popup>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import {getUserData,updateUserData,updatePwd} from '../../api/client';
import Popup from '../../components/Popup';

export default {
  name: 'MyData',
  components:{
    Popup
  },
  computed:{
    ...mapState([
      'clientToken'
    ]),
  },
  data () {
    return {
      id:'',
      nickname:'',
      address:'',
      phone:'',
      popupShow:false,
      oldPwd:'',
      newPwd:'',
      confirmPwd:'',
      password:''
    }
  },

  methods:{
    ...mapMutations({
      setClientName: 'SET_CLIENT_NAME',
    }),
    updateUserData(){
      const res = updateUserData({
        userid:this.id,
        username:this.nickname,
        address:this.address,
        phone:this.phone,
      });
      res
      .then(()=>{
        alert('修改成功!');
        //this.setClientName(this.userid);
      })
      .catch((e)=>{
        alert(e);
      })
    },
    closePopup(){
      this.popupShow = false;
    },
    showPopup(){
      this.popupShow = true;
    },
    updatePwd(){
      if(this.oldPwd==''||this.newPwd==''||this.confirmPwd==''){
        alert('请输入密码！');
        return;
      }
      if(this.newPwd!==this.confirmPwd){
        alert('两次输入的密码不一致！');
        return;
      }
      if(this.oldPwd!==this.password){
        alert('原密码输入错误！');
        return;
      }
      const res = updatePwd({
        userid:this.id,
        pwd:this.newPwd
      });
      res.then(()=>{
        this.oldPwd = '';
        this.newPwd = '';
        this.confirmPwd = '';
        this.password=this.newPwd;
        this.closePopup();
        alert('修改密码成功!');
      })
      .catch((e)=>{
        alert(e);
      })
    }
  },

  mounted(){
    if(this.clientToken==null){
      alert('请登录后查看');
      return;
    }
    const res = getUserData(this.clientToken);
    res
    .then((data)=>{
      this.id = data.t.userid;
      this.nickname = data.t.username;
      this.address = data.t.address;
      this.phone = data.t.phone;
      this.password=data.t.password;
    })
    .catch((e)=>{
      alert(e)
    })
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.MyData{
  ul{
    width: 100%;
    overflow: hidden;
    li{
      margin-bottom: 30px;
      &:first-child{
        height:60px;
        line-height: 60px;
        span{
          position: relative;
          bottom: 18px;
        }
      }
      span{
        display: inline-block;
        width: 100px;
        height: 20px;
      }
      img{
        display: inline-block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      p{
        display: inline-block;
      }
      input{
        width: 280px;
        border: none;
        text-align: center;
        border-bottom: 2px solid @thirdColor;
      }
      .long{
      }
      button{
        background-color: white;
        border: 1px solid @thirdColor;
        color:@thirdColor;
        width: 80px;
        height: 30px;
      }
    }
  }
  .saveBtn{
    background-color: @thirdColor;
    border: none;
    color: white;
    width: 110px;
    height: 35px;
    display: block;
    margin: 10px auto;
  }
  .popupContent{
    padding: 20px;
    input{
      display: block;
      border: none;
      border-bottom: 1px solid #313541;
      margin-bottom: 16px;
      font-size: 13px;
      padding: 5px;
      width: 200px;
    }
    button{
      background-color: #333333;
      border: none;
      color: white;
      width: 80px;
      height: 32px;
      display: block;
      margin: 20px auto 5px;
    }
  }
}
</style>
