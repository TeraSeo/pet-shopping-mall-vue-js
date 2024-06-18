<template>
  <v-app class="main">
    <v-col>
      <v-row align="center" class="upper" @mouseover="debouncedHideMenu">
        <v-icon class="search-icon">mdi-magnify</v-icon>
        <v-card-text class="search">
          <v-text-field
            :loading="loading"
            append-inner-icon="mdi-magnify"
            density="compact"
            label="검색"
            variant="outlined"
            hide-details
            class="search-field"
            @click:append-inner="onClick"
          ></v-text-field>
        </v-card-text>
        <v-spacer id="space"></v-spacer>
        <h2 class="title">ZERO PET</h2>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
            <v-icon left>{{ item.icon }}</v-icon>
          </v-btn>
        </v-toolbar-items>
        <v-icon class="menu-icon">mdi-menu</v-icon>
      </v-row>

      <v-toolbar-items class="menu">
        <v-col align="center">
          <v-spacer></v-spacer>
          <v-btn class="menu-item" @mouseover="showMenu('snack')"> <v-col><h3>간식</h3><div class="underline" v-if="currentMenu === 'snack'"></div></v-col> </v-btn>
          <v-btn class="menu-item" @mouseover="showMenu('food')"> <v-col><h3>사료</h3><div class="underline" v-if="currentMenu === 'food'"></div></v-col> </v-btn>
          <v-btn class="menu-item" @mouseover="showMenu('grooming')"> <v-col><h3>미용용품</h3><div class="underline" v-if="currentMenu === 'grooming'"></div></v-col> </v-btn>
          <v-btn class="menu-item" @mouseover="showMenu('fashion')"> <v-col><h3>패션용품</h3><div class="underline" v-if="currentMenu === 'fashion'"></div></v-col> </v-btn>
          <v-btn class="menu-item" @mouseover="showMenu('hygiene')"> <v-col><h3>위생용품</h3><div class="underline" v-if="currentMenu === 'hygiene'"></div></v-col> </v-btn>
          <v-btn class="menu-item" @mouseover="showMenu('diningWater')"> <v-col><h3>식기/급수기</h3><div class="underline" v-if="currentMenu === 'diningWater'"></div></v-col> </v-btn>
          <v-btn class="menu-item" @mouseover="showMenu('outing')"> <v-col><h3>외출용품</h3><div class="underline" v-if="currentMenu === 'outing'"></div></v-col> </v-btn>
          <v-btn class="menu-item" @mouseover="showMenu('toys')"> <v-col><h3>장난감</h3><div class="underline" v-if="currentMenu === 'toys'"></div></v-col> </v-btn>
          <v-btn class="menu-item" @mouseover="showMenu('houseSafety')"> <v-col><h3>하우스/안전용품</h3><div class="underline" v-if="currentMenu === 'houseSafety'"></div></v-col> </v-btn>
          <v-spacer></v-spacer>
          <v-container class="menu-content" v-if="currentMenu" @mouseleave="debouncedHideMenu">
            <v-row>
              <v-col v-for="(subItem, index) in currentItems" :key="index" cols="4">
                <v-list class="menu-list">
                  <v-list-item :href="subItem.link">
                    <v-list-item-title>
                      <v-icon>{{ subItem.icon }}</v-icon> {{ subItem.title }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-toolbar-items>
    </v-col>
  </v-app>
</template>

<script>
import _ from 'lodash';
import { checkIsLoggedIn } from '@/auth.js';

export default {
  created() {
    this.fetchLoginStatus(); // check is logged in 
  },
  data() {
    return {
      isLoggedIn: false,
      currentMenu: null, // Check in which menu the mouse is on hover
      loading: false,

      snackItems: [
        { title: '강아지껌', icon: 'mdi-bone', link: 'https://example.com/snack/dog-chews' },
        { title: '비스켓/스낵', icon: 'mdi-cookie', link: 'https://example.com/snack/biscuits-snacks' },
        { title: '수제간식', icon: 'mdi-chef-hat', link: 'https://example.com/snack/homemade-snacks' },
        { title: '육포/사사미', icon: 'mdi-meat', link: 'https://example.com/snack/jerky' },
        { title: '캔/파우치', icon: 'mdi-can-food', link: 'https://example.com/snack/canned-foods' },
        { title: '기타간식', icon: 'mdi-basket-fill', link: 'https://example.com/snack/other-snacks' },
        { title: '고양이간식', icon: 'mdi-cat', link: 'https://example.com/snack/cat-treats' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: 'https://example.com/snack/etc' },
      ],
      foodItems: [
        { title: '건식사료', icon: 'mdi-cereal', link: 'https://example.com/food/dry-food' },
        { title: '습식사료', icon: 'mdi-food-steak', link: 'https://example.com/food/wet-food' },
        { title: '우유/분유', icon: 'mdi-bottle-soda', link: 'https://example.com/food/milk' },
        { title: '강아지영양제', icon: 'mdi-paw', link: 'https://example.com/food/dog-supplements' },
        { title: '고양이사료', icon: 'mdi-cat', link: 'https://example.com/food/cat-food' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: 'https://example.com/food/etc' },
      ],
      groomingItems: [
        { title: '드라이기', icon: 'mdi-hair-dryer', link: 'https://example.com/grooming/dryers' },
        { title: '발톱관리용품', icon: 'mdi-paw-off', link: 'https://example.com/grooming/nail-care' },
        { title: '브러시', icon: 'mdi-brush', link: 'https://example.com/grooming/brushes' },
        { title: '샤워기/타월', icon: 'mdi-shower-head', link: 'https://example.com/grooming/shower-tools' },
        { title: '샴푸/린스', icon: 'mdi-shampoo', link: 'https://example.com/grooming/shampoos' },
        { title: '이발기/가위', icon: 'mdi-scissors-cutting', link: 'https://example.com/grooming/clippers-scissors' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: 'https://example.com/grooming/etc' },
      ],
      fashionItems: [
        { title: '레인코트', icon: 'mdi-umbrella', link: 'https://example.com/fashion/raincoats' },
        { title: '신발/양말', icon: 'mdi-shoe-formal', link: 'https://example.com/fashion/shoes-socks' },
        { title: '외투', icon: 'mdi-coat-rack', link: 'https://example.com/fashion/coats' },
        { title: '원피스/올인원', icon: 'mdi-tshirt-crew-outline', link: 'https://example.com/fashion/dresses' },
        { title: '코스튬', icon: 'mdi-theater', link: 'https://example.com/fashion/costumes' },
        { title: '셔츠/상의', icon: 'mdi-tshirt-crew', link: 'https://example.com/fashion/shirts' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: 'https://example.com/fashion/etc' },
      ],
      hygieneItems: [
        { title: '구강위생용품', icon: 'mdi-toothbrush', link: 'https://example.com/hygiene/oral-care' },
        { title: '기저귀', icon: 'mdi-baby', link: 'https://example.com/hygiene/diapers' },
        { title: '배변봉투', icon: 'mdi-trash-can', link: 'https://example.com/hygiene/poop-bags' },
        { title: '배변판', icon: 'mdi-grid', link: 'https://example.com/hygiene/litter-box' },
        { title: '배변패드', icon: 'mdi-napkin', link: 'https://example.com/hygiene/potty-pads' },
        { title: '탈취/소독제', icon: 'mdi-bottle-sanitizer', link: 'https://example.com/hygiene/deodorizers-disinfectants' },
        { title: '눈/귀 위생용품', icon: 'mdi-eye-outline', link: 'https://example.com/hygiene/eye-ear-care' },
        { title: '넥카라', icon: 'mdi-collar', link: 'https://example.com/hygiene/neck-collars' },
        { title: '해충방지용품', icon: 'mdi-bug', link: 'https://example.com/hygiene/pest-control' },
        { title: '고양이화장실', icon: 'mdi-litter-box', link: 'https://example.com/hygiene/cat-litter-box' },
        { title: '고양이모래', icon: 'mdi-beach', link: 'https://example.com/hygiene/cat-litter' },
        { title: '고양이모래매트', icon: 'mdi-rug', link: 'https://example.com/hygiene/cat-litter-mat' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: 'https://example.com/hygiene/etc' },
      ],
      diningWaterItems: [
        { title: '급수기', icon: 'mdi-water-pump', link: 'https://example.com/diningWaterItems/water-dispensers' },
        { title: '급식기', icon: 'mdi-food-bowl', link: 'https://example.com/diningWaterItems/feeding-bowls' },
        { title: '정수기', icon: 'mdi-water', link: 'https://example.com/diningWaterItems/water-filters' },
        { title: '사료보관통', icon: 'mdi-barrel', link: 'https://example.com/diningWaterItems/food-storage' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: 'https://example.com/diningWaterItems/etc' },
      ],
      outingItems: [
        { title: '가슴줄', icon: 'mdi-leash', link: 'https://example.com/leashes/humid' }, // Assuming 가습줄 means a special type of leash
        { title: '리드줄', icon: 'mdi-leash', link: 'https://example.com/leashes/lead' },
        { title: '목걸이/인식표', icon: 'mdi-tag-heart', link: 'https://example.com/collars/tags' },
        { title: '목줄', icon: 'mdi-leash', link: 'https://example.com/leashes' },
        { title: '유모차', icon: 'mdi-baby-carriage', link: 'https://example.com/strollers' },
        { title: '이동가방/이동장', icon: 'mdi-bag-carry-on', link: 'https://example.com/carriers' },
        { title: '차량용캐리어/시트', icon: 'mdi-car-seat', link: 'https://example.com/car-seats' },
        { title: '입마개', icon: 'mdi-muzzle', link: 'https://example.com/muzzles' },
        { title: '기타', icon: 'mdi-dots-horizontal', link: 'https://example.com/outings/etc' },
      ],
      toysItem: [
        { title: '공/원반', icon: 'mdi-soccer', link: 'https://example.com/toys/balls-discs' },
        { title: '인형', icon: 'mdi-human-child', link: 'https://example.com/toys/dolls' },
        { title: '터널/큐브', icon: 'mdi-tunnel-outline', link: 'https://example.com/toys/tunnels-cubes' },
        { title: '캣타워', icon: 'mdi-tower-beach', link: 'https://example.com/toys/cat-towers' },
        { title: '고양이스크래쳐', icon: 'mdi-scratcher', link: 'https://example.com/toys/cat-scratchers' },
        { title: '고양이장난감', icon: 'mdi-cat', link: 'https://example.com/toys/cat-toys' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: 'https://example.com/toys/etc' },
      ],
      houseSafetyItems: [
        { title: '울타리', icon: 'mdi-fence', link: 'https://example.com/house-safety/fences' },
        { title: '매트', icon: 'mdi-rug', link: 'https://example.com/house-safety/mats' },
        { title: '안전문', icon: 'mdi-gate', link: 'https://example.com/house-safety/gates' },
        { title: '쿠션/방석', icon: 'mdi-seat', link: 'https://example.com/house-safety/cushions' },
        { title: '하우스', icon: 'mdi-dog-side', link: 'https://example.com/house-safety/houses' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: 'https://example.com/house-safety/etc' },
      ],
    };
  },

  methods: {
    onClick() {
      // Your search action
    },
    showMenu(menu) {
      this.currentMenu = menu;
    },
    hideMenu() {
      this.currentMenu = null;
    },
    debouncedHideMenu: _.debounce(function() {
      this.hideMenu();
    }, 200),
    async fetchLoginStatus() {
      try {
        const response = await checkIsLoggedIn();
        this.isLoggedIn = response;
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    },
  },
  computed: {
    currentItems() {
      switch (this.currentMenu) {
        case 'snack':
          return this.snackItems;
        case 'food':
          return this.foodItems;
        case 'grooming':
          return this.groomingItems;
        case 'fashion':
          return this.fashionItems;
        case 'hygiene':
          return this.hygieneItems;
        case 'diningWater':
          return this.diningWaterItems;
        case 'outing':
          return this.outingItems;
        case 'toys':
          return this.toysItem;
        case 'houseSafety':
          return this.houseSafetyItems;
        default:
          return [];
      }
    },
    menuItems() {
      const items = [
        { path: '/cart', icon: 'mdi-cart' },
        { path: '/favorites', icon: 'mdi-heart' },
      ];
  
      if (this.isLoggedIn) {
        items.push({ path: '/logout', icon: 'mdi-logout' });
      } else {
        items.push({ path: '/login', icon: 'mdi-account' });
      }

      return items;
    },
  },  
};
</script>

<style scoped>
.main {
  display: flex;
  background-color: white;
  height: 140px;
  padding: 20px;
}

.container {
  margin: 0 auto;
  padding: 0 20px;
}

.upper {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
}

.search-icon {
  margin-right: 10px;
}

.search-field {
  width: 300px;
}

.title {
  color: #3f51b5;
  font-size: 24px;
  font-weight: bold;
}

.hidden-xs-only {
  display: flex;
}

.menu-icon {
  margin-left: 20px;
  cursor: pointer;
}

.menu {
  margin-top: 20px;
  background: #f5f5f5;
}

.menu-icon {
  color: #3f51b5;
}

.menu h3 {
  margin: 0;
  padding: 0;
  color: #424242;
  position: relative;
}

.menu-item {
  position: relative;
  transition: background-color 0.3s ease;
}

.menu-item:hover {
  background-color: #f0f0f0; /* Light grey background */
}

.underline {
  height: 2px;
  background-color: black;
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.menu-item:hover .underline {
  opacity: 1;
}

.v-toolbar-items {
  justify-content: center;
}

.v-btn {
  color: #3f51b5;
}

.v-btn:hover {
  background-color: transparent; /* Remove default hover background */
}

.v-list-item {
  font-size: 1.1rem;
}

.upper .search-icon {
  display: none !important;
}

.upper .menu-icon {
  display: none !important;
}

.menu-list {
  background: #f5f5f5;
  width: 100%;
}

.menu-content {
  background-color: #f5f5f5;
  width: 100%;
  left: 0;
  display: flex;
}

#space {
  display: none;
}

@media (max-width: 960px) {
  .search {
    display: none !important;
  }

  .upper .hidden-xs-only {
    display: none !important;
  }

  .menu .menu-icon {
    display: none !important;
  }

  .upper .search-icon {
    display: flex !important;
    color: #3f51b5;
  }

  .upper .menu-icon {
    display: flex !important;
    color: #3f51b5;
  }

  #space {
    display: flex !important;
  }
}

@media (max-width: 600px) {
  .menu {
    display: none !important;
  }
}
</style>