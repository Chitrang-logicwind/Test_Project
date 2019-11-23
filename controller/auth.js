const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports.getlogin = (request, response, next) => {
  console.log(request.session.loggedin);
  response.render("auth/auth", {
    pagetitle: "Login Page",
    isauthenticated: request.session.loggedin
  });
};

module.exports.postlogin = (req, res, next) => {
  // req.loggedin = true; //once the brand new request (user enter and clickes on page called it) created this re.logeedin was gone forever.
  // response.setHeader("set-cookie", "loggedin=true");
  const email = req.body.email;
  const password = req.body.password;
  //User.findById("5dd67318340f0f0e6fe339cf")
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.redirect("/login");
      }
      bcrypt.compare(password, user.password).then(domatch => {
        if (domatch) {
          req.session.loggedin = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log(err);
            res.redirect("/");
          });
        }
        res.redirect("/login");
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.postlogout = (request, response, next) => {
  request.session.destroy(err => {
    console.log(err);
    response.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    //path: "/signup",
    pagetitle: "Signup",
    isauthenticated: false
  });
};

exports.postSignup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(userobject => {
      if (userobject) {
        //You Already Have an Email account Please Login.
        return res.redirect("/login");
      }
      return bcrypt
        .hash(req.body.password, 12)
        .then(hashedpassword => {
          const user = new User({
            email: req.body.email,
            password: hashedpassword,
            cart: { itmes: [] }
          });
          return user.save();
        })
        .then(() => {
          res.redirect("/login");
        });
    })
    .catch(err => {
      console.log(err);
    });
};
