import axios from "axios";
import config from "../config";

/**
 * @param {String} id
 *
 * @return {?Object}
 */
function findOne(token, id) {
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`${config.API_URL}/publication/${id}`, { headers }).then((data) => data.data);
}

function getAll(token) {
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`${config.API_URL}/publication`, { headers }).then((data) => data.data);
}

function getPopulaire(token) {
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`${config.API_URL}/publication/populaire`, { headers }).then((data) => data.data);
}

function create(token, formData) {
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" };
    return axios.post(`${config.API_URL}/publication`, formData, { headers }).then((data) => data.data);
}

function update(token, id, formData) {
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(`${config.API_URL}/publication/${id}`, formData, { headers, data: formData }).then((data) => data.data);
}

function deleteOne(token, id) {
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(`${config.API_URL}/publication/${id}`, { headers });
}

function iLike(token, publicationId, like) {
    const url = `${config.API_URL}/publication/${publicationId}/like`;
    const headers = { Authorization: `Bearer ${token}` };
    const body = { like };
    return axios.post(url, body, { headers });
}

export default { findOne, getAll, getPopulaire, create, update, deleteOne, iLike };