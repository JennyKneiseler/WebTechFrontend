<script setup>
import { ref, onMounted } from 'vue'

// Reaktive Liste für Restaurants
const restaurants = ref([])

// Lädt Daten beim Start
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8080/berliner-restaurantauswahl')
    restaurants.value = await response.json()
  } catch (error) {
    console.error('Fehler beim Laden der Restaurants:', error)
  }
})
</script>

<template>
  <div class="container">
    <h1>Berliner Restaurantauswahl</h1>
    <ul v-if="restaurants.length">
      <li v-for="r in restaurants" :key="r.name">
        <strong>{{ r.name }}</strong><br />
        Adresse: {{ r.adresse }}<br />
        Öffnungszeiten: {{ r.oeffnungszeiten }}<br />
        Kategorie: {{ r.kategorie }}
        <hr />
      </li>
    </ul>
    <p v-else>Keine Restaurants geladen...</p>
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





