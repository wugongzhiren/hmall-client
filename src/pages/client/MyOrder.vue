<template>
  <div class="MyOrder">
    <ul class="tagList">
      <li :class="{selected:curIndex===index}" v-for="(item,index) in tagList" :key="'tag'+index" @click="changeIndex(index)">
        {{item}}
      </li>
    </ul>
    <div class="orderBox">
      <div class="orderTableHeader">
        <span>商品</span>
        <span>单价</span>
        <span>数量</span>
        <span>实付款</span>
        <span>交易操作</span>
      </div>
      <ul class="orderList">
        <li v-for="(item,index) in orderList" :key="'order'+item.id">
          <div class="orderHeader">
            <span class="orderTime">{{item.creteTime}}</span>
            <span class="orderId">{{'订单号：'+item.id}}</span>
            <span class="state">{{tagList[item.state+1]}}</span>
            <span class="deleteBtn" @click="deleteOrder(item.id)"><i class="iconfont icon-close" /></span>
          </div>
          <div class="orderDetail">
            <div class="goodsName">
              <p @click="navTo('/mall/goods/'+item.goodid)"><img style="margin-left:10px;width: 120px;height: 120px" :src="item.img"/></p>
            </div>
            <span class="unitPrice">{{'￥'+item.orderPrice}}</span>
            <span class="num">{{item.orderNum}}</span>
            <span class="amount">{{'￥'+item.orderSumPrice}}</span>
            <button v-if="item.status=='0'" @click="navTo('/mall/personal/cart')">去结算</button>
            <button v-else-if="item.status=='2'" @click="confirmReceive(item.id)">确认收货</button>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import {getOrderByState,deleteOrder,confirmReceive,pay,getOrders} from '../../api/client';
import Popup from '../../components/Popup';

export default {
  name: 'MyOrder',
  computed:{
    ...mapState([
      'clientToken'
    ]),
  },
  data () {
    return {
      tagList:['全部订单','待付款','待发货','已发货','已完成'],
      curIndex:0,
      orderList:[],
      curOrderId:'',
      curCommentGoodsId:'',
      curCommentGoodsDetailId:'',
      curStar:0,
      hasClickStar:false,
      comment:'',
    }
  },

  methods:{
    changeIndex(i){
      this.curIndex = i;
     // alert( this.curIndex)
      if(this.curIndex==0){
        //获取全部订单
        const res = getOrders(this.clientToken);
        res
          .then((data)=>{
            this.orderList=data.t;
          })
          .catch((e)=>{
            alert(e);
          })
      }else{
        this.getOrderByState(this.curIndex-1);
      }

    },
    navTo(route){
      this.$router.push(route);
    },
    getOrderByState(state){
      const res = getOrderByState(state,this.clientToken);
      res
      .then((data)=>{
        this.orderList=data.t;
      })
      .catch((e)=>{
        alert(e);
      })
    },
    deleteOrder(orderId){
      const res = deleteOrder(orderId);
      res
      .then(()=>{
        alert('删除订单成功！');
        this.orderList.map((item,index)=>{
          if(item.id===orderId){
            this.orderList.splice(index,1);
          }
        })
      })
      .catch((e)=>{
        alert(e);
      })
    },

    confirmPay(orderId){
      const res = pay(orderId);
      res
      .then(()=>{
        alert('支付成功！');
        this.orderList.map((item,index)=>{
          if(item.id===orderId){
            item.state = 1;
          }
        })
      })
      .catch((e)=>{
        alert(e);
      })
    },
    confirmReceive(orderId){
      const res = confirmReceive(orderId);
      res
      .then(()=>{
        alert('确认收货成功！');
        this.orderList.map((item,index)=>{
          if(item.id===orderId){
            item.state = 3;
          }
        })
      })
      .catch((e)=>{
        alert(e);
      })
    },
  },

  mounted(){
    if(this.clientToken==null){
      alert('请登录后查看');
      return;
    }
    this.getOrderByState("1");
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.MyOrder{
  .tagList{
    li{
      text-align: center;
      display: inline-block;
      font-weight: 500;
      font-size: 18px;
      border-bottom: 2px solid @borderColor;
      cursor: pointer;
      padding: 10px 20px;
      position: relative;
      &:after{
        top:12px;
        right: 0;
        position:absolute;
        content:'';
        width: 1px;
        height: 15px;
        background-color: @borderColor;
      }
      &:last-child{
        &:after{
          display:none;
        }
      }
    }
    .selected{
      color:@thirdColor;
      border-bottom: 2px solid @thirdColor;
    }
  }
  .orderBox{
    width: 100%;
    margin-top: 20px;
    .orderTableHeader{
      width: 100%;
      height: 40px;
      background-color: #f5f5f5;
      border: 1px solid @borderColor;
      color: @fontDefaultColor;
      font-size: 14px;
      line-height: 40px;
      span{
        display: inline-block;
        width: 14%;
        &:first-child{
          width:40%;
          text-align: center;
        }
      }
    }
    .orderList{
      width: 100%;
      li{
        border: 1px solid @borderColor;
        font-size: 13px;
        margin-top: 10px;
        .orderHeader{
          background-color: #f1f1f1;
          height: 40px;
          line-height: 40px;
          padding: 0 5px;
          .orderTime{
            font-weight: 600;
          }
          .orderId,.state{
            margin-left: 10px;
          }
          .deleteBtn{
            float: right;
            cursor: pointer;
            i{

            }
          }
        }
        .orderDetail{
          width: 100%;
          padding: 10px;
          position: relative;
          overflow: hidden;
          .goodsName{
            display: inline-block;
            margin-left: 5px;
            color: red;
            width: 40%;
            vertical-align: top;
            p{
              cursor: pointer;
              line-height: 20px;
              &:hover{
                text-decoration:underline;
              }
            }
            span{
              color:@fontDefaultColor;
              display: block;
              margin-top: 10px;
            }
          }
          .unitPrice,.num,.amount,.hasComment{
            display: inline-block;
            vertical-align: top;
            width: 14%;
            height: 85px;

            line-height: 80px;
          }
          button{
            position: absolute;
            right: 90px;
            bottom: 40px;
            width: 70px;
            height: 30px;
            border-radius: 3px;
            background-color: @thirdColor;
            color:white;
            border: none;
          }
        }
      }
    }
  }


}
</style>
