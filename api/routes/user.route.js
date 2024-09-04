import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

  //req are d data we send to the api data base 
  //res are the receive from the database
router.get('/test', test);

export default router;