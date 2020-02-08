<template>
  <div class="Mall">
    <header>
      <div class="container clear">
        <span class="title" @click="navTo('/mall')">XXの蛋糕店一站式选购平台</span>
        <NoticeList :notices="notices"/>
        <i class="iconfont icon-search" @click="searchConfirm"/>
        <input  class="TextInput" v-model="searchText" placeholder="请输入商品关键字"/>


        <div class="right" v-if="clientToken">
          <span class="name">欢迎您</span>
          <span @click="navTo('/mall/personal')">个人中心</span>
          <span @click="logout">退出登录</span>
        </div>
        <div class="right" v-else>
          <span @click="navTo('/login')">登录</span>
          <span @click="navTo('/login')">注册</span>
        </div>
      </div>
    </header>
    <div class="content" :style="{minHeight:clientHeight+'px'}">
      <div class="container">
        <router-view></router-view>
      </div>
      <div class="fixedAd">
       <!-- <img src="../../assets/img/index2.gif" alt="" />-->
        <ul class="fixedList">
         <!-- <li>
            <i class="iconfont icon-collection_fill" />
            <span>新人有礼</span>
          </li>
          <li>
            <i class="iconfont icon-paixing-copy" />
            <span>热门商品</span>
          </li>
          <li>
            <i class="iconfont icon-fabulous" />
            <span>用户反馈</span>
          </li>-->
          <li @click="backToTop" v-show="shouldShowBT">
            <i class="iconfont icon-arrows-4-7" />
            <span>回顶部</span>
          </li>
        </ul>
      </div>
    </div>
   <!-- <div class="bottomInfo">
      <div class="container">
        <div class="service footerItem">
          <p class="title">客户服务</p>
          <span><i class="iconfont icon-people_fill" />在线客服</span>
          <span><i class="iconfont icon-fabulous" />用户反馈</span>
        </div>
        <div class="intro footerItem">
          <p class="title">xxxの蛋糕店</p>
          <p class="intro-p">全国连锁，做全国消费者最喜爱的蛋糕，全国36仓急速发货，新鲜快速</p>
          <div>
            关注我们：
            <img src="http://yanxuan.nosdn.127.net/60068701f3a380911f237c26c91b39d0.png" alt=""/>
            <img src="http://yanxuan.nosdn.127.net/031e783d7ee645b6096980d0bf83079b.png" alt=""/>
            <img src="http://yanxuan.nosdn.127.net/0c8759a89cdbd7acf7f2921e6f0fad19.png" alt=""/>
          </div>
        </div>
        <div class="code footerItem">
          <p class="title">下载APP随心购</p>
          <img src="../../assets/img/code.png" alt=""/>
          <span>下载领100元新人礼包</span>
        </div>
      </div>
    </div>-->
    <footer>
      <div class="container">

       <!-- <ul class="footerTop">
          <li>
            <img src="//yanxuan.nosdn.127.net/e6021a6fcd3ba0af3a10243b7a2fda0d.png" alt="" />
            <span>贴心积分打折</span>
          </li>
          <li>
            <img src="//yanxuan.nosdn.127.net/e09c44e4369232c7dd2f6495450439f1.png" alt="" />
            <span>满88元免邮费</span>
          </li>
          <li>
            <img src="//yanxuan.nosdn.127.net/e72ed4de906bd7ff4fec8fa90f2c63f1.png" alt="" />
            <span>食品健康品质保证</span>
          </li>
        </ul>-->
        <div >
          <hr>
          <ul>
            <li>Copyright2010 ©北京市好利来食品有限公司 版权所有</li>
            <li>京icp备15012142号</li>
            <li>好利来官方邮箱：info@holiland.com</li>
            <li>客服电话：400-700-5999</li>
            <li>注册地址：北京市朝阳区观音堂文化大道甲6号北201室</li>
            <li>统一社会信用代码：91110105721420005Y</li>
            <li>食品流通许可证号：XXXXX</li>
          </ul>
          <p>XX公司版权所有 © 1996-2020   食品经营许可证：XXXXXXXXXXXXXXXXX</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import NoticeList from '../../components/NoticeList';
import {getClientSize,backToTop} from '../../util/util';
import {getAds} from "../../api/client";

export default {
  name: 'Mall',
  computed:{
    ...mapState([
      'clientToken',
      'clientName'
    ]),
  },
  components:{
    NoticeList
  },
  data () {
    return {
      notices:[],
      clientHeight:getClientSize().height,
      shouldShowBT:false,
      searchText:'',
    }
  },

  methods:{
    ...mapMutations({
      clientLogout: 'CLIENT_LOGOUT',
    }),
    searchConfirm(){
      if(this.searchText.trim().length<=0){
        this.$message('输入不能为空！');
        return;
      }
      this.navTo(`/mall/show/goodsList/-1/${this.searchText}`);
    },
    navTo(route){
      this.$router.push(route)
    },
    logout(){
      this.clientLogout();
      this.$router.go(0);
    },
    backToTop(){
      backToTop();
    },
    watchScrollTop(){
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop>150){
        this.shouldShowBT = true;
      }else{
        this.shouldShowBT = false;
      }
    }
  },

  created() {
    const res = getAds();
    res
      .then((data) => {
        if(data.t.length>0) {
          this.notices.push(data.t[0].tips1);
          this.notices.push(data.t[0].tips2);
          this.notices.push(data.t[0].tips3);

        }
      })
      .catch((e) => {
        alert(e);
      })
  },
  mounted(){
    document.addEventListener('scroll',this.watchScrollTop,false);

  },

  beforeDestroyed(){
    document.removeEventListener('scroll',this.watchScrollTop,false);
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.TextInput{
  float: right;
  border: 1px solid @borderColor;
  padding: 6px 10px;
  border-radius: 5px;
  display: inline-block;
  vertical-align: middle;
}
.icon-search{
  float: right;
  margin-right: 250px;
  font-size: 24px;
  font-weight: bold;
  color:white;
  cursor: pointer;
  position: relative;
  top: 4px;
}
.Mall{
  height: 1200px;
  width: 100%;
  header{
    width: 100%;
    background-color: #87D0E3;
    height:38px;
    color:white;
    user-select:none;
    z-index: 10000;
    position: absolute;
    left: 0;
    top: 0;
    .container{
      position: relative;
      height:38px;
      .title{
        position: absolute;
        left: 0;
        display: inline-block;
        height: 26px;
        top: 50%;
        margin-top: -13px;
        line-height: 26px;
        font-size: 14px;
        cursor: pointer;
      }
      .NoticeListBox{
        position: absolute;
        left: 200px;
      }
      .right{
        position: absolute;
        right: 0;
        display: inline-block;
        height: 26px;
        top: 50%;
        margin-top: -13px;
        line-height: 26px;
        font-size: 14px;
        span{
          margin-left: 20px;
          cursor: pointer;
        }
        .name{
          cursor: default;
        }
      }
    }
  }
  .content{
    padding-top: 40px;
  }
  .fixedAd{
    position: fixed;
    right: 0;
    top: 608px;
    width: 72px;
    img{
      display: block;
      width: 100%;
      height: 154px;
    }
    .fixedList{
      margin-top: 2px;
      background-color: white;
      width: 100%;
      li{
        width: 100%;
        height: 80px;
        text-align: center;
        border-bottom: 1px solid @borderColor;
        cursor: pointer;
        padding-top: 12px;
        i{
          display: block;
          font-size: 30px;
          color:#666666;
        }
        span{
          display: block;
          font-size: 14px;
          color:#666666;
          margin-top: 4px;
        }
        &:last-child{
          border-bottom: none;
        }
        &:hover{
          i{
            color:@thirdColor;
          }
          span{
            color:@thirdColor;
          }
        }
      }
    }
  }
  .bottomInfo{
    width: 100%;
    height: 300px;
    border-top: 1px solid @borderColor;
    overflow: hidden;
    margin-top: 80px;
    .footerItem{
      width: 33%;
      height: 210px;
      position: relative;
      top: 45px;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      color:@fontDefaultColor;
      .title{
        color: @fontDeepColor;
        margin-bottom: 30px;
      }
    }
    .service{
      border-right: 1px solid @borderColor;
      span{
        display: inline-block;
        width: 80px;
        height: 100px;
        border:1px solid @borderColor;
        text-align: center;
        margin: 0 10px;
        font-size: 14px;
        cursor: pointer;
        &:hover{
          color:@thirdColor;
        }
        i{
          display: block;
          font-size: 30px;
          margin-top: 20px;
          margin-bottom: 10px;
        }
      }
    }
    .intro{
      border-right: 1px solid @borderColor;
      .intro-p{
        font-size: 13px;
        width: 300px;
        margin: 0 auto;
        text-align: left;
        color:@fontDeepColor;
        line-height: 1.8em;
      }
      div{
        text-align: left;
        font-size: 14px;
        margin-left: 47px;
        margin-top: 20px;
        img{
          margin: 0 6px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .code{
      img{
        display: block;
        margin: 0 auto;
      }
      span{
        font-size: 12px;
        color:@thirdColor;
        margin-top: 10px;
        display: block;
      }
    }
  }
  footer{


    width: 100%;
    height: 208px;
    color:#898989;
    overflow: hidden;
   /* .footerBottom{
      margin-top: 30px;
      font-size: 13px;
      text-align: center;
      ul{
        li{
          display: inline-block;
          cursor: pointer;
          padding: 0 6px;
          border-right: 2px solid @fontDefaultColor;
          &:last-child{
            border-right:none;
          }
        }
      }
      p{
        margin-top: 5px;
      }
    }*/
  }

}
</style>
