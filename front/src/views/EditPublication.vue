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
          <router-link :to="'/'" exact>
            <a class="btn btn-primary btn-sm" href="#" role="button"
              >Retour page accueil</a
            >
          </router-link>
        </div>
        <div class="col-12">
          <EditFormPublication :publication="publication" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EditFormPublication from "@/components/publications/EditFormPublication.vue";
const publicationServ = require("../services/publication");
export default {
  name: "EditPublication",
  data() {
    return {
      idPublication: null,
      publication: {},
    };
  },
  mounted() {
    this.idPublication = this.$route.params.id || null;
    this.getPublication(this.idPublication);
  },
  components: {
    EditFormPublication,
  },
  methods: {
    getPublication(id) {
      this.publication = publicationServ.findOne(id);
    },
  },
};
</script>
<style lang="scss">
.home {
  margin-top: 60px;
}
</style>

