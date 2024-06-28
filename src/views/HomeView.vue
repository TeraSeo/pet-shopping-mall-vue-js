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
          <h2 class="title" @click="redirectToHome">제로캣</h2>
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
                    <v-list-item @click="selectMenuItem(subItem)">
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
        <v-main class="home-container">
          <v-container>
            <component :is="currentComponent"></component>
          </v-container>
        </v-main>
        <AppFooter />
      </v-col>
    </v-app>
</template>

<script>
import AppFooter from '@/views/bar/AppFooter.vue';
import store from '@/store';
import { setUserIdByEmail, checkIsLoggedIn } from '@/auth';
import _ from 'lodash';
import BiscuitViewVue from './products/snack/BiscuitView.vue';
import HomePageVue from './products/HomePage.vue';

export default {
  created() {
    this.fetchLoginStatus();
    if (store.state.userId == null) {
      setUserIdByEmail(store.state.email)
    }
  },
  components: {
    AppFooter,
    HomePageVue,
    BiscuitViewVue
  },
  data() {
    return {
      currentComponent: 'HomePageVue',
      products: [],
      isLoggedIn: false,
      currentMenu: null, // Check in which menu the mouse is on hover
      loading: false,

      snackItems: [
        { title: '비스켓/스낵', icon: 'mdi-cookie', component: BiscuitViewVue },
        { title: '수제간식', icon: 'mdi-chef-hat', link: '/home/간식/수제간식' },
        { title: '캔/파우치', icon: 'mdi-can-food', link: '/home/간식/캔-파우치' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: '/home/간식/기타' },
      ],
      foodItems: [
        { title: '건식사료', icon: 'mdi-cereal', link: '/home/사료/건식사료' },
        { title: '습식사료', icon: 'mdi-food-steak', link: '/home/사료/습식사료' },
        { title: '우유/분유', icon: 'mdi-bottle-soda', link: '/home/사료/우유-분유' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: '/home/사료/기타' },
      ],
      groomingItems: [
        { title: '드라이기', icon: 'mdi-hair-dryer', link: '/home/미용용품/드라이기' },
        { title: '발톱관리용품', icon: 'mdi-paw-off', link: '/home/미용용품/발톱관리용품' },
        { title: '샤워기/타월', icon: 'mdi-shower-head', link: '/home/미용용품/샤워기-타월' },
        { title: '샴푸/린스', icon: 'mdi-shampoo', link: '/home/미용용품/샴푸-린스' },
        { title: '이발기/가위', icon: 'mdi-scissors-cutting', link: '/home/미용용품/이발기-가위' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: '/home/미용용품/기타' },
      ],
      fashionItems: [
        { title: '레인코트', icon: 'mdi-umbrella', link: '/home/패션용품/레인코트' },
        { title: '신발/양말', icon: 'mdi-shoe-formal', link: '/home/패션용품/신발-양말' },
        { title: '외투', icon: 'mdi-coat-rack', link: '/home/패션용품/외투' },
        { title: '원피스/올인원', icon: 'mdi-tshirt-crew-outline', link: '/home/패션용품/원피스-올인원' },
        { title: '코스튬', icon: 'mdi-theater', link: '/home/패션용품/코스튬' },
        { title: '셔츠/상의', icon: 'mdi-tshirt-crew', link: '/home/패션용품/셔츠-상의' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: '/home/패션용품/기타' },
      ],
      hygieneItems: [
        { title: '구강위생용품', icon: 'mdi-toothbrush', link: '/home/위생용품/구강위생용품' },
        { title: '탈취/소독제', icon: 'mdi-bottle-sanitizer', link: '/home/위생용품/탈취-소독제' },
        { title: '눈/귀 위생용품', icon: 'mdi-eye-outline', link: '/home/위생용품/눈-귀-위생용품' },
        { title: '넥카라', icon: 'mdi-collar', link: '/home/위생용품/넥카라' },
        { title: '해충방지용품', icon: 'mdi-bug', link: '/home/위생용품/해충방지용품' },
        { title: '고양이화장실', icon: 'mdi-litter-box', link: '/home/위생용품/고양이화장실' },
        { title: '고양이모래', icon: 'mdi-beach', link: '/home/위생용품/고양이모래' },
        { title: '고양이모래매트', icon: 'mdi-rug', link: '/home/위생용품/고양이모래매트' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: '/home/위생용품/기타' },
      ],
      diningWaterItems: [
        { title: '급수기', icon: 'mdi-water-pump', link: '/home/식기-급수기/급수기' },
        { title: '급식기', icon: 'mdi-food-bowl', link: '/home/식기-급수기/급식기' },
        { title: '정수기', icon: 'mdi-water', link: '/home/식기-급수기/정수기' },
        { title: '사료보관통', icon: 'mdi-barrel', link: '/home/식기-급수기/사료보관통' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: '/home/식기-급수기/기타' },
      ],
      outingItems: [
        { title: '가슴줄', icon: 'mdi-leash', link: '/home/외출용품/가슴줄' }, // Assuming 가습줄 means a special type of leash
        { title: '리드줄', icon: 'mdi-leash', link: '/home/외출용품/리드줄' },
        { title: '목걸이/인식표', icon: 'mdi-tag-heart', link: '/home/외출용품/목걸이-인식표' },
        { title: '목줄', icon: 'mdi-leash', link: '/home/외출용품/목줄' },
        { title: '유모차', icon: 'mdi-baby-carriage', link: '/home/외출용품/유모차' },
        { title: '이동가방/이동장', icon: 'mdi-bag-carry-on', link: '/home/외출용품/이동가방-이동장' },
        { title: '차량용캐리어/시트', icon: 'mdi-car-seat', link: '/home/외출용품/차량용캐리어-시트' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: '/home/외출용품/기타' },
      ],
      toysItem: [
        { title: '공/원반', icon: 'mdi-soccer', link: '/home/장난감/공-원반' },
        { title: '인형', icon: 'mdi-human-child', link: '/home/장난감/인형' },
        { title: '터널/큐브', icon: 'mdi-tunnel-outline', link: '/home/장난감/터널-큐브' },
        { title: '캣타워', icon: 'mdi-tower-beach', link: '/home/장난감/캣타워' },
        { title: '고양이스크래쳐', icon: 'mdi-scratcher', link: '/home/장난감/고양이스크래쳐' },
        { title: '고양이장난감', icon: 'mdi-cat', link: '/home/장난감/고양이장난감' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: '/home/장난감/기타' },
      ],
      houseSafetyItems: [
        { title: '울타리', icon: 'mdi-fence', link: '/home/하우스-안전용품/울타리' },
        { title: '매트', icon: 'mdi-rug', link: '/home/하우스-안전용/매트' },
        { title: '안전문', icon: 'mdi-gate', link: '/home/하우스-안전용/안전문' },
        { title: '쿠션/방석', icon: 'mdi-seat', link: '/home/하우스-안전용/쿠션-방석' },
        { title: '하우스', icon: 'mdi-dog-side', link: '/home/하우스-안전용/하우스' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: '/home/하우스-안전용/기타' },
      ],
    }
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
    redirectToHome() {
     this.currentComponent = 'HomePageVue'
    },
    selectMenuItem(item) {
      this.currentComponent = item.component
      console.log(this.currentComponent)
    }
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

.home-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
}

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