let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const fetchURL = "http://localhost:3000/toys"

// fetch call
fetch(fetchURL)
.then(res => res.json())
.then((toyArray) => toyArray.forEach((toyObj) => renderToy(toyObj)))

// render toy card
function renderToy(toyObj){
  // individual elements
  const toyDiv = document.createElement('div')
  toyDiv.className = 'card'

  const toyName = document.createElement('h2')
  toyName.innerText = toyObj.name

  const toyImg = document.createElement('img')
  toyImg.src = toyObj.image
  toyImg.className = 'toy-avatar'

  const toyLikes = document.createElement('p')
  toyLikes.innerText = 'Number of likes: ' + toyObj.likes
// i couldn't figure out the patch likes so i did this instead
  const likeBtn = document.createElement('button')
  likeBtn.innerText = '❤️'
  likeBtn.addEventListener('click', () => {
    ++toyObj.likes
    toyLikes.innerText = `Number of likes: ${toyObj.likes}`
  })
  // create card
  toyDiv.append(toyName, toyImg, toyLikes, likeBtn)
  // append card to div
  const toyCollection = document.getElementById('toy-collection')
     toyCollection.appendChild(toyDiv)
}

//form event handler to prevent default
const form = document.querySelector('.add-toy-form')

form.addEventListener('submit', submitHandler)

function submitHandler(event){
  event.preventDefault()
  // capture form data
  const newToy = {
    name: event.target.name.value,
    likes: 0,
    image: event.target.image.value
  }

  window.scrollTo(0,document.body.scrollHeight)
  renderToy(newToy)
  event.target.reset()
  
  // post new card
  fetch(fetchURL, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newToy)
  })

}

