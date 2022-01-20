import axios from "axios";
import config from "../config";

/**
 * @param {String} id
 *
 * @return {?Object}
 */

function getAll(token, publicationId) {
    const url = `${config.API_URL}/publication/${publicationId}/comment`;
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(url, { headers }).then((data) => data.data);
}

function create(token, publicationId, comment) {
    const url = `${config.API_URL}/publication/${publicationId}/comment`;
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(url, { comment: { content: comment } }, { headers }).then((data) => data.data);
}

function deleteComment(token, publicationId, commentId) {
    const url = `${config.API_URL}/publication/${publicationId}/comment/${commentId}`;
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(url, { headers }).then((data) => data.data);
}

export default { getAll, create, deleteComment };