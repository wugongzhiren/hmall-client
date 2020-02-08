<template>
  <div class="EditGoods">
    <header class="clear">
      <span>外链</span>
    </header>
    <div class="content">
      <div class="inputBox">
        <span>公告1：</span>
        <TextInput class="long" placeholder="请输入公告1" v-model="tips1" />
      </div>
      <div class="inputBox">
        <span>公告2：</span>
        <TextInput class="long" placeholder="请输入公告2" v-model="tips2" />
      </div>
      <div class="inputBox">
        <span>公告3：</span>
        <TextInput class="long" placeholder="请输入公告3" v-model="tips3" />
      </div>
      <div class="inputBox">
        <span>图片1：</span>
        <TextInput class="long" placeholder="请输入图片1地址" v-model="img1" />
      </div>
      <div class="inputBox">
        <span>图片2：</span>
        <TextInput class="long" placeholder="请输入图片2地址" v-model="img2" />
      </div>
      <div class="inputBox">
        <span>图片3：</span>
        <TextInput class="long" placeholder="请输入图片3地址" v-model="img3" />
      </div>
      <div class="btnBox">
        <button class="confirmBtn" @click="saveChange">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
  import TextInput from '../../components/TextInput';
  import {getAds,addAds} from '../../api/client';
  import {addGoods} from "../../api/admin";

  export default {
    name: 'EditAds',
    components: {
      TextInput
    },
    data() {
      return {
        id:'',
        tips1: '',
        tips2: '',
        tips3: '',
        img1: '',
        img2: '',
        img3: '',
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      saveChange(){
        if(this.tips1==''||this.tips2==''||this.tips3==''||this.img1==''||this.img2==''||this.img3==''){
          this.$message("请输入完整的信息!");
          return;
        }
        const res = addAds({
          id: this.id,
          tips1: this.tips1,
          tips2: this.tips2,
          tips3: this.tips3,
          img1:this.img1,
          img2:this.img2,
          img3:this.img3
        });
        res
          .then((data) => {
            if (data.code == 200) {
              alert("保存成功!");
            }
          })
          .catch((e) => {
            alert(e);
          })
      }
    },
    mounted() {
      //新建商品

      const res = getAds();
      res
        .then((data) => {
          alert()
          if(data.t.length>0) {
            this.id = data.t[0].id;
            this.tips1 = data.t[0].tips1;
            this.tips2 = data.t[0].tips2;
            this.tips3 = data.t[0].tips3;
            this.img1 = data.t[0].img1;
            this.img2 = data.t[0].img2;
            this.img3 = data.t[0].img3;
          }
        })
        .catch((e) => {
          alert(e);
        })
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
