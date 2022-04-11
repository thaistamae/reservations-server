const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema ({
    apartmentName: {type: String, required: true},
    checkInDate: {type: Date, required: true},
    checkOutDate: {type: Date, required: true},
    guestsNumber: {type: Number, required: true},
    guestsNames: [{type: String, maxLength: 64}],
    guestsEmails: [{type: String, maxLength: 64}]
})

module.exports = mongoose.model("Reservation", ReservationSchema)