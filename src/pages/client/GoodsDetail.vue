<template>
  <div class="GoodsDetail">
    <div class="content">
      <div class="goodsInfo">
        <img class="infoLeft" :src="goodsImg" alt="商品图片"/>
        <div class="infoRight">
          <div class="infoBox">
            <h3 class="name">{{goodsName}}</h3>
          </div>
          <div class="infoBox">
            <p>{{goodsDesc}}</p>
          </div>
          <div class="infoBox">
            <h3 class="price">{{'¥'+price}}</h3>
          </div>
          <div class="infoBox">
            <span>类型：</span>
            <!-- <Radio v-for="(item,index) in specs" :key="item.id" v-model="temSpecId" :initVal="specs[0].id" radioName="spec" :radioVal="item.id">

             </Radio>-->
            <span v-if="typeId=='1'" class="tips" slot="tips">经典系列</span>
            <span v-else-if="typeId=='2'" class="tips" slot="tips">儿童系列</span>
            <span v-else-if="typeId=='3'" class="tips" slot="tips">奶油系列</span>
            <span v-else-if="typeId=='4'" class="tips" slot="tips">尊爱系列</span>
          </div>
          <div class="infoBox">
            <span>库存：</span>
            <!-- <Radio v-for="(item,index) in specs" :key="item.id" v-model="temSpecId" :initVal="specs[0].id" radioName="spec" :radioVal="item.id">

             </Radio>-->
            <span class="tips" slot="tips">{{'还剩'+stockNum+'件'}}</span>
          </div>
          <div class="infoBox">
            <span>数量：</span>
            <NumberInput v-model="num" :min="1" :max="temStockNum"/>
          </div>
          <div class="infoBox">
            <span style="color: red" v-if="ticket!='0'" class="tips" slot="tips">{{'已经选择'+ticket+'元优惠券,立即付款可节省'+ticket+'元'}}</span>
          </div>
          <button class="buyBtn" @click="buy">立即购买</button>
          <button @click="addToCart">加入购物车</button>
          <button v-if="isCollect" @click="collect('1')">取消收藏</button>
          <button v-else @click="collect('0')">收藏</button>
        </div>
      </div>
      <section class="msgBox leftContainer">
        <ul class="tagList">
          <li :class="{selected:curIndex===index}" v-for="(item,index) in tagList" :key="'tag'+index"
              @click="changeIndex(index)">
            {{item}}
          </li>
        </ul>
        <div class="commentBody">
          <div class="noComment">{{description}}~</div>
        </div>
      </section>
      <!--<section class="typeGoods rightContainer">
        <div class="title">相似商品</div>
        <ul class="list">
          <GoodsItem
            v-for="(item,index) in filterList"
            :key="+item.id"
            :id="item.id"
            :img="item.img"
            :name="item.name"
            :price="item.price"
          />
      </ul>
      </section>-->
    </div>

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
  import {mapState} from 'vuex';
  import {
    getGoodsInfo,
    saveCollect,
    getGoodCollects,
    addOrder,
    getTickets,
    deleteTicketByValue,
    getGoodsList,
    deleteTicket, getAllTicket
  } from '../../api/client';
  import NumberInput from '../../components/NumberInput';
  import Radio from '../../components/Radio';
  import GoodsItem from '../../components/GoodsItem';

  export default {
    name: 'GoodsDetail',
    components: {
      NumberInput,
      Radio,
      GoodsItem
    },
    computed: {
      ...mapState([
        'clientToken',
        'clientName'
      ]),
      id() {
        return this.$route.params.id;
      },
      /*goodsPrice(){
        let unitPrice = 0;
        this.specs.map((item,index)=>{
          if(item.id===this.temSpecId){
            unitPrice = Number(item.unitPrice);
          }
        })
        return (this.num*unitPrice);
      },*/
      filterList() {
        return this.goodsList.filter((item) => {
          return String(item.id) !== String(this.id);
        })
      }
    },
    data() {
      return {
        ticket: '0',
        goodsImg: '',
        goodsName: '',
        goodsDesc: '',
        price: '',
        description: '',
        stock: '',
        specs: [],
        typeId: '',
        temSpecId: 0,
        num: 1,
        msgList: [],
        askContent: '',
        tagList: ['商品描述'],
        curIndex: 0,
        rate: '',
        ticketList: [],
        goodsList: [],
        dialogVisible: false,
        isCollect:false,
        temStockNum:9999
      }
    },

    methods: {
      changeIndex(i) {
        this.curIndex = i;
      },

      getGoodsInfo(id) {
        const res = getGoodsInfo(id);
        res
          .then((data) => {
            this.goodsImg = data.t.imgurl;
            this.goodsName = data.t.goodsname;
            this.goodsDesc = data.t.description;
            //this.specs = data.specs;
            this.typeId = data.t.type;
            this.stockNum = data.t.stock;
            this.temStockNum=parseInt( this.stockNum);
            this.price = data.t.price;
            this.description = data.t.description;
            //this.getTypeGoodsList(data.typeId);
          })
          .catch((e) => {
            alert(e);
          })
      },

      addToCart() {
        if (!this.clientToken) {
          alert('请先登录！');
          return;
        }
        const res1 = addOrder({
          goodid:this.id,
          userid: this.clientToken,
          orderName: this.goodsName,
          orderNum: this.num,
          orderPrice: this.price,
          salePrice: this.ticket,
          status:'0'
        });
        res1
          .then(() => {
            alert('加入购物车成功！请前往 个人中心->购物车 结算')
          })
          .catch((e) => {
            alert(e);
          })
      },

      buy() {
        if (!this.clientToken) {
          alert('请先登录！');
          return;
        }
        //查询优惠券
        const res = getTickets(this.clientToken);
        res.then((data) => {
          //alert(data.t.length)
          if (data.t.length == 0) {
            //alert(11)
            const res1 = addOrder({
              goodid:this.id,
              userid: this.clientToken,
              orderName: this.goodsName,
              orderNum: this.num,
              orderPrice: this.price,
              salePrice: this.ticket,
              status:'1'
            });
            res1
              .then(() => {
                alert('自动付款成功！请耐心等待包裹派送~')
              })
              .catch((e) => {
                alert(e);
              })
          } else {
            this.dialogVisible = true;
            this.ticketList=data.t;
          }
          // alert('自动付款成功！请耐心等待包裹派送~')
        })
      },
      buywithTicket(){
        //优惠券状态更改
        const res = deleteTicketByValue(this.ticket);
        res
          .then(()=>{
            const res1 = addOrder({
              goodid:this.id,
              userid: this.clientToken,
              orderName: this.goodsName,
              orderNum: this.num,
              orderPrice: this.price,
              salePrice: this.ticket,
              status:'1'
            });
            res1
              .then(() => {
                this.dialogVisible=false;
                alert('自动付款成功！请耐心等待包裹派送~');

              })
              .catch((e) => {
                alert(e);
              })
          })
          .catch((e)=>{
            alert(e);
          })
      },
      collect(flag){
        if (!this.clientToken) {
          alert('请先登录！');
          return;
        }
        const res1 = saveCollect({
          goodid:this.id,
          userid: this.clientToken,
          flag:flag
        });
        res1
          .then(() => {
            if(flag=='0'){
              alert('收藏成功！请前往 个人中心->我的收藏 查看')
            }
            this.getCollect();
          })
          .catch((e) => {
            alert(e);
          })
      },
      getCollect(){
        const res1 = getGoodCollects(
          this.clientToken,this.id
        );
        res1
          .then((data) => {
            if(data.t!=null){
              this.isCollect=true;
            }else{
              this.isCollect=false;
            }
          })
          .catch((e) => {
            alert(e);
          })
      }
    },
      mounted() {
        this.getGoodsInfo(this.id);

        this.getCollect();
        //this.getComment(this.id);
      },
    }
</script>

<style scoped lang="less">
  @import "../../assets/css/var.less";

  .GoodsDetail {
    .content {
      width: 100%;
      padding-top: 20px;

      .goodsInfo {
        width: 100%;
        overflow: hidden;

        .infoLeft {
          display: inline-block;
          width: 400px;
          height: 400px;
          float: left;
        }

        .infoRight {
          display: inline-block;
          float: right;
          width: 700px;

          .infoBox {
            margin-bottom: 30px;

            .name {
              font-size: 20px;
            }

            p {
              color: @fontDefaultColor;
              font-size: 15px;
            }

            .price {
              font-size: 35px;
              color: @falseColor;
            }

            span {
              color: @fontDefaultColor;
              font-size: 13px;
              display: inline-block;
              width: 50px;
            }

            .tips {
              width: auto;
              margin: 0 20px 0 5px;
            }

            .NumberInput {
              display: inline-block;
              vertical-align: middle;
            }
          }

          button {
            background-color: #b4a078;
            width: 170px;
            height: 50px;
            color: white;
            border: none;
            font-size: 19px;
            margin-right: 20px;
            margin-top: 10px;

            &:hover {
              opacity: 0.8;
            }
          }

          .buyBtn {
            border: 1px solid #b4a078;
            color: #b4a078;
            background-color: #f5f3ef;
          }
        }
      }

      .msgBox {
        margin: 50px 0;
        border: 1px solid @borderColor;
        padding-top: 0;

        .tagList {
          width: 100%;
          height: 40px;
          border-bottom: 1px solid @borderColor;
          background-color: #f5f5f5;

          li {
            width: 170px;
            height: 42px;
            position: relative;
            top: -2px;
            display: inline-block;
            text-align: center;
            line-height: 40px;
            font-size: 13px;
            cursor: pointer;

            &:hover {
              color: @thirdColor;
            }
          }

          .selected {
            background-color: white;
            border-top: 4px solid @thirdColor;
          }
        }

        .commentBody {
          padding: 20px;
          min-height: 300px;

          .rateBox {
            margin-bottom: 10px;

            span {
              color: @fontDefaultColor;
              display: inline-block;
              margin-right: 10px;
            }

            .rate {
              color: @falseColor;
              font-weight: 600;
              font-size: 30px;
            }
          }

          .commentList {
            width: 100%;

            li {
              width: 100%;
              display: block;
              margin: 0 auto;
              border-bottom: 1px solid @borderColor;
              padding: 20px 0;

              .userInfo {
                width: 80px;
                display: inline-block;
                text-align: center;

                img {
                  margin: auto;
                  display: block;
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  margin-bottom: 6px;
                }

                span {
                  font-size: 13px;
                  color: @fontDefaultColor;
                }
              }

              .commentInfo {
                display: inline-block;
                vertical-align: top;

                .starList {
                  i {
                    color: #f9bd4f;
                  }
                }

                .specName, .time {
                  color: @fontDefaultColor;
                  font-size: 13px;
                  margin-top: 10px;
                }

                .comment {
                  margin-top: 10px;
                }
              }
            }
          }

          .noComment {
            width: 100%;
            text-align: center;
            color: @thirdColor;
            padding-top: 30px;
          }
        }

        .msgBody {
          padding: 20px;
          min-height: 300px;

          .inputBox {
            margin-top: 20px;

            textarea {
              width: 88%;
              height: 50px;
              padding: 5px;
              border: 2px solid @borderColor;
              display: inline-block;
              overflow: hidden;
            }

            button, .banAsk {
              float: right;
              width: 10%;
              height: 50px;
              position: relative;
              display: inline-block;
              overflow: hidden;
              background-color: white;
              border: 2px solid @fontShallowColor;
              color: @fontDefaultColor;
            }

            .banAsk {
              background-color: @fontShallowColor;
              text-align: center;
              font-size: 12px;
              line-height: 50px;
              color: white;
              user-select: none;
            }
          }

          .msgList {
            margin-top: 20px;

            li {
              border-bottom: 1px solid @borderColor;
              padding: 10px 0;

              .ask, .answer {
                margin: 8px 0;
                width: 100%;

                .note {
                  display: inline-block;
                  color: white;
                  text-align: center;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  font-size: 10px;
                  line-height: 20px;
                }

                .text {
                  font-size: 14px;
                }

                .tipsInfo {
                  float: right;
                  font-size: 14px;
                  color: @fontDefaultColor;
                }
              }

              .ask {
                .note {
                  background-color: @falseColor;
                }
              }

              .answer {
                .note {
                  background-color: @mainColor;
                }
              }
            }
          }
        }
      }

      .typeGoods {
        margin: 50px 0;
        border: 1px solid @borderColor;
        padding-top: 0;

        .title {
          text-align: center;
          width: 100%;
          height: 40px;
          line-height: 40px;
          background-color: #f5f5f5;
          font-weight: 600;
          border-bottom: 1px solid @borderColor;
        }

        .list {
          .GoodsItem {
            display: block;
            border-bottom: 1px dotted @borderColor;
            margin: 0 auto;
          }
        }
      }
    }

    .ban {
      user-select: none;
      cursor: not-allowed;
    }
  }
</style>
