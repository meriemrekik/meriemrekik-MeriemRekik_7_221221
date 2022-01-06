<template>
  <Menu :liens="liensMenu" />
  <AddFormPublication />
</template>

<script>
import { onMounted } from "vue";
import Menu from "@/components/Menu.vue";
import AddFormPublication from "@/components/publications/AddFormPublication.vue";

// @ is an alias to /src
// const publication = require("../services/publication");

export default {
  name: "AddPublication",
  setup() {
    onMounted(() => {
      // publication.getAll();
    });
  },
  data() {
    return {
      liensMenu: [
        { url: "/", text: "Accueil" },
        { url: "addPublication", text: "Ajouter une publication" },
        { url: "signIn", text: "Déconnexion" },
      ],
    };
  },
  components: {
    Menu,
    AddFormPublication,
  },
};
</script>


