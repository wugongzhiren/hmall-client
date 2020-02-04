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
//得到类目
export function getTypes() {
  const res = axios.get('/api/admin/getType');
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

//获得不同类目的商品
export function getGoodsList(typeId) {
  if(typeId==='0'){
    //获取所有的
  }
  const res = axios.get('/api/mall/getGoodsByType?typeId=' + typeId);
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
  const res = axios.post('/api/goods/addOrder', data);
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

//获得用户订单列表
export function getOrderByState(state, token) {
  const res = axios.get('/api/mall/getOrderByState?state=' + state + '&token=' + token);
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

//删除订单
export function deleteOrder(id) {
  const res = axios.delete('/api/mall/deleteOrder?id=' + id);
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

//确认收货
export function confirmReceive(id) {
  const res = axios.get('/api/mall/confirmReceive?id=' + id);
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

//获得商品评论
export function getComment(goodsId) {
  const res = axios.get('/api/mall/getGoodsComment?goodsId=' + goodsId);
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

//关键词搜索商品
export function searchGoods(keyword = '') {
  const res = axios.get('/api/mall/searchGoods?keyword=' + keyword);
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
