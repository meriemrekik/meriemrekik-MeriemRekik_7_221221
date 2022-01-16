const comments = [
    {
        id: "1",
        idPublication: "",
        date: "Wed Jan 12 2022 21:44:38 GMT+0100 (heure normale d’Europe centrale)",
        author: "rekik.meriem@gmail.com",
        text: "Image qui m'a beaucoup amusé !!!",
    },
    {
        id: "2",
        idPublication: "",
        date: "Wed Jan 12 2022 21:44:38 GMT+0100 (heure normale d’Europe centrale)",
        author: "teste@gmail.com",
        text: "Très amusant !!!",
    },
    {
        id: "3",
        idPublication: "",
        date: "Wed Jan 12 2022 21:44:38 GMT+0100 (heure normale d’Europe centrale)",
        author: "rekik.meriem@gmail.com",
        text: "Oui c'est pour ca que je vous l'ai partagé !!!",
    },
];

/**
 * @param {String} id
 *
 * @return {?Object}
 */
function findOne(id) {
    return comments.find(p => parseInt(p.id) === id) || null;
}

function getAll() {
    return comments;
}

function create(p) {
    comments.push(p);
    return p;
}

function update(p) {
    const index = comments.findIndex(pub => pub.id == p.id);
    if (index >= 0) {
        comments[index] = { ...comments[index], ...p };
    }
    return comments[index];
}

function deleteOne(id) {
    const index = comments.findIndex(pub => pub.id == id);
    comments.splice(index, 1)
    return true;
}

export default { findOne, getAll, create, update, deleteOne };