<template>
  <v-app class="main">
    <v-row>
      <v-col id="sidebar" sm=2>
        <div class="admin-label ml-10 mt-7 mb-7">
          <h3 @click="redirectToHome">Zero Cat</h3>
        </div>
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
        <v-row class="upper py-2 pr-8">
          <v-col sm="5" class="search-box">
            <v-text-field
              class="search"
              prepend-inner-icon="mdi-magnify"
              variant="solo"
              hide-details
              flat
              single-line
              bg-color="grey-lighten-3"
              rounded="xl"
              density="compact"
              :loading="loading"
              @click:append-inner="onClick"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-icon class="mr-3">mdi-bell-outline</v-icon>
          <v-avatar class="ml-3 mr-3">
            <v-img
              alt="Theo"
              src="https://cdn.vuetifyjs.com/images/john.jpg"
            ></v-img>
          </v-avatar>
          <div class="user-info">
            <div class="mr-3">Teajun Seo</div>
            <div class="user-role">admin</div>
          </div>
        </v-row>
        <v-row>
          <v-col>
            <keep-alive>
              <component :is="currentComponent"></component>
            </keep-alive>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import AppFooter from '@/views/bar/AppFooter.vue';
import Dashboard from '@/views/admin/page/DashboardView.vue';
import Orders from '@/views/admin/page/OrdersView.vue';
import ManageUsers from '@/views/admin/page/ManageUsersView.vue';
import Statistics from '@/views/admin/page/StatisticsView.vue';
import Finance from '@/views/admin/page/FinanceView.vue';
import FAQ from '@/views/admin/page/FAQView.vue';
import ProductsViewVue from './page/ProductsView.vue';
import router from '@/router';

export default {
  components: {
    AppFooter,
    Dashboard,
    Orders,
    ManageUsers,
    ProductsViewVue,
    Statistics,
    Finance,
    FAQ
  },
  data() {
    return {
      currentComponent: 'Dashboard',
      selectedMenuItem: null,
      menuItems: [
        { title: '대쉬보드', icon: 'mdi-view-dashboard', component: Dashboard },
        { title: '주문', icon: 'mdi-cart-outline', component: Orders },
        { title: '사용자 관리', icon: 'mdi-account-multiple', component: ManageUsers },
        { title: '상품', icon: 'mdi-package-variant-closed', component: ProductsViewVue },
        { title: '통계', icon: 'mdi-chart-line', component: Statistics },
        { title: '매출', icon: 'mdi-currency-usd', component: Finance },
        { title: '문의', icon: 'mdi-help-circle-outline', component: FAQ },
      ],
    }
  },
  methods: {
    selectMenuItem(item) {
      this.selectedMenuItem = item;
      this.currentComponent = item.component;
    },
    redirectToHome() {
      router.push({ path: "/" })
    }
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

.container {
  margin: 0;
}

.upper {
  align-items: center;
  background-color: #fff;
}

.admin-label {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: 500;
}

#main-content {
  background: #ECF0F2;
  min-height: 100vh;
}

.search {
  margin-top: 7px;
  margin-left: 20px;
}

#sidebar {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-role {
  font-size: 12px;
  color: grey;
}

</style>