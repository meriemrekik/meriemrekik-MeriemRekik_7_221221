
const ACCENT = "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ";

const contientUniquementDesLettresEspaces = function (inputtxt) {
    // eslint-disable-next-line
    let letters = `^[A-Za-z${ACCENT} ](-*[A-Za-z${ACCENT} \s]*)+$`;//regex pour valider les donnée
    let lettersRegexp = new RegExp(letters);
    if (inputtxt.match(lettersRegexp)) {
        return true;
    }
    else {
        return false;
    }
}

const validateEmail = function (mail) {
    // eslint-disable-next-line
    const regexEmail = new RegExp(`[a-z0-9]+@[a-z]+\.[a-z]{2,3}`);
    if (regexEmail.test(mail)) {
        return true;
    }
    return false;
}

const validatePassword = function (password) {
    // eslint-disable-next-line
    const regexPassword = new RegExp(`^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$`);
    if (regexPassword.test(password)) {
        return true;
    }
    return false;
}


module.exports = {
    validateEmail,
    validatePassword,
    contientUniquementDesLettresEspaces
};