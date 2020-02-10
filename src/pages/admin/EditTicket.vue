<template>
  <div class="EditUser">
  	<header class="clear">
  		<span>优惠券管理</span>
      <div><el-button  @click="addTicket">添加</el-button></div>
  		<!--<div><input ref="input" type="text" placeholder="输入搜索用户" /><button @click="searchUser"><i class="iconfont icon-search" /></button></div>-->
  	</header>
<!--
    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="userid"
        label="用户ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="money"
        label="优惠券面值"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="使用状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>-->
    <table className="userTable">
      <thead>
      <tr><th>用户ID</th><th>优惠券面值</th><th>剩余数量</th><th>操作</th></tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in ticketList" :key="'user'+item.userid">
        <td>{{item.userid}}</td>
        <td>{{item.money}}</td>
        <td>{{item.counts}}</td>
        <td><button class="delete" @click="deleteTickets(item.id)">删除</button></td>
      </tr>
      </tbody>
    </table>

    <el-dialog
      title="分配优惠券"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-row>
        分配用户：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in userlist"
            :key="item.userid"
            :label="item.userid"
            :value="item.userid">
          </el-option>
        </el-select>
      </el-row>

      <el-row style="margin-top: 15px">
        优惠券面值(元)：
        <el-select v-model="chooseMoney" placeholder="请选择">
          <el-option
            v-for="item in moneyList"
            :key="item.money"
            :label="item.money"
            :value="item.money">
          </el-option>
        </el-select>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="commitTicket">添 加</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {getAllUser,commitTicket,getAllTicket,deleteTicket} from '../../api/client';
export default {
  name: 'editTicket',
  computed:{
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

  	const res = getAllUser();
  	res
  	.then((users)=>{
  		this.userlist = users.t;
  	})
  	.catch((e)=>{
  		alert(e)
  	});
    const res1 = getAllTicket();
    res1
      .then((users)=>{
        this.ticketList = users.t;
      })
      .catch((e)=>{
        alert(e)
      })
  },
  methods:{
    deleteTickets(id){
  		const res = deleteTicket(id);
  		res
  		.then(()=>{
  			alert('删除成功');
        const res1 = getAllTicket();
        res1
          .then((users)=>{
            this.ticketList = users.t;
          })
          .catch((e)=>{
            alert(e)
          })

  		})
  		.catch((e)=>{
  			alert(e);
  		})
  	},
  	searchUser(){
  		const val = this.$refs.input.value;
  		const res = getSearchUser(val);
  		res
  		.then((data)=>{
  			this.userList = data;
  		})
  		.catch((e)=>{
  			alert(e);
  		})
  	},
    addTicket(){
      this.dialogVisible=true;
    },
    commitTicket(){
  	  if(this.value==''||this.chooseMoney==''){
  	    alert('请输入正确信息');
  	    return
      }else{

        const res = commitTicket({
          userid:this.value,
          money:this.chooseMoney});
        res
          .then((data)=>{
            this.dialogVisible=false;
            const res1 = getAllTicket();
            res1
              .then((users)=>{
                this.ticketList = users.t;
              })
              .catch((e)=>{
                alert(e)
              })
            //this.userlist = users.t;
          })
          .catch((e)=>{
            alert(e)
          })
      }
    }
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
