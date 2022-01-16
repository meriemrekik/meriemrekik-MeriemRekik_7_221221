<template>
  <Menu :liens="liensMenu" />
  <div class="container-md !direction !spacing home">
    <div
      class="row ${1| ,row-cols-2,row-cols-3, auto,justify-content-md-center,|}"
    >
      <div
        class="
          row
          ${1|
          ,row-cols-2,row-cols-3,
          auto,justify-content-md-center,|}
        "
      >
        <div class="col-12 col-lg-9">
          <h4>Publications les plus récentes</h4>
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
          <h4>Publications populaires</h4>
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
// import publicationService from "../services/publication";

export default {
  name: "Home",
  data() {
    return {
      liensMenu: [
        { url: "/", text: "Accueil" },
        { url: "addPublication", text: "Ajouter une publication" },
        { url: "profile", text: "Profile" },
        { url: "signIn", text: "Déconnexion" },
      ],
      token: null,
    };
  },
  mounted() {
    this.token = this.$store.state.token;
    this.publications = this.$store.state.publications;
    this.$store.dispatch("getPublications");
  },
  components: {
    Menu,
    Publication,
  },
  methods: {
    removePublication(id) {
      this.publications = this.publications.filter((p) => p.id != id);
    },
  },
  computed: {
    allPublications() {
      return this.$store.state.publications;
    },
  },
};
</script>
<style lang="scss">
.home {
  margin-top: 60px;
}
</style>

