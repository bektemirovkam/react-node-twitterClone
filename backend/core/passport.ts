import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTstrategy } from "passport-jwt";

// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

// const JWTstrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;

import { UserDocumentType, UserModel } from "../models/userModel";
import { generateMD5 } from "./../utils/generateHash";
import { UserModelInterface } from "./../models/userModel";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (username: string, password: string, done: any): Promise<void> => {
      try {
        const user = await UserModel.findOne({
          $or: [{ email: username }, { username: username }],
        }).exec();

        if (!user) {
          return done(null, false);
        }

        if (user.confirmed && user.password === generateMD5(password + process.env.SECRET_KEY)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET_KEY || "123",
      jwtFromRequest: ExtractJwt.fromHeader("token"),
    },
    async (payload: { data: UserDocumentType }, done: any) => {
      try {
        const user = await UserModel.findById(payload.data._id).exec();
        if (user) {
         return done(null, user);
        }
        done(null, false);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// @ts-ignore
passport.serializeUser(function (user: UserModelInterface, done) {
  done(null, user._id);
});

passport.deserializeUser((id: any, done: any) => {
  UserModel.findById(id, (err: any, user: UserModelInterface) => {
    done(err, user);
  });
});

export { passport };
