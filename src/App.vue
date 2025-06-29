<script setup>
import { ref, onMounted } from 'vue'
import RestaurantListe from './components/Restaurantlist.vue'

const restaurants = ref([])
const neuerRestaurantName = ref("")
const neueAdresse = ref("")
const neueZeiten = ref("")
const neueKategorie = ref("")

//nötig für den Dark und Light mode
const isDarkMode = ref(false)

onMounted(async () => {
  try {
    const response = await fetch("https://webtechprojekt-tjik.onrender.com/berliner-restaurantauswahl")
    restaurants.value = await response.json()
  } catch (error) {
    console.error("Fehler beim Laden der Restaurants:", error)
  }
  //Das brauchen wir damit wir aus localStorage den Dark-Mode laden können
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode) {
    isDarkMode.value = JSON.parse(savedDarkMode)
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
        address: neueAdresse.value,
        businesshours: neueZeiten.value,
        category: neueKategorie.value
      })
    })

    //Hier werden wir die Felder leeren anchdem sie hinzugefügt wurden
    neuerRestaurantName.value =""
    neueAdresse.value =""
    neueZeiten.value =""
    neueKategorie.value =""

    //Hier wird dann die Liste neu geladne
    const response = await fetch("https://webtechprojekt-tjik.onrender.com/berliner-restaurantauswahl")
    restaurants.value = await response.json()
  } catch (error) {
    console.error("Fehler beim Speichern:", error)
  }
}

//Für unser Dark-Mode
function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value))
}
</script>

<template>
 <div class="app" :class="{ 'dark-mode': isDarkMode}">
   <div class="container">
     //Hier kommt jetzt der Header mit Dark-Mode
     <header class="app-header">
       <h1>🍽️ Berliner Restaurantauswahl</h1>
       <button @click="toggleDarkMode" class="theme-toggle">
         {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}}
       </button>
     </header>

     //Restaurants werden hinzugefüht
     <div class="form-section">
       <h2>Neues Restaurant hinzufügen</h2>
       <div class="form">
         <input
         v-model="neuerRestaurantName"
         placeholder="Restaurant Name"
         class="form-input"
         />
         <input
             v-model="neueAdresse"
             placeholder="Adresse"
             class="form-input"
         />
         <input
             v-model="neueZeiten"
             placeholder="Öffnungszeiten"
             class="form-input"
         />
         <input
             v-model="neueKategorie"
             placeholder="Kategorie"
             class="form-input"
         />
         <button @click="restaurantSpeichern" class="add-button">
           ➕ Restaurant hinzufügen
         </button>
       </div>
     </div>

     <!-- Restaurant Liste -->
     <RestaurantListe :restaurants="restaurants" />
   </div>
 </div>
</template>

<style scoped>
/* === LIGHT MODE (Standard) === */
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  transition: all 0.3s ease;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.8rem;
}

.theme-toggle {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.theme-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.form-section {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-section h2 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.form {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.form-input {
  padding: 0.8rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: #2c3e50;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.add-button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, #4CAF50 0%, #45a049 100%);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

/* === DARK MODE === */
.app.dark-mode {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.dark-mode .app-header {
  background: #2d3748;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.dark-mode .app-header h1 {
  color: #e2e8f0;
}

.dark-mode .theme-toggle {
  background: linear-gradient(45deg, #ffa726 0%, #ff7043 100%);
}

.dark-mode .theme-toggle:hover {
  box-shadow: 0 6px 20px rgba(255, 167, 38, 0.4);
}

.dark-mode .form-section {
  background: #2d3748;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.dark-mode .form-section h2 {
  color: #e2e8f0;
}

.dark-mode .form-input {
  background: #4a5568;
  border-color: #718096;
  color: #e2e8f0;
}

.dark-mode .form-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.dark-mode .form-input::placeholder {
  color: #a0aec0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .app-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .form {
    grid-template-columns: 1fr;
  }
}
</style>