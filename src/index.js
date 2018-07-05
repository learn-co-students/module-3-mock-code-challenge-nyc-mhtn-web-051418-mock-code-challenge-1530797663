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
likeBtn.addEventListener("click", function(e) {
  likesCounter = ++likesCounter;
  likeDisplay.innerHTML = likesCounter;
  saveCounter(likesCounter);
})

//functionality
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
  function buildComments(respComments){
    const array = respComments.map(function(comment){
      return `<div class="commentLine"><li>${comment.content}</li><img class="trashIcon" id=${comment.id} src="https://image.flaticon.com/icons/svg/60/60761.svg" alt="delete button" style="width:10px;height:10px;"></div><br>`;
    })
    return array;
  }

  function displayComments(respComments){
    const builtComment = buildComments(respComments);
    commentContainer.innerHTML = builtComment.join("");
  }

  //image functionality
  function displayImage(r) {
    const rURL = r.url
    const rName = r.name
    imageContainer.innerHTML = `<img src="${rURL}" alt="rName"><h2>"${rName}"</h2>`
    displayLikes(r.like_count);
    displayComments(r.comments);
  }

  //comment functionality
  commentBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const commentSubmitted = commentInput.value;
    commentContainer.innerHTML += `<li id="new1">${commentSubmitted}</li>`;

    const commentsURL = "https://randopic.herokuapp.com/comments"
    const data = {image_id: 1, content: commentSubmitted}
    const configObj = {method: "POST", headers: {'Accept': 'application/json',
  'Content-Type': 'application/json'}, body: JSON.stringify(data)}
    fetch(commentsURL, configObj).then(r => r.json()).then(console.log)
  })

//fetch & init
  fetch(imageURL).then(r => r.json()).then( r => displayImage(r) );

})
