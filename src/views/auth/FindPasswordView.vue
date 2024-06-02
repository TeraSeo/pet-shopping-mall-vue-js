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
                      <h2>비밀번호 찾기</h2>
                    </v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                        label="Email"
                        v-model="email"
                        :rules="emailRules"
                        prepend-inner-icon="mdi-email"
                        variant="solo-filled"
                        required
                      ></v-text-field>
                      <v-btn class="login-btn" block @click="checkForm">찾기</v-btn>
                    </v-form>
                    <v-row class="mt-3">
                        <v-col class="text-left">
                          <span @click="goToLogin" style="cursor: pointer;" class="text-span">로그인페이지로 이동</span>
                        </v-col>
                    </v-row>
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
import { checkEmailExistence } from '../../auth.js';

export default {
  data: () => ({
    valid: false,
    emailRules: [v => /.+@.+/.test(v) || '이메일이 올바르지않습니다'],
    email: '',
  }),
  created() {
    store.commit('clearToken');
  },

  methods: {
    checkForm() {
      if (this.valid) {
        checkEmailExistence(this.email)
      }
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
