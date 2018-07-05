document.addEventListener('DOMContentLoaded', function() {

  const imageId = 2 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageContent = document.getElementById("image_content")

  const image = document.getElementById('image')
  const likeButton = document.getElementById('like_button');
  const likes = document.getElementById('likes');
  const commentForm = document.getElementById('comment_form');
  const commentInput = document.getElementById('comment_input')
  const commentsUl = document.getElementById('comments');

// get request to api
  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(res => res.json())
    .then(data => parseData(data))

// parse data from api and display
  function parseData(data) {
    image.src = data.url;
    likes.innerText = data.like_count;
    data.comments.forEach(function(comment) {
      const newCommentLi = document.createElement('li');
      newCommentLi.innerText = comment.content
      commentsUl.appendChild(newCommentLi)
    })
  }

// event listener on likes button for adding likes
  likeButton.addEventListener('click', function(event) {
    ++likes.innerText;
    addLikesToApi();
  })

// event listener to add a new li element with a comment
  commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    commentsUl.innerHTML += generateCommentLi();
    addCommentToApi(commentInput.value)
    commentInput.value = '';
  })

// generate a new comment li element
  function generateCommentLi() {
    return `
      <li>
        ${commentInput.value}
      <button name="delete" data-action="delete">delete</button>
      </li>
    `
  }

// add likes to api count
  function addLikesToApi() {
    const createObj = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image_id: imageId })
    }
    return fetch(likeURL, createObj);
  }

  // add comments to api
  function addCommentToApi(commentContent) {
    const createObj = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: commentContent, image_id: imageId })
    }
    return fetch(commentsURL, createObj);
  }

  // delete comments html
  commentsUl.addEventListener('click', function(event) {
    if (event.target.dataset.action === 'delete') {
      event.target.parentElement.remove();
      // deleteCommentFromApi()
    }
  })

  // delete comment from Api
  // function deleteCommentFromApi() {
  //   fetch(commentsURL, { method: "DELETE"});
  // }

})
