document.addEventListener('DOMContentLoaded', function() {

  const imageId = 9

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  var imageObj;





  (function getDataFromApi(){
    fetch(imageURL).then(r => r.json()).then(d => pushImage(d))
  })()

  function pushImage(image){
    var container = document.getElementById("container");

    imageObj = image
    // imageObjCommentArray.forEach(c => console.log(c))


    displayData();

  }

  function updateLikeDatabase () {
  const patchConfig = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
              image_id: imageObj.id,
              like_count: imageObj.like_count

      })
  }
  return fetch(likeURL, patchConfig)
}

  function displayData(){
    container.innerHTML =   `<div class="container">
        <div class="row" id="image_content">
          <div class="card col-md-4"></div>
          <div id="image_card" class="card col-md-4">
            <img src="${imageObj.url} " data-id="image-source">
              <img id="image" data-id/>
              <h4 id="name"></h4>
              <span>Likes:
                <span id="likes">${imageObj.like_count}</span>
              </span>
              <button data-action="like" id="like_button">Like</button>
              <form id="comment_form">
                <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
                <input type="submit" value="Submit" data-action="comment"/>
              </form>
              <ul id="comments">

              </ul>
          </div>
          <div class="card col-md-4"></div>
        </div>
      </div>`
      }

  var likesButton = document.getElementById("likes")

  document.body.addEventListener('click', function(event) {

    if (event.target.dataset.action === 'like') {
      imageObj.like_count = (imageObj.like_count + 1)
        displayData();
        updateLikeDatabase();
        }
    if (event.target.dataset.action === 'comment'){
      var commentInput = document.getElementById('comment_input').value
      var commentField = document.getElementById('comments')
      var inputObj = { content: commentInput }
      var imageCommentsArr = imageObj.comments

        imageCommentsArr.push(inputObj)

        imageCommentsArr.forEach(function(c){
          var line = document.createElement('LI');
            line.innerHTML = c;
            commentField.appendChild(line)
      })
        // console.log(imageCommentsArr)
        event.preventDefault();
        commentInput = ""
        displayData();
        //updateCommentDatabase


    }
      })


function displayComments(){


}






})
