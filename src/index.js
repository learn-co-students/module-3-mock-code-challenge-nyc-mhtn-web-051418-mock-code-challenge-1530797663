document.addEventListener('DOMContentLoaded', function() {

  const imageId = 8 //Enter your assigned imageId here

  const imgTag = document.getElementById("image");
  const imgNameTag = document.getElementById("name");

  const likesTag = document.getElementById("likes");
  const likeButton = document.getElementById("like_button");

  const commentsList = document.getElementById("comments");
  const commentsForm = document.getElementById("comment_form");
  const commentInput = document.getElementById("comment_input");

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const testFetch = fetch(imageURL).then( resp => resp.json() ).then( imgJson => loadAndDisplayData(imgJson));

  likeButton.addEventListener("click", addLike);
  commentsForm.addEventListener("submit", addNewComment);
  commentsList.addEventListener("click", handleDeletingComment);

  function handleDeletingComment(event) {
    if (event.target.dataset.commentId) {
      const idToDelete = event.target.dataset.commentId;
      const elementToDelete = event.target.parentElement;
      deleteCommentFromDb(idToDelete);
      deleteCommentFromDom(elementToDelete)
  }
  }

  function deleteCommentFromDom(elementToDelete) {
    elementToDelete.remove();
  }

  function deleteCommentFromDb(idToDelete) {
    const urlToDelete = commentsURL + `/${idToDelete}`;
    const configObj = {
      method: 'DELETE'
    }
    fetch(urlToDelete, configObj);
  }

  function addNewComment(event) {
    event.preventDefault();
    let comment = new Comment(commentInput.value);
    commentInput.value = "";
    handlePostingAndCreatingComment(comment);
  }

  function handlePostingAndCreatingComment(comment) {
    const payload = {
      content: comment.content,
      image_id: imageId
    }
    const configObj = {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  ;
    fetch(commentsURL, configObj).then( resp => resp.json()).then(commentJson => generateAndAppendComment(commentJson))
  }


  function addLike(event) {
    likesTag.innerText++;
    const payload = {image_id: imageId};
    const configObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  fetch(likeURL, configObj)
}

  function loadAndDisplayData(imgObj) {
    imgTag.src = `${imgObj.url}`;
    imgNameTag.innerText = imgObj.name;
    likesTag.innerText = imgObj.like_count
    handleDisplayingComments(imgObj);
  }

  function handleDisplayingComments(imgObj) {
      imgObj.comments.forEach( comment => generateAndAppendComment(comment))
  }

  function generateAndAppendComment(comment) {
    let newComment = document.createElement("li");
    newComment.innerText = comment.content;
    newComment.innerHTML += `<button data-comment-id="${comment.id}">Delete</button>`
    commentsList.appendChild(newComment);
  }
})
