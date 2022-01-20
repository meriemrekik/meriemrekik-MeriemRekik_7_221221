<template lang="">
<div class="container-fluid">
  <div id="preview-popular">
      <router-link :to="'/publication/'+publication.id">
      <img v-if="urlPreview" :src="urlPreview" />
      </router-link>
      <router-link :to="'/publication/'+publication.id">
      <h6>{{ publication.title }}</h6>
      </router-link>
    </div>
</div>
</template>
<script>
// import axios from "axios";

export default {
  name: "PopularPublication",
  props: ["publication"],
  data: () => {
    return {
      urlPreview: null,
    };
  },
  mounted() {
    this.urlPreview = this.publication.imageUrl;
  },
};
</script>
<style lang="scss">
#preview-popular {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  a {
    text-decoration: none;
    margin-top: 0.8em;
  }
  margin-bottom: 1.8em;
}

#preview-popular img {
  max-width: 100%;
  max-height: 280px;
}
</style>