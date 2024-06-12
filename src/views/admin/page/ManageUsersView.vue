<template>
  <v-col>
    <h2>Manage Users</h2>
    <v-app class="main mt-3">
      <v-card>
        <v-toolbar flat>
          <v-btn color="primary" dark class="mb-2" @click="openNewRoleDialog">
            New User
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="reloadPage">
            <v-icon>mdi-reload</v-icon>
          </v-btn>
          <v-btn icon :disabled="!isSingleChecked">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon :disabled="!isAnyChecked">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-toolbar>
        <v-data-table
          :items="users"
          class="elevation-1"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>
                <v-checkbox v-model="item.checked" hide-details></v-checkbox>
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.role }}</td>
              <td>{{ item.isVerified }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
      
      <!-- New Role Dialog -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">New Role</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="createUser.valid" lazy-validation>
              <v-text-field
                label="Username"
                v-model="createUser.username"
                :rules="createUser.usernameRules"
                prepend-inner-icon="mdi-account"
                type="text"
                class="mt-2 custom-text-field"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model="createUser.email"
                :rules="createUser.emailRules"
                prepend-inner-icon="mdi-email"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="createUser.password"
                :rules="createUser.passwordRules"
                prepend-inner-icon="mdi-lock"
                type="password"
                class="mt-2 custom-text-field"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-select
                label="Role"
                :items="['USER', 'SELLER', 'STAFF', 'ADMIN']"
                v-model="createUser.role"
                variant="solo"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="saveRole">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
        {{ snackbar.message }}
        <v-btn color="white" text @click="snackbar.show = false">Close</v-btn>
      </v-snackbar>
    </v-app>
  </v-col>
</template>

<script>
import { getUsers, createUser } from '@/service/admin.js';

export default {
  created() {
    this.fetchUsers();
  },
  data() {
    return {
      users: [],
      createUser: {
        valid: false,
        username: '',
        email: '',
        password: '',
        role: '',
        usernameRules: [v => v.length >= 2 || '길이가 너무 짧습니다'],
        emailRules: [v => /.+@.+/.test(v) || '이메일이 올바르지않습니다'],
        passwordRules: [v => v.length >= 6 || '길이가 너무 짧습니다'],
      },
      dialog: false,
      snackbar: {
        show: false,
        message: '',
        color: ''
      }
    };
  },
  computed: {
    isAnyChecked() {
      return this.users.some(user => user.checked);
    },
    isSingleChecked() {
      return this.users.filter(user => user.checked).length === 1;
    }
  },
  methods: {
    async fetchUsers() {
      this.users = await getUsers();
    },
    openNewRoleDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    saveRole() {
      if (this.createUser.valid) {
        const isCreated = createUser(this.createUser.username, this.createUser.email, this.createUser.password, this.createUser.role);
        if (isCreated) {
          this.snackbar.message = 'User created successfully';
          this.snackbar.color = 'success';
          this.closeDialog();
        }
        else {
          this.snackbar.message = '유저 생성에 실패했습니다';
          this.snackbar.color = 'error';
        }

      }
    },
    reloadPage() {
      this.fetchUsers();
    }
  }
};
</script>

<style scoped>
.main {
  margin: 0;
}
</style>
