import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import fs from "fs";

export const handleCloudinary = async (req: Request, res: Response, next: NextFunction) => {
  const cloudinaryResp: any = [];
  const files: any = req.files;
  
  for (const file of files) {
    const upload = await cloudinary.uploader.upload(
      file!.path,
      {
        folder: 'motorshop',
      },

      (err: any, result: any) => result
    );

    fs.unlink(file!.path, (err) => {
      if(err){
        console.log(err)
      }
    });

    cloudinaryResp?.push(upload.url);
  }
  
  return res.json(cloudinaryResp)
  // next();
}