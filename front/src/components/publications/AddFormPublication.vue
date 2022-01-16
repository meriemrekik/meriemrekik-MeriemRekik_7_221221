<template lang="">
<div class="container-fluid">
  <form class="row g-3 needs-validation"  @submit.prevent="sendForm">
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
    <div class="col-12">
      <label for="formFile" class="form-label">Uploader votre image (jpg/jpeg/png/gif)</label>
      <input class="form-control" type="file" id="formFile" accept=".gif,.jpg,.jpeg,.png" @change="onFileChange($event)" required>
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