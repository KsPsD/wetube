import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); // 순서대로 정렬 최근껄 위로 두겠다

    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  console.log(searchingBy);
  // const searchingBy = req.query.term; 이건 옛날 방식 ㅇㅇ 위에꺼가 더 최신
  res.render("search", { pageTitle: "search", searchingBy, videos });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "upload" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  console.log(newVideo);
  // //To Do: Upload and save video
  res.redirect(routes.videoDetail(newVideo.id)); // 무조건 redirect 임 중요
};
export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    // console.log(video);
    console.log(video.comments);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    if (video.creator.id !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findByIdAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findbyId(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment.id);
    req.user.comments.push(newComment.id);
    video.save();
    req.user.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
export const postDeleteComment = async (req, res) => {
  const {
    params: { id, commentId },
    user
  } = req;
  try {
    const video = await Video.findById(id).populate("comments");
    const DelComment = await Comment.findById(commentId);
    console.log(id);
    if (String(DelComment.creator) !== user.id) {
      throw Error();
    } else {
      await video.comments.pull(commentId);
      video.save();
      await Comment.findOneAndRemove({ _id: id });
      await user.comments.splice(user.comments.indexOf(id), 1);
      console.log(user.comments);
    }
  } catch (error) {
    res.status(400);
    res.send(
      JSON.stringify({
        error
      })
    );
  } finally {
    res.end();
  }
};
