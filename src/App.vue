<script setup>
import { ref, onMounted } from 'vue'


const restaurants = ref([])

//hier wird das ganze gestartet wenn man die seite aufruft
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8080/berliner-restaurantauswahl')
    restaurants.value = await response.json()
  } catch (error) {
    console.error('Fehler beim Laden der Restaurants:', error)
  }
})
</script>

//Daten von backend werden verarrbeitet
<template>
  <div class="container">
    <h1>Berliner Restaurantauswahl</h1>
    <ul v-if="restaurants.length">
      <li v-for="r in restaurants" :key="r.name">
        <strong>{{ r.name }}</strong><br />
        Adresse: {{ r.address }}<br />
        Öffnungszeiten: {{ r.businesshours }}<br />
        Kategorie: {{ r.category
        }}
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





