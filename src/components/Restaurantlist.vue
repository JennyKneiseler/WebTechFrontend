//Dient dazu eine Liste von Restaurants anzuzeigen die im Backend erstellt wurde

<<template>
  <ul v-if="restaurants.length">
    <li v-for="r in restaurants" :key="r.name">
      <strong>{{ r.name }}</strong><br />
      Adresse: {{ r.address }}<br />
      Öffnungszeiten: {{ r.businesshours }}<br />
      Kategorie: {{ r.category }}
      <hr />
    </li>
  </ul>
  <p v-else>Aktuell gibt es keine Restaurants...</p>
</template>

<script>
export default {
  props: ['restaurants']
}
</script>
