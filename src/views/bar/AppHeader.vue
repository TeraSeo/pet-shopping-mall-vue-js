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

          <v-btn class="cat-menu menu-item" @mouseover="showMenu('cat')">
            <v-col>
              <h3>고양이</h3>
              <div class="underline" v-if="currentMenu === 'cat'"></div>
            </v-col>
          </v-btn>

          <v-btn class="dog-menu menu-item" @mouseover="showMenu('dog')">
            <v-col>
              <h3>강아지</h3>
              <div class="underline" v-if="currentMenu === 'dog'"></div>
            </v-col>
          </v-btn>

          <v-btn class="menu-item" @mouseover="showMenu('walk')">
            <v-col>
              <h3>산책용품</h3>
              <div class="underline" v-if="currentMenu === 'walk'"></div>
            </v-col>
          </v-btn>

          <v-btn class="menu-item" @mouseover="showMenu('food')">
            <v-col>
              <h3>사료/간식/케어</h3>
              <div class="underline" v-if="currentMenu === 'food'"></div>
            </v-col>
          </v-btn>

          <v-container class="menu-content" v-if="currentMenu" @mouseleave="debouncedHideMenu">
            <v-row>
              <v-col v-for="(item, index) in currentItems" :key="index" cols="4">
                <v-list class="menu-list">
                  <v-list-item v-for="(subItem, subIndex) in item" :key="subIndex" :href="subItem.link">
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
      currentMenu: null, // check in which menu the mouse is on hover
      loading: false,

      catItems: [
        [{ title: 'Cat Food', icon: 'mdi-food', link: 'https://example.com/cat-food' },
         { title: 'Cat Toys', icon: 'mdi-toy-brick', link: 'https://example.com/cat-toys' },
         { title: 'Cat Accessories', icon: 'mdi-collar', link: 'https://example.com/cat-accessories' }],
        [{ title: 'Cat Litter', icon: 'mdi-litter-box', link: 'https://example.com/cat-litter' },
         { title: 'Cat Trees', icon: 'mdi-tree', link: 'https://example.com/cat-trees' },
         { title: 'Cat Health', icon: 'mdi-health', link: 'https://example.com/cat-health' }]
      ],
      dogItems: [
        [{ title: 'Dog Food', icon: 'mdi-food', link: 'https://example.com/dog-food' },
         { title: 'Dog Toys', icon: 'mdi-toy-brick', link: 'https://example.com/dog-toys' },
         { title: 'Dog Accessories', icon: 'mdi-collar', link: 'https://example.com/dog-accessories' }],
        [{ title: 'Dog Beds', icon: 'mdi-bed', link: 'https://example.com/dog-beds' },
         { title: 'Dog Health', icon: 'mdi-health', link: 'https://example.com/dog-health' },
         { title: 'Dog Training', icon: 'mdi-school', link: 'https://example.com/dog-training' }],
      ],
      walkItems: [
        [{ title: 'Leashes', icon: 'mdi-leash', link: 'https://example.com/leashes' },
         { title: 'Collars', icon: 'mdi-collar', link: 'https://example.com/collars' },
         { title: 'Harnesses', icon: 'mdi-harness', link: 'https://example.com/harnesses' }],
        [{ title: 'Travel Gear', icon: 'mdi-suitcase', link: 'https://example.com/travel-gear' },
         { title: 'Outdoor Gear', icon: 'mdi-tent', link: 'https://example.com/outdoor-gear' },
         { title: 'Safety Gear', icon: 'mdi-shield', link: 'https://example.com/safety-gear' }]
      ],
      foodItems: [
        [{ title: 'Cat Food', icon: 'mdi-food', link: 'https://example.com/cat-food' },
         { title: 'Dog Food', icon: 'mdi-food', link: 'https://example.com/dog-food' },
         { title: 'Snacks', icon: 'mdi-candy', link: 'https://example.com/snacks' }],
        [{ title: 'Supplements', icon: 'mdi-pill', link: 'https://example.com/supplements' },
         { title: 'Dental Care', icon: 'mdi-tooth', link: 'https://example.com/dental-care' },
         { title: 'Health Care', icon: 'mdi-heart-pulse', link: 'https://example.com/health-care' }]
      ],
    };
  },
  methods: {
    onClick() {
      // Your search action
    },
    showMenu(menu) { // show menus on hover
      this.currentMenu = menu;
    },
    hideMenu() {
      this.currentMenu = null;
    },
    debouncedHideMenu: _.debounce(function() { // hide menus when it's not on hover
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
        case 'cat':
          return this.catItems;
        case 'dog':
          return this.dogItems;
        case 'walk':
          return this.walkItems;
        case 'food':
          return this.foodItems;
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