<template>
  <v-app>
    <AppHeader />
    <v-main class="home-container">
      <v-container>
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from '@/views/bar/AppHeader.vue';
import AppFooter from '@/views/bar/AppFooter.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
}

</style>
