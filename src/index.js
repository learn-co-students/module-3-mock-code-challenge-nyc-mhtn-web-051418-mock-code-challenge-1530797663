document.addEventListener('DOMContentLoaded', function() {

  const imageId = 8 //Enter your assigned imageId here

  const imgTag = document.getElementById("image");
  const likesTag = document.getElementById("likes");
  const commentsList = document.getElementById("comments");

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const testFetch = fetch(imageURL).then( resp => resp.json() ).then( imgJson => loadAndDisplayData(imgJson));

  function loadAndDisplayData(imgObj) {
    imgTag.src = `${imgObj.url}`;
    likesTag.innerText = imgObj.like_count
    handleDisplayingComments(imgObj);
  }

  function handleDisplayingComments(imgObj) {
      imgObj.comments.forEach( comment => generateAndAppendComment(comment))
  }

  function generateAndAppendComment(comment) {
    let newComment = document.createElement("li");
    newComment.innerText = comment.content;
    commentsList.appendChild(newComment);
  }
})
