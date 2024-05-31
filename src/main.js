import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { checkIsAdmin } from './auth.js';

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')

router.beforeEach( async (to, from, next) => {
  if (to.name === "Admin") {
    const isAdmin = await checkIsAdmin();
    if (isAdmin) {
      next()
    }
    else {
      next('/')
    }
  }
  else {
    next()
  }
})