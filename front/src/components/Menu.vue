<template lang="">
<div class="header">
<div class="container-md">
  <header class=" py-3 mb-4">
      <div class="d-flex align-items-center justify-content-center flex-wrap justify-content-lg-between">

      <router-link to="/">
        <img alt="Vue logo" class="logo" src="../assets/logo.svg">
      </router-link>


      <span id="menu-hamburger" :class="{'opened': opened }" class="d-lg-none" >
        <label  for="check">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <input v-model="opened" type="checkbox" id="check"/> 
      </span>

      <ul class="nav nav-pills d-none d-lg-flex">
        <li  v-for="(lien, index) in liens" :key="index" class="nav-item">
          <router-link v-bind:to="lien.url" class="nav-link">{{ lien.text }}</router-link>
        </li>
      </ul>
      </div>

      <div class="menu-mobile d-block d-lg-none">
        <ul v-if="opened" class="menu-mobile nav nav-pills d-block mt-4" :class="{'hidden': !opened}">
          <li  v-for="(lien, index) in liens" :key="index" class="nav-item">
            <router-link v-bind:to="lien.url" class="nav-link">{{ lien.text }}</router-link>
          </li>
        </ul>
      </div>
  </header>
</div>

</div>
</template>
<script>
export default {
  name: "Menu",
  props: ["liens"],
  data() {
    return {
      opened: false,
    };
  },
  methods: {
    toggleMenu: function () {
      console.log(this.opened);
      this.opened = !this.opened;
    },
  },
};
</script>
<style lang="scss">
</style>