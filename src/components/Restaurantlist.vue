//Dient dazu eine Liste von Restaurants anzuzeigen die im Backend erstellt wurde

<<template>
<div>
  //Hier machen wir ein Filter für die Favoriten
  <div class="filter-section">
    <button
      @click="showOnlyFavorites = !showOnlyFavorites"
      :class="{ active: showOnlyFavorites }"
      class="filter-btn"
    >

      {{ showOnlyFavorites ? 'Alle Restaurants' : 'Nur Favoriten'}}
    </button>
</div>


<ul v-if="filteredRestaurants.length" class="restaurant-list">
  <li v-for="r in filteredRestaurants" :key="r.id" class="restaurant-card">

    //Restaurant Infos
    <div class="restaurant-info">
      <strong class="restaurant-name">{{ r.name }}</strong>


    //HIer machen wir die Bewertung mit Sternen
    <div class="rating-section">
      <span v-for="star in 5"
            :key="star"
            @click="setRating(r, star)"
            class="star"
            :class="{ filled: star <= (r.rating || 0)}"
            >
        ⭐
      </span>

      <span class="rating-text">({{ r.rating || 0}}/5)</span>
    </div>

    <div class="restaurant-details">
      Adresse: {{ r.address }}<br />
      Öffnungszeiten: {{ r.businesshours }}<br />
      Kategorie: {{ r.category }}
    </div>
</div>

//Aktion Buttons werden erstelllt
    <div class="action-section">
      //Favoriten Button erstellen
      <button
        @click="toggleFavorite(r)"
        class="favorite-btn"
        :class="{ favorited: r.isFavorite }"
        >
        {{ r.isFavorite ? '❤️ Favorisiert' : '🤍 Favorisieren' }}
      </button>

  //Notizen toggle
      <button
        @click="toggleNotes(r)"
        class="notes-toggle-btn"
        >
        {{ r.showNotes ? `Notizen verbergen` : 'Notizen hinzufügen'}}
      </button>
    </div>

//Hier entsteht die Notizen Section
    <div v-if="r.showNotes" class="notes-section">
      <textarea
        v-model="r.notes"
        @blur="saveNotes(r)"
        placeholder="Notizen zu deinem Favoriten Restaurant..."
        class="notes-input"
        ></textarea>
    </div>

    <hr />
  </li>
</ul>

  <p v-if="!filteredRestaurants.length && showOnlyFavorites" class="no-results">
    Du hast noch Keine Favoriten :(...
  </p>
  <p v-else class="no-results">
    Aktuell gibt es leider keine Restaurants :(...
  </p>
</div>
</template>

<script>
export default {
  props: ['restaurants'],
  data() {
    return {
      showOnlyFavorites: false,
      localRestaurants: []
    }
  },
  computed: {
    filteredRestaurants() {
      if (this.showOnlyFavorites) {
        return this.enhancedRestaurants.filter(r => r.isFavorite)
      }
      return this.enhancedRestaurants
    },
    enhancedRestaurants() {
      return this.restaurants.map(restaurant => {
        //Hier laden wir die Lokalen Dat3n also alles was wir vorhin Programmiert haben hier or
        const localData = this.getLocalData(restaurant.id || restaurant.name)
        return {
          ...restaurant,
          isFavorite: localData.isFavorite || false,
          notes: localData.notes || '',
          rating: localData.rating || 0,
          showNotes: false
        }
      })
    }
  },
  //Hier sorgen wir jetzt dafür das favoriten hinzugefügt und entrfernt werden können
  methods: {
    toggleFavorite(restaurant) {
      const newFavoriteStatus = !restaurant.isFavorite
      restaurant.isFavorite = newFavoriteStatus

      //Wir speichern das jetzt in locaStorage
      this.saveLocalData(restaurant.id || restaurant.name, {
        isFavorite: newFavoriteStatus,
        notes: restaurant.notes,
        rating: restaurant.rating
      })
    },

    //Wir speichern jetzt die Notizen sonnst alles weg
    saveNotes(restaurant) {
      this.saveLocalData(restaurant.id || restaurant.name, {
        isFavorite: restaurant.isFavorite,
        notes: restaurant.notes,
        rating: restaurant.rating
      })
    },
    //Hier sorgen wir daafür das die Bewertung gesetzt wird
    setRating(restaurant, rating) {
      restaurant.rating = rating
      this.saveLocalData(restaurant.id || restaurant.name, {
        isFavorite: restaurant.isFavorite,
        notes: restaurant.notes,
        rating: rating
      })
    },

    //Hierr machen wir das ein und ausblenden der Notizen, sonnst "Wow ich erkenne nichts..."
    toggleNotes(restaurant) {
      restaurant.showNotes = !restaurant.showNotes
    },

    //Wir speichern die Lokalen Daten...
    saveLocalData(restaurantId, data) {
      const key = `restaurant_${restaurantId}`//ähnlich wie in Statistik you know
      localStorage.setItem(key, JSON.stringify(data))
    },
    getLocalData(restaurantId) {
      const key = `restaurant_${restaurantId}`
      const savedData = localStorage.getItem(key)
      return savedData ? JSON.parse(savedData) : {}
    }
  }
}
</script>

//Hier kommt alles mit Stiley Miley
<style scoped>
.filter-section {
  margin-bottom: 1rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #007bff;
  background: white;
  color: #007bff;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn.active {
  background: #007bff;
  color: white;
}

.restaurant-list {
  list-style: none;
  padding: 0;
}

.restaurant-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.restaurant-name {
  font-size: 1.2rem;
  color: #333;
  display: block;
  margin-bottom: 0.5rem;
}

.rating-section {
  margin: 0.5rem 0;
}

.star {
  cursor: pointer;
  font-size: 1.2rem;
  margin-right: 0.2rem;
  opacity: 0.3;
  transition: opacity 0.2s;
}

.star.filled {
  opacity: 1;
}

.star:hover {
  opacity: 0.7;
}

.rating-text {
  margin-left: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.restaurant-details {
  margin: 0.5rem 0;
  color: #666;
  line-height: 1.4;
}

.action-section {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

.favorite-btn {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  background: #f8f9fa;
  border: 1px solid #ddd;
}

.favorite-btn.favorited {
  background: #ff6b6b;
  color: white;
  border-color: #ff5252;
}

.notes-toggle-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #28a745;
  background: white;
  color: #28a745;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.notes-toggle-btn:hover {
  background: #28a745;
  color: white;
}

.notes-section {
  margin-top: 1rem;
}

.notes-input {
  width: 100%;
  height: 80px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
  font-family: inherit;
}

.no-results {
  text-align: center;
  color: #666;
  font-style: italic;
  margin: 2rem 0;
}

hr {
  margin: 1rem 0;
  border: none;
  border-top: 1px solid #eee;
}
</style>