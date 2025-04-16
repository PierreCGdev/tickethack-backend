var express = require('express');
var router = express.Router();
const moment = require('moment'); 
const { checkBody } = require('../modules/checkBody');

const Trip = require('../models/trips');


// route de test 
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

//route utile pour récupérer la liste selon les critères 
router.get('/', function(req, res) {
    const {departure, arrival, date} = req.body
    if(checkBody(req.body,['departure','arrival','date'])){
        const departureTrim = departure.trim();
        const arrivalTrim = arrival.trim();
        //converstion de la date format YYYY-MM-DD en complet et UTC
        const startDate = moment.utc(date).startOf('day');
        const endDate = moment.utc(date).endOf('day');
        Trip.find({ 
            departure: { $regex: new RegExp(`^${departureTrim}$`, "i") },
            arrival: { $regex: new RegExp(`^${arrivalTrim}$`, "i") },
            date: {
                $gte: startDate,
                $lte: endDate,
                    }
            }
        )
        .then(
            data => {
                res.send({
                    result : true, 
                    trips: data,
                })
            }
        )
        }else{
            res.send({result : false, error : "data not valid"})
        }
    }
);

module.exports = router;