<template>
    <li class="GoodsItem">
      <div class="imgBox">
        <img :src="img" @click="selectType(id)"/>
      </div>
      <div class="goodsInfo">
        <span class="goodsName ellipsis">{{name}}</span>
      </div>
    </li>
</template>

<script>
export default {
  name: 'TypeItem',
  props:{
    id:{
      type:String,
      default:''
    },
    img:{
      type:String,
      default:''
    },
    name:{
      type:String,
      default:''
    },
  },
  data(){
    return{
    }
  },
  methods: {
    navTo(route) {
      this.$router.push(route);
    },
    selectType(typeId) {
      //首页
      if (typeId === -1) {
        this.navTo('/mall/show/index');
      } else {
        this.navTo('/mall/show/goodsList/' + typeId + '/all');
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/css/var.less";
.GoodsItem{
  display: inline-block;
  width: 238px;
  height: 200px;
  overflow: hidden;
  &:hover{
    img{
      transform:scale(1.05);
    }
  }
  .imgBox{
    margin-left: 10px;
    width: 100%;
    height: 136px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      cursor: pointer;
      transition:transform 0.5s;
    }
  }
  .goodsInfo{
    margin-left: 10px;
    width: 100%;
    height: 40px;
    background: #87D0E3;
    font-size: 14px;
    .goodsName{
      margin-left: 10px;
      padding: 10px;
      display: block;
      text-align: center;
      cursor: pointer;
      color: white;
      font-weight: 600;
      line-height: 20px;
      &:hover{

      }
    }
    .price{
      display: block;
      text-align: center;
      color:white;
    }
  }
}
</style>
