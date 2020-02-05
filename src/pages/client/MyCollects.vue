<template>
  <div>

    <template>
      <el-table
        :data="collects"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column

          label="商品名"
          width="100">
          <template slot-scope="scope">
            <a style="color: red" @click="navTo('/mall/goods/'+scope.row.goodid)">{{scope.row.goodName}}</a>
          </template>
        </el-table-column>
        <!--<el-table-column
          :cell-cle
          prop="goodName"
          label="商品名"
          width="180">
        </el-table-column>-->
        <el-table-column
          prop="unitPrice"
          label="单价(元)">
        </el-table-column>
      </el-table>
    </template>



  </div>
</template>

<script>
import {getCollects} from '../../api/client';
import {mapState} from "vuex";
export default {
  name: 'MyCollects',
  computed: {
    ...mapState([
      'clientToken'
    ]),
  },
  data(){
  	return{
  		collects:[]
  	}
  },
  mounted(){
  	const res = getCollects(this.clientToken);
  	res
  	.then((data)=>{
  		this.collects = data.t;
  	})
  	.catch((e)=>{
  		alert(e)
  	})
  },
  methods:{
    navTo(route){
      this.$router.push(route);
    },
  }


}
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.EditUser{
	header{
		width: 100%;
		height: 40px;
		line-height: 40px;
		span{
			float: left;
		}
		div{
			height: 20px;
			float: right;
      input{
        border: none;
        border-bottom: 1px solid #337da4;
        background-color: rgba(0,0,0,0);
        width: 180px;
        padding-left: 10px;
      }
			button{
        position: relative;
        top: -1px;
        border: none;
        background-color: rgba(0,0,0,0);
				i{
					font-size: 17px;
          color:#337da4;
				}
			}
		}
	}
}
</style>
