const express = require("express");
const router = express.Router();
const Farmer = require("../model/farmer");
const Customer = require("../model/customer");
const fs = require("fs");
const path = require("path");
const bcyrpt = require('bcryptjs');

router.get("/farmers", (req, res) => {
  Farmer.find({ role: "vendor" })
    .sort({ name: 1 })
    .then((farmers) => {
      res.status(200).json(farmers);
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
});
router.get("/customers", (req, res) => {
  Customer.find({})
    .sort({ name: 1 })
    .then((customers) => {
      res.status(200).json(customers);
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
});
// acativate/deactivate users

router.patch("/customers", async (req, res) => {
  let obj = await Customer.findById({ _id: req.body.id });
  if (obj.activate == true) {
    Customer.updateOne({ _id: req.body.id }, { $set: { activate: false } })
      .then((resp) => {
        res.status(202).json({ resp });
      })
      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  } else {
    Customer.updateOne({ _id: req.body.id }, { $set: { activate: true } })
      .then((resp) => {
        res.status(202).json({ resp });
      })
      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  }
});
//acativate/deactivate farmers
router.patch("/farmers", async (req, res) => {
  let obj = await Farmer.findById({ _id: req.body.id });

  if (obj.activate == true) {
    Farmer.updateOne({ _id: req.body.id }, { $set: { activate: false } })
      .then((resp) => {
        res.status(202).json({ resp });
      })
      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  } else {
    Farmer.updateOne({ _id: req.body.id }, { $set: { activate: true } })
      .then((resp) => {
        res.status(202).json({ resp });
      })
      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  }
});

router.get("/", async (req, res) => {
  let logs = await Log.find().sort({ method: 1 });
  res.status(200).json({ logs });
});
router.patch("/", async (req, res) => {
  console.log(req.body);
  let hased = await bcyrpt.hash(req.body.password, 10);

  let farmer = await Farmer.find({ email: req.body.email });
  console.log(farmer);
  if (farmer[0]) {
    console.log("hi");
    Farmer.updateOne({ email: req.body.email }, { $set: { password: hased } })
      .then((resp) => {
        console.log(resp);
        res.status(200).json({ reponce: resp });
      })
      .catch((err => res.status(500).json({ msg: err.message })));
  } else
    Customer.updateOne({ email: req.body.email }, { $set: { password: hased } })
      .then((resp) => res.status(200).json({ reponce: resp }))
      .catch((err => res.status(500).json({ msg: err.message })));
});

router.get("/log",(req,res)=>{
  let data = ""
  let readStream = fs.createReadStream("access.log","utf8")
  readStream
  .on("data",function(chunk){
    data+=chunk
  })
  .on("end",function(){
    data = data.split("::1 - -")
    res.status(200).json(data)
    console.log(data[1]);
  })
})
module.exports = router;
























// router.get("/log", (req, res) => {
//   let data = "";
//   let readStream = fs.createReadStream("access.log", "utf8");
//   readStream
//     .on("data", function (chunk) {
//       data += chunk;
//     })
//     .on("end", function () {
//       console.log(data);
//       data = data.split("::1 - -");
//       res.json(data);
//     });
// });