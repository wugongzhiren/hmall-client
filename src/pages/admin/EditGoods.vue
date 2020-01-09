<template>
  <div class="EditGoods">
    <header class="clear">
      <span>商品编辑</span>
    </header>
    <div class="content">
      <div class="inputBox">
        <span>商品名称：</span>
        <TextInput class="long" placeholder="请输入商品名称" v-model="goodsName" :initText="goodsName"/>
      </div>
      <div class="inputBox">
        <span>选择类目：</span>
        <el-radio v-model="types" label="1">儿童系列</el-radio>
        <el-radio v-model="types" label="2">经典系列</el-radio>
        <el-radio v-model="types" label="3">奶油系列</el-radio>
      </div>
      <div class="inputBox">
        <span>图片地址：</span>
        <TextInput class="long" placeholder="请输入图片地址" v-model="goodsImg" :initText="goodsImg"/>
      </div>
      <div class="inputBox">
        <span class="verTop">规格详情：</span>

        <span>库存量：</span><input type="text" class="numInput" v-model.trim.number="stockNum"/>
        <span>价格：</span><input type="text" class="numInput" v-model.trim.number="unitPrice"/>


      </div>
      <div class="inputBox">
        <span>详情描述：</span>
        <TextInput class="long" placeholder="请输入简单描述" v-model="description"/>
      </div>
      <div class="btnBox">
        <button class="confirmBtn" @click="saveChange">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
  import TextInput from '../../components/TextInput';
  import Radio from '../../components/Radio';
  import {getGoodsInfo, addGoods, addSpec, deleteSpec, updateGoods} from '../../api/admin';

  export default {
    name: 'EditGoods',
    components: {
      Radio,
      TextInput
    },
    data() {
      return {
        popupShow: false,
        id: this.$route.params.id,
        types:'1',
        goodsName: '',
        goodsImg: '',
        description: '',
        stockNum: 0,
        unitPrice: 0,
      }
    },
    methods: {
      /*getTypes(){
        const res = getTypes();
        res
        .then((data)=>{
          this.types = data;
        })
        .catch((e)=>{
          alert(e)
        })
      },*/
      back() {
        this.$router.go(-1);
      },
      saveChange() {
        if (this.id === 'new') {
          const res = addGoods({
            name: this.goodsName,
            type: this.types,
            img: this.goodsImg,
            description: this.description,
            stockNum: this.stockNum,
            unitPrice: this.unitPrice
          });
          res
            .then((data) => {
              if (data.code == 200) {
                alert("商品添加成功!");
              } else {
                alert("该商品已经被添加过!");
              }
            })
            .catch((e) => {
              alert(e);
            })
        } else {
          alert('更新')
          const res = updateGoods({
            id:this.id,
            name: this.goodsName,
            type: this.types,
            img: this.goodsImg,
            description: this.description,
            stockNum: this.stockNum,
            unitPrice: this.unitPrice
          });
          res
            .then(() => {
              alert('商品信息修改成功！')
            })
            .catch((e) => {
              alert(e);
            })
        }
      },
    },
    mounted() {
      //新建商品
      if (this.id === 'new') {

      } else {
        const res = getGoodsInfo(this.id);
        res
          .then((data) => {
            this.types = data.t.type;
            this.goodsName = data.t.goodsname;
            this.goodsImg = data.t.imgurl;
            this.description = data.t.description;
            this.stockNum = data.t.stock;
            this.unitPrice=data.t.price
          })
          .catch((e) => {
            alert(e);
          })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/var.less";

  .EditGoods {
    header {
      width: 100%;
      height: 40px;
      line-height: 40px;

      span {
        float: left;
      }
    }

    .content {
      width: 100%;
      background-color: white;
      padding: 10px;

      textarea {
        width: 80%;
        height: 300px;
        border: 1px solid @borderColor;
      }

      .inputBox {
        margin-bottom: 30px;

        span {
          width: 90px;
          display: inline-block;
          color: @fontDefaultColor;
          font-weight: 600;
          vertical-align: middle;
        }

        .verTop {
          vertical-align: top;
        }

        .tips {
          font-weight: normal;
          width: auto;
          font-size: 13px;
          position: relative;
          left: 3px;
        }

        .val {
          width: auto;
          font-weight: 500;
          color: @fontDeepColor;
        }

        ul {
          display: inline-block;
          width: 500px;

          li {
            width: 100%;
            height: 40px;

            span {
              width: auto;
              font-size: 13px;
              font-weight: 500;
            }

            input {
              margin-right: 10px;
            }

            button {
              width: 50px;
              height: 25px;
              color: #d7514a;
              border: none;
              background-color: white;
              border-radius: 5px;
            }
          }

          .addSpec {
            text-align: center;
            line-height: 30px;
            background-color: #409EFF;
            color: white;
            border: none;
            width: 100px;
            height: 30px;
            border-radius: 5px;
            font-size: 13px;
            cursor: pointer;
            margin: 10px auto;
          }
        }

        .long {
          width: 900px;
        }

        .numInput {
          width: 30px;
          text-align: center;
          border: none;
          border-bottom: 2px solid @mainColor;
        }
      }

      .btnBox {
        margin: auto;
        display: block;
        width: 250px;
      }

      .confirmBtn {
        display: inline-block;
        margin-right: 30px;
        background-color: #409EFF;
        color: white;
        border: none;
        width: 100px;
        height: 30px;
        border-radius: 5px;
        cursor: pointer;
      }

      .normalBtn {
        display: inline-block;
        background-color: grey;
        color: white;
        border: none;
        width: 100px;
        height: 30px;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    .popupContent {
      padding: 10px;

      input {
        display: block;
        width: 400px;
        margin-bottom: 10px;
        height: 30px;
      }

      button {
        display: block;
        margin: auto;
        background-color: #333333;
        color: white;
        border: none;
        width: 100px;
        height: 30px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
</style>
