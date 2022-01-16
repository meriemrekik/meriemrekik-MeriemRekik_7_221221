import { createStore } from 'vuex'
import publicationsService from "../services/publication";

export default createStore({
  state: {
    token: null,
    profile: null,
    publications: [],
    currentPublication: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setProfile(state, profile) {
      state.profile = profile;
    },
    setPublications(state, publications) {
      state.publications = publications;
    },
    setCurrentPublication(state, publication) {
      state.currentPublication = publication;
    },
    updatePublication(state, publication) {
      const index = state.publications.findIndex(p => p.id == publication.id);
      if (index >= 0) {
        state.publications[index] = { ...state.publications[index], ...publication };
      } else {
        state.publications.unshift(publication);
      }
    }
  },
  actions: {
    getPublications(context) {
      publicationsService.getAll(this.state.token).then((p) => {
        context.commit('setPublications', p);
      });
    },
    getPublicationById(context, id) {
      publicationsService.findOne(this.state.token, id).then((p) => {
        context.commit('setCurrentPublication', p);
      });
    }
  },
  modules: {
  }
})
