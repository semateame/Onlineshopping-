const Farmer = require("../model/farmer");
const Customer = require("../model/customer");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
exports.Signup = (req, res) => {
  console.log("===>",req.body);
  
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).json({ msg: "all fields are required " });
  } else {
    if (req.body.role === "vendor" || req.body.role === "admin") {
      Farmer.find({
        email: req.body.email
      })
        .then((result) => {
          // console.log(result);
          if (result.length !== 0) {
            res.status(500).json({ msg: "user Already exists" });
          } else {
            return bcrypt
              .hash(req.body.password, 12)
              .then((hashPassword) => {
                let farmer = new Farmer({
                  name: req.body.name,
                  email:req.body.email,
                  password: hashPassword,
                  role: req.body.role,
                });

                return farmer.save();
              })
              .then((user) => {
                console.log(user);
                const token = jwt.sign({ id: user._id }, "task", {
                  expiresIn: 3600,
                });
                res.status(200).json({ token, user });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          res.status(500).json({
            msg: err.message,
          });
        });
    } else if (req.body.role === "customer") {
     console.log(req.body);

      Customer.find({ email: req.body.email })
        .then((result) => {
          if (result.length !== 0) {
            res.status(500).json({ msg: "user Already exists" });
          } else {
            return bcrypt
              .hash(req.body.password, 12)
              .then((hashPassword) => {
                let customer = new Customer({
                  name: req.body.name,
                  email: req.body.email,
                  password: hashPassword,
                  role: req.body.role,
                });

                return customer.save();
              })
              .then((user) => {
                const token = jwt.sign({ id: user._id }, "task", {
                  expiresIn: 3600,
                });
                res.status(200).json({
                  token: token,
                  data: user,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          res.status(500).json({
            msg: "request denied",
          });
        });
    }
  }
};

exports.login = (req, res) => {
  let token;
  console.log("7777",req.body);
  //console.log(req.body);
  //const { email, password, role } = req.body;
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ msg: "all fields are required " });
  } else {
    if (req.body.role === "vendor" || req.body.role ==="admin") {
      Farmer.findOne({ email: req.body.email })
        .then((vendor) => {
          if (!vendor.activate) {
            res.status(400).json({ msg: "denied" });
          } else {
            if (vendor) {
              bcrypt.compare(req.body.password, vendor.password).then((matched) => {
                if (matched) {
                  token = jwt.sign(
                    { id: vendor._id, role: vendor.role },
                    "task",
                    { expiresIn: 3600 }
                  );
                  res.status(200).json({ token, vendor });
                } else {
                  res.status(500).send({ msg: "Invaild password" });
                }
              });
            }
          }
        })
        .catch((err) => {
          res.status(500).json({
            msg: err.message,
          });
        });
    } else if (req.body.role === "customer") {
      Customer.findOne({ email: req.body.email })
        .then((customer) => {
          if (customer && customer.activate) {
            
            bcrypt
              .compare(req.body.password, customer.password)
              .then((matched) => {
                if (matched) {
                  const token = jwt.sign({ id: customer._id,role: customer.role  }, "task", {
                    expiresIn: 3600,
                  });
                  res.status(200).json({
                    token,
                    customer,
                  });
                } else {
                  res.status(500).json({
                    msg: "Invaild password",
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            res.status(500).json({
              msg: "Access denied",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
