import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import { Query } from "mongoose";
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  // 여기서 언더바는 안쓸 변수들 없애는거임
  console.log(profile);
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    if (email === null) {
      return cb(null, null);
    }
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl
    });

    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"] //여기에 스코프 추가해주면 콜백에서 가져오는 정보 늘어남
});
export const googleLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  // 여기서 언더바는 안쓸 변수들 없애는거임
  console.log(profile);
  const {
    _json: { sub: id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    if (email === null) {
      return cb(null, null);
    }
    const user = await User.findOne({ email });
    if (user) {
      user.googleId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      googleId: id,
      avatarUrl
    });

    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGoogleLogIn = (req, res) => {
  res.redirect(routes.home);
};
export const logout = (req, res) => {
  req.logout();
  // TO Do : process log out
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};
export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "UserDetail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "EditProfile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routes.me);
  } catch (error) {
    console.log(error);
    res.redirect("editProfile", { pageTitle: "Edit Profile" });
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "ChangePassword" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(routes.changePassword);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(routes.changePassword);
  }
};
