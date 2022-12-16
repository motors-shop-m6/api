import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import fs from "fs";

export const handleCloudinary = async (req: Request, res: Response) => {
  const cloudinaryResp: any = [];
  const files: any = req.files;
  console.log(files)
  
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

    cloudinaryResp?.push(upload);
  }
  
  return res.json("xd")
}