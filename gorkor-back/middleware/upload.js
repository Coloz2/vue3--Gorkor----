import Express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import app from "../app.js";
import { frontNav } from "../models/rebirth.js";

const uploadDir = path.join(__dirname, "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
