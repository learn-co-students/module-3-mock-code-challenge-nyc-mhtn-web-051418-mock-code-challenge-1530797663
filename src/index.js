document.addEventListener('DOMContentLoaded', function() {

  const imageId = 11 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch("https://randopic.herokuapp.com/images/11")
  .then(response=>response.json()) //getting response from fetch() and using json method to turn it into JSON
  .then(json=>getData(json)); //passing in JSON to be handled by this function



})


function getData(data) {

    let myImage = data.url;
    let imageName = data.name;
    let numberOfLikes = data.like_count;
    let commentList = data.comments;
    changeLikes(numberOfLikes);
    addImageToDom(myImage);
    displayComments(commentList);

}

function addImageToDom(myImage) {
  let imageElement = document.getElementById("image")
  imageElement.src = `${myImage}`
}

function changeLikes(numberOfLikes) {

  //numberOfLikes = 20
  let likesCounter = document.getElementById("likes");
  let likeButton = document.getElementById("like_button");
  likesCounter.innerText = numberOfLikes;

  likeButton.addEventListener("click", function(e){
      e.preventDefault();
      numberOfLikes++;
      likesCounter.innerText = numberOfLikes;
      addBackendLikes(numberOfLikes);
  })
}

function addBackendLikes(numberOfLikes) {

    const url = "https://randopic.herokuapp.com/likes"
    let submissionBody = {
      "image_id": 11
    }
    // debugger;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submissionBody)
    })
}


//
// Filling out the input and clicking 'Submit' should append your new comment as an <li> to the comments unordered list element. You should also clear out the comment input, so it's an empty field for the next comment to be added.

function displayComments(commentList){

    let commentUl = document.getElementById("comments");

    commentList.forEach(function(individualComment){
      let li = document.createElement("li")
      li.innerText = individualComment.content;
      commentUl.append(li);
    })
}
