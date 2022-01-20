<template lang="">
<div class="container-fluid">

  <header class="d-flex flex-wrap justify-content-center py-3 mb-4">
      <router-link to="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <img alt="Vue logo" class="logo" src="../assets/logo.svg">
      </router-link>

      <ul class="nav nav-pills">
        <li  v-for="(lien, index) in liens" :key="index" class="nav-item">
          <router-link v-bind:to="lien.url" class="nav-link">{{ lien.text }}</router-link>
        </li>
      </ul>
  </header>


<!--
    <div class="d-flex justify-content-between menu">
      <router-link to="/" >
        <img alt="Vue logo" class="logo" src="../assets/logo.svg">
        </router-link>  

        <nav>
            <ul class="nav">
                <li  v-for="(lien, index) in liens" :key="index" class="nav-item">
                    <router-link class="nav-link" v-bind:to="lien.url">{{ lien.text }}</router-link>
                </li>
            </ul>
        </nav>

    </div>

-->

</div>
</template>
<script>
export default {
  name: "Menu",
  props: ["liens"],
};
</script>
<style lang="scss">
.logo {
  max-height: 30px;
  width: auto;
}
.menu {
  margin: 20px auto;
}
</style>