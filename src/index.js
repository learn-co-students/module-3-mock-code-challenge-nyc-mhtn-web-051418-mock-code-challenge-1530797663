document.addEventListener('DOMContentLoaded', function() {

//variables
  //url and image
  const imageId = 1; //Alberto Image id 1
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  //html element selectors
  const imageContainer = document.getElementById("imageContainer");
  const likeBtn = document.getElementById("like_button");
  const commentBtn = document.getElementById("submitComment");
  const commentInput = document.getElementById("comment_input");
  const commentContainer = document.getElementById("comments");

  //like functionality
  let likesCounter = 0;
  let likeDisplay = document.getElementById("likes");

  //delete functionality
  const btnIcon = `<img src="http://icons.iconarchive.com/icons/icons8/windows-8/256/Programming-Delete-Sign-icon.pngv" alt="delete button" style="width:5px;height:5px;">`

//static event listeners
likeBtn.addEventListener("click", function() {
  likesCounter = ++likesCounter;
  likeDisplay.innerHTML = likesCounter;
  saveCounter(likesCounter);
})

comments.addEventListener("click", function(event) {
  if (event.target.dataset.action === "deleteComment") {
    console.log(event.target.id)
    deleteComment(event.target.id);
  }
})


//functionality
  //image functionality
  function displayImage(r) {
    const rURL = r.url
    const rName = r.name
    imageContainer.innerHTML = `<img src="${rURL}" alt="rName"><h2>"${rName}"</h2>`
    displayLikes(r.like_count);
    displayComments(r.comments);
  }
  //like functionality
  function saveCounter(likesCounter){
    const likesURL = "https://randopic.herokuapp.com/likes";

    const data = {image_id: 1};
    const configObj = {method: "POST", headers: {'Accept': 'application/json',
  'Content-Type': 'application/json'}, body: JSON.stringify(data)};
    fetch(likesURL, configObj).then(r => r.json());
  }

  function displayLikes(respLikeCount){
    likesCounter = respLikeCount;
    likeDisplay.innerHTML = likesCounter;
  }

  //comment functionality

  function deleteComment(eventTargetId){
    const deleteCommentURL = `https://randopic.herokuapp.com/comments/${eventTargetId}`;
    console.log(deleteCommentURL)
    fetch(deleteCommentURL, {method: "DELETE"}).then(r=>r.json()).then(init);
  };

  function buildComment(commentContent, commentId) {
    return `<div class="commentLine"><li>${commentContent}</li><img class="trashIcon" data-action="deleteComment" id=${commentId} src="https://image.flaticon.com/icons/svg/60/60761.svg" alt="delete button" style="width:10px;height:10px;"></div><br>`;
  }

  function buildComments(respComments){
    const array = respComments.map(function(comment){
      return buildComment(comment.content, comment.id);
    })
    return array;
  }

  function displayComments(respComments){
    const builtCommentSection = buildComments(respComments);
    commentContainer.innerHTML = builtCommentSection.join("");
  }

  function displayNewComments(commentSubmitted) {
    const returnedBuiltComment = buildComment(commentSubmitted, "newID")
    commentContainer.innerHTML += returnedBuiltComment;
  }

  function replaceNewId(r){
    const newCommentFound = document.getElementById("newID");
    console.log(newCommentFound);
    console.log(r.id);
    newCommentFound.id = r.id;
  }

  commentBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const commentSubmitted = commentInput.value;
    displayNewComments(commentSubmitted)
    const commentsURL = "https://randopic.herokuapp.com/comments"
    const data = {image_id: 1, content: commentSubmitted}
    const configObj = {method: "POST", headers: {'Accept': 'application/json',
  'Content-Type': 'application/json'}, body: JSON.stringify(data)}
    fetch(commentsURL, configObj).then(r => r.json()).then(r => replaceNewId(r));
  })

//fetch & init
function init() {
  fetch(imageURL).then(r => r.json()).then( r => displayImage(r) );
}
init();
})
