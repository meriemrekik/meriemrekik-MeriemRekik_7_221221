import { createStore } from 'vuex'
import publicationsService from "../services/publication";

const initState = () => {
  return {
    token: null,
    profile: null,
    publications: [],
    publicationsPopulaire: [],
    currentPublication: null
  }
};
export default createStore({
  // on initialize le state de notre application
  state: initState(),
  // les mutations sont des fonctions qui nous permettent de modifier
  // certaines propriétés de notre state.
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setProfile(state, profile) {
      state.profile = profile;
    },
    setPublications(state, publications) {
      state.publications = [...publications];
    },
    setPublicationsPopulaire(state, publications) {
      state.publicationsPopulaire = [...publications];
    },
    setCurrentPublication(state, publication) {
      state.currentPublication = publication;
    },
    updatePublication(state, publication) {
      let index = state.publications.findIndex(p => p.id == publication.id);
      if (index >= 0) {
        state.publications[index] = { ...state.publications[index], ...publication };
      } else {
        state.publications.unshift(publication);
      }
      // comme la liste des publications normales et populaires 
      // peuvent contenir des publications identique alors quand on mes à jour une publication dans une
      // on verifie si elle apparait pas dans l'autre et on la modifie
      index = state.publicationsPopulaire.findIndex(p => p.id == publication.id);
      if (index >= 0) {
        state.publicationsPopulaire[index] = { ...state.publicationsPopulaire[index], ...publication };
      } else {
        state.publicationsPopulaire.unshift(publication);
      }


    }
  },
  // Les actions c'est des sortent de mutations
  // mais pour lesquels on fait appel à des requetes http
  // Une fois qu'on a fait notre call on utilise la mutitation qui nous interesse
  // pour mettre à jour notre state
  actions: {
    getPublications(context) {
      publicationsService.getAll(this.state.token).then((p) => {
        context.commit('setPublications', p);
      });
    },
    getPublicationsPopulaires(context) {
      publicationsService.getPopulaire(this.state.token).then((p) => {
        context.commit('setPublicationsPopulaire', p);
      });
    },
    getPublicationById(context, id) {
      publicationsService.findOne(this.state.token, id).then((p) => {
        context.commit('setCurrentPublication', p);
      });
    },
    updatePublication(context, id) {
      publicationsService.findOne(this.state.token, id).then((p) => {
        context.commit('updatePublication', p);
      });
    },
    deletePublication(context, id) {
      const p = this.state.publications.filter((p) => p.id != id);
      const p_pop = this.state.publicationsPopulaire.filter((p) => p.id != id);

      context.commit('setPublications', p);
      context.commit('setPublicationsPopulaire', p_pop);
    },
    disconnect() {
      this.state.token = null;
      this.state.profile = null;
      this.state.publications = [];
      this.state.publicationsPopulaire = [];
      this.state.currentPublication = null;
    }
  },
  modules: {
  }
})
