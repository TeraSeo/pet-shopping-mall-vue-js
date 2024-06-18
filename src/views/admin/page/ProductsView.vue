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
                label="이름"
                v-model="createProductData.name"
                :rules="createProductData.nameRules"
                prepend-inner-icon="mdi-name"
                type="text"
                class="mt-2 custom-text-field"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-text-field
                label="설명"
                v-model="createProductData.summary"
                :rules="createProductData.summaryRules"
                prepend-inner-icon="mdi-summary"
                variant="solo-filled"
                required
              ></v-text-field>
              <v-select
                label="카테고리"
                :items="['고양이', '강아지', '산책용품', '사료/간식/케어']"
                v-model="createProductData.category"
                :rules="createProductData.categoryRules"
                variant="solo"
              ></v-select>
              <v-select
                label="세부 카테고리"
                :items="['고양이', '강아지', '산책용품', '사료/간식/케어']"
                v-model="createProductData.category"
                :rules="createProductData.categoryRules"
                variant="solo"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeNewUserDialog">취소</v-btn>
            <v-btn color="blue darken-1" text @click="saveUser">저장</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </v-col>
</template>

<script>
export default {
    data() {
        return {
            createProductData: {
                valid: false,
                name: '',
                summary: '',
                category: '',
                nameRules: [v => v.length >= 1 || '이름을 입력해주세요'],
                summaryRules: [v => v.length >= 1 || '설명을 입력해주세요'],
                categoryRules: [v => v.length > 0 || '역할을 선택해주세요'],
            },
            createProductDataDialog: false,
        }
    },
    methods: {
        openNewProductDialog() {
            this.createProductDataDialog = true;
        },
    }
}
</script>

<style>

</style>