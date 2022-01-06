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
    if (users.find(user => user.email === email && user.password === password)) {
        return { token: 'fsfgg445544555' };
    }
    return null;
}

function signUp(email, password, nom, prenom) {
    if (users.find(user => user.email === email && user.password === password)) {
        users.push({ email, password, nom, prenom });
        return true;
    }
    return false;
}

function getProfile(token) {
    // Dans le futur l'api nous retournera les infos de l'utilisateurs
    if (token) {
        return users[0];
    }
    return null;
}

export { sigIn, signUp, getProfile };