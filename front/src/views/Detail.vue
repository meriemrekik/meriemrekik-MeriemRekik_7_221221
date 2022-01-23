<template>
  <div class="container-md !direction !spacing home">
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
        <div class="col-12 mb-5">
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
    this.getComment();
    this.getPublication(this.idPublication);
  },
  components: {
    Publication,
    CommentPublication,
  },
  methods: {
    async getPublication(id) {
      let newPublication = null;
      await publicationServ.findOne(this.token, id).then((p) => {
        newPublication = p;
        this.publication = JSON.parse(JSON.stringify(p));
        return p;
      });
      this.publication = newPublication;
    },
    getComment() {
      commentServ.getAll(this.token, this.idPublication).then((c) => {
        this.comments = c;
      });
    },
    newComment(c) {
      this.comments.push(c);
    },
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

