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
      <textarea class="form-control" id="description" rows="3" minlength="50" maxlength="300" v-model="description" required></textarea>
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
export default {
  name: "AddFormPublication",
  props: [],
  data() {
    return {
      urlPreview: null,
      title: "",
      description: "",
      file: null,
    };
  },
  methods: {
    onFileChange(e) {
      if (e.target.files[0]) {
        this.file = e.target.files[0];
        this.urlPreview = URL.createObjectURL(this.file);
      }
    },
    sendForm() {
      // console.log(this.title, this.description, this.file);

      let formData = new FormData();

      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("file", this.file);
      formData.forEach((e) => {
        console.log(e);
      });
      /*
      axios
        .post("/single-file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
        */
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