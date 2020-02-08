<template>
  <div class="MallIndex">
    <el-row>
    <FadeSwiper class="swiperBox" height="400px">
      <img class="banner" slot="item1" v-bind:src="img1" />
      <img class="banner" slot="item2" v-bind:src="img2" />
      <img class="banner" slot="item3" v-bind:src="img3" />
    </FadeSwiper>
    </el-row>

<el-row style="margin-top: 10px">
      <div style="margin:0 auto">
        <ul style="margin:0 auto">
          <TypeItem
            v-for="(item,index) in typeList"
            :key="+item.id"
            :id="item.id"
            :img="item.img"
            :name="item.name"
          />
        </ul>
      </div>
</el-row>
      <el-row>
        <video-player
          style="width: 800px;height: 400px;margin:0 auto"
          ref="videoPlayer"
          class="video-player vjs-custom-skin"
          :playsinline="true"
          :options="playerOptions"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
        />


        <!--<div v-on:click="playVideo()">
          <video :src="videoSrc" id="videoPlay" v-show="true" class="video">您的浏览器不支持 video 视屏播放。</video>     //隐藏video标签，因为移动端点击视频播放时会自动弹出
        </div>-->
      </el-row>

    <el-row style="margin-top: 50px">
      <hr >
      <section class="hotGoods section">
      <SectionHeader title="新品推荐" tips="最新商品为您推荐" moreText="更多推荐>"/>
                <div class="content">
                  <ul class="left">
                    <GoodsItem
                      :id="goodsList[0].id"
                      :img="goodsList[0].imgurl"
                      :name="goodsList[0].goodsname"
                      :price="goodsList[0].price"
                    />
                  </ul>
                  <ul class="right">
                    <GoodsItem
                      v-for="(item,index) in goodsList"
                      :style="{marginBottom: index<=2?'10px':'0px'}"
                      :key="+item.id"
                      :id="item.id"
                      :img="item.imgurl"
                      :name="item.goodsname"
                      :price="item.price"
                    />
                  </ul>
                </div>
    </section>
    </el-row>

  </div>
</template>

<script>
import {getGoods,getTypes,addType,deleteGoods} from '../../api/admin';
import SectionHeader from '../../components/SectionHeader';
import ZoomImg from '../../components/ZoomImg';
import GoodsItem from '../../components/GoodsItem';
import TypeItem from '../../components/TypeItem'
import Slick from '../../components/Slick';
import FadeSwiper from '../../components/FadeSwiper';

import {getClientSize,getScrollWidth} from '../../util/util';
import {getAds} from "../../api/client";

export default {
  name: 'MallIndex',
  components:{
    SectionHeader,
    ZoomImg,
    GoodsItem,
    TypeItem,
    Slick,
    FadeSwiper
  },
  computed:{
    clientWidth(){
      return getClientSize().width-getScrollWidth()+'px';
    }
  },
  data () {
    return {
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: 'src/assets/video/ad.mp4' // url地址
          }
        ],
        hls: true,
       // poster: 'http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg', // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
      typeList:[{"id":"0","img":"http://holiland.com/images/201702/goods_img/63_G_1487033349882.jpg","name":"全部"},{"id":"1","img":"http://holiland.com/data/afficheimg/1556050944618701139.jpg","name":"经典系列"},
        {"id":"2","img":"http://holiland.com/data/afficheimg/1556053192285643115.jpg","name":"儿童系列"},{"id":"3","img":"http://holiland.com/data/afficheimg/1562625291693904523.jpg","name":"尊爱系列"},
        {"id":"4","img":"http://holiland.com/images/201611/goods_img/448_G_1479602127024.jpg","name":"奶油系列"}],
      videoSrc: 'http://cloud.video.taobao.com//play/u/2455221099/p/1/e/6/t/1/50071310842.mp4',
      goodsList:[],
      initTimestamp:0,
      newTimestamp:0,
      timer:null,
      h:0,
      m:0,
      s:0,
      img1:'http://www.holiland.com/data/afficheimg/1451241729614010049.jpg',
      img2:'http://www.holiland.com/data/afficheimg/1456986961694221493.jpg',
      img3:'http://www.holiland.com/data/afficheimg/1464247474728938268.jpg'
    }
  },

  methods:{
    filterGoodsByType(typeid){
      return this.goodsList.filter((item)=>{
        return item.typeId===typeid;
      });
    },
    navTo(route){
      this.$router.push(route);
    },
    selectType(typeId){
      if(typeId==-1){
        return;
      }
      this.navTo('/mall/show/goodsList/'+typeId+'/all');
    },
    getGoodsList(typeId){
      if(typeId===0){
        //获取所有
        const res = getGoods();
        res
          .then((goods)=>{
            this.goodsList = goods.t;
          })
          .catch((e)=>{
            alert(e);
          })
      }else{
        //根据类型获取

      }
    },
    playVideo(){
      var vdo = document.getElementById("videoPlay");
      vdo.play();
    },

    searchTip(tip){
      alert(tip)
    },
    inputTextChange(text){
    },
    scrollHandle(){
      //const top = this.$refs.typeList.getBoundingClientRect().top;
      //还未到顶
      if(top>0){
        this.navShouldFixed=false;
      }
      //已经到顶
      else{
        this.navShouldFixed=true;
      }
    }
  },
  created() {
    const res = getAds();
    res
      .then((data) => {
        if(data.t.length>0) {
          this.img1=(data.t[0].img1);
          this.img2=(data.t[0].img2);
          this.img3=(data.t[0].img3);
          //alert( data.t[0].tips1)
          /* this.tip1 = data.t.tip1;
           this.tip2 = data.t.tip2;
           this.tip3 = data.t.tip3;
           this.img1 = data.t.img1;
           this.img2 = data.t.img2;
           this.img3 = data.t.img3;*/
        }
      })
      .catch((e) => {
        alert(e);
      })
  },
  mounted(){
    //获取数据
    this.getGoodsList(0);


    //记录打开网页再加四小时的时间
    /*this.initTimestamp = new Date().getTime()+(4*60*60*1000);
    this.timer = setInterval(()=>{
      this.newTimestamp = new Date().getTime();
      let diff = parseInt((this.initTimestamp-this.newTimestamp)/1000);
      diff = diff%(86400*365)%(86400*30)%86400;
      this.h = new String(Math.floor(diff/3600)).padStart(2,'0');
      diff = diff%3600;
      this.m = new String(Math.floor(diff/60)).padStart(2,'0');
      diff = diff%60;
      this.s = new String(diff).padStart(2,'0');
    },1000);*/
  },

  beforeDestroy(){
    clearInterval(this.timer);
    this.timer = null;
  },

}
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.MallIndex{
  width: 100%;


  .section{
    padding:30px;
    overflow: hidden;
    .Slick{
      position: relative;
      left: -30px;
    }
  }
  .newGoods{
    margin-top: 440px;
  }
  .flashSale{
    .content{
      border: 1px solid @borderColor;
      height: 676px;
      position: relative;
      .left{
        vertical-align: top;
        display: inline-block;
        width: 20%;
        height: 100%;
        position: relative;
        background-image: url(//yanxuan.nosdn.127.net/c9aeb62a3f79123d793d8c49b6698b09.jpg);
        background-repeat: no-repeat;
        background-size: 100%;
        text-align: center;
        color: #615548;
        cursor: pointer;
        .title{
          font-size: 26px;
          font-weight: 500;
          margin-top: 60px;
        }
        hr{
          width: 20px;
          height: 2px;
          background-color: #615548;
          border: none;
          margin-top: 20px;
        }
        .tips{
          font-size: 18px;
          margin-top: 20px;
        }
        .countBox{
          margin-top: 20px;
          .time{
            width: 42px;
            height: 42px;
            line-height: 42px;
            font-size: 19px;
            display: inline-block;
            color: white;
            background-color: #615548;
          }
        }
        .allBtn{
          width:110px;
          height: 33px;
          line-height: 33px;
          font-size: 13px;
          background-color: #a7936e;
          color:white;
          border-radius: 20px;
          margin:50px auto;
        }
      }
      .right{
        vertical-align: top;
        display: inline-block;
        width: 80%;
        height: 100%;
        position: relative;
        overflow: hidden;
        li{
          display: inline-block;
          width: 50%;
          height: 50%;
          overflow: hidden;
          .leftImg{
            width: 180px;
            height: 100%;
            display: inline-block;
          }
          .rightBox{
            display: inline-block;
            width: 240px;
            height: 100%;
            overflow: hidden;
            .goodsName{
              font-size: 15px;
              cursor: pointer;
              margin-top: 16px;
              &:hover{
                color:@thirdColor;
              }
            }
            .less{
              margin-top: 16px;
              .lessBar{
                display: inline-block;
                width: 150px;
                height: 10px;
                background-color: #ffe5e5;
                border:1px solid #f2cecd;
                border-radius: 10px;
              }
              .lessNum{
                color:@fontDefaultColor;
                font-size: 13px;
              }
            }
            .price{
              margin-top: 16px;
              .nowPrice{
                color: @falseColor;
                font-size: 20px;
              }
              .beforePrice{
                color:@fontDefaultColor;
                text-decoration:line-through;
                margin-left: 10px;
                font-size: 14px;
              }
            }
            .buyBtn{
              margin-top: 16px;
              width: 120px;
              height: 30px;
              color:white;
              background-color: @falseColor;
              text-align: center;
              line-height: 30px;
              cursor: pointer;
            }
          }
          &:nth-of-type(1){
            border-bottom: 1px solid @borderColor;
            border-right: 1px solid @borderColor;
          }
          &:nth-of-type(2){
            border-bottom: 1px solid @borderColor;
          }
          &:nth-of-type(3){
            border-right: 1px solid @borderColor;
          }
        }
      }
    }
  }
  .maker{
    .content{
      .left,.center,.right{
        display: inline-block;
        height: 320px;
        width: 32%;
      }
      .left,.center{
        margin-right: 7px;
        .makerInfo{
          p{
            text-align: center;
          }
          hr{
            width: 60px;
          }
          .large{
            margin-top: 50px;
            margin-bottom: 10px;
            font-size: 26px;
          }
          .small{
            margin-top: 10px;
            font-size: 14px;
          }
        }
      }
      .right{
        .ZoomImg{
          width: 100%;
          height: 49%;
          .makerInfo{
            p{
              text-align: left;
              margin-left: 30px;
            }
            hr{
              width: 60px;
              position: relative;
              left: -122px;
            }
            .large{
              margin-top: 30px;
              margin-bottom: 10px;
              font-size: 20px;
            }
            .small{
              margin-top: 10px;
              font-size: 12px;
            }
          }
          &:first-child{
            margin-bottom:7px;
          }
        }
      }
    }
  }
  .hotGoods{

    height: 654px;
    .left{
      width: 394px;
      display: inline-block;
      vertical-align: top;
      .GoodsItem{
        width: 100%;
        height: 532px;
        background-color: white;
      }
      .GoodsItem /deep/ .imgBox{
        height: 380px;
      }
      .GoodsItem /deep/ .goodsInfo{
        height: auto;
      }
      .GoodsItem /deep/ .goodsName{
        font-size: 30px;
        line-height: 60px;
      }
    }
    .right{
      display: inline-block;
      vertical-align: top;
      width: 740px;
      height: 100%;
      .GoodsItem{
        width: 230px;
        height: 260px;
        background-color: white;
        margin-left: 10px;
        overflow: hidden;
      }
      .GoodsItem /deep/ .imgBox{
        height: 180px;
      }
    }
  }
}
</style>
