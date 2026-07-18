import express, { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // fetches data frm dotenv file

const app = express();

//middlewares

app.use(json({limit:"100mb"}));
app.use(urlencoded({limit:"100mb", extended: true}));
