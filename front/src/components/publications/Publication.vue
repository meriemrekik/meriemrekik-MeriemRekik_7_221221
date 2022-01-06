<template lang="">
<div class="card mb-5">
  <p>{{ publication.title }} - {{ publication.description }}</p>
  <img v-bind:src="publication.image" class="card-img-top" alt="...">
  <div class="card-body">
        <span>{{publication.comments}} commentaires</span>
    <p class="like-buttons">
        <button type="button" class="btn like" v-on:click="iLike" v-bind:class="{ 'active': isCurrentUserLike }">
          <i class="bi bi-hand-thumbs-up"></i> {{ publication.likes?.length }}
        </button>
        <button type="button" class="btn dislike" v-on:click="iDislike" v-bind:class="{ 'active': isCurrentUserDislike }">
          <i class="bi bi-hand-thumbs-down"></i> {{ publication.dislikes?.length }}
        </button>
    </p>
    <p class="card-text"><small class="text-muted">Publié par {{ publication.author }} le {{ publication.date }}</small></p>
  </div>
</div>
</template>
<script>
// import { onMounted } from "vue";
const publication = require("../../services/publication");

export default {
  name: "Publication",
  props: ["publication"],
  data() {
    return {
      currentProfile: null,
      isCurrentUserLike: false,
      isCurrentUserDislike: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // on recupere le profile de l'utilisateur dans le store
      this.currentProfile = this.$store.state.profile;
      if (this.currentProfile) {
        // Si l'id de l'utilisateur est dans les likes de la publication alors on affiche en vert le pouce vers le haut
        this.publication.likes.indexOf(this.currentProfile.id) >= 0
          ? (this.isCurrentUserLike = true)
          : (this.isCurrentUserLike = false);
        // Si l'id de l'utilisateur est dans les dislikes de la publication alors on affiche en rouge le pouce vers le bas
        this.publication.dislikes.indexOf(this.currentProfile.id) >= 0
          ? (this.isCurrentUserDislike = true)
          : (this.isCurrentUserDislike = false);
      }
    },
    iLike() {
      this.publication.likes.indexOf(this.currentProfile.id) >= 0
        ? publication.iLike(this.publication.id, this.currentProfile.id, "0")
        : publication.iLike(this.publication.id, this.currentProfile.id, "1");
    },
    iDislike() {
      this.publication.dislikes.indexOf(this.currentProfile.id) >= 0
        ? publication.iLike(this.publication.id, this.currentProfile.id, "0")
        : publication.iLike(this.publication.id, this.currentProfile.id, "-1");
    },
  },
};
</script>
<style lang="scss">
.card {
  background-color: silver;

  .card-img-top {
    height: 100%;
    width: 100%;
    max-width: 400px;
    max-height: 650px;
    margin: 0 auto;
  }
  .card-body {
    background-color: #fff;
    .like-buttons {
      font-size: 22px;
      .btn {
        background-color: slategray;
        color: #fff;
      }
      .active {
        // &.bi-hand-thumbs-up-fill {
        &.like {
          background-color: green;
        }
        // &.bi-hand-thumbs-down-fill, dis {
        &.dislike {
          background-color: red;
        }
      }
    }
  }
}
</style>