<template>
  <v-card class="product-card" elevation="2">
    <v-img :src="'https://pet-shopping-mall-bucket.s3.ap-northeast-2.amazonaws.com/'+product.imagePath" height="200px" cover>
    </v-img>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-text>
      <div>{{ product.summary }}</div>
      <v-chip class="ma-1" color="blue lighten-4">{{ product.category }}</v-chip>
      <v-chip class="ma-1" color="green lighten-4">{{ product.subCategory }}</v-chip>
      <div class="mt-2"><strong>가격:</strong> ￦{{ product.price }}</div>
      <div><strong>남은 수량:</strong> {{ product.quantity }}개</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
}
</script>

<style>
.product-card {
  max-width: 300px;
  margin: 10px;
}
</style>
