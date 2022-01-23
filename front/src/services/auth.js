import axios from "axios";
import config from "../config";

/**
 * @param {String} email
 * @param {String} password
 *
 * @return {Promise}
 */
function sigIn(email, password) {
    return axios.post(`${config.API_URL}/auth/login`, {
        email, password
    }, { headers: { "Content-Type": "application/json" } }).then(data => data.data);
}

/**
 * @param {String} email
 * @param {String} password
 * @param {String} nom
 * @param {String} prenom
 *
 * @return {Promise}
 */
function signUp(email, password, nom, prenom) {
    return axios.post(`${config.API_URL}/auth/signup`, {
        email, prenom, nom, password
    }, { headers: { "Content-Type": "application/json" } }).then(data => data.data);
}

/**
 * @param {String} token
 * @param {String} userId
 *
 * @return {Promise}
 */
function getUser(token, userId) {
    const url = `${config.API_URL}/auth/${userId}`
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(url, { headers }).then(data => data.data);
}

/**
 * @param {String} token
 * @param {String} userId
 *
 * @return {Promise}
 */
function deleteUser(token, userId) {
    const url = `${config.API_URL}/auth/${userId}`
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(url, { headers }).then(data => data.data);
}
export { sigIn, signUp, getUser, deleteUser };