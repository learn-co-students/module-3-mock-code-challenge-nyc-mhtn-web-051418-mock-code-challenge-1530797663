document.addEventListener('DOMContentLoaded', function() {

  const imageId = 5 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likesCounterElement = document.getElementById('likes')

  data = fetch(imageURL).then(r => r.json()).then(infoObj => {
    console.log('hi')
    const imageElement = document.getElementById('image')
    imageElement.src = infoObj.url
    imageElement.dataset.id = imageId

    const imageObj = new Image(infoObj.id, infoObj.url, infoObj.name, infoObj.like_count)

    likesCounterElement.innerText = imageObj.like_count

    infoObj.comments.forEach(item => {
      liElement = document.createElement('li')
      liElement.innerText = item.content
      document.getElementById('comments').append(liElement)
    })

    const containerElement = document.getElementById('container')
    containerElement.addEventListener('click', event => {
      if (event.target.id === 'like_button') {
        likesCounterElement.innerText = ++imageObj.like_count
        const postConfigObj = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image_id: imageId
          })
        }

        fetch(likeURL, postConfigObj).then(r => r.json()).then(response => {
          console.log(response)})
      }
      else if (event.target.dataset.id === 'submit_button') {
        event.preventDefault()
        const commentField = document.getElementById('comment_input')
        liElement = document.createElement('li')
        liElement.innerText = commentField.value
        const ulElement = document.getElementById('comments')
        ulElement.append(liElement)
        const postConfigObj = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image_id: imageId,
            content: commentField.value
          })
        }
        fetch(commentsURL, postConfigObj).then(r => r.json()).then(response => {
          console.log(response)})
        commentField.value = ""
      }

    })

  })

})
