import axios from "axios";
import config from "../config";

const users = [
    {
        id: '1',
        email: "rekik.meriem@gmail.com",
        password: "azerty",
        nom: "Rekik",
        prenom: "Meriem"
    },
    {
        id: '2',
        email: "rekik.yasmine@gmail.com",
        password: "azerty",
        nom: "Rekik",
        prenom: "Yasmine"
    }
];

/**
 * @param {String} email
 * @param {String} password
 *
 * @return {?Object}
 */
function sigIn(email, password) {
    return axios.post(`${config.API_URL}/auth/login`, {
        email, password
    }, { headers: { "Content-Type": "application/json" } }).then(data => data.data);
}

function signUp(email, password, nom, prenom) {
    return axios.post(`${config.API_URL}/auth/signup`, {
        email, prenom, nom, password
    }, { headers: { "Content-Type": "application/json" } }).then(data => data.data);
}

function getProfile(token) {
    // Dans le futur l'api nous retournera les infos de l'utilisateurs
    if (token) {
        return users[0];
    }
    return null;
}

export { sigIn, signUp, getProfile };