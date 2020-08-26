const Farmer = require("../model/farmer");
const Customer = require("../model/customer");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const nodemailer = require("nodemailer");
const moment = require("moment");
exports.getfarmers = (req, res) => {
  Farmer.find({ role: "vendor",activate:true}, { password: 0 })
    .sort({ rate: -1 })
    
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

exports.getfarmProducts = (req, res) => {
  Farmer.findById({ _id: req.params.id }, { products: 1 })
    .then((resp) => {
      res.status(200).json({ resp });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

exports.addtoCart = async (req, res) => {
  let result = [];
  let subtotal = 0;
  console.log(req.body);
  let resp = await Customer.findById({ _id: req.params.id }, { cart: 1 });

  totalprice = resp.cart.totalprice;
  result = [...resp.cart.item];

  if (!resp.cart.farmerId || resp.cart.farmerId === req.body.farmerId) {
    if (result.length == 0) {
      result.push(req.body);
    } else {
      console.log(req.body._id);
      let arr = result.filter((item, index) => {
        return item._id == req.body._id;
      });
      console.log("hi", arr);
      if (arr.length !== 0) {
        arr[0].qauntity += req.body.qauntity;
      } else {
        result.push(req.body);
      }
    }
    result.forEach((item) => {
      subtotal = subtotal + item.price * item.qauntity;
    });
    console.log("===>", subtotal);
    Customer.updateOne(
      { _id: req.params.id },
      {
        $set: {
          "cart.item": result,
          "cart.totalprice": subtotal,
          "cart.farmerId": req.body.farmerId,
        },
      }
    )
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res
      .status(400)
      .json({ msg: "you can not order from different at same time" });
  }
};

exports.getCart = async (req, res) => {
  try {
    let cart = await Customer.findById({ _id: req.params.id }, { cart: 1 });
    res.status(200).json(cart);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

exports.resetCart = (req, res) => {
  Customer.updateOne(
    { _id: req.params.id },
    {
      $set: { "cart.item": [], "cart.totalprice": 0, "cart.farmerId": "" },
    }
  )
    .then((resp) => {
      res.status(205).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

exports.makeorder = async (req, res) => {
  console.log("order", req.body);

  req.body.order.map(async (item) => {
    await Farmer.updateOne(
      { _id: req.params.id, "products._id": ObjectId(item._id) },
      { $inc: { "products.$.qauntity": -item.qauntity } }
    );
  });

  Farmer.updateOne(
    { _id: req.params.id },
    {
      $push: {
        orders: {
          order_id: ObjectId(),
          ...req.body,
          date: moment().format("MM/DD/YYYY"),
          status: "pending",
        },
      },
    }
  )
    .then((order) => {
      res.status(201).json({ order });
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });

  // sending email
  let farmer = await Farmer.findById({ _id: req.params.id });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "samotiteame@gmail.com",
      pass: "Missumom4ever#",
    },
  });

  const mailOptions = {
    from: farmer.email,
    to: req.body.farmerEmail,
    subject: "New order",
    text: `
      New order has been palced  from
      with total price of ${req.body.totalprice}!! 
      `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.orderhistory = async (req, res) => {
  let orders = await Farmer.find(
    { _id: req.params.id },
    { orders: 1, name: 1 }
  );
  let orderHistory = orders[0];
  let customerOrders = orderHistory.orders.filter((item) => {
    return item.user_id == req.params.usrId;
  });
  res.status(200).json(customerOrders);
};

exports.rate = async (req, res) => {
  let farmer = await Farmer.findById({ _id: req.body.id });
  let rate = farmer.rate;
  if (rate == 0 && (req.body.comment == "bad" || req.body.comment == "good")) {
    res.status(200).json({ msg: "no effect" });
    return;
  } else if (rate == 5 && req.body.comment == "excellent") {
    res.status(200).json({ msg: "no effect" });
    return;
  } else if (req.body.comment == "excellent") {
    rate = rate + 1;
  } else if (req.body.comment == "bad") {
    rate = rate - 1;
  } else if (req.body.comment == "good") {
    res.status(200).json({ msg: "no effect" });
    return;
  }

  Farmer.updateOne(
    { _id: req.body.id },
    {
      $set: { rate: rate },
    }
  )
    .then((rslt) => {
      res.status(200).json(rslt);
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};
