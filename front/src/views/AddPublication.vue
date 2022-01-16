<template>
  <Menu :liens="liensMenu" />
  <AddFormPublication />
</template>

<script>
import Menu from "@/components/Menu.vue";
import AddFormPublication from "@/components/publications/AddFormPublication.vue";

// @ is an alias to /src
// const publication = require("../services/publication");

export default {
  name: "AddPublication",
  // mounted() {
  // this.mamethode2();
  //},
  data() {
    return {
      liensMenu: [
        { url: "/", text: "Accueil" },
        { url: "addPublication", text: "Ajouter une publication" },
        { url: "profile", text: "Profile" },
        { url: "signIn", text: "Déconnexion" },
      ],
    };
  },
  components: {
    Menu,
    AddFormPublication,
  },
  methods: {
    /*  mamethode(){
      console.log(etest)
    },
    mamethode2(){
      console.log(etest)
    }*/
  },
};
</script>


