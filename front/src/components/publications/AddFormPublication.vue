<template lang="">
<div class="container-fluid">
  <h4><i class="bi bi-bookmark-star-fill"></i> Rédiger une nouvelle publication</h4>
  <form class="row g-3 needs-validation mt-4"  @submit.prevent="sendForm">
    <div class="col-12 pb-4">
      <input type="text" class="form-control" id="titre" placeholder="Titre de votre publication" v-model="title" required>
    </div>
    <div class="col-12 pb-4">
      <textarea class="form-control"  placeholder="Description en quelques mots de votre Publication"  id="description" rows="3" minlength="20" maxlength="300" v-model="description" required></textarea>
      <small class="form-text text-muted">{{ description.length }}/300 caractères maximum.</small>
    </div>
    <div class="col-12 pb-4">
      <input class="form-control" type="file" id="formFile" accept=".gif,.jpg,.jpeg,.png" @change="onFileChange($event)" required>
      <small class="form-text text-muted"><i class="bi bi-upload"></i> Uploader votre image au format (jpg/jpeg/png/gif)</small>
    </div>
    <div id="preview">
      <img v-if="urlPreview" :src="urlPreview" />
    </div>
    <div class="col-12">
      <button class="btn btn-primary" type="submit">Publier</button>
    </div>
  </form>
</div>
</template>
<script>
// import axios from "axios";
import publicationService from "../../services/publication";

export default {
  name: "AddFormPublication",
  props: [],
  data() {
    return {
      urlPreview: null,
      title: "",
      description: "",
      file: null,
      token: null,
    };
  },
  mounted() {
    this.token = this.$store.state.token;
  },
  methods: {
    onFileChange(e) {
      if (e.target.files[0]) {
        this.file = e.target.files[0];
        this.urlPreview = URL.createObjectURL(this.file);
      }
    },
    sendForm() {
      let formData = new FormData();
      const publication = {
        title: this.title,
        description: this.description,
      };
      formData.append("publication", JSON.stringify(publication));
      formData.append("image", this.file);
      publicationService
        .create(this.token, formData)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.warn(error);
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