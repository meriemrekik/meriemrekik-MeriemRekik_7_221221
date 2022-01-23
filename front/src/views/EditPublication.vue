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
          <router-link :to="'/'" exact>
            <a class="btn btn-primary btn-sm" href="#" role="button"
              >Retour page accueil</a
            >
          </router-link>
        </div>
        <div class="col-12">
          <EditFormPublication v-if="publication" :publication="publication" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EditFormPublication from "@/components/publications/EditFormPublication.vue";
import publicationServ from "../services/publication";

export default {
  name: "EditPublication",
  data() {
    return {
      token: null,
      idPublication: null,
      publication: null,
    };
  },
  mounted() {
    this.token = this.$store.state.token;
    this.idPublication = this.$route.params.id || null;
    this.getPublication(this.idPublication);
  },
  components: {
    EditFormPublication,
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
  },
};
</script>
<style lang="scss">
.home {
  margin-top: 60px;
}
</style>

