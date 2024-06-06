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
                      <h2>비밀번호 재설정</h2>
                    </v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="resetPassword">
                      <v-text-field
                            label="비밀번호"
                            v-model="newPassword"
                            :rules="passwordRules"
                            prepend-inner-icon="mdi-lock"
                            type="password"
                            class="mt-2"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="비밀번호 확인"
                            v-model="checkPassword"
                            :rules="checkPasswordRules"
                            prepend-inner-icon="mdi-lock"
                            type="password"
                            class="mt-2"
                            required
                        ></v-text-field>
                        <v-btn class="reset-btn" block @click="resetPassword"><div>비밀번호 재설정</div></v-btn>
                    </v-form>
                    <div class="ma-3" style="color: red">
                      {{ resetError }}
                    </div>
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
import { resetPassword } from '../../auth.js';
export default {
    created() {
        this.isVerified = store.state.isVerified;
        if (!this.isVerified) {
            router.push('/login')
        }
    },
    data() {
        return {
            valid: false,
            newPassword: '',
            checkPassword: '',
            passwordRules: [v => v.length >= 6 || '비밀번호 길이가 너무 짧습니다.'],
            checkPasswordRules: [v => v === this.newPassword || '비밀번호가 일치하지 않습니다.'],
            resetError: '',
            isVerified: false
        };
    },
    methods: {
        async resetPassword() {
            if (this.valid) {
                const email = store.state.email;
                const isChanged = await resetPassword(email, this.newPassword)
                if (isChanged) {
                    router.push('/login')
                }
                else {
                    this.resetError = '비밀번호 재설정에 실패했습니다'
                }
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

.reset-btn {
  background: rgb(77, 129, 241);
}

.reset-btn div {
  color: rgb(255, 255, 255);
}

.reset-btn:hover, .reset-btn:focus {
  background: rgb(77, 129, 241);
  color: white; 
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