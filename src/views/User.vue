<template>
  <div class="user">
    <div class="row">
      <div class="col user__image">
        <img :src="infoUser.imagen" alt="imagen usuario" />
      </div>
      <div class="col user__mapa">
        <!-- Debería de ser dinámico el mapa, no he encontrado cómo hacer dinámica la Latitud y Longitud para que me pinte el punto exacto, se rompía el mapa -->
        <iframe
          width="425"
          height="350"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          :src="`https://www.openstreetmap.org/export/embed.html?bbox=${getLongitude}%2C${getLatitude}%2C${getLongitude}%2C${getLatitude}&amp;layer=mapnik&amp;marker=${getLatitude}%2C${getLongitude}`"
          style="border: 1px solid black"
        ></iframe>
      </div>

      <div class="col user__favorite">
        <ButtonComponent
          @clickButton="setUserFavorite(infoUser.id)"
          class="button"
          :class="{ favorito: infoUser.favorito }"
          text="Favorito"
        />
      </div>
    </div>
    <div class="row">
      <div class="col col-12">
        <h2>Datos personales:</h2>
        <h3>
          <span>Nombre: {{ infoUser.nombre }}.</span>
        </h3>
        <h3>
          <span>Email: {{ infoUser.email }}.</span>
        </h3>
      </div>
    </div>
    <div class="row">
      <div class="col col-12">
        <h2>Datos de localización:</h2>
        <h3>
          <span>Cuidad: {{ getCity }}.</span>
        </h3>
        <h3>
          <span>Calle: {{ getAddress }}.</span>
        </h3>
        <h3>
          <span>Teléfonos: {{ getPhones }}.</span>
        </h3>
      </div>
    </div>
    <div class="row">
      <div class="col col-12">
        <ButtonComponent
          v-show="getFavoriteUsers.length"
          @clickButton="$router.push({ name: 'exporter' })"
          class="button"
          text="Perfiles Favoritos"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "../components/ButtonComponent";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "User",
  data() {
    return {
      infoUser: {},
    };
  },
  components: {
    ButtonComponent,
  },
  computed: {
    ...mapGetters(["getUserById", "getFavoriteUsers"]),
    getCity() {
      return this.infoUser?.localizacion?.city || "";
    },
    getAddress() {
      return `${this.infoUser?.localizacion?.street?.name || ""}, ${
        this.infoUser?.localizacion?.street?.number || ""
      }`;
    },
    getPhones() {
      return `${this.infoUser?.telefono || ""}, ${this.infoUser?.cell || ""}`;
    },
    getLatitude() {
      return this.infoUser?.localizacion?.coordinates?.latitude || 0.0;
    },
    getLongitude() {
      return this.infoUser?.localizacion?.coordinates?.longitude || 0.0;
    },
  },
  methods: {
    ...mapActions(["setUserFavorite"]),
  },
  watch: {
    route: {
      handler() {
        this.infoUser = this.getUserById(this.$route.params.userId);
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  &__image {
    width: 100%;
    max-width: 200px;
    img {
      width: 100%;
    }
  }
  &__mapa {
    max-width: 850px;
    width: 100%;
    iframe {
      width: 100%;
    }
  }
  &__favorite {
    .favorito {
      background-color: goldenrod;
      color: #fff;
    }
  }
}
</style>
