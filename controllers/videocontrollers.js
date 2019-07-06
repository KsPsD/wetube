import {videos} from "../db"    
    


export const home = (req,res) => res.render("home",{'pageTitle':"Home",videos});
export const search = (req,res) => {    
    const{
        query:{term:searchingBy}
    } = req;
    console.log(searchingBy)
    // const searchingBy = req.query.term; 이건 옛날 방식 ㅇㅇ 위에꺼가 더 최신
    res.render("search",{'pageTitle':"search",searchingBy,videos});
}


export const upload= (req,res) => res.render("upload",{'pageTitle':"upload"});
export const videoDetail = (req,res) => res.render("videoDetail",{'pageTitle':"videoDetail"});
export const editVideo = (req,res) => res.render("editVideo",{'pageTitle':"editVideo"});
export const deleteVideo = (req,res) => res.render("deleteVideo",{'pageTitle':"deleteVideo"});
