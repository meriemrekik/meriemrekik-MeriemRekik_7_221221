<template>
  <div class="main container-md">
    <router-view />
  </div>
</template>

<style lang="scss">
.btn-primary,
.btn-primary:hover,
.btn-primary:active,
.btn-primary:visited {
  color: #fff;
  background-color: #2c3e50;
  border-color: #2c3e50;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-bottom: 4em;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.italic {
  font-style: italic;
}

.bold {
  font-weight: bolder;
}
</style>
