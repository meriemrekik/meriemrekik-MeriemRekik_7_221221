<template lang="">
<div class="container-fluid">
  <form class="row g-3 needs-validation"  @submit.prevent="updatePublication">
    <div class="col-12">
      <label for="titre" class="form-label">Titre</label>
      <input type="text" class="form-control" id="titre" v-model="title" required>
      <div class="invalid-feedback">
        Looks bad
      </div>
    </div>
    <div class="col-12">
      <label for="description" class="form-label">Description</label>
      <textarea class="form-control" id="description" rows="3" minlength="20" maxlength="300" v-model="description" required></textarea>
    </div>
    <div id="preview"  class="col-12">
      <img :src="publication.imageUrl" />
    </div>
    <div class="col-12">
      <button class="btn btn-primary" type="submit">Mettre à jour</button>
    </div>
  </form>
</div>
</template>
<script>
import publicationService from "../../services/publication";
export default {
  name: "EditFormPublication",
  // on récupère la publication depuis le composant parent
  props: ["publication"],
  data() {
    return {
      title: "",
      description: "",
      token: "",
    };
  },
  mounted() {
    // Quand le composant est initialisé
    // on recupère notre token dans le store
    this.token = this.$store.state.token;
    this.title = this.publication.title;
    this.description = this.publication.description;
  },
  methods: {
    // On lance l'update de la publication
    updatePublication() {
      publicationService
        .update(this.token, this.publication.id, this.title, this.description)
        .then(() => {
          // On redirige l'utilisateur vers la page d'accueil
          // une fois que la publication a été mise à jour
          this.$router.push("/");
        });
    },
  },
};
</script>
<style lang="scss">
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>