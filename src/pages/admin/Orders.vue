<template>
  <div class="Orders">
    <header class="clear">
  		<span>订单管理</span>
  	</header>
  	<Tag :tagList="tags" @indexChange="changeTag"/>
  	<div class="content">
  		<table class="ordersTable">
	        <thead>
	        	<tr><th>订单号</th><th>用户ID</th><th>收件人</th><th>收货地址</th><th>联系电话</th><th>商品</th><th>规格</th><th>购买数量</th><th>金额</th><th>订单状态</th><th>更新时间</th><th>操作</th></tr>
	        </thead>
	        <tbody>
	            <tr v-for="(item,index) in orderList" :key="'order'+item.id">
	            	<td>{{item.id}}</td>
	            	<td>{{item.userid}}</td>
	            	<td>{{item.userName}}</td>
	            	<td>{{item.address}}</td>
	            	<td>{{item.phone}}</td>
	            	<td>{{item.orderName}}</td>
	            	<td>{{item.type}}</td>
	            	<td>{{item.orderNum}}</td>
	            	<td>{{item.orderSumPrice}}</td>

	            	<td v-if="item.status=='0'">待付款</td>
                <td v-else-if="item.status=='1'">待发货</td>
                <td v-else-if="item.status=='2'">待用户确认收获</td>
                <td v-else="item.status=='2'">已完成</td>
	            	<td>{{item.creteTime}}</td>
	                <td><button v-if="item.status=='1'" class="normal" @click="editOrder(item.id)">发货</button></td>
	            </tr>
	        </tbody>
	    </table>
  	</div>
  </div>
</template>

<script>
  import {getAllOrders, deleteOrder, getAllOrderByState,sendGoods} from '../../api/client';
import Tag from '../../components/Tag';
export default {
  name: 'Orders',
  components:{
  	Tag
  },
  computed:{
  },
  data(){
  	return{
  		tags:['全部','未付款','未发货','已发货','已到货'],
  		orderList:[],
      curIndex:0,
  	}
  },
  methods:{
  	changeTag(index){

      this.curIndex = index;
      // alert( this.curIndex)
      if(this.curIndex==0){
        //获取全部订单
        const res = getAllOrders();
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
    getOrderByState(state){
      const res = getAllOrderByState(state);
      res
        .then((data)=>{
          this.orderList=data.t;
        })
        .catch((e)=>{
          alert(e);
        })
    },
  	editOrder(id){
  	  //alert(id)
      const res = sendGoods(id);
      res
        .then((data)=>{
          this.changeTag(0);
          this.$message.success('发货成功');
        })
        .catch((e)=>{
          alert(e);
        })
  	},
  	deleteOrder(id){
  		const res = deleteOrder(id);
  		res
  		.then(()=>{
  			alert('删除成功');
  			this.orderList.map((item,index)=>{
  				if(item.id===id){
  					this.orderList.splice(index,1);
  				}
  			})
  		})
  		.catch((e)=>{
  			alert(e);
  		})
  	}
  },
  mounted(){
  	this.changeTag(0);
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.Orders{
	header{
		width: 100%;
		height: 40px;
		line-height: 40px;
		span{
			float: left;
		}
	}
	.content{
		width: 100%;
		background-color: white;
		position: relative;
		top: -3px;
		padding: 5px;
		.ordersTable{
			width: 100%;
			th{
				text-align: center;
			}
			tbody{
				tr{
					td{
						max-width: 100px;
						min-width: 30px;
						text-align: center;
						button{
							display: block;
							overflow: hidden;
							margin-bottom: 5px;
						}
					}
				}
			}
		}
	}
}
</style>
