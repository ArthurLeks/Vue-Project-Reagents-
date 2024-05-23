<script setup>
defineProps({
  totalPrice: Number
})
const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="bg-gradient-to-r from-cyan-600 to-purple-600 shadow-md sticky top-0 z-50 transition-colors duration-300 ease-in-out backdrop-blur-sm">
    <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" class="h-10 w-10 rounded-full shadow-md border-2 border-white transition-colors duration-300 ease-in-out transform hover:scale-105" />
        <div class="flex flex-col">
          <h2 class="text-2xl font-bold text-white tracking-wide">ScienceClass</h2>
          <p class="text-white text-sm font-medium transition-colors duration-300 ease-in-out">ChemShop</p>
        </div>
      </router-link>

      <div class="flex items-center gap-6 text-white font-medium">
        <router-link to="/favorites" class="group relative flex items-center gap-2 px-3 py-2 rounded-full transition cursor-pointer hover:bg-white/20 hover:shadow-lg hover:scale-105">
          <img src="/heart.svg" alt="Favorites" class="h-5 w-5 group-hover:text-red-400 transition-colors" />
        </router-link>
        <router-link to="/profile" class="group relative flex items-center gap-2 px-3 py-2 rounded-full transition cursor-pointer hover:bg-white/20 hover:shadow-lg hover:scale-105">
          <img src="/profile.svg" alt="Profile" class="h-5 w-5 group-hover:text-blue-400 transition-colors" />
        </router-link>
        <div @click="() => emit('openDrawer')" class="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer shadow-md hover:shadow-lg hover:scale-105">
          <img src="/cart.svg" alt="Cart" class="h-5 w-5" />
          <b class="font-semibold">{{ totalPrice }} ₽</b>
        </div>
      </div>
    </nav>
  </header>
</template>