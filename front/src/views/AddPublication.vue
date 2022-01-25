<template>
  <Menu :liens="liensMenu" />
  <div class="container-md">
    <AddFormPublication />
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import AddFormPublication from "@/components/publications/AddFormPublication.vue";

// @ is an alias to /src
// const publication = require("../services/publication");

export default {
  name: "AddPublication",
  data() {
    return {
      liensMenu: [
        { url: "/", text: "Accueil" },
        { url: "addPublication", text: "Ajouter une publication" },
        { url: "profile", text: "Profile" },
        { url: "signOut", text: "Déconnexion" },
      ],
    };
  },
  components: {
    Menu,
    AddFormPublication,
  },
};
</script>


