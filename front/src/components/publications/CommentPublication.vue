<template>
  <div id="comment-container" class="comment-container">
    <div v-if="!mutableComments.length">Aucun commentaire pour le moment</div>
    <div
      class="comment"
      v-for="(comment, index) in mutableComments"
      :key="index"
      v-bind:class="{ 'my-comment': comment.userId == currentProfile.id }"
    >
      <div>
        <div class="message-content">
          <div class="message-action mb-1" v-if="canDelete(comment)">
            <span v-if="comment.user" class="author">
              <router-link :to="'/profile/' + comment.user.id"
                >{{ comment.user.prenom }} {{ comment.user.nom }}</router-link
              ></span
            >
            <a
              href="#"
              class="icon-delete"
              data-bs-toggle="modal"
              data-bs-target="#deleteComment"
              v-on:click="focusComment(comment)"
              ><i class="bi bi-trash"></i
            ></a>
          </div>
          <div>
            {{ comment.content }}
          </div>
        </div>
        <div class="signature-message">
          <span class="date" v-if="comment.createdAt">
            &nbsp;{{ formatDate.displayDateFromNow(comment.createdAt) }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="input-comment-container">
    <hr />
    <form class="row g-3 needs-validation" @submit.prevent="sendComment">
      <div class="col-12">
        <label for="comment" class="form-label">Ajouter un commentaire</label>
        <textarea
          class="form-control"
          id="comment"
          v-model="comment"
          rows="3"
          minlength="1"
          maxlength="300"
          required
        ></textarea>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" type="submit">Publier</button>
      </div>
    </form>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="deleteComment"
    tabindex="-1"
    aria-labelledby="publicationDeleteModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content" v-if="selectedComment">
        <div class="modal-header">
          <h5 class="modal-title" id="publicationDeleteModalLabel">
            Supprimer Commentaire
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          Etes-vous sure de vouloir supprimer ce commentaire :
          <p class="italic bold comment-citation">
            {{ selectedComment.content }} ?<br />
            <span class="author">
              <router-link :to="'/profile/' + selectedComment.user.id"
                >{{ selectedComment.user.prenom }}
                {{ selectedComment.user.nom }}</router-link
              >
            </span>
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Annuler
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            v-on:click="deleteComment"
          >
            Oui je supprime
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commentService from "../../services/comments";
const formatDate = require("../../helper/formatDate");

export default {
  name: "CommentPublication",
  props: ["idPublication", "comments"],
  emits: {
    commentAdded: null,
  },
  watch: {
    // On surveille si la props des commentaires change ou pas
    comments: function (newComments) {
      if (newComments) {
        // On crée une copie des tableaux
        this.mutableComments = newComments;
      } else {
        this.mutableComments = [];
      }
    },
  },
  data() {
    return {
      token: null,
      // objet utilisé pour créer un nouveau commentaire
      comment: null,
      // on crée une copie du tableau des commentaires
      // Comme les props sont immutables, si on veut les modifier
      // il vaut mieux travailler avec une copie du tableau
      mutableComments: [],
      currentProfile: {},
      // on récupère dans une variable formatDate le script formatDate
      formatDate,
      selectedComment: null,
    };
  },
  mounted() {
    // On fait une copie du tableau des commentaires que l'on récupère dans les props
    // On fait une copie parce que les props sont des variable immutables dans Vue
    // Ca veut dire qu'on ne peut pas les modifier, donc pour pouvoir supprimer un commentaire ou en ajouter un autre
    // On va plutot travailler avec une copie des  commentaires
    this.mutableComments = [...this.comments];
    // On récupère le profile présent dans le store
    this.currentProfile = this.$store.state.profile;
    // On récupère le token dans le state
    this.token = this.$store.state.token;
    // on execute une fonction qui nous fait scroller en bas de la zone de commentaire
    setTimeout(() => {
      var container = document.querySelector("#comment-container");
      container.scrollTop = container.scrollHeight;
    }, 400);
  },
  methods: {
    // fonction qui permet de définir quel commentaire
    // à afficher dans la modale de DELETE
    focusComment(comment) {
      this.selectedComment = comment;
    },
    // Fonction executer quand on crée un commentaire
    sendComment() {
      commentService
        .create(this.token, this.idPublication, this.comment)
        .then((c) => {
          // on vide le champ d'ajout de commentaire
          this.comment = null;
          // on prévient le composant parents qu'il y a un nouveau commentaire à ajouter
          this.$emit("commentAdded", c.comment);
        })
        .catch((error) => {
          console.warn(error);
        });
    },
    deleteComment() {
      // on récupère l'id du commentaire que l'on affiche dans la modale pour le supprimer
      const idCommentToDelete = this.selectedComment.id;
      commentService
        .deleteComment(this.token, this.idPublication, idCommentToDelete)
        .then(() => {
          // Quand on a supprimé le commentaire
          // on le retire du tableau des commentaires qu'on affiche
          this.mutableComments = this.mutableComments.filter(
            (c) => c.id != idCommentToDelete
          );
        });
    },
    // Fonction qu'on utilise pour savoir si le commentaire peut etre supprimé par l'utilisateur
    canDelete(comment) {
      // un admin ou l'auteur du commentaire peuvent supprimer le commentaire
      return (
        this.currentProfile.isAdmin || comment.userId == this.currentProfile.id
      );
    },
  },
  computed: {},
};
</script>
<style lang="scss">
</style>