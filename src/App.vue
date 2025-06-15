//gibt wissen vom Backend ans frontend
//ref = reaktive daten (ändert sich was im backend ändert es sich hier automatisch)

<script setup>
import { ref, onMounted } from 'vue'
import RestaurantListe from './components/Restaurantlist.vue'

const restaurants = ref([])

onMounted(async () => {
  try {
    const response = await fetch("https://webtechprojekt-tjik.onrender.com/berliner-restaurantauswahl")

    restaurants.value = await response.json()
  } catch (error) {
    console.error('Fehler beim Laden der Restaurants:', error)
  }
})
</script>

<template>
  <div class="container">
    <h1>Berliner Restaurantauswahl</h1>
    <RestaurantListe :restaurants="restaurants" />
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  font-family: sans-serif;
}
li {
  margin-bottom: 1rem;
}
</style>
