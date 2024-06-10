import axios from 'axios';
import router from '@/router';
import store from './store';

async function login(email, password) {
  try {
    const response = await axios.get('http://localhost:9090/api/auth/login', {headers: { email: email, password: password }});
    if (response.data) {
      store.commit('setEmail', email);
      return true;
    }
    return false;
  } catch(error) {
    return false;
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
      store.commit('setEmail', email);
      return true;
    }
    return false;
  } catch(error) {
    return true;
  }
}

async function sendOtp(email) {
  try {
    await axios.post('http://localhost:9090/api/otp/send', {
      email: email
    });
  } catch(error) {
    return;
  }
}

async function checkOtp(email, otp, usage) {
  try {
    if (usage == "login") {
      await checkOtpForLogin(email, otp);
    }
    else {
      await checkOtpForResetPassword(email, otp);
    }
  } catch(error) {
    return;
  }
}

async function checkOtpForLogin(email, otp) {
  try {
    const response = await axios.get('http://localhost:9090/api/otp/checkOtp', {headers: { email: email, code: otp }});
    store.commit('setAccessToken', response.headers['authorization']);
    store.commit('setRefreshToken', response.headers['refresh']);
    if (response.data) {
      store.commit('setVerifiedStatus', true);
      router.push("/")
    }
    else {
      alert('코드가 올바르지 않습니다!')
    }
  } catch(error) {
    return;
  }
}

async function checkOtpForResetPassword(email, otp) {
  try {
    const response = await axios.get('http://localhost:9090/api/otp/checkOtp', {headers: { email: email, code: otp }});
    if (response.data) {
      store.commit('setVerifiedStatus', true);
      router.push("/reset/password")
    }
    else {
      alert('코드가 올바르지 않습니다!')
    }
  } catch(error) {
    return;
  }
}

async function checkEmailExistence(email) {
  try {
    const response = await axios.get('http://localhost:9090/api/auth/email/valid', {headers: { email: email }});
    if (response.data) {
      return true;
    }
    return false;
  } catch(error) {
    return false;
  }
}

async function checkIsLoggedIn() {
  try {
    const accessToken = store.state.accessToken; 
    const refreshToken = store.state.refreshToken;
    const response = await axios.get('http://localhost:9090/api/product/test', {headers: { Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken }});
    const responseToken = response.headers['authorization'];
    if (responseToken != null) {
      if (responseToken != accessToken) {
        store.commit('setAccessToken', responseToken);
      }
    }
    
    return true;

  } catch (error) {
    return false;
  }
}

async function resetPassword(email, password) {
  try {
    const response = await axios.put('http://localhost:9090/api/auth/reset/password', {
      email: email,
      password: password
    });
    if (response.data) {
      return true;
    }
    return false;
  } catch(error) {
    console.log(error)
    return false;
  }
}

async function checkIsAdmin() {
  return true;
}

export { login, register, sendOtp, checkOtp, checkEmailExistence, resetPassword, checkIsLoggedIn, checkIsAdmin }