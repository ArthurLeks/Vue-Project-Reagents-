<script setup>
import { ref, provide, watch, computed } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import MainList from './components/MainList.vue'
import Footer from './components/Footer.vue'


const cart = ref([])
const isCreatingOrder = ref(false)

const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
</script>

<template>
  
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />
  
  <Header :total-price="totalPrice" @open-drawer="openDrawer" />
  
  <MainList />
  
  <div class="p-10">
  <router-view></router-view>
</div>

  <Footer />


</template>
