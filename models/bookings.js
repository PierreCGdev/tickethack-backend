const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    valid: Boolean,
    dateId: { type: mongoose.Schema.Types.ObjectId, ref: 'trips' },
});

const bookingSchema = mongoose.Schema({
    cart: [cartSchema],
});

const Booking = mongoose.models.trips || mongoose.model('trips', bookingSchema);


module.exports = Booking;