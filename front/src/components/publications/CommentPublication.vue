<template lang="">
    <p v-for="(comment, index) in comments" :key="index">
        {{comment.text}}
    </p>
    <form class="row g-3 needs-validation"  @submit.prevent="sendComment">
    <div class="col-12">
      <label for="comment" class="form-label">Votre commentaire</label>
      <textarea class="form-control" id="comment" v-model="comment" rows="3" minlength="50" maxlength="300" required></textarea>
    </div>
    <div class="col-12">
      <button class="btn btn-primary" type="submit">Publier commentaire</button>
    </div>
  </form>

</template>
<script>
export default {
  name: "CommentPublication",
  props: ["idPublication", "comments"],
  data() {
    return {
      comment: null,
    };
  },
  methods: {
    sendComment() {},
  },
  mounted() {
    console.log(this.idPublication);
  },
};
</script>
<style lang="scss">
</style>