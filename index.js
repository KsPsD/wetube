import express from "express";
import morgan from"morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
const PORT= 4000;

const handlelListening=()=>console.log(`Listening on: http:/localhost:${PORT}`)
const handleHome=(req,res)=>res.send("welcome my home")
const handleProfile=(req,res)=>res.send("this is profile")
// const betweenHome = (req,res,next)=>{
//     console.log("Between")
//     next();

// }

// app.use(betweenHome) //이렇게 해도되고 밑에
//app.get("/",betweenHome,handleHome)// 이렇게 해도됨 ㅇㅇ 위처럼 하면 순서중요 


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(helmet());
app.use(morgan("combined"))
app.get("/",handleHome) //app.get("/",betweenHome,handleHome)// 이렇게 해도됨 ㅇㅇ 위처럼 하면 순서중요 
//const middleware= (req,res,next)=>{
//    res.send("not happening")
//}  이렇게하면 중간에 미들웨어가 함수끊고 지가 들어옴
app.get("/profile",handleProfile)

app.listen(4000,handlelListening)