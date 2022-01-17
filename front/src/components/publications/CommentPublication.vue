<template>
  <div class="comment-container">
    <div v-if="!comments.length">Aucun commentaire pour le moment</div>
    <div
      class="comment"
      v-for="(comment, index) in comments"
      :key="index"
      v-bind:class="{ 'my-comment': comment.userId == currentProfile.id }"
    >
      <div>
        <div>
          {{ comment.text }}
        </div>
        <span class="author">Par {{ comment.author }} </span>
        <span class="date" v-if="comment.date">
          le {{ formatDate.displayDate(comment.date) }} à
          {{ formatDate.displayHour(comment.date) }}
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
            minlength="50"
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
</template>

<script>
const formatDate = require("../../helper/formatDate");

export default {
  name: "CommentPublication",
  props: ["idPublication", "comments"],
  data() {
    return {
      comment: null,
      currentProfile: {},
      formatDate,
    };
  },
  mounted() {
    this.currentProfile = this.$store.state.profile;
  },
  methods: {
    sendComment() {},
  },
  computed: {},
};
</script>
<style lang="scss">
.comment-container {
  background-color: rgb(250, 250, 250);

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