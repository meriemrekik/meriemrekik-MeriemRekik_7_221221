const moment = require("moment");

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

module.exports = { displayDate, displayHour, displayDateAndHour }