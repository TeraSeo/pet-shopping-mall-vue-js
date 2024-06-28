<template>
  <v-container>
    <v-row>
      <v-col cols="4" v-for="product in products" :key="product.id">
        <v-checkbox v-model="product.checked" hide-details></v-checkbox>
        <ProductViewVue :product="product"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getAllProducts } from '@/service/products';
import ProductViewVue from '../admin/page/product/ProductView.vue';
export default {
  components: {
    ProductViewVue
  },
  created() {
    this.fetchProducts()
  },
  data() {
    return {
      products: []
    }
  },
  methods: {
    async fetchProducts() {
      this.products = await getAllProducts();
    },
  }
}
</script>

<style>
</style>