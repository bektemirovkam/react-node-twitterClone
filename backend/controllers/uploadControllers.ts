import express from "express";
import cloudinary from "cloudinary";

//@ts-ignore
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class UploadControllers {
  async upload(req: express.Request, res: express.Response): Promise<void> {
    const file = req.file;
    cloudinary.v2.uploader
      .upload_stream((error, result) => {
        if (error || !result) {
          res.status(500).json({
            status: "error",
            message: error || "upload error",
          });
        }
        res.json({ result }).status(201);
      })
      .end(file.buffer);
  }
}

export const uploadCtrl = new UploadControllers();
