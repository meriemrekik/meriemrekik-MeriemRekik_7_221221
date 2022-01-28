<template>
  <div class="container-md !direction !spacing">
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
        <div class="col-12 mb-5">
          <router-link :to="'/'" exact>
            <a class="btn btn-primary btn-sm" href="#" role="button"
              >Retour page accueil</a
            >
          </router-link>
        </div>
        <div class="col-12">
          <EditFormPublication v-if="publication" :publication="publication" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EditFormPublication from "@/components/publications/EditFormPublication.vue";
import publicationServ from "../services/publication";

export default {
  name: "EditPublication",
  data() {
    return {
      token: null,
      idPublication: null,
      publication: null,
    };
  },
  mounted() {
    // on recupère le token présent dans le store
    this.token = this.$store.state.token;
    // on récupère l'id de la publication à éditer dans l'URL
    this.idPublication = this.$route.params.id || null;
    // On récupère la publication
    this.getPublication(this.idPublication);
  },
  components: {
    EditFormPublication,
  },
  methods: {
    async getPublication(id) {
      let newPublication = null;
      // On va chercher en base la publication
      await publicationServ.findOne(this.token, id).then((p) => {
        newPublication = p;
        return p;
      });
      // Si l'utilisateur est un admin
      // Ou si son id est celui de l'auteur de la publication
      if (
        this.$store.state.profile.isAdmin ||
        this.$store.state.profile.id == newPublication.userId
      ) {
        // Alors on met la publication dans la variable qui servira de props à notre futur composant
        this.publication = newPublication;
      } else {
        // Sinon on renvoit l'utilisateur à la page d'accueil
        this.$router.push("/");
      }
    },
  },
};
</script>
<style lang="scss">
.home {
  margin-top: 60px;
}
</style>

