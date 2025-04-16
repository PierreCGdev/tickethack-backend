var express = require('express');
var router = express.Router();
const moment = require('moment');

const Cart = require('../models/carts');

//pour ajouter un voyage : index > cart
router.post('/:id', (req,res) => {
    const id = req.params.id;
    if(id){
        const newCart = new Cart({
            valid: false,
            dateId: req.params.id,
        })
        newCart.save().then(data => res.json(data))
    }else{
        res.json({result : false, error : "empty field"})
    }
})

// pour passer voyage à true : cart > booking
router.put('/:id', (req,res) => {
    const id = req.params.id;
    Cart.findOne({dateId : id}).then(data =>{
        if(data){
            data.valid = true
            data.save().then(Update =>{
            res.json({result: true, data: Update})
            })
            
        }else{
            res.json({error : "id not found"})
        }
        })
    }
)

// pour récupérer tout les voyages : test uniquement
router.get('/all', (req,res) =>{
    Cart.find()
    .populate('dateId')
    .then( data => res.json(data))
})

//pour récupérer tout les voyages non validés : upload de la liste dans cart
router.get('/invalid', (req,res) =>{
    Cart.find({valid : false})
    .populate('dateId')
    .then(
        data => {
            res.json(data)
        }
    )
})

//pour récupérer tout les voyages validés : upload de la liste dans booking
router.get('/valid', (req,res) =>{
    Cart.find({valid : true})
    .populate('dateId')
    .then(
        data => {
            countDown = []
            data.forEach(element => {
                const nowUtc = moment.utc()
                const itemDate = moment(element.dateId.date)
               countDown.push(itemDate.from(nowUtc)) 
            });
            res.json({countdown : countDown, data : data })
        }
    )
})

// pour supprimer un voyage dans cart : delete dans la liste de cart
router.delete('/:id', (req,res) => {
    const id = req.params.id;
    if(id){
        Cart.deleteOne({dateId : id})
        .then(() => Cart.find()
        .then(() => res.json({result: true})))
        
    }else{
        res.json({error : "id not found"})
    }
})

module.exports = router;