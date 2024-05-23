<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
})
</script>

<template>
  <div class="relative bg-blue-200 border border-gray-300 rounded-lg p-4 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
    <img
      v-if="onClickFavorite"
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="like"
      class="absolute top-2 left-2"
      @click="onClickFavorite"
    />
    <img :src="imageUrl" alt="Reagents" class="w-full rounded-lg" />

    <p class="mt-2 text-lg font-bold text-gray-800">{{ title }}</p>

    <div class="flex justify-between mt-4">
      <div class="flex flex-col">
        <span class="text-gray-600">Цена:</span>
        <b class="text-green-600">{{ price }}</b>
      </div>
      <img
        v-if="onClickAdd"
        @click="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Plus"
        class="w-8 h-8 cursor-pointer"
      />
    </div>
  </div>
</template>