<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://d00e62bce0bd5f0c.mokky.dev/favorites?_relations=items'
    )
    favorites.value = data.map((obj) => obj.item)
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <h2 class="font-display text-2xl tracking-tight sm:text-4xl md:text-5xl">Избранное</h2>
  <CardList :items="favorites" is-favorites />
</template>
