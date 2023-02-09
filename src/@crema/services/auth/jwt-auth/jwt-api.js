import axios from 'axios';

const jwtAxios = axios.create({
  baseURL: 'http://18.216.178.179/api/v1/', //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  },
);
export const setAuthToken = (token, rememberMe) => {
  if (token) {
    jwtAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    rememberMe && localStorage.setItem('token', token);
  } else {
    delete jwtAxios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }
};

export default jwtAxios;
