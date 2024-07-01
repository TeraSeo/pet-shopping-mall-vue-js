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
            <v-btn class="menu-item" @mouseover="showMenu('hygiene')"> <v-col><h3>위생용품</h3><div class="underline" v-if="currentMenu === 'hygiene'"></div></v-col> </v-btn>
            <v-btn class="menu-item" @mouseover="showMenu('diningWater')"> <v-col><h3>식기/급수기</h3><div class="underline" v-if="currentMenu === 'diningWater'"></div></v-col> </v-btn>
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
import HandMadeSnackViewVue from './products/snack/HandMadeSnackView.vue';
import CanPouchViewVue from './products/snack/CanPouchView.vue';
import SnackEtcViewVue from './products/snack/SnackEtcView.vue';
import DryViewVue from './products/food/DryView.vue';
import MoistViewVue from './products/food/MoistView.vue';
import MilkViewVue from './products/food/MilkView.vue';
import FoodEtcViewVue from './products/food/FoodEtcView.vue';
import DryingViewVue from './products/grooming/DryingView.vue';
import NailManageViewVue from './products/grooming/NailManageView.vue';
import ShowerViewVue from './products/grooming/ShowerView.vue';
import ShampooViewVue from './products/grooming/ShampooView.vue';
import CutViewVue from './products/grooming/CutView.vue';
import GroomingEtcViewVue from './products/grooming/GroomingEtcView.vue';
import HomePageVue from './products/HomePage.vue';
import CatSandMatViewVue from './products/hygiene/CatSandMatView.vue';
import CatSandViewVue from './products/hygiene/CatSandView.vue';
import CatToiletViewVue from './products/hygiene/CatToiletView.vue';
import EyeEarViewVue from './products/hygiene/EyeEarView.vue';
import HygieneEtcVue from './products/hygiene/HygieneEtc.vue';
import MouseViewVue from './products/hygiene/MouseView.vue';
import NeckViewVue from './products/hygiene/NeckView.vue';
import PreventViewVue from './products/hygiene/PreventView.vue';
import SmellViewVue from './products/hygiene/SmellView.vue';

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
    BiscuitViewVue,
    HandMadeSnackViewVue,
    CanPouchViewVue,
    SnackEtcViewVue,
    DryViewVue,
    MoistViewVue,
    MilkViewVue,
    FoodEtcViewVue,
    DryingViewVue,
    NailManageViewVue,
    ShowerViewVue,
    ShampooViewVue,
    CutViewVue,
    GroomingEtcViewVue,
    CatSandMatViewVue,
    CatSandViewVue,
    CatToiletViewVue,
    EyeEarViewVue,
    HygieneEtcVue,
    MouseViewVue,
    NeckViewVue,
    PreventViewVue,
    SmellViewVue
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
        { title: '수제간식', icon: 'mdi-chef-hat', component: HandMadeSnackViewVue },
        { title: '캔/파우치', icon: 'mdi-can-food', component: CanPouchViewVue },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', component: SnackEtcViewVue },
      ],
      foodItems: [
        { title: '건식사료', icon: 'mdi-cereal', component: DryViewVue },
        { title: '습식사료', icon: 'mdi-food-steak', component: MoistViewVue },
        { title: '우유/분유', icon: 'mdi-bottle-soda', component: MilkViewVue },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', component: FoodEtcViewVue },
      ],
      groomingItems: [
        { title: '드라이기', icon: 'mdi-hair-dryer', component: DryingViewVue },
        { title: '발톱관리용품', icon: 'mdi-paw-off', component: NailManageViewVue },
        { title: '샤워기/타월', icon: 'mdi-shower-head', component: ShowerViewVue },
        { title: '샴푸/린스', icon: 'mdi-shampoo', component: ShampooViewVue },
        { title: '이발기/가위', icon: 'mdi-scissors-cutting', component: CutViewVue },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', component: GroomingEtcViewVue },
      ],
      hygieneItems: [
        { title: '구강위생용품', icon: 'mdi-toothbrush', component: MouseViewVue },
        { title: '탈취/소독제', icon: 'mdi-bottle-sanitizer', component: SmellViewVue },
        { title: '눈/귀 위생용품', icon: 'mdi-eye-outline', component: EyeEarViewVue },
        { title: '넥카라', icon: 'mdi-collar', component: NeckViewVue },
        { title: '해충방지용품', icon: 'mdi-bug', component: PreventViewVue },
        { title: '고양이화장실', icon: 'mdi-litter-box', component: CatToiletViewVue },
        { title: '고양이모래', icon: 'mdi-beach', component: CatSandViewVue },
        { title: '고양이모래매트', icon: 'mdi-rug', component: CatSandMatViewVue },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', component: HygieneEtcVue },
      ],
      diningWaterItems: [
        { title: '급수기', icon: 'mdi-water-pump', link: '/home/식기-급수기/급수기' },
        { title: '급식기', icon: 'mdi-food-bowl', link: '/home/식기-급수기/급식기' },
        { title: '정수기', icon: 'mdi-water', link: '/home/식기-급수기/정수기' },
        { title: '사료보관통', icon: 'mdi-barrel', link: '/home/식기-급수기/사료보관통' },
        { title: '기타', icon: 'mdi-dots-horizontal-circle-outline', link: '/home/식기-급수기/기타' },
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