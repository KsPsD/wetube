import routes from "./routes";

export const localMiddleware=(req,res,next)=>{
    res.locals.siteName="WeTube";
    res.locals.routes =routes;
    next(); //잊어버리지 마라 미들웨어 하고 넘겨줘야됨
};