import axios from "axios";
import config from "../config";

/**
 * Trouver une publication par son Id.
 * 
 * @param {String} token
 * @param {String} id
 *
 * @return {Promise}
 */
function findOne(token, id) {
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`${config.API_URL}/publication/${id}`, { headers }).then((data) => data.data);
}

/**
 * Récupère la liste de toutes les publications
 * 
 * @param {String} token
 *
 * @return {Promise}
 */
function getAll(token) {
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`${config.API_URL}/publication`, { headers }).then((data) => data.data);
}

/**
 * On récupère la liste 
 * 
 * @param {String} token
 *
 * @return {Promise}
 */
function getPopulaire(token) {
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`${config.API_URL}/publication/populaire`, { headers }).then((data) => data.data);
}

/**
 * On crée la publication.
 * 
 * @param {String} token
 * @param {String} title
 * @param {String} description
 * @param {File}   file
 *
 * @return {Promise}
 */
function create(token, title, description, file) {
    let formData = new FormData();
    const publication = {
        title,
        description,
    };
    formData.append("publication", JSON.stringify(publication));
    formData.append("image", file);

    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" };
    return axios.post(`${config.API_URL}/publication`, formData, { headers }).then((data) => data.data);
}

/**
 * On met à jour le publication.
 * 
 * @param {String} token
 * @param {String} id Publication ID
 * @param {String} title
 * @param {String} description
 *
 * @return {Promise}
 */
function update(token, id, title, description) {
    const formData = {
        title, description
    }
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(`${config.API_URL}/publication/${id}`, formData, { headers }).then((data) => data.data);
}

/**
 * On supprime la publication selon son id
 * @param {String} token
 * @param {String} id
 *
 * @return {Promise}
 */
function deleteOne(token, id) {
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(`${config.API_URL}/publication/${id}`, { headers });
}

/**
 * Fonction jaime pour les publications.
 * @param {String} token
 * @param {String} publicationId
 * @param {String} like 3 valeurs possible => "1" = j'aime, "0" = ni aimer ni ne pas aimer ou "-1" = je n'aime pas.
 *
 * @return {Promise}
 */
function iLike(token, publicationId, like) {
    const url = `${config.API_URL}/publication/${publicationId}/like`;
    const headers = { Authorization: `Bearer ${token}` };
    const body = { like };
    return axios.post(url, body, { headers });
}

export default { findOne, getAll, getPopulaire, create, update, deleteOne, iLike };