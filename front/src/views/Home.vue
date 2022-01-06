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
          <Publication
            v-for="(art, index) in publications"
            :key="index"
            :publication="art"
          />
        </div>
        <div class="col-12 col-lg-3">List des préférés</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { onMounted } from "vue";
import Menu from "@/components/Menu.vue";
import Publication from "@/components/publications/Publication.vue";
// const publication = require("../services/publication");

export default {
  name: "Home",
  data() {
    return {
      liensMenu: [
        { url: "/", text: "Accueil" },
        { url: "addPublication", text: "Ajouter une publication" },
        { url: "signIn", text: "Déconnexion" },
      ],
      publications: [],
    };
  },
  mounted() {
    this.getAllPublications();
  },
  components: {
    Menu,
    Publication,
  },
  methods: {
    mockAllPublications() {
      this.publications = [
        {
          id: 1,
          title: "article 1",
          description: "lorem dsfsfdf",
        },
        {
          id: 2,
          title: "article 2",
          description: "sdfsdfsf dsfsfdf",
        },
      ];
      console.log(this.publications);
    },
    getAllPublications() {
      this.mockAllPublications();
      //récuperer les publications de la base de donnée
      // utiliser axios pour récupérer toutes les publications
      // ensuite les affecter dans le tableau publications
    },
  },
  computed: {
    // allPublications() {
    //   console.log(this.$store.state.publications);
    //   return this.$store.state.publications;
    // },
  },
};
</script>
<style lang="scss">
.home {
  margin-top: 60px;
}
</style>

