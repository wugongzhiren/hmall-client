import axios from '../config/axios-admin';

//管理员登录
export function login(data){
	const res = axios.post('/api/admin/login',data);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.code===0){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//获取所有用户信息
export function getAllUser(){
	const res = axios.get('/api/admin/allUser');
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.code===0){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//删除指定用户
export function deleteUser(id){
	const res = axios.delete('/api/admin/deleteUser?id='+id);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.code===0){
                resolve();
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//搜索用户
export function getSearchUser(val){
	const res = axios.get('/api/admin/searchUser?word='+val);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.code===0){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//更改密码
export function changePwd(data){
	const res = axios.post('/api/admin/changePwd',data);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.code===0){
                resolve();
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//得到未回复的信息
export function getNoReplyMsg(){
	const res = axios.get('/api/admin/noReplyMsg');
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.code===0){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//得到已回复的信息
export function getRepliedMsg(){
	const res = axios.get('/api/admin/repliedMsg');
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.code===0){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//得到已回复的信息
export function reply(data){
	const res = axios.post('/api/admin/reply',data);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.code===0){
                resolve();
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//得到订单
export function getOrders(state){
	const res = axios.get('/api/admin/orders?state='+state);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.code===0){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//得到订单
export function getAOrder(id){
	const res = axios.get('/api/admin/order?id='+id);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.code===0){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//修改订单
export function changeOrder(data){
	const res = axios.post('/api/admin/changeOrder',data);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.code===0){
                resolve();
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//删除指定用户
export function deleteOrder(id){
	const res = axios.delete('/api/admin/deleteOrder?id='+id);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.code===0){
                resolve();
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//得到商品
export function getGoods(){
	const res = axios.get('/api/goods/getAll');
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

//得到商品信息
export function getGoodsInfo(id){
	const res = axios.get('/api/goods/getOne?id='+id);
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

//增加商品
export function addGoods(data){
  const params = new URLSearchParams();
  params.append('name', data.name);
  params.append('type', data.type);
  params.append('img', data.img);
  params.append('description', data.description);
  params.append('stockNum', data.stockNum);
  params.append('unitPrice', data.unitPrice);
  const res=axios.post('/api/goods/add', params) ;
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

//更新商品信息
export function updateGoods(data){
  const params = new URLSearchParams();
  alert(data.id);
  params.append('id', data.id);
  params.append('name', data.name);
  params.append('type', data.type);
  params.append('img', data.img);
  params.append('description', data.description);
  params.append('stockNum', data.stockNum);
  params.append('unitPrice', data.unitPrice);
	const res = axios.post('/api/goods/update',params);
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

//删除指定商品
export function deleteGoods(id){
	const res = axios.delete('/api/goods/delete?id='+id);
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
