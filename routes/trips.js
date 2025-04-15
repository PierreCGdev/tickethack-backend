var express = require('express');
var router = express.Router();
const moment = require('moment'); 
const { checkBody } = require('../modules/checkBody');

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
    if(checkBody(req.body,['departure','arrival','date'])){
        const departure = req.body.departure.trim();
        const arrival = req.body.arrival.trim();
        const statLocal = moment(req.body.date).utc()
        const enLocal = moment(req.body.date).utc()
        const startDate = statLocal.startOf('day');
        const endDate = enLocal.endOf('day');
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
                res.send({
                    result : true, 
                    trips: data,
                })
            }else{
                res.send({result : false, error : "trip not found"})
            }
            }
        )
        }else{
            res.send({result : false, error : "data not valid"})
        }
    }
);

module.exports = router;