<template>
  <div class="comment-container">
    <div v-if="!mutableComments.length">Aucun commentaire pour le moment</div>
    <div
      class="comment"
      v-for="(comment, index) in mutableComments"
      :key="index"
      v-bind:class="{ 'my-comment': comment.userId == currentProfile.id }"
    >
      <div>
        <div>
          {{ comment.content }}
        </div>
        <span v-if="comment.user" class="author"
          >Par {{ comment.user.prenom }} {{ comment.user.nom }}</span
        >
        <span class="date" v-if="comment.createdAt">
          le {{ formatDate.displayDate(comment.createdAt) }} à
          {{ formatDate.displayHour(comment.createdAt) }}
        </span>
        <div v-if="canDelete(comment)">
          <small>
            <a
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#deleteComment"
              v-on:click="focusComment(comment)"
              >Supprimer</a
            >
          </small>
        </div>
      </div>
    </div>
    <div class="input-comment-container">
      <form class="row g-3 needs-validation" @submit.prevent="sendComment">
        <div class="col-12">
          <label for="comment" class="form-label">Votre commentaire</label>
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
          <button class="btn btn-primary" type="submit">
            Publier commentaire
          </button>
        </div>
      </form>
    </div>
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
          {{ selectedComment.content }} ?
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
    comments: function (newComments) {
      if (newComments) {
        this.mutableComments = newComments;
      } else {
        this.mutableComments = [];
      }
    },
  },
  data() {
    return {
      token: null,
      comment: null,
      mutableComments: [],
      currentProfile: {},
      formatDate,
      selectedComment: null,
    };
  },
  mounted() {
    this.mutableComments = [...this.comments];
    this.currentProfile = this.$store.state.profile;
    this.token = this.$store.state.token;
  },
  methods: {
    focusComment(comment) {
      this.selectedComment = comment;
    },
    sendComment() {
      commentService
        .create(this.token, this.idPublication, this.comment)
        .then((c) => {
          this.comment = null;
          this.$emit("commentAdded", c.comment);
        })
        .catch((error) => {
          console.warn(error);
        });
    },
    deleteComment() {
      const idCommentToDelete = this.selectedComment.id;
      commentService
        .deleteComment(this.token, this.idPublication, idCommentToDelete)
        .then((del) => {
          console.log(del);
          this.mutableComments = this.mutableComments.filter(
            (c) => c.id != idCommentToDelete
          );
        });
    },
    canDelete(comment) {
      return (
        this.currentProfile.isAdmin || comment.userId == this.currentProfile.id
      );
    },
  },
  computed: {},
};
</script>
<style lang="scss">
.comment-container {
  background-color: rgb(250, 250, 250);
  max-width: 750px;
  margin: 0 auto;

  .input-comment-container {
    background-color: whitesmoke;
  }
  .comment {
    margin-bottom: 1em;
    display: flex;

    > div {
      max-width: 60%;
      background-color: #ff9f51;
      border-radius: 8px;
      display: inline-block;
      padding: 8px;
    }
    .author,
    .date {
      font-size: small;
    }

    &.my-comment {
      justify-content: end;
      > div {
        background-color: rgb(149, 149, 247);
      }
    }
  }
}
</style>