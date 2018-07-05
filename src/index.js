document.addEventListener('DOMContentLoaded', function() {

  //element definitions
  const imageId = 7; //Enter your assigned imageId here\
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;
  const likeButton = document.getElementById("like_button");
  const likes = document.getElementById("likes");
  const submitButton = document.getElementById("submit");
  likeButton.addEventListener('click', addLikesFe);
  submitButton.addEventListener('click', submitComment);
  const commentForm = document.getElementById("comment_form");
  const comment = document.getElementById('comment_input');
  const commentUl = document.getElementById('comments')
  let commentList = [];

  //display "random" picture
  function showPic(json){
    document.getElementById("image").src = json.url
    likes.innerText = json.like_count;

    commentList = json.comments
    displayComments();
  };

  (function getPic(inputData) {
      fetch(imageURL, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputData)
    }).then(response => response.json())
    .then(json => {
      showPic(json)
    })
  })();

  //add likes to front end
  function addLikesFe() {
    likes.innerText++
    postLikes();
  }

  //post likes to the backend COME BACK TO THIS
  function postLikesToApi(json){
    json.image_id
  }

  function postLikes() {
    fetch(likeURL, {
      method: 'POST',
      body: JSON.stringify({
        image_id: 7,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
    .then(json => {
      postLikesToApi(json)
    })
  }

  //post comments in the front end
  function submitComment() {
    event.preventDefault();
    displayComments();
    postComments();
  }

  function displayComments(){
    commentList.push({content:comment.value})
    commentUl.innerHTML = ''
    commentList.forEach(function(individualComment){
      let li = document.createElement("li")
      //debugger
      li.innerText = individualComment.content;
      commentUl.append(li);
    })
  }


  //add comments to the back end COME BACK TO THIS
  function postCommentsToApi(json){
    json.image_id;
    json.content;
  }

  function postComments() {
    fetch(commentsURL, {
      method: 'POST',
      body: JSON.stringify({
        image_id: 7,
        content: comment.value
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
    .then(json => {
      postCommentsToApi(json)
    })
  }
});
