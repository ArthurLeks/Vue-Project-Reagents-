<script setup>
import { reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { inject } from 'vue'
import CardList from '../components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
  console.log(cart)
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 300)

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }
      item.isFavorite = true
      const { data } = await axios.post('https://d00e62bce0bd5f0c.mokky.dev/favorites', obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://d00e62bce0bd5f0c.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://d00e62bce0bd5f0c.mokky.dev/favorites')

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)
      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://d00e62bce0bd5f0c.mokky.dev/items', {
      params
    })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)
</script>

<template>
  <div class="p-8 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl">
    <div class="flex flex-col md:flex-row justify-between items-center mb-8">
      <h2 class="font-bold text-4xl tracking-tight text-white sm:text-5xl md:text-6xl">Все товары</h2>
      <div class="flex gap-6 mt-6 md:mt-0">
        <div class="relative">
          <img class="absolute left-4 top-3 h-6 w-6 text-white/70" src="/search.svg" alt="поиск" />
          <input
            @input="onChangeSearchInput"
            class="bg-white/20 border-2 border-white/50 rounded-full py-3 pl-12 pr-5 outline-none focus:border-white text-white placeholder-white/70 transition-all duration-300 ease-in-out"
            type="text"
            placeholder="Поиск..."
          />
        </div>
        <select @change="onChangeSelect" class="bg-white/20 border-2 border-white/50 text-white rounded-full py-3 px-4 outline-none focus:border-white appearance-none transition-all duration-300 ease-in-out">
          <option value="title">По названию</option>
          <option value="price">По цене (дешевые)</option>
          <option value="-price">По цене (дорогие)</option>
        </select>
      </div>
    </div>
    <div class="mt-12">
      <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
    </div>
  </div>
</template>
