<script setup>
import { ref, onMounted } from 'vue'
import RestaurantListe from './components/Restaurantlist.vue'

const restaurants = ref([])
const neuerRestaurantName = ref("")
const neuerAdresse = ref("")
const neuerZeiten = ref("")
const neueKategorie = ref("")

onMounted(async () => {
  try {
    const response = await fetch("https://webtechprojekt-tjik.onrender.com/berliner-restaurantauswahl")
    restaurants.value = await response.json()
  } catch (error) {
    console.error("Fehler beim Laden der Restaurants:", error)
  }
})

async function restaurantSpeichern() {
  try {
    await fetch("https://webtechprojekt-tjik.onrender.com/berliner-restaurantauswahl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: neuerRestaurantName.value,
        address: neuerAdresse.value,
        businesshours: neuerZeiten.value,
        category: neueKategorie.value
      })
    })
    const response = await fetch("https://webtechprojekt-tjik.onrender.com/berliner-restaurantauswahl")
    restaurants.value = await response.json()
  } catch (error) {
    console.error("Fehler beim Speichern:", error)
  }
}
</script>

<template>
  <div class="container">
    <h1>Berliner Restaurantauswahl</h1>
    <div class="form">
      <input v-model="neuerRestaurantName" placeholder="Name" />
      <input v-model="neuerAdresse" placeholder="Adresse" />
      <input v-model="neuerZeiten" placeholder="Öffnungszeiten" />
      <input v-model="neueKategorie" placeholder="Kategorie" />
      <button @click="restaurantSpeichern">Hinzufügen</button>
    </div>
    <RestaurantListe :restaurants="restaurants" />
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  font-family: sans-serif;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
input {
  padding: 0.5rem;
}
button {
  padding: 0.5rem;
}
li {
  margin-bottom: 1rem;
}
</style>
