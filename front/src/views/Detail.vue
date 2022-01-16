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
        <div class="col-12">
          <router-link :to="'../'" exact>
            <a class="btn btn-primary btn-sm" href="#" role="button"
              >Retour page accueil</a
            >
          </router-link>
        </div>
        <div class="col-12">
          <Publication v-if="publication" :publication="publication" />
        </div>
        <div class="col-12">
          <CommentPublication
            :idPublication="idPublication"
            :comments="comments"
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
    getPublication(id) {
      publicationServ.findOne(this.token, id).then((p) => {
        this.publication = p;
        console.log(this.publication);
      });
    },
    getComment() {
      commentServ.getAll(this.token);
    },
  },
};
</script>
<style lang="scss">
.home {
  margin-top: 60px;
}
</style>

