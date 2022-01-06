<template lang="">
<div class="container-fluid">
    <div class="d-flex justify-content-between menu">    
        <img alt="Vue logo" class="logo" src="../assets/logo.svg">

        <nav>
            <ul class="nav">
                <li  v-for="(lien, index) in liens" :key="index" class="nav-item">
                    <router-link class="nav-link" v-bind:to="lien.url">{{ lien.text }}</router-link>
                </li>
            </ul>
        </nav>

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
.logo {
  max-height: 30px;
  width: auto;
}
.menu {
  margin: 20px auto;
}
</style>