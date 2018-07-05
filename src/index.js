const imageId = 4

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

const imgContainer = document.getElementById('image_content')

const imgDiv = document.getElementById('image')

const nameDiv = document.getElementById('name')

const likeCounter = document.getElementById('likes')

const submitButton = document.getElementById('submit button')

const imgInfo = {
  name: null,
  url: null,
  like_count: 0,
  comments: []
} ;

function getImageInfo(){
  fetch(imageURL).then(r => r.json()).then(data => function(data){
    imgInfo.name = 'data.name';
    imgInfo.url = data.url;
    imgInfo.like_count = data.like_count;
    imgInfo.comments = data.comments;
  })
}

getImageInfo()

document.addEventListener('DOMContentLoaded', function() {

  let updateMsg = (id, like_count) => {
     const patchConfig = {
         method: 'POST',
         headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
         body: JSON.stringify({
             image_id: imageId,
             like_count: imgInfo.like_count
         })
     }
   return fetch(imageURL, patchConfig)
    }


  function addImageInfo(){
    imgDiv.innerHTML = `img src=${imgInfo.url}`;
    nameDiv.inngerText = `${imgInfo.name}`;
  }

  likeCounter.addEventListener('click', function(event){
    imgInfo.like_count ++;
    likeCounter.inngerText = imgInfo.like_count;
    updateMsg(imageId, imgInfo.like_count )
  })

  submitButton.addEventListener('click', function(event){
    event.preventDefault()
    textField = document.getElementById('comment_input')
    commentObject = {}
    commentObject.content = textField.value
    imgInfo.comments.push(commentObject)
  })

})
