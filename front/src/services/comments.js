import axios from "axios";
import config from "../config";

/**
 * @param {String} token
 * @param {String} publicationId
 *
 * @return {Promise}
 */
function getAll(token, publicationId) {
    const url = `${config.API_URL}/publication/${publicationId}/comment`;
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(url, { headers }).then((data) => data.data);
}

/**
 * @param {String} token
 * @param {String} publicationId
 * @param {String} comment
 *
 * @return {Promise}
 */
function create(token, publicationId, comment) {
    const url = `${config.API_URL}/publication/${publicationId}/comment`;
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(url, { comment: { content: comment } }, { headers }).then((data) => data.data);
}

/**
 * @param {String} token
 * @param {String} publicationId
 * @param {String} commentId
 *
 * @return {Promise}
 */
function deleteComment(token, publicationId, commentId) {
    const url = `${config.API_URL}/publication/${publicationId}/comment/${commentId}`;
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(url, { headers }).then((data) => data.data);
}

export default { getAll, create, deleteComment };