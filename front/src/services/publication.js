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
function findOne(id) {
    return publications.find(p => p.id === id) || null;
}

function getAll() {
    return publications;
}

function create(p) {
    publications.push(p);
    return p;
}

function update(p) {
    const index = publications.findIndex(pub => pub.id == p.id);
    if (index >= 0) {
        publications[index] = { ...publications[index], ...p };
    }
    return publications[index];
}

function deleteOne(id) {
    const index = publications.findIndex(pub => pub.id == id);
    publications.splice(index, 1)
    return true;
}

function iLike(publicationId, userId, like) {
    console.log(publicationId, userId, like);
}

export { findOne, getAll, create, update, deleteOne, iLike };