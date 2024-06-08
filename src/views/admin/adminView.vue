<template>
  <v-app class="main">
    <v-row class="upper">
      <div class="admin-label ml-3">
        Admin
      </div>
      <v-spacer></v-spacer>
      <div>Theo Rodriguez</div>
      <v-avatar class="ml-3 mr-9">
        <v-img
          alt="Theo"
          src="https://cdn.vuetifyjs.com/images/john.jpg"
        ></v-img>
      </v-avatar>
    </v-row>
    <v-row>
      <v-col id="sidebar" sm=2>
        <v-list>
          <v-list-item v-for="item in menuItems" :key="item.title" @click="selectMenuItem(item)" :style="{ background: selectedMenuItem === item ? '#5E49C3' : '' }">
            <v-col>
              <v-row :style="{ color: selectedMenuItem === item ? 'white' : '' }">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="ml-2">{{ item.title }}</v-list-item-title>
              </v-row>
            </v-col>
          </v-list-item>
          <v-list-item class="mt-10">
            <v-col>
              <v-row>
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="ml-2">Log Out</v-list-item-title>
              </v-row>
            </v-col>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col id="main-content" sm="10">
        <keep-alive>
          <component :is="currentComponent"></component>
        </keep-alive>
      </v-col>
    </v-row>
    <AppFooter />
  </v-app>
</template>

<script>
import AppFooter from '@/views/bar/AppFooter.vue';
import Dashboard from '@/views/admin/page/DashboardView.vue';
import Orders from '@/views/admin/page/OrdersView.vue';
import ManageUsers from '@/views/admin/page/ManageUsersView.vue';
import Statistics from '@/views/admin/page/StatisticsView.vue';
import Finance from '@/views/admin/page/FinanceView.vue';
import Support from '@/views/admin/page/SupportView.vue';
import FAQ from '@/views/admin/page/FAQView.vue';
// import Logout from '@/views/Logout.vue';
export default {
  components: {
    AppFooter,
    Dashboard,
    Orders,
    ManageUsers,
    Statistics,
    Finance,
    Support,
    FAQ
  },
  data() {
    return {
      currentComponent: 'Dashboard',
      selectedMenuItem: null,
      menuItems: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', component: Dashboard },
        { title: 'Orders', icon: 'mdi-cart-outline', component: Orders },
        { title: 'Manage Users', icon: 'mdi-account-multiple', component: ManageUsers },
        { title: 'Statistics', icon: 'mdi-chart-line', component: Statistics },
        { title: 'Finance', icon: 'mdi-currency-usd', component: Finance },
        { title: 'Support', icon: 'mdi-lifebuoy', component: Support },
        { title: 'FAQ', icon: 'mdi-help-circle-outline', component: FAQ },
      ],
    }
  },
  methods: {
    selectMenuItem(item) {
      this.selectedMenuItem = item;
      this.currentComponent = item.component
    },
  },
  mounted() {
    this.selectedMenuItem = this.menuItems[0];
  }
};
</script>

<style scoped>
.main {
  min-height: 100vh;
}

.upper {
  align-items: center;
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.admin-label {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: 500;
}

#main-content {
  background: #ECF0F2;
  min-height: 100vh;
}

</style>