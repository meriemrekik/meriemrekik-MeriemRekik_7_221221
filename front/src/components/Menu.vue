<template lang="">
<div class="header">
<div class="container-md">
  <header class="d-flex align-items-center justify-content-between flex-wrap justify-content-md-center justify-content-sm-center   py-3 mb-4">
      <router-link to="/" class="mb-3 mb-md-0 ">
        <img alt="Vue logo" class="logo" src="../assets/logo.svg">
      </router-link>

      <ul class="nav nav-pills">
        <li  v-for="(lien, index) in liens" :key="index" class="nav-item">
          <router-link v-bind:to="lien.url" class="nav-link">{{ lien.text }}</router-link>
        </li>
      </ul>
  </header>
</div>

</div>
</template>
<script>
export default {
  name: "Menu",
  props: ["liens"],
};
</script>
<style lang="scss">
@import "src/assets/scss/style.scss";
.header {
  background-color: $primary-color;

  .logo {
    max-height: 30px;
    width: auto;
  }
  .nav-pills a.nav-link {
    color: #fff;
    margin: 0 0.8em;
    &.router-link-active {
      // border-bottom: 3px solid #fff;
      // border-radius: 0;
      background-color: $secondary-font-color;
      color: #fff;
    }
  }
}
</style>