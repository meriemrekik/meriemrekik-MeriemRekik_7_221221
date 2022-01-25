<template>
  <div class="container sign-component">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Se Connecter</div>
          <div class="card-body">
            <form @submit.prevent="signIn">
              <div class="form-group row mb-2 mt-3">
                <label
                  for="email_address"
                  class="col-md-4 col-form-label text-md-right"
                  >Adresse Email</label
                >
                <div class="col-md-6">
                  <input
                    type="email"
                    v-model="email"
                    id="email_address"
                    class="form-control"
                    name="email-address"
                    required
                    autofocus
                  />
                </div>
              </div>

              <div class="form-group row mb-2">
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-right"
                  >Mot de Passe</label
                >
                <div class="col-md-6">
                  <input
                    type="password"
                    v-model="password"
                    id="password"
                    class="form-control"
                    name="password"
                    required
                  />
                </div>
              </div>
              <div class="mt-4">
                <div class="center">
                  <button type="submit" class="btn btn-primary">Valider</button>
                </div>

                <div class="mt-3" v-if="isLoginError">
                  L'email ou le mot de passe renseigné ne correspondent à aucun
                  compte connu
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const auth = require("../../services/auth.js");
export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      isLoginError: false,
    };
  },
  methods: {
    signIn: function () {
      // const response = auth.sigIn(this.email, this.password);
      auth
        .sigIn(this.email, this.password)
        .then((response) => {
          if (response && response.token) {
            const token = response.token;
            // on garde le token dans le store
            this.$store.commit("setToken", token);
            // on recupère le profile de l'utilisateur
            const profile = response.profile;
            // on met le profile dans le store
            this.$store.commit("setProfile", profile);
            // on lance une action pour récupèrer toutes les publications
            // this.$store.dispatch("getPublications");

            this.$router.push("/");
          } else {
            this.isLoginError = true;
          }
        })
        .catch((error) => {
          this.isLoginError = true;
          console.warn(error);
        });
    },
  },
};
</script>
<style lang="scss">
</style>