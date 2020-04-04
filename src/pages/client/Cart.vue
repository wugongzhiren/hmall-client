<template>
  <div class="Cart">
    <div v-if="orderList.length>0">
     <el-row>
        <el-table
          :data="orderList"
          stripe
          style="width: 100%">
          <el-table-column

            label="商品信息"
            width="180">
            <template slot-scope="scope">
              <img style="width: 120px;height: 120px" :src="scope.row.img" />
            </template>
          </el-table-column>
          <el-table-column
            prop="orderPrice"
            label="单价(元)"
            width="180">
          </el-table-column>
          <el-table-column
            prop="orderNum"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="orderSumPrice"
            label="小计(元)">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text"  @click="deleteOrder(scope.$index, scope.row)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
     </el-row>

     <!-- <ul class="orderList">
        <li v-for="(item,index) in orderList" :key="item.id">
          <div class="orderDetail">
            <div class="goodsName">
              <p @click="navTo('/mall/goods/'+item.goodsid)">{{item.orderName}}</p>
            </div>
            <span class="unitPrice">{{'￥'+item.orderPrice}}</span>
            <span class="amount">{{'￥'+item.orderNum}}</span>
            <button @click="deleteOrder(item.id)">删除</button>
          </div>
        </li>
      </ul>-->
      <div class="cartFooter">
        <span>应付金额：</span>
        <span class="total">{{'￥'+totalAmount}}</span>
        <span style="color: red" v-if="ticket!='0'" class="tips" slot="tips">{{'已经选择'+ticket+'元优惠券,立即下单可节省'+ticket+'元'}}</span>
        <button @click="settleAccounts">付款结算</button>
      </div>
    </div>
    <p class="emptyTips" v-else>购物车还是空滴~</p>
    <el-dialog
      title="可使用优惠券(元)"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-row>
        <el-radio-group v-model="ticket" size="medium">
          <el-radio
            v-for="item in ticketList"
            :key="item.id"
            :value="item.id"
            :label="item.money"
            @change="checkTicket(item.id)"
          ></el-radio>

        </el-radio-group>
      </el-row>
      <el-row style="margin: 20px;align-items: center">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="buywithTicket">确 定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  getOrderByState,
  deleteOrder,
  addOrderList,
  getTickets,
  deleteTicketByValue,
  deleteTicket, addOrder
} from '../../api/client';
import NumberInput from '../../components/NumberInput';

export default {
  name: 'Cart',
  components:{
    NumberInput
  },
  computed:{
    ...mapState([
      'clientToken'
    ]),
    totalAmount(){
      let amount = 0;
      this.orderList.map((item,index)=>{
        amount+=parseInt(item.orderSumPrice);
      })
      return amount;
    }
  },
  data () {
    return {
      ticket:'0',
      orderList:[],
      ticketList:[],
      dialogVisible:false,
      ticketID:'',
    }
  },

  methods:{
    checkTicket(id){
      this.ticketID=id;
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
    deleteOrder(index,row){
      //alert(row.id);
      const res = deleteOrder(row.id);
      res
      .then(()=>{
        alert('删除订单成功！');
        this.getOrderByState('0');
      })
      .catch((e)=>{
        alert(e);
      })
    },
    navTo(route){
      this.$router.push(route);
    },
    settleAccounts(){
      //查询优惠券
      const res = getTickets(this.clientToken);
      res.then((data) => {
        //alert(data.t.length)
        if (data.t.length == 0) {
          //alert(11)
          const res1 = addOrderList({
            orderList:this.orderList,
            userid:this.clientToken,
            salePrice:this.ticket
          });
          res1
            .then(() => {
              this.dialogVisible = false;
              this.$message.success('自动付款成功！请耐心等待包裹派送~')
              this.getOrderByState('0');
            })
            .catch((e) => {
              alert(e);
            })
        } else {
          this.dialogVisible = true;
          this.ticketList = data.t;
        }
      })
    },
    buywithTicket(){
      //优惠券状态更改
      if(this.ticketID==''){
        const res1 = addOrderList({
          orderList: this.orderList,
          userid: this.clientToken,
          salePrice: this.ticket
        });
        res1
          .then(() => {
            this.dialogVisible = false;
            this.getOrderByState('0');
            this.$message.success('自动付款成功！请耐心等待包裹派送~')
          })
          .catch((e) => {
            alert(e);
          })
      }else {
        const res = deleteTicket(this.ticketID);
        ;
        res
          .then(() => {
            const res1 = addOrderList({
              orderList: this.orderList,
              userid: this.clientToken,
              salePrice: this.ticket
            });
            res1
              .then(() => {
                this.dialogVisible = false;
                this.getOrderByState('0');
                this.$message.success('自动付款成功！请耐心等待包裹派送~')
              })
              .catch((e) => {
                alert(e);
              })
          })
          .catch((e) => {
            alert(e);
          })
      }
    },
  },


  mounted(){

    if(this.clientToken==null){
      alert('请登录后查看');
      return;
    }
    this.getOrderByState('0');
  },
}
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.Cart{
  width: 100%;
  .emptyTips{
      width: 200px;
      text-align: center;
      display: block;
      margin: 30px auto;
      color:@thirdColor;
      font-size: 20px;
  }
  .cartTableHeader{
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
      border-top: none;
      font-size: 13px;
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
      }
      .orderDetail{
        width: 100%;
        padding: 10px;
        position: relative;
        overflow: hidden;
        img{
          width: 84px;
          height: 84px;
          display: inline-block;
        }
        .goodsName{
          display: inline-block;
          margin-left: 5px;
          width: 230px;
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
        .unitPrice,.num,.amount{
          display: inline-block;
          vertical-align: top;
          width: 15%;
          height: 85px;
          line-height: 85px;
          text-align: center;
        }
        .NumberInput{
          position: relative;
          top: 25px;
        }
        button{
          position: absolute;
          right: 90px;
          bottom: 40px;
          width: 70px;
          height: 30px;
          border-radius: 3px;
          background-color: @falseColor;
          color:white;
          border: none;

        }
      }
    }
  }
  .cartFooter{
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    border: 1px solid @borderColor;
    border-top: none;
    background-color: #f5f5f5;
    position: relative;
    span{
      color: @fontDefaultColor;
      display: inline-block;
      vertical-align: top;
    }
    .total{
      color:@falseColor;
      font-size: 25px;
      font-weight: 600;
    }
    button{
      position: absolute;
      right: 0;
      top: 0;
      width: 100px;
      height: 100%;
      background-color: @thirdColor;
      border: none;
      color:white;
      font-size: 20px;
    }
  }
}
</style>
