<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Créer mon compte</div>
          <div class="card-body">
            <form @submit.prevent="signUp">
              <div class="form-group row mb-2">
                <label
                  for="email_address"
                  class="col-md-4 col-form-label text-md-right"
                  >Addresse Email</label
                >
                <div class="col-md-8">
                  <input
                    type="email"
                    v-model="email"
                    id="email_address"
                    class="form-control"
                    name="email-address"
                    v-bind:class="{ 'is-invalid': isEmailError }"
                    required
                    autofocus
                  />
                  <div v-show="isEmailError" class="invalid-feedback">
                    L'email renseigné n'est pas valide
                  </div>
                </div>
              </div>

              <div class="form-group row mb-2">
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-right"
                  >Mot de Passe</label
                >
                <div class="col-md-8">
                  <input
                    type="password"
                    v-model="password"
                    id="password"
                    class="form-control"
                    v-bind:class="{ 'is-invalid': isPasswordError }"
                    name="password"
                    required
                  />
                  <div
                    id="emailHelp"
                    v-show="!isPasswordError"
                    class="form-text"
                  >
                    Le mot de passe doit comporter 8 caractères dont au moins un
                    chiffre, une lettre minuscule et une majuscule
                  </div>
                  <div v-show="isPasswordError" class="invalid-feedback">
                    Le mot de passe doit comporter 8 caractères dont au moins un
                    chiffre, une lettre minuscule et une majuscule
                  </div>
                </div>
              </div>

              <div class="form-group row mb-2">
                <label for="nom" class="col-md-4 col-form-label text-md-right"
                  >Nom</label
                >
                <div class="col-md-8">
                  <input
                    type="text"
                    v-model="nom"
                    id="nom"
                    class="form-control"
                    v-bind:class="{ 'is-invalid': isNomError }"
                    name="nom"
                    required
                  />
                  <div v-show="isNomError" class="invalid-feedback">
                    Le nom renseigné n'est pas valide
                  </div>
                </div>
              </div>

              <div class="form-group row mb-2">
                <label
                  for="prenom"
                  class="col-md-4 col-form-label text-md-right"
                  >Prénom</label
                >
                <div class="col-md-8">
                  <input
                    type="text"
                    v-model="prenom"
                    id="prenom"
                    v-bind:class="{ 'is-invalid': isPrenomError }"
                    class="form-control"
                    name="prenom"
                    required
                  />
                  <div v-show="isPrenomError" class="invalid-feedback">
                    Le prénom renseigné n'est pas valide
                  </div>
                </div>
              </div>

              <div class="col-md-6 offset-md-4">
                <button type="submit" class="btn btn-primary">Valider</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const form = require("../../helper/form.js");
const auth = require("../../services/auth.js");
// const config = require("../../config.js");

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      isEmailError: false,
      password: "",
      isPasswordError: false,
      nom: "",
      isNomError: false,
      prenom: "",
      isPrenomError: false,
    };
  },
  methods: {
    signUp: function () {
      if (this.validateForm()) {
        auth.signUp(this.email, this.password, this.nom, this.prenom);
        console.log("register");
      }
      // Simple POST request with a JSON body using fetch
      /*
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: "Vue POST Request Example" })
                };
                fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
                    .then(response => response.json())
                    .then(data => (this.postId = data.id));
            */
    },
    validateForm: function () {
      if (form.validateEmail(this.email)) {
        this.isEmailError = false;
      } else {
        this.isEmailError = true;
      }

      if (form.contientUniquementDesLettresEspaces(this.nom)) {
        this.isNomError = false;
      } else {
        this.isNomError = true;
      }

      if (form.contientUniquementDesLettresEspaces(this.prenom)) {
        this.isPrenomError = false;
      } else {
        this.isPrenomError = true;
      }

      if (form.validatePassword(this.password)) {
        this.isPasswordError = false;
      } else {
        this.isPasswordError = true;
      }

      if (
        this.isEmailError ||
        this.isNomError ||
        this.isPrenomError ||
        this.isPasswordError
      ) {
        return false;
      }

      return true;
    },
  },
};
</script>
<style lang="">
</style>