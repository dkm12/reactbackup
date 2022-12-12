import axios from 'axios'
const userinfo= JSON.parse(localStorage.getItem('userinfo'));
// console.log('abc', userinfo)
const api=axios.create({
  baseURL:'http://k8s-batadev-ingressd-0836da90f9-944557268.ap-south-1.elb.amazonaws.com/api/',

  headers: {
    Authorization: `Bearer ${userinfo && userinfo.token}`
  }
});

export const api1=axios.create({
  baseURL:' http://65.1.255.148:8083',

  headers: {
    Authorization: `Bearer ${userinfo && userinfo.token}`
  }
});

export default api;