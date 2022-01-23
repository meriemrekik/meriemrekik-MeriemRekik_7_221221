// On utilise la librairie Moment por manipler l'affichage des dates
const moment = require("moment");
moment.locale('fr');

const displayDate = function (stringDate) {
    const maDate = new Date(stringDate);
    return moment(maDate).format("DD/MM/YYYY") || null;
};

const displayHour = function (stringDate) {
    const maDate = new Date(stringDate);
    return moment(maDate).format("hh:mm") || null;
}

const displayDateAndHour = function (stringDate) {
    return `le ${displayDate(stringDate)} à ${displayHour(stringDate)}`;
}

const displayDateFromNow = function (stringDate) {
    const maDate = new Date(stringDate);
    return moment(maDate, "DD/MM/YYYY").fromNow() || null;
};



module.exports = { displayDate, displayHour, displayDateAndHour, displayDateFromNow }