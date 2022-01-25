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
        <div class="message-action" v-if="canDelete(comment)">
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#deleteComment"
            v-on:click="focusComment(comment)"
            ><i class="bi bi-trash"></i
          ></a>
        </div>
        <div>
          {{ comment.content }}
        </div>
        <span v-if="comment.user" class="author">
          <router-link :to="'/profile/' + comment.user.id"
            >{{ comment.user.prenom }} {{ comment.user.nom }}</router-link
          ></span
        >
        <span class="date" v-if="comment.createdAt">
          &nbsp;{{ formatDate.displayDateFromNow(comment.createdAt) }}
        </span>
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
      comment: null,
      // on crée une copie du tableau des commentaires
      // Comme les props sont immutables, si on veut les modifier
      // il vaut mieux travailler avec une copie du tableau
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
        .then(() => {
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
@import "src/assets/scss/style.scss";

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
      background-color: #ffb980;
      border-radius: 8px;
      display: inline-block;
      padding: 8px;
    }
    .author,
    .date {
      font-size: 0.8em;
    }

    &.my-comment {
      justify-content: end;
      > div {
        background-color: rgb(149, 149, 247);
      }
    }

    .message-action {
      text-align: right;
      a {
        text-decoration: none;
        color: $primary-color;
      }
    }
  }
}
.comment-citation {
  text-align: center;
  .author {
    font-size: 0.8em;
  }
}
</style>