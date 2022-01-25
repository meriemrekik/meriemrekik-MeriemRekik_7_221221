<template>
  <div class="main">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "src/assets/scss/style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $primary-font-color;
  margin-bottom: 4em;
}
/*
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $primary-color;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
*/
</style>
