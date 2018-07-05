//Important DOM elements
let likeButton = document.getElementById('like_button')
let commentField = document.getElementById('comment_input')
let likeHTML = document.getElementById('likes')
let commentForm = document.getElementById('comment_form')
let commentsHMTL = document.getElementById('comments')


document.addEventListener('DOMContentLoaded', function() {
  const imageId = 3 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let imageData;

  //Async
  fetchImage(imageData, imageURL);
  loadLikes();
})

//add click event to like button
likeButton.addEventListener("click", function(event) {
  //load likes from backend
  likeCount += 1;
  //persist in dom
  loadLikes()

  //persist request after dom updates
  let url = 'https://randopic.herokuapp.com/likes'
  let image_id = 3
  let review;
  review = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: image_id,
  }).then(response => response.json()).then(json => console.log(json))
  console.log(review)
})


commentForm.addEventListener("submit", function(event) {
  event.preventDefault();

  //get what was typed into field
  let input = event.target.elements[0].value

  //add this to the dom as an LI
  addCommentToDOM(input)

  //persist in backend
  // let url = 'https://randopic.herokuapp.com/comments'
  // let image_id = 3
  // let review;
  // review = fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: image_id
  //     content: input,
  // }).then(response => response.json()).then(json => console.log(json))
  // console.log(review)
})

function addCommentToDOM(input) {
  let tag = document.createElement("LI")
  tag.innerText = input;
  commentsHMTL.appendChild(tag)
}

function loadLikes() {
  //async load from database
  likeHTML.innerText = likeCount;
}

function fetchImage(imageData, imageURL) {
  fetch(imageURL).then(response=>response.json()).then(json=>imageData=json).then(() => {addImageToDOM(imageData)});
}


function addImageToDOM(imageData) {
  //find a good spot for the image to go
  let imageSpace = document.getElementById('image');
  //add to the begging on the html
  imageSpace.src = imageData.url
}



//Async Variables

//load likeCount from backend
let likeCount = 0;
