<template>
  <div class="EditUser">
  	<header class="clear">
  		<span>我的优惠券管理</span>
  	</header>
    <table className="userTable">
      <thead>
      <tr><th>优惠券ID</th><th>优惠券面值（元）</th><th>可用数量</th></tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in ticketList" :key="'user'+item.id">
        <td>{{item.id}}</td>
        <td>{{item.money}}</td>
        <td>{{item.counts}}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import {getAllUser,commitTicket,getAllTicket,deleteTicket,getTickets} from '../../api/client';
import {mapState} from "vuex";
export default {
  name: 'myTicket',
  computed:{
    ...mapState([
      'clientToken'
    ]),
  },
  data(){
  	return{
      ticketList:[],
      dialogVisible:false,
      userlist:[],
      chooseMoney:'',
      value:'',
      moneyList:[{'money':'10'},{'money':'20'},{'money':'50'},{'money':'100'}]
  	}
  },
  mounted(){
    if(this.clientToken==null){
      alert('请登录后查看');
      return;
    }
    const res1 = getTickets(this.clientToken);
    res1
      .then((users)=>{
        this.ticketList = users.t;
      })
      .catch((e)=>{
        alert(e)
      })
  },
  methods:{

  	},




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
