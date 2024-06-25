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
          <v-btn icon :disabled="!isSingleChecked" @click="openEditDialog">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon :disabled="!isAnyChecked" @click="deleteProducts">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="4" v-for="product in products" :key="product.id">
              <v-checkbox v-model="product.checked" hide-details></v-checkbox>
              <ProductViewVue :product="product"/>
            </v-col>
          </v-row>
        </v-container>
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

      <ConfirmationDialogVue v-model="confirmDialog" 
                    title="상품 삭제" 
                    message="상품을 삭제하시겠습니까?"
                    :onCancel="cancelDelete"
                    :onConfirm="confirmDelete" />

      <SnackBarVue v-model="snackbar.show" :message="snackbar.message" :color="snackbar.color" :onClose="removeSnackbar" />
    </v-app>
  </v-col>
</template>

<script>
import { addProduct, delProducts, getAllProducts } from '@/service/products';
import ProductViewVue from './product/ProductView.vue';
import SnackBarVue from '@/views/common/SnackBar.vue';
import ConfirmationDialogVue from '@/views/common/ConfirmationDialog.vue';

export default {
    created() {
      this.fetchProducts()
    },
    components: {
      ProductViewVue,
      SnackBarVue,
      ConfirmationDialogVue
    },
    data() {
        return {
            snackbar: {
              show: false,
              message: '',
              color: ''
            },
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
                imageRules: [v => v && v.length > 0 && v[0].size < 1000000 || '이미지를 선택해주세요, 이미지 최대 용량은 1 MB 입니다']
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
            confirmDialog: false,
        }
    },
    methods: {
        async saveProduct() {
            if (this.createProductData.valid) {
               const isAdded = await addProduct(this.createProductData.name, this.createProductData.summary, this.createProductData.quantity, this.createProductData.price ,this.createProductData.category, this.createProductData.subCategory, this.createProductData.image, this.createProductData.deliveryFee)
               if (isAdded) {
                this.createSnackbar('상품 추가에 성공했습니다', true)
               }
               else {
                this.createSnackbar('상품 추가에 실패했습니다', false)
               }
            }
        },

        async fetchProducts() {
          this.products = await getAllProducts();
        },

        deleteProducts() {
          this.confirmDialog = true; // Open the confirmation dialog
        },
        
        async confirmDelete() {
          const isDeleted = await delProducts(this.products.filter(product => product.checked));
          this.confirmDialog = false;
          if (isDeleted) {
            await this.fetchProducts();
            this.createSnackbar('상품 삭제에 성공했습니다', true);
          } else {
            console.log("p")
            this.createSnackbar('상품 삭제에 실패했습니다', false);
          }
        },

        cancelDelete() {
          this.confirmDialog = false;
        },

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

        removeSnackbar() {
          this.snackbar.show = false;
        },

        reloadPage() {
          this.fetchProducts();
        }
    },
    computed: {
      isAnyChecked() {
        return this.products.some(product => product.checked);
      },
      isSingleChecked() {
        return this.products.filter(product => product.checked).length === 1;
      }
    }
}
</script>

<style>

</style>