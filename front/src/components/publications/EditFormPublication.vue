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
    <div id="preview"  class="col-12">
      <img :src="publication.image" />
    </div>
    <div class="col-12">
      <button class="btn btn-primary" type="submit">Mettre à jour</button>
    </div>
  </form>
</div>
</template>
<script>
// import axios from "axios";
export default {
  name: "EditFormPublication",
  props: ["publication"],
  data() {
    return {
      title: "",
      description: "",
    };
  },
  mounted() {
    this.title = this.publication.title;
    this.description = this.publication.description;
  },
  methods: {
    sendForm() {
      // console.log(this.title, this.description, this.file);

      let formData = new FormData();

      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.forEach((e) => {
        console.log(e);
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