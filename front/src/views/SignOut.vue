<template>
  <Menu :liens="liensMenu" />
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
export default {
  name: "SignOut",
  data() {
    return {
      liensMenu: [
        { url: "/", text: "Accueil" },
        { url: "addPublication", text: "Ajouter une publication" },
        { url: "signOut", text: "Déconnexion" },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("disconnect");
    this.$router.push("/");
  },
  components: {
    Menu,
  },
};
</script>


