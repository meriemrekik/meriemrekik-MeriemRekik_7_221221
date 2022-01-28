<template>
  <Menu :liens="liensMenu" />
  <div class="container-md !direction !spacing">
    <div
      class="row ${1| ,row-cols-2,row-cols-3, auto,justify-content-md-center,|}"
    >
      <div
        class="
          row
          ${1|
          ,row-cols-2,row-cols-3,
          auto,justify-content-md-center,|}
        "
      >
        <div class="col-12">
          <h4><i class="bi bi-person-circle"></i> Mon Profile</h4>
          <div id="profile-container" class="mt-5 mb-5">
            <p>
              <span class="label">Nom </span>
              {{ userDisplayed.nom }}
            </p>
            <p>
              <span class="label">Prénom</span>
              {{ userDisplayed.prenom }}
            </p>
            <p>
              <span class="label">Email</span>
              {{ userDisplayed.email }}
            </p>

            <p v-if="userDisplayed.isAdmin">
              Vous êtes identifié sur ce site en tant qu'Administrateur.
            </p>
          </div>

          <a
            class="btn btn-danger btn-sm"
            href="#"
            role="button"
            data-bs-toggle="modal"
            :data-bs-target="'#deleteCurrentUser'"
            >Supprimer mon profile
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    :id="'deleteCurrentUser'"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Supprimer Publication
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          v-if="this.$store.state.profile.id == userDisplayed.id"
          class="modal-body"
        >
          Etes-vous sure de vouloir supprimer votre profile ? Toutes les
          publications que vous avez réalisé ainsi que les commentaires et likes
          associés à ce compte seront perdu pour toujours.
        </div>
        <div v-else class="modal-body">
          Etes-vous sure de vouloir supprimer le profile de cet utilisateur ?
          Toutes les publications qu'il a réalisé ainsi que tous ses
          commentaires et likes associés seront perdu pour toujours.
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Annuler
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            v-on:click="deleteUser()"
          >
            Oui je supprime
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { onMounted } from "vue";
import Menu from "@/components/Menu.vue";
const authUserService = require("../services/auth");

export default {
  name: "DetailProfile",
  data() {
    return {
      userDisplayed: {},
      token: null,
      liensMenu: [
        { url: "/", text: "Accueil" },
        { url: "addPublication", text: "Ajouter une publication" },
        { url: "profile", text: "Profile" },
        { url: "signOut", text: "Déconnexion" },
      ],
    };
  },
  mounted() {
    // on recupère le token présent dans notre store
    this.token = this.$store.state.token;

    let idUserRequested = null;
    // Si on a un id dans la route que l'on veut afficher
    // ET (Si l'utilisateur est un admin
    // ou si l'id dans la route et le même que son id de profile)
    if (
      this.$route.params.id &&
      (this.$store.state.profile.isAdmin ||
        this.$store.state.profile.id == this.$route.params.id)
    ) {
      // on va recuperer l'utilisateur avec l'id dans notre url
      idUserRequested = this.$route.params.id;
    } else {
      // sinon on récupèrera le profile de l'utilisateur connecté maintenant
      idUserRequested = this.$store.state.profile.id;
    }

    // on récupère l'utilisateur que l'ont veut afficher
    authUserService
      .getUser(this.token, idUserRequested)
      .then((user) => {
        this.userDisplayed = user;
      })
      .catch((error) => {
        console.warn(error);
      });
  },
  components: {
    Menu,
  },
  methods: {
    deleteUser: function () {
      authUserService
        .deleteUser(this.token, this.userDisplayed.id)
        .then(() => {
          if (this.$store.state.profile.isAdmin) {
            this.$router.push("/");
          } else {
            this.$router.push("/signOut");
          }
        })
        .catch((error) => {
          console.warn(error);
        });
    },
  },
  computed: {},
};
</script>
<style lang="scss">
.home {
  margin-top: 60px;
}
.label {
  display: inline-block;
  width: 100px;
}
</style>

