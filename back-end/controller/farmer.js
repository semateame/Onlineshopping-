const Farmer = require('../model/farmer')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const nodemailer = require('nodemailer')
exports.addimage =(req,res)=>{
    
    Farmer.updateOne({_id:req.params.id},{
        $set:{"image":req.body.imgName}
    }).then(resp=>{
        res.status(200).json(resp)
    }).catch(e=>{
        res.status(200).json({msg:e})
    })
}
exports.addproduct = (req, res) => {
    const { name, price, image, } = req.body
       
    Farmer.updateOne({ _id: req.params.id }, {
        $push: { 'products': { _id: ObjectId(), ...req.body } }
    }).then(reslt => {
        console.log(reslt);
        res.status(200).json({ reslt })
    }).catch(err => {
        res.status(500).json({ err })
    })
}

exports.updateproducts = (req, res) => {
    console.log("****", req.body);
    Farmer.updateOne({
            _id: req.params.id,
            "products._id": ObjectId(req.params.pId)
        }, {
            $set: {
                "products.$.name": req.body.name,
                "products.$.price": req.body.price,
                "products.$.image": req.body.image,
                "products.$.description": req.body.description
            }
        })
        .then(result => {
            res.status(202).json({ result })
        }).catch(err => {
            console.log(err.message);
            res.status(500).json({ err })
        })
}


exports.deleteproduct = (req, res) => {
    console.log("here");
    Farmer.updateOne({
            _id: req.params.id,

        }, {
            $pull: {
                products: {
                    _id: ObjectId(req.params.pId)
                }
            }
        }).then(reslt => {
            res.status(200).json({ reslt })
        })
        .catch(err => {
            res.status(500).json({ err: err.message })
        })
}


exports.getproducts = (req, res) => {

    Farmer.findById({ _id: req.params.id }, { products: 1 })
        .then(resp => {
            res.status(200).json({ resp })
        }).catch(err => {
            res.status(500).json({ err })
        })
}

exports.changeStatus = (req, res) => {
    console.log(req.body);
    Farmer.updateOne({ _id: req.params.id, "orders.order_id": ObjectId(req.body.id) }, {
        $set: {
            "orders.$.status": req.body.status
        }
    }).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json({ msg: err.message })
    })

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'samotiteame@gmail.com',
            pass: 'Missumom4ever#'
        }
    });

    const mailOptions = {
        from: req.body.farmerEmail,
        to: req.body.customerEmail,
        subject: 'Order is ready',
        html: `<h1>HI</h1>
        <p>your order is completed </p>
        <p>Thank you for shopping with us !! </p>
        `
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
exports.getorders = (req, res) => {
    Farmer.findById({ _id: req.params.id }, { orders: 1 })
        .then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(500).json({ msg: err.message })
        })
}
exports.makechaneg = (req, res) => {



}