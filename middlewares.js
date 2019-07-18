import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: false,
    id: 1
  };
  next(); // 잊어버리지 마라 미들웨어 하고 넘겨줘야됨
};

export const uploadVideo = multerVideo.single("videoFile");
