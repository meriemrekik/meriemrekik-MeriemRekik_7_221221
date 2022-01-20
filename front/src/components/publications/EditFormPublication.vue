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
  props: ["publication"],
  data() {
    return {
      title: "",
      description: "",
      token: "",
    };
  },
  mounted() {
    this.title = this.publication.title;
    this.token = this.$store.state.token;
    this.description = this.publication.description;
  },
  methods: {
    updatePublication() {
      publicationService
        .update(this.token, this.publication.id, {
          title: this.title,
          description: this.description,
        })
        .then((p) => {
          this.$store.dispatch("updatePublication", p[0]);
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