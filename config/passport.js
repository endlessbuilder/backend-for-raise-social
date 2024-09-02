const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/UserModel");
const Category = require("../models/CategoryModel");
const Country = require("../models/CountryModel");
const config = require("./config");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("User");
opts.secretOrKey = config.secretOrKey;
const jwtLogin = new JwtStrategy(opts, (payload, done) => {
  User.findById(payload.id, "", (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(false);
    }
  });
});

passport.use(jwtLogin);
