import { createStore } from 'vuex'
const publicationsService = require('../services/publication');

export default createStore({
  state: {
    token: '',
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
      const p = publicationsService.getAll();
      context.commit('setPublications', p);
    },
    getPublicationById(context, id) {
      const p = publicationsService.findOne(id);
      console.log(p);
      context.commit('setCurrentPublication', p);
    }
  },
  modules: {
  }
})
