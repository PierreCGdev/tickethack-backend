var express = require('express');
var router = express.Router();
const moment = require('moment'); 

const Trip = require('../models/trips');

router.get('/:cityName', function(req, res) {
    Trip.find({departure: { $regex: new RegExp(req.params.cityName, "i") }})
    .then(data => {
        if(data.length > 0){
            res.send({result : true, trips: data})
        }else{
            res.send({result : false, error : "city not found"})
        }
        })
    });

router.get('/', function(req, res) {
    const departure = req.body.departure.trim();
    const arrival = req.body.arrival.trim();
    const startDate = moment(req.body.date).startOf('day');
    const endDate = moment(req.body.date).endOf('day');
    Trip.find({ 
        departure: { $regex: new RegExp(`^${departure}$`, "i") },
        arrival: { $regex: new RegExp(`^${arrival}$`, "i") },
        date: {
                    $gte: startDate,
                    $lte: endDate,
                }
        }
    )
    .then(
        data => {
        if(data.length > 0){
            // const filteredData = data.filter((e) => e.date.toString().slice(0,9) === req.body.date.toString().slice(0,9))
            res.send({
                result : true, 
                trips: data})
        }else{
            res.send({result : false, error : "trip not found"})
        }
        }
    )
    });

module.exports = router;