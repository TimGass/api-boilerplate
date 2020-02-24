import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import AccessToken from './models/AccessToken';
import { User } from "./models/User";
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, async function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, { message: "Incorrect username." });
      }
      const result = await User.authenticate(user, password);
      if (!result) {
        return done(null, { message: "Incorrect password." });
      }
      AccessToken.create({ token: user.generateJWT(), user: user._id }, (err, token) => {
        if (err) {
          return done(err);
        }
        token.user = user;
        return done(null, token);
      });
    });
  })
);

passport.use(
  new HeaderAPIKeyStrategy(
    { header: "Authorization", prefix: "Bearer " },
    false,
    function(apikey, done) {
      AccessToken.findOne({ token: apikey }).populate('user').exec(function(err, acesstoken) {
        if (err) {
          return done(err);
        }
        if (!acesstoken) {
          return done(null, false);
        }
        return done(null, acesstoken.user);
      });
    }
  )
);

