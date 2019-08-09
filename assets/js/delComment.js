import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delBtn = document.getElementsByClassName("comment__delete");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const delComment = (id, target) => {
  const span = target.parentElement;
  const li = span.parentElement;
  commentList.removeChild(li);
  decreaseNumber();
};

const handleRemoveComment = async event => {
  const videoId = window.location.href.split("/videos/")[1];
  const { target } = event;
  console.log(target);
  const commentId = target.id;
  console.log(commentId);
  const response = await axios({
    url: `/api/${videoId}/delComment/${commentId}`,
    method: "POST",
    data: { commentId }
  });
  if (response.status === 200) {
    delComment(commentId, target);
  }
};

function init() {
  for (let i = 0; i < delBtn.length; i += 1) {
    delBtn[i].addEventListener("click", handleRemoveComment);
  }
}

if (delBtn) {
  init();
}
