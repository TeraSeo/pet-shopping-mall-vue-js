<template>
  <v-container>
    <v-row>
      <v-col cols="3" v-for="product in products" :key="product.id">
        <ProductViewVue :product="product"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getProductsBySubCategory } from '@/service/products';
import ProductViewVue from '@/views/admin/page/product/ProductView.vue';

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
      this.products = await getProductsBySubCategory('미용용품', '발톱관리용품');
    },
  }
}
</script>

<style>

</style>