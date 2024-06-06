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
                      <h2>Otp Verification</h2>
                    </v-card-text>
                    <v-sheet
                        class="py-8 px-6 mx-auto ma-4 text-center"
                        elevation="4"
                        max-width="500"
                        rounded="lg"
                        width="100%"
                    >
                        <h3 class="text-h5">인증 코드</h3>

                        <div class="text-subtitle-2 font-weight-light mb-3">인증 코드를 입력해주세요</div>

                        <v-otp-input
                        v-model="otp"
                        class="mb-8"
                        divider="•"
                        length="4"
                        variant="outlined"
                        ></v-otp-input>

                        <div class="text-caption">
                        <v-btn
                            color="primary"
                            size="x-small"
                            text="코드 다시 보내기"
                            variant="text"
                            @click="resendOtp"
                        ></v-btn>
                        </div>
                        <v-btn
                            color="black"
                            size="x-small"
                            text="로그인 페이지로 돌아가기"
                            variant="text"
                            @click="goToLogin"
                        ></v-btn>
                    </v-sheet>
                    <v-btn class="login-btn mt-5" @click="verify" block>인증</v-btn>
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
import { sendOtp, checkOtp } from '../../auth.js';

export default {
  created() {
    this.usage = this.$route.params.usage || null;
    if (this.usage != null) {
      this.email = store.state.email;
      if (this.email == null) {
          router.push('/login')
      }
      else {
          sendOtp(this.email);
      }
    }
  },
  data: () => ({
    email: '',
    usage: '',
    otp: ''
  }),
  methods: {
    async verify() {
        console.log(this.otp)
        checkOtp(this.email, this.otp, this.usage)
    },
    async resendOtp() {
        sendOtp(this.email)
    },
    goToLogin() {
      router.push('/login');
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

</style>
