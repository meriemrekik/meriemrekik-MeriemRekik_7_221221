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
        <div class="col-12">Retour page accueil</div>
        <div class="col-12">
          <Publication :publication="publication" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Publication from "@/components/publications/Publication.vue";
// const publication = require("../services/publication");

export default {
  name: "Detail",
  data() {
    return {
      publication: {},
    };
  },
  mounted() {},
  components: {
    Publication,
  },
  methods: {},
};
</script>
<style lang="scss">
.home {
  margin-top: 60px;
}
</style>

