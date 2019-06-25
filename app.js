import express from "express";
import morgan from"morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import bodyParser from "body-parser";
import  {userRouter} from "./router.js";
const app = express();

const handleHome=(req,res)=>res.send("welcome my home")
const handleProfile=(req,res)=>res.send("this is profile")


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet())
app.use(morgan("combined"));

app.get("/",handleHome); 
app.get("/profile",handleProfile);

app.use("/user",userRouter);
export default app;