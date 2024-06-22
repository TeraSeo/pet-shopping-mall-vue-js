<template>
  <v-col>
    <h2>상품 관리</h2>
    <v-app class="main mt-3">
        <v-card>
        <v-toolbar flat>
          <v-btn color="primary" dark class="mb-2" @click="openNewProductDialog">
            상품 추가
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
        <v-col>
            show products
        </v-col>
      </v-card>

      <!-- New Product Dialog -->
      <v-dialog v-model="createProductDataDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">상품 추가</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="createProductData.valid" lazy-validation>
              <v-text-field
                label="상품 이름"
                v-model="createProductData.name"
                :rules="createProductData.nameRules"
                prepend-icon="mdi-card-text-outline"
                type="text"
                class="mt-2 custom-text-field"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-text-field
                label="상품 설명"
                v-model="createProductData.summary"
                :rules="createProductData.summaryRules"
                prepend-icon="mdi-text"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-text-field
                label="상품 수량"
                v-model="createProductData.quantity"
                :rules="createProductData.quantityRules"
                prepend-icon="mdi-cube-outline"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-text-field
                label="상품 가격(￦)"
                v-model="createProductData.price"
                :rules="createProductData.priceRules"
                prepend-icon="mdi-cash-multiple"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-text-field
                label="배송 비용(￦)"
                v-model="createProductData.deliveryFee"
                :rules="createProductData.deliveryFeeRules"
                prepend-icon="mdi-truck-delivery"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-select
                label="상품 카테고리"
                :items="categories.map(cat => cat.name)"
                v-model="createProductData.category"
                :rules="createProductData.categoryRules"
                prepend-icon="mdi-chevron-down-circle"
                variant="solo"
                @update:modelValue="updateSubCategories"
              ></v-select>
              <v-select
                label="상세 카테고리"
                :items="createProductData.subcategories"
                v-model="createProductData.subCategory"
                :rules="createProductData.categoryRules"
                prepend-icon="mdi-chevron-down-circle"
                variant="solo"
              ></v-select>
              <v-file-input
                    label="사진"
                    prepend-icon="mdi-camera"
                    accept="image/png, image/jpeg, image/bmp"
                    variant="filled"
                    v-model="createProductData.image"
                    :rules="createProductData.imageRules"
                ></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeNewProductDialog">취소</v-btn>
            <v-btn color="blue darken-1" text @click="saveProduct">저장</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </v-col>
</template>

<script>
import { addProduct } from '@/service/products';
export default {
    created() {

    },
    data() {
        return {
            products: [],
            createProductData: {
                valid: false,
                name: '',
                summary: '',
                category: '',
                subCategory: '',
                subcategories: [],
                image: '',
                quantity: 0,
                price: 0,
                deliveryFee: 0,
                nameRules: [v => v.length >= 1 || '이름을 입력해주세요'],
                summaryRules: [v => v.length >= 1 || '설명을 입력해주세요'],
                categoryRules: [v => v && v.length > 0 || '카테고리를 선택해주세요'],  // Updated rule
                quantityRules: [v => v > 0 || '수량을 입력해주세요'],
                priceRules: [v => v > 0 || '상품 가격을 입력해주세요'],
                deliveryFeeRules: [v => v >= 0 || '배송 비용을 입력해주세요'],
                imageRules: [v => v && v.length > 0 && v[0].size < 2000000 || '이미지를 선택해주세요, 이미지 최대 용량은 2 MB 입니다']
            },
            categories: [
                {
                    name: '간식',
                    subcategories: [
                        { title: '비스켓/스낵', icon: 'mdi-cookie', link: 'https://example.com/snack/biscuits-snacks' },
                        { title: '수제간식', icon: 'mdi-chef-hat', link: 'https://example.com/snack/homemade-snacks' },
                        { title: '캔/파우치', icon: 'mdi-can-food', link: 'https://example.com/snack/canned-foods' },
                        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: 'https://example.com/snack/etc' },
                    ]
                },
                {
                    name: '사료',
                    subcategories: [
                        { title: '건식사료', icon: 'mdi-cereal', link: 'https://example.com/food/dry-food' },
                        { title: '습식사료', icon: 'mdi-food-steak', link: 'https://example.com/food/wet-food' },
                        { title: '우유/분유', icon: 'mdi-bottle-soda', link: 'https://example.com/food/milk' },
                        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: 'https://example.com/food/etc' },
                    ]
                },
                {
                    name: '미용용품',
                    subcategories: [
                        { title: '드라이기', icon: 'mdi-hair-dryer', link: 'https://example.com/grooming/dryers' },
                        { title: '발톱관리용품', icon: 'mdi-paw-off', link: 'https://example.com/grooming/nail-care' },
                        { title: '샤워기/타월', icon: 'mdi-shower-head', link: 'https://example.com/grooming/shower-tools' },
                        { title: '샴푸/린스', icon: 'mdi-shampoo', link: 'https://example.com/grooming/shampoos' },
                        { title: '이발기/가위', icon: 'mdi-scissors-cutting', link: 'https://example.com/grooming/clippers-scissors' },
                        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: 'https://example.com/grooming/etc' },
                    ]
                },
                {
                    name: '패션용품',
                    subcategories: [
                        { title: '레인코트', icon: 'mdi-umbrella', link: 'https://example.com/fashion/raincoats' },
                        { title: '신발/양말', icon: 'mdi-shoe-formal', link: 'https://example.com/fashion/shoes-socks' },
                        { title: '외투', icon: 'mdi-coat-rack', link: 'https://example.com/fashion/coats' },
                        { title: '원피스/올인원', icon: 'mdi-tshirt-crew-outline', link: 'https://example.com/fashion/dresses' },
                        { title: '코스튬', icon: 'mdi-theater', link: 'https://example.com/fashion/costumes' },
                        { title: '셔츠/상의', icon: 'mdi-tshirt-crew', link: 'https://example.com/fashion/shirts' },
                        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: 'https://example.com/fashion/etc' },
                    ]
                }
            ],

            createProductDataDialog: false,
        }
    },
    methods: {
        openNewProductDialog() {
            this.createProductDataDialog = true;
        },
        closeNewProductDialog() {
            this.createProductDataDialog = false;
        },
        updateSubCategories() {
            const category = this.categories.find(cat => cat.name === this.createProductData.category);
            if (category) {
                this.createProductData.subcategories = category.subcategories;
                this.createProductData.subCategory = '';
            } else {
                this.createProductData.subcategories = [];
            }
        },

        async saveProduct() {
            if (this.createProductData.valid) {
                addProduct(this.createProductData.name, this.createProductData.summary, this.createProductData.quantity, this.createProductData.price ,this.createProductData.category, this.createProductData.subCategory, this.createProductData.image, this.createProductData.deliveryFee)
            }
        },

        async fetchProducts() {
            this.products = 1;
        }
    }
}
</script>

<style>

</style>