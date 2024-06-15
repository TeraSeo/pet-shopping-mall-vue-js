<template>
  <v-col>
    <h2>Manage Users</h2>
    <v-app class="main mt-3">
      <v-card>
        <v-toolbar flat>
          <v-btn color="primary" dark class="mb-2" @click="openNewUserDialog">
            New User
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="reloadPage">
            <v-icon>mdi-reload</v-icon>
          </v-btn>
          <v-btn icon :disabled="!isSingleChecked" @click="openEditPage">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon :disabled="!isAnyChecked" @click="deleteUser">
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
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.role }}</td>
              <td>{{ item.isVerified }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
      
      <!-- New Role Dialog -->
      <v-dialog v-model="createUserDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">New Role</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="createUserData.valid" lazy-validation>
              <v-text-field
                label="Username"
                v-model="createUserData.username"
                :rules="createUserData.usernameRules"
                prepend-inner-icon="mdi-account"
                type="text"
                class="mt-2 custom-text-field"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model="createUserData.email"
                :rules="createUserData.emailRules"
                prepend-inner-icon="mdi-email"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="createUserData.password"
                :rules="createUserData.passwordRules"
                prepend-inner-icon="mdi-lock"
                type="password"
                class="mt-2 custom-text-field"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-select
                label="Role"
                :items="['USER', 'SELLER', 'STAFF', 'ADMIN']"
                v-model="createUserData.role"
                :rules="createUserData.roleRules"
                variant="solo"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeNewUserDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="saveUser">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Edit User Dialog -->
      <v-dialog v-model="editUserDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit User</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="editUserData.valid" lazy-validation>
              <v-text-field
                label="Username"
                v-model="editUserData.username"
                :rules="editUserData.usernameRules"
                prepend-inner-icon="mdi-account"
                type="text"
                class="mt-2 custom-text-field"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model="editUserData.email"
                :rules="editUserData.emailRules"
                prepend-inner-icon="mdi-email"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-select
                label="Role"
                :items="['USER', 'SELLER', 'STAFF', 'ADMIN']"
                v-model="editUserData.role"
                variant="solo"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeEditUserDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="editUser">Edit</v-btn>
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
import { getUsers, createUser, editUser, delUsers } from '@/service/admin.js';

export default {
  created() {
    this.fetchUsers();
  },
  data() {
    return {
      users: [],

      createUserData: {
        valid: false,
        username: '',
        email: '',
        password: '',
        role: '',
        usernameRules: [v => v.length >= 2 || '길이가 너무 짧습니다'],
        emailRules: [v => /.+@.+/.test(v) || '이메일이 올바르지않습니다'],
        passwordRules: [v => v.length >= 6 || '길이가 너무 짧습니다'],
        roleRules: [v => v.length > 0 || '역할을 선택해주세요'],
      },

      editUserData: {
        valid: false,
        username: '',
        email: '',
        role: '',
        usernameRules: [v => v.length >= 2 || '길이가 너무 짧습니다'],
        emailRules: [v => /.+@.+/.test(v) || '이메일이 올바르지않습니다'],
        roleRules: [v => v.length > 0 || '역할을 선택해주세요'],
      },

      createUserDialog: false,
      editUserDialog: false,
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
    openNewUserDialog() {
      this.createUserDialog = true;
    },
    closeNewUserDialog() {
      this.createUserDialog = false;
    },

    openEditUserDialog() {
      this.editUserDialog = true;
    },
    closeEditUserDialog() {
      this.editUserDialog = false;
    },

    async fetchUsers() {
      this.users = await getUsers();
    },

    async saveUser() {
      if (this.createUserData.valid) {
        const isCreated = await createUser(this.createUserData.username, this.createUserData.email, this.createUserData.password, this.createUserData.role);
        if (isCreated) {
          this.createSnackbar('유저 생성에 성공했습니다', true)
          this.closeNewUserDialog();
        }
        else {
          this.createSnackbar('유저 생성에 실패했습니다', false)
        }
      }
    },

    async openEditPage() {
      this.editUserData.username = this.users.filter(user => user.checked)[0]['name'];
      this.editUserData.email = this.users.filter(user => user.checked)[0]['email'];
      this.editUserData.role = this.users.filter(user => user.checked)[0]['role'];
      this.openEditUserDialog();
    },
    async editUser() {
      const isEdited = await editUser(this.users.filter(user => user.checked)[0]['id'], this.editUserData.username, this.editUserData.email, this.editUserData.role);
      if (isEdited) {
        this.createSnackbar('유저 수정에 성공했습니다', true)
        this.closeEditUserDialog();
      }
      else {
        this.createSnackbar('유저 수정에 실패했습니다', false)
      }
    },

    deleteUser() {
      delUsers(this.users.filter(user => user.checked))
    },

    createSnackbar(msg, isSucceeded) {
      this.snackbar.message = msg;
      if (isSucceeded) {
        this.snackbar.color = 'success';
      }
      else {
        this.snackbar.color = 'error';
      }
      this.snackbar.show = true;
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
