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
// const publicationService = require("../services/publication");

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
          id: "1",
          title: "Titre 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          date: "Wed Jan 05 2022 01:56:08 GMT+0100",
          author: "rekik.meriem@gmail.com",
          image: "https://img-9gag-fun.9cache.com/photo/aRrj54j_460swp.webp",
          comments: 0,
          likes: ["1"],
          dislikes: ["2"],
        },
        {
          id: "2",
          title: "Titre 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          date: "Wed Jan 05 2022 01:06:08 GMT+0100",
          author: "rekik.yasmine@gmail.com",
          image: "https://img-9gag-fun.9cache.com/photo/a91AQQ1_460swp.webp",
          comments: 3,
          likes: ["2"],
          dislikes: ["1"],
        },
        {
          id: "3",
          title: "Titre 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          date: "Wed Jan 05 2022 00:06:08 GMT+0100",
          author: "rekik.meriem@gmail.com",
          image: "https://img-9gag-fun.9cache.com/photo/aVx3jjn_460swp.webp",
          comments: 1,
          likes: ["1", "2"],
          dislikes: [],
        },
      ];
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

