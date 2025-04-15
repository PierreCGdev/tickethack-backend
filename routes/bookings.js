var express = require('express');
var router = express.Router();
const moment = require('moment');

const Booking = require('../models/bookings');
const Trip = require('../models/trips');

router.get('/', async function(req, res) {
    const Bookings = await Booking.find().populate('cart.dateId');
    const result = []

    Bookings.forEach(booking => {
        booking.cart.forEach(item => {
            if (item.valid && item.dateId) {
                const Trip = item.dateId;
                const now = moment()
                const departureTime = moment(trip.date)
                const duration = moment.Duration(departureTime.diff(now))

                result.push({
                    departure: Trip.departure,
                    arrival: Trip.arrival,
                    departureTime: Trip.date,
                    price: Trip.price,
                    timeUntilDeparture: `${duration.hours()}h ${duration.minutes()}m`,
                })
            }
        })
    })
    res.json(result);
});

module.exports = router;