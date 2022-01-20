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
  state: initState(),
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

      index = state.publicationsPopulaire.findIndex(p => p.id == publication.id);
      if (index >= 0) {
        state.publicationsPopulaire[index] = { ...state.publicationsPopulaire[index], ...publication };
      } else {
        state.publicationsPopulaire.unshift(publication);
      }


    }
  },
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
