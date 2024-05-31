import axios from 'axios';
import router from '@/router';
import store from './store';

async function login(email, password) {
  console.log(email + password)
  try {
    const response = await axios.get('http://localhost:9090/api/auth/login', {headers: { email: email, password: password }});
    if (response.data) {
      router.push('/')
    }
  } catch(error) {
    console.log(error)
  }
}

async function register(username, email, password) {
  try {
    const response = await axios.post('http://localhost:9090/api/auth/register', {
      name: username,
      email: email,
      password: password
    });
    if (response.data) {
      router.push('/')
    }
  } catch(error) {
    console.log(error)
  }
}

async function checkIsLoggedIn() {
  try {
    const accessToken = store.state.accessToken; 
    const refreshToken = store.state.refreshToken;
    console.log(accessToken)
    console.log(refreshToken)
    const response = await axios.get('http://localhost:9090/api/product/test', {headers: { Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken }});
    const responseToken = response.headers['authorization'];
    if (responseToken != null) {
      if (responseToken != accessToken) {
        store.commit('setAccessToken', responseToken);
      }
    }
    return true;

  } catch (error) {
    console.log("err: " + error);
    return false;
  }
}

async function checkIsAdmin() {
  return true;
}

export { login, register, checkIsLoggedIn, checkIsAdmin }