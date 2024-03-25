import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SignIn from './components/SignIn.vue'
import InventoryPage from './components/Inventory.vue'
import AdminPage from './components/Admin.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: SignIn },
    { path: '/inventory', component: InventoryPage },
    { path: '/admin', component: AdminPage }
  ]
})

createApp(App).use(router).mount('#app')
