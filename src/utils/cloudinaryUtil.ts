import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import multer from "multer";

const CLOUDINARY_URL = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
});

export const upload = multer({
  storage: multer.diskStorage({
    destination: "upload/motorshop",
    filename: (_, file, callback) => {
      const filname = `${file.originalname}`;

      return callback(null, filname)
    }
  })
})