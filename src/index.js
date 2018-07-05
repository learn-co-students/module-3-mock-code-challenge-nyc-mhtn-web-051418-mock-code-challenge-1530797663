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


  //display "random" picture
  function showPic(json){
    document.getElementById("image").src = json.url
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
  }

  // function showLikes(json){
  //   likes.innerText = json.like_count
  // };
  //
  // (function getLikes(inputData) {
  //     fetch(imageURL, {
  //       method: 'GET',
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(inputData)
  //   }).then(response => response.json())
  //   .then(json => {
  //     showLikes(json)
  //   })
  // })();


  //post likes to the backend COME BACK TO THIS
  function postLikesToApi(json){
    json.image_id
  }

  (function postLikes(inputData) {
    fetch(likeURL, {
      method: 'POST',
      keys: {
        image_id: 7,
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
    .then(json => {
      postLikesToApi(json)
    })
  })()


  //post comments in the front end
  function submitComment() {
    event.preventDefault()
    const commentUl = document.getElementById('comments')
    let li
    li = document.createElement('li')


    li.innerText = comment.value
    commentUl.append(li)

    commentForm.reset();
  }


  //add comments to the back end COME BACK TO THIS
  function postCommentsToApi(json){
    json.content
  }

  (function postComments(inputData) {
    fetch(commentsURL, {
      method: 'POST',
      keys: {
        image_id: 7,
        content: comment.value
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
    .then(json => {
      postCommentsToApi(json)
    })
  })()
});
