<template>
  <v-app class="main">
    <v-container class="container">
      <v-row align="center" justify="center">
        <v-col sm="5">
          <v-card class="elevation-6 rounded-lg">
            <v-window>
              <v-window-item>
                <v-col>
                  <v-col>
                    <v-card-text>
                      <h2>Log in</h2>
                    </v-card-text>
                    <v-form ref="login_form" v-model="valid" lazy-validation @submit.prevent="login">
                      <v-text-field
                        label="Email"
                        v-model="email"
                        :rules="emailRules"
                        prepend-inner-icon="mdi-email"
                        class="mt-8"
                        variant="solo-filled"
                      ></v-text-field>
                      <v-text-field
                        label="Password"
                        v-model="password"
                        :rules="passwordRules"
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        class="mt-2 custom-text-field"
                        variant="solo-filled"
                      ></v-text-field>
                      <v-btn class="login-btn mt-5" @click="login" block>로그인</v-btn>
                      <div class="ma-3" style="color: red">
                        {{ loginError }}
                      </div>
                    </v-form>
                    <v-row class="mt-3">
                      <v-col class="text-left">
                        <span @click="goToRegister" style="cursor: pointer;" class="text-span">회원가입</span>
                      </v-col>
                      <v-col class="text-right">
                        <span style="cursor: pointer;" @click="findPassword" class="text-span">비밀번호 재설정</span>
                      </v-col>
                    </v-row>
                    <div class="divider my-4"></div>
                    <h5 class="text-center grey--text mt-4 mb-3">Or continue with</h5>
                    <v-btn class="social-btn google-btn" block href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:9090/oauth2/redirect" id="social">
                      <v-col class="text-left">
                        <v-icon left class="social-icon">mdi-google</v-icon> 
                      </v-col>
                      <v-col class="ml-10" id="btn-text">
                        <span>구글 계정으로 로그인</span>
                      </v-col>
                    </v-btn>
                    <v-btn class="social-btn kakao-btn mt-2" block href="http://localhost:8080/oauth2/authorize/kakao?redirect_uri=http://localhost:9090/oauth2/redirect" id="social">
                      <v-col>
                        <svg class="social-icon" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)" stroke="#ffffff">
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="35.839999999999996"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path fill="#000000" d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.291 405.175C340.122 422.241 299.525 430.775 255.5 430.775C241.607 430.775 227.262 429.781 212.467 427.795C148.233 472.402 114.042 494.977 109.892 495.518C107.907 496.241 106.012 496.15 104.208 495.248C103.486 494.706 102.945 493.983 102.584 493.08C102.223 492.177 102.043 491.365 102.043 490.642V489.559C103.126 482.515 111.335 453.169 126.672 401.518C91.8486 384.181 64.1974 361.2 43.7185 332.575C23.2395 303.951 13 272.843 13 239.252C13 204.577 23.8259 172.566 45.4777 143.22C67.1295 113.873 96.5849 90.666 133.844 73.5996C171.103 56.5332 211.655 48 255.5 48Z"></path>
                          </g>
                        </svg>
                      </v-col>
                      <v-col class="ml-10" id="btn-text">
                        카카오 계정으로 로그인
                      </v-col>
                    </v-btn>
                    <v-btn class="social-btn naver-btn mt-2" block href="http://localhost:8080/oauth2/authorize/naver?redirect_uri=http://localhost:9090/oauth2/redirect" id="social">
                      <v-col>
                        <svg class="social-icon" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path fill="#ffffff" d="M9 32V480H181.366V255.862L331.358 480H504V32H331.358V255.862L181.366 32H9Z"></path>
                          </g>
                        </svg>
                      </v-col>
                      <v-col class="ml-10" id="btn-text">
                        네이버 계정으로 로그인
                      </v-col>
                    </v-btn>
                  </v-col>
                </v-col>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import router from '@/router';
import store from '@/store';
import { login, checkIsVerified } from '../../auth.js';

export default {
  created() {
    store.commit('clearToken');
  },
  data: () => ({
    valid: false,
    emailRules: [v => /.+@.+/.test(v) || '이메일이 올바르지않습니다'],
    passwordRules: [v => v.length >= 6 || '길이가 너무 짧습니다'],
    email: '',
    password: '',
    loginError: ''
  }),
  methods: {
    async login() {
      if (this.valid) {
        const res = await login(this.email, this.password)
        if (res) {
          const isVerified = await checkIsVerified(this.email);
          if (isVerified) {
            store.commit('setVerifiedStatus', true);
            router.push("/")
          }
          else {
            router.push({ name: 'otp', params: { usage: 'login' } });
          }
        } else {
          this.loginError = '로그인에 실패했습니다. 다시 시도해주세요.';
        }
      }
    },
    goToRegister() {
      router.push('/register');
    },
    findPassword() {
      router.push('/find/password');
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  background-color: rgb(77, 129, 241);
  min-height: 100vh;
}

.container {
  margin: auto;
}

.rounded-lg {
  border-radius: 20px !important;
  padding: 20px;
}

.login-btn {
  background: rgb(77, 129, 241);
  color: rgb(255, 255, 255);
}

.text-span {
  color: rgb(101, 100, 100);
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 0;
  border-radius: 15px;
  font-weight: bold;
}

.social-btn .social-icon {
  margin-right: 8px;
  margin-left: 16px;
  width: 20px; 
  height: 18px;
}

.google-btn {
  background-color: rgb(227, 11, 11);
  color: white;
}

.kakao-btn {
  background-color: rgb(252, 252, 83);
  color: black;
}

.naver-btn {
  background-color: rgba(29, 197, 29, 0.931);
  color: white;
}

@media (max-width: 1280px) {
  #social #btn-text {
    display: none;
  }

  .google-btn {
    justify-content: center;
  }

  .kakao-btn {
    justify-content: center;
  }

  .naver-btn {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  #social #btn-text {
    display: flex;
  }

  .google-btn {
    justify-content: start;
  }

  .kakao-btn {
    justify-content: start;
  }

  .naver-btn {
    justify-content: start;
  }
}
</style>
