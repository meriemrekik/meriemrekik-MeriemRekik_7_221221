<template lang="">
  <div v-if="publication" class="card mb-5">
    <div class="card-header">
      <h5 class="card-title">{{ publication.title }}</h5>
    </div>
    <img v-bind:src="publication.imageUrl" class="card-img-top" alt="...">
    <div class="card-body">
      <div v-if="publication?.userId == currentProfile?.id" class="">
        <router-link :to="'/publication/'+publication.id+'/edit'" exact>
          <a class="btn btn-primary btn-sm" href="#" role="button"
              >Editer</a
            >
        </router-link>
        <a class="btn btn-danger btn-sm" href="#" role="button"  data-bs-toggle="modal" :data-bs-target="'#publication'+publication.id"
          >Supprimer
          </a>
      </div>
      <div class="card-text">
        <p>{{ publication.description }}</p>
      </div>
      <router-link :to="'/publication/'+publication.id">
        <span v-if="publication.comments">{{publication.comments}} commentaires</span>
        <span v-else>Soyez le premier à poster un commentaire</span>
      </router-link>
      <p class="like-buttons">
        <button type="button" class="btn like" v-on:click="iLike" v-bind:class="{ 'active': isCurrentUserLike }">
          <i class="bi bi-hand-thumbs-up"></i> {{ publication.likes?.length }}
        </button>
        <button type="button" class="btn dislike" v-on:click="iDislike" v-bind:class="{ 'active': isCurrentUserDislike }">
          <i class="bi bi-hand-thumbs-down"></i> {{ publication.dislikes?.length }}
        </button>
      </p>
      <p class="card-text">
        <small class="text-muted">Publié par {{ publication.author }} {{ formatDate.displayDateAndHour(publication.createdAt) }}</small>
      </p>
    </div>
  </div>

<!-- Modal -->
<div class="modal fade" :id="'publication'+publication.id" tabindex="-1" aria-labelledby="publicationDeleteModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="publicationDeleteModalLabel">Supprimer Publication</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Etes-vous sure de vouloir supprimer votre publication : {{ publication.title }} ? Tous les commentaires et likes associés à cette publication seront perdu.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-on:click="deletePublication">Oui je supprimer</button>
      </div>
    </div>
  </div>
</div>

</template>
<script>
// import { onMounted } from "vue";
const formatDate = require("../../helper/formatDate");
const publicationServ = require("../../services/publication");

export default {
  name: "Publication",
  props: ["publication"],
  data() {
    return {
      currentProfile: null,
      isCurrentUserLike: false,
      isCurrentUserDislike: false,
      formatDate,
    };
  },
  mounted() {
    this.init();
  },
  // emits: ["publicationDeleted"],
  emits: {
    publicationDeleted: null,
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
        ? publicationServ.iLike(
            this.publication.id,
            this.currentProfile.id,
            "0"
          )
        : publicationServ.iLike(
            this.publication.id,
            this.currentProfile.id,
            "1"
          );
    },
    iDislike() {
      this.publication.dislikes.indexOf(this.currentProfile.id) >= 0
        ? publicationServ.iLike(
            this.publication.id,
            this.currentProfile.id,
            "0"
          )
        : publicationServ.iLike(
            this.publication.id,
            this.currentProfile.id,
            "-1"
          );
    },
    deletePublication() {
      console.log(
        `Axios lance le delete de la publication avec l'id ${this.publication.id}`
      );
      this.$emit("publicationDeleted", this.publication.id);
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss">
.card {
  background-color: #f2f2f2;
  .card-header {
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, 0.03);
  }
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