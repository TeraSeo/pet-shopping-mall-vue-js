<template>
  <v-col>
    <h2>Manage Users</h2>
    <v-app class="main mt-3">
      <v-card>
        <v-toolbar flat>
          <v-btn color="primary" dark class="mb-2">
            New Role
          </v-btn>
          <v-spacer></v-spacer>
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
    </v-app>
  </v-col>
</template>

<script>
import { getUsers } from '@/service/user.js';

export default {
  created() {
    this.fetchUsers();
  },
  data() {
    return {
      // users: [
      //   { checked: false, name: 'Jeremy Lad', isVerified: false, role: 'TOP manager' },
      //   { checked: false, name: 'Patricia Clare', isVerified: false, role: 'TOP manager' },
      //   { checked: false, name: 'Brandon Walsh', isVerified: false, role: 'Admin' },
      //   { checked: false, name: 'Mark Marquez', isVerified: false, role: 'Admin' },
      //   { checked: false, name: 'Linda Pins', isVerified: false, role: 'Support' },
      //   { checked: false, name: 'Marcelo Lopez', isVerified: false, role: 'Admin' },
      //   { checked: false, name: 'Maya Lawson', isVerified: false, role: 'Support' },
      //   { checked: false, name: 'Kevin Dawk', isVerified: false, role: 'TOP manager' },
      //   { checked: false, name: 'Larry Gartner', isVerified: false, role: 'Manager' },
      // ],
      users: [],
      editedItem: {
        name: '',
        isVerified: '',
        role: ''
      },
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
    }
  }
};
</script>

<style scoped>
.main {
  margin: 0;
}
</style>
