//import axios from '../config/axios-client';
import axios from 'axios';
//用户登录
export function login(data) {
  const params = new URLSearchParams();
  params.append('userid', data.userid);
  params.append('pwd', data.pwd);
  const res=axios.post('/api/user/login', params) ;
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post( data) {
  var params = new URLSearchParams();
  params.append('userid', data.userid);
  params.append('pwd', data.pwd);
  const res=axios.post('/api/user/login', params) ;
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
//用户注册
export function signup(data) {

  //alert(data);
  var params = new URLSearchParams();
  params.append('userid', data.userid);
  params.append('username', data.username);
  params.append('pwd', data.pwd);
  params.append('address', data.address);
  params.append('phone', data.phone);
  const res=axios.post('/api/user/signup', params) ;
  return new Promise((resolve,reject)=>{
    res
    .then(res => {
      resolve(res.data);
    })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function getAllUser(){
  const res = axios.get('/api/user/getUserAll');
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
export function getAllTicket(){
  const res = axios.get('/api/user/getAllTicket');
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function deleteTicket(id){
  const res = axios.get('/api/user/deleteTicket?id='+id);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
export function deleteTicketByValue(money){
  const res = axios.get('/api/user/deleteTicketByMoney?money='+money);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function getTickets(userid){
  const res = axios.get('/api/goods/getTickets?userid='+userid);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
export function commitTicket(data) {

  //alert(data);
  var params = new URLSearchParams();
  params.append('userid', data.userid);
  params.append('money', data.money);
  const res=axios.post('/api/goods/addTicket', params) ;
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

//获得不同类目的商品
export function getGoodsList(typeId) {
  const res = axios.get('/api/goods/getByType?type=' + typeId);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

//获得商品详情页信息
export function getGoodsInfo(id) {
  const res = axios.get('/api/goods/getOne?id=' + id);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

//获得商品详情页问答区数据
export function getGoodsMsg(id) {
  const res = axios.get('/api/mall/getGoodsMsg?id=' + id);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve(json.data);
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//发送商品msg
export function askGoodsMsg(data) {
  const res = axios.post('/api/mall/askGoodsMsg', data);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve();
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//加入购物车
export function addOrder(data) {

  //alert(data);
  var params = new URLSearchParams();
  params.append('goodsid', data.goodid);
  params.append('userid', data.userid);
  params.append('orderName', data.orderName);
  params.append('orderNum', data.orderNum);
  params.append('orderPrice',data.orderPrice);
  params.append('salePrice',data.salePrice);
  params.append('status',data.status);
  const res=axios.post('/api/goods/addOrder', params) ;
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
//购物车结算
export function addOrderList(data) {

  //alert(data);
  var params = new URLSearchParams();
  params.append('orderList', JSON.stringify(data.orderList));
  params.append('userid', data.userid);
  params.append('salePrice', data.salePrice);
  const res=axios.post('/api/goods/addOrderList', params) ;
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

//获得用户订单列表
export function getOrderByState(status, userid) {
  const res = axios.get('/api/user/getOrderByState?status=' + status + '&userid=' + userid);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
export function getAllOrderByState(status) {
  const res = axios.get('/api/user/getAllOrderByState?status=' + status);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
export function getOrders(userid) {
  const res = axios.get('/api/user/getOrders?userid=' + userid);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
export function getAllOrders() {
  const res = axios.get('/api/user/getAllOrders');
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
//删除订单
export function deleteOrder(id) {
  const res = axios.get('/api/user/deleteOrder?id=' + id);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

//确认收货
export function confirmReceive(id) {
  const res = axios.get('/api/user/confirmReceive?id=' + id);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
export function sendGoods(id) {
  const res = axios.get('/api/user/sendGoods?id=' + id);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
//确认付款
export function pay(id) {
  const res = axios.get('/api/mall/pay?id=' + id);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve();
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//获得用户资料
export function getUserData(token) {
  const res = axios.get('/api/user/getUserInfo?userid=' + token);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

//更改用户资料
export function updateUserData(data) {
  var params = new URLSearchParams();
  params.append('userid', data.userid);
  params.append('username', data.username);
  //params.append('pwd', data.pwd);
  params.append('address', data.address);
  params.append('phone', data.phone);
  const res=axios.post('/api/user/updateUserInfo', params) ;
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

//更改用户密码
export function updatePwd(data) {
  var params = new URLSearchParams();
  params.append('userid', data.userid);
 // params.append('username', data.username);
  params.append('pwd', data.pwd);
  //params.append('address', data.address);
  //params.append('phone', data.phone);
  const res=axios.post('/api/user/updatePassword', params) ;
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

//结算购物车
export function settleAccounts(data) {
  const res = axios.post('/api/mall/settleAccounts', data);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve();
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//发送评价
export function sendComment(data) {
  const res = axios.post('/api/mall/sendComment', data);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve();
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}


//关键词搜索商品
export function searchGoods(keyword) {
  const res = axios.get('/api/goods/getByKeyWord?keyword=' + keyword);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

//关键词搜索商品
export function getAds() {
  const res = axios.get('/api/ads/getAds');
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

//关键词搜索商品
export function addAds(data) {
  var params = new URLSearchParams();
  params.append('id', data.id);
  params.append('tips1', data.tips1);
  params.append('tips2', data.tips2);
  params.append('tips3', data.tips3);
  params.append('img1', data.img1);
  params.append('img2', data.img2);
  params.append('img3', data.img3);
  //params.append('pwd', data.pwd);
  const res=axios.post('/api/ads/add', params) ;
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function saveSuggest(data) {
  var params = new URLSearchParams();
  params.append('userid', data.userid);
  params.append('content', data.content);
  //params.append('pwd', data.pwd);
  const res=axios.post('/api/user/saveSuggest', params) ;
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function getSuggests() {
  const res = axios.get('/api/user/getSuggest');
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function saveCollect(data) {
  var params = new URLSearchParams();
  params.append('userid', data.userid);
  params.append('goodid', data.goodid);
  params.append('flag', data.flag);
  //params.append('pwd', data.pwd);
  const res=axios.post('/api/user/saveCollect', params) ;
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function getCollects(userid) {
  const res = axios.get('/api/user/getCollect?userid='+userid);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function getGoodCollects(userid,goodid) {
  const res = axios.get('/api/user/getgoodCollect?userid='+userid+'&goodid='+goodid);
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function getIp(){
  const res = axios.get('/api/ads/getIP');
  return new Promise((resolve,reject)=>{
    res
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
