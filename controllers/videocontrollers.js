
import routes from "../routes";

import Video from "../models/Video"

export const home = async(req,res) =>
{
    try{
        const videos = await Video.find({});
        console.log(videos)
        res.render("home",{'pageTitle':"Home",videos});
    }
    catch(error){
        res.render("home",{'pageTitle':"Home",videos:[]});
    }
   
    
} 
export const search = (req,res) => {    
    const{
        query:{term:searchingBy}
    } = req;
    console.log(searchingBy)
    // const searchingBy = req.query.term; 이건 옛날 방식 ㅇㅇ 위에꺼가 더 최신
    res.render("search",{'pageTitle':"search",searchingBy,videos});
}


export const getUpload= (req,res) => res.render("upload",{'pageTitle':"upload"});
export const postUpload = async(req,res) => {
    const {
        body:{title,description},
        file:{path}

    }=req;

    const newVideo = await Video.create({
        fileUrl:path,
        title,
        description
    });
    console.log(newVideo)
    // //To Do: Upload and save video
    res.redirect(routes.videoDetail(newVideo.id));
};
export const videoDetail = (req,res) => res.render("videoDetail",{'pageTitle':"videoDetail"});
export const editVideo = (req,res) => res.render("editVideo",{'pageTitle':"editVideo"});
export const deleteVideo = (req,res) => res.render("deleteVideo",{'pageTitle':"deleteVideo"});
