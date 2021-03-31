import express from "express";
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import { UserDocumentType, UserModel } from "../models/userModel";
import { sendEmail } from "../utils/sendEmail";
import { generateMD5 } from "./../utils/generateHash";
import { isValidObjectId } from "../utils/isValidObjectId";

//роуты


class UserController {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const users = await UserModel.find({}).exec();
      res.json({
        status: "success",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!isValidObjectId(userId)) {
        res.status(400).send();
        return;
      }

      const user = await UserModel.findById(userId).exec();

      if (!user) {
        res.status(404).send();
        return;
      }

      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ status: "error", errors: errors.array() });
      }

      const data = {
        email: req.body.email,
        username: req.body.username,
        fullname: req.body.fullname,
        password: generateMD5(req.body.password + process.env.SECRET_KEY),
        confirmHash: generateMD5(
          process.env.SECRET_KEY + Math.random().toString()
        ),
      };

      const user = await UserModel.create(data);

      sendEmail({
        emailParams: {
          emailFrom: "twitter-clone@test.com",
          emailTo: req.body.email,
          subject: "Подтверждение почты Twitter-Clone",
          html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${
            process.env.PORT || 8888
          }/auth/verify?hash=${data.confirmHash}">по этой ссылке</a>`,
        },
        callback: (error: Error | null) => {
          if (error) {
            res.status(500).json({
              status: "error",
              messages: error,
            });
          } else {
            res.status(201).json({
              status: "success",
              data: user,
            });
          }
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        messages: JSON.stringify(error),
      });
    }
  }

  async verify(req: express.Request, res: express.Response): Promise<void> {
    try {
      const hash = req.query.hash as string;

      if (!hash) {
        res.status(400).send();
        return;
      }
      const user = await UserModel.findOne({ confirmHash: hash }).exec();

      if (user) {
        user.confirmed = true;

        await user.save()

        res.json({
          status: "success",
        });

      } else {
        res.status(404).json({
          status: "error",
          errors: "Пользователь не найден",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  async afterLogin(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user ? (req.user as UserDocumentType).toJSON() : undefined;
       
      res.json({
        status: "success",
        data: {
          ...user,
          token: jwt.sign( {data: req.user} , process.env.SECRET_KEY || "123", {expiresIn: "30 days"})
        }
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  async getUserInfo(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user ? (req.user as UserDocumentType).toJSON() : undefined; 
      res.json({
        status: "success",
        data: user
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }
}

export const userCtrl = new UserController();
