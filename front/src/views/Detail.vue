<template>
  <div class="container-md !direction !spacing">
    <div
      class="row ${1| ,row-cols-2,row-cols-3, auto,justify-content-md-center,|}"
    >
      <div
        class="
          row
          ${1|
          ,row-cols-2,row-cols-3,
          auto,justify-content-md-center,|}
        "
      >
        <div class="col-12 mb-5 mt-4">
          <router-link :to="'../'" exact>
            <a class="btn btn-primary btn-sm" href="#" role="button"
              >Retour page accueil</a
            >
          </router-link>
        </div>
        <div class="col-12">
          <Publication
            v-if="publication"
            :publication="publication"
            :displayNbComments="false"
            @publicationDeleted="removePublication"
          />
        </div>
        <div class="col-12">
          <CommentPublication
            :idPublication="idPublication"
            :comments="comments"
            @commentAdded="newComment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Publication from "@/components/publications/Publication.vue";
import CommentPublication from "@/components/publications/CommentPublication.vue";

import publicationServ from "../services/publication";
import commentServ from "../services/comments";

export default {
  name: "Detail",
  data() {
    return {
      idPublication: null,
      publication: null,
      comments: [],
      token: null,
    };
  },
  mounted() {
    this.token = this.$store.state.token;
    this.idPublication = this.$route.params.id || null;
    // on cahrge les commentaires
    this.getComment();
    // on récupère la publication
    this.getPublication(this.idPublication);
  },
  components: {
    Publication,
    CommentPublication,
  },
  methods: {
    // On recupere la publication
    async getPublication(id) {
      await publicationServ.findOne(this.token, id).then((p) => {
        this.publication = p;
        return p;
      });
    },
    // On recupère tout les commentaire de la publication
    getComment() {
      commentServ.getAll(this.token, this.idPublication).then((c) => {
        this.comments = c;
      });
    },
    // on rajoute un commentaire de la liste des commentaires
    newComment(c) {
      this.comments.push(c);
      setTimeout(() => {
        var container = this.$el.querySelector("#comment-container");
        container.scrollTop = container.scrollHeight;
      }, 300);
    },
    // on supprime la publication du Store
    removePublication(id) {
      this.$store.dispatch("deletePublication", id);
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss">
.home {
  margin-top: 60px;
}
</style>

