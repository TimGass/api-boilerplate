import userRouter from './api/controllers/users/router';
import LoginController from './api/controllers/login';
import MeController from './api/controllers/me';
import passport from 'passport';

export default function routes(app) {
  app.get("/api/v1/me", passport.authenticate('headerapikey', { session: false }), MeController.me);
  app.post(
    "/api/v1/login",
    passport.authenticate("local", {
      session: false,
      successRedirect: false,
      failureRedirect: false
    }),
    LoginController.login
  );
  app.use('/api/v1/users', userRouter);
}
