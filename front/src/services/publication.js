import axios from "axios";
import config from "../config";

const publications = [
    {
        id: "1",
        title: "Titre 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        date: 'Wed Jan 05 2022 01:56:08 GMT+0100',
        author: "rekik.meriem@gmail.com",
        image: "https://img-9gag-fun.9cache.com/photo/aRrj54j_460swp.webp",
        comments: 12,
        likes: ["1"],
        dislikes: ["2"],
    },
    {
        id: "2",
        title: "Titre 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        date: 'Wed Jan 05 2022 01:06:08 GMT+0100',
        author: "rekik.yasmine@gmail.com",
        image: "https://img-9gag-fun.9cache.com/photo/a91AQQ1_460swp.webp",
        comments: 3,
        likes: ["2"],
        dislikes: ["1"],
    },
    {
        id: "3",
        title: "Titre 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        date: 'Wed Jan 05 2022 00:06:08 GMT+0100',
        author: "rekik.meriem@gmail.com",
        image: "https://img-9gag-fun.9cache.com/photo/aVx3jjn_460swp.webp",
        comments: 1,
        likes: ["1", "2"],
        dislikes: [],
    },
];

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

function create(token, formData) {
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" };
    return axios.post(`${config.API_URL}/publication`, formData, { headers }).then((data) => data.data);
}

function update(p) {
    const index = publications.findIndex(pub => pub.id == p.id);
    if (index >= 0) {
        publications[index] = { ...publications[index], ...p };
    }
    return publications[index];
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

export default { findOne, getAll, create, update, deleteOne, iLike };