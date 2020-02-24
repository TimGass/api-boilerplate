import * as express from "express";
import controller from "./controller";
import passport from 'passport';

export default express
  .Router()
  .post("/", controller.create)
  .delete(
    "/",
    passport.authenticate("headerapikey", {
      session: false,
    }),
    controller.remove
  )
  .patch(
    "/",
    passport.authenticate("headerapikey", {
      session: false,
    }),
    controller.update
  );
