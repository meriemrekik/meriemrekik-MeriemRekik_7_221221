<template>
  <Menu :liens="liensMenu" />
  <div class="container-md !direction !spacing home">
    <div class="row">
      <div class="col-12 col-lg-9 pb-5">
        <h4 class="mb-5">
          <i class="bi bi-globe"></i> Publications les plus récentes
        </h4>
        <div v-if="!allPublications.length">
          Aucune Publications publiées pour le moment
        </div>
        <Publication
          v-for="(art, index) in allPublications"
          :key="index"
          :publication="art"
          @publicationDeleted="removePublication"
        />
      </div>
      <div class="col-12 col-lg-3">
        <h4 class="mb-5">
          <i class="bi bi-star-fill"></i> Publications populaires
        </h4>
        <div>
          <div v-if="!allPublications.length">
            Aucune Publications populaire pour le moment
          </div>
          <div v-for="(pop, index) in allPublicationsPopulaires" :key="index">
            <PopularPublication :publication="pop" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { onMounted } from "vue";
import Menu from "@/components/Menu.vue";
import Publication from "@/components/publications/Publication.vue";
import PopularPublication from "@/components/publications/PopularPublication.vue";
// import publicationService from "../services/publication";

export default {
  name: "Home",
  data() {
    return {
      liensMenu: [
        { url: "/", text: "Accueil" },
        { url: "addPublication", text: "Ajouter une publication" },
        { url: "profile", text: "Profile" },
        { url: "signOut", text: "Déconnexion" },
      ],
      token: null,
      publications: null,
      publicationsPopulaire: null,
    };
  },
  mounted() {
    this.token = this.$store.state.token;
    this.publications = this.$store.state.publications;
    this.publicationsPopulaire = this.$store.state.publicationsPopulaire;
    this.$store.dispatch("getPublications");
    this.$store.dispatch("getPublicationsPopulaires");
  },
  components: {
    Menu,
    Publication,
    PopularPublication,
  },
  methods: {
    removePublication(id) {
      this.$store.dispatch("deletePublication", id);
      this.$router.push("/");
    },
  },
  computed: {
    allPublications() {
      return this.$store.state.publications;
    },
    allPublicationsPopulaires() {
      return this.$store.state.publicationsPopulaire;
    },
  },
};
</script>
<style lang="scss">
.home {
  margin-top: 60px;
}
</style>

