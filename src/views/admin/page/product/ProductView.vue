<template>
    <v-col>
      <v-img :src="'https://pet-shopping-mall-bucket.s3.ap-northeast-2.amazonaws.com/'+product.imagePath" height="300px">
      </v-img>
      <v-card-title class="name">{{ product.name }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-chip class="ma-1" color="blue lighten-4">{{ product.category }}</v-chip>
        <v-chip class="ma-1" color="green lighten-4">{{ product.subCategory }}</v-chip>
        <div class="mt-2"><strong>가격:</strong> ￦{{ product.price }}</div>
        <div v-if='product.quantity < 5'><strong>남은 수량:</strong> {{ product.quantity }}개</div>
      </v-card-text>
    </v-col>
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

<style scoped>
.name {
  font-size: 12px;
  font-weight: bold;
}
</style>
