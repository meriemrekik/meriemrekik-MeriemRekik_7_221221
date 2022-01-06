const comments = [
    {
        id: "1",
        idPublication: '',
        date: '',
        author: "rekik.meriem@gmail.com",
        text: "Image qui m'a beaucoup amusé !!!",
    },
];

/**
 * @param {String} id
 *
 * @return {?Object}
 */
function findOne(id) {
    return comments.find(p => p.id === id) || null;
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

export { findOne, getAll, create, update, deleteOne };