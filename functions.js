let params = {
  i: 'tt3896198',
  apikey: '40f5fea6',
}

let queryString = setQueryString()
let image
let title
let loadingCard
let dataCard
window.onload = function () {
  loadingCard = document.getElementById('card-loading')
  dataCard = document.getElementById('card-data-container')
  image = document.getElementById('img-cover-1')
  title = document.getElementById('title-1')
  setLoading(true)
}
function setLoading(status) {
  if (status) {
    loadingCard.classList.remove('d-none')
    dataCard.classList.add('d-none')
    return
  }
  loadingCard.classList.add('d-none')
  dataCard.classList.remove('d-none')
}
async function getData() {
  try {
    console.log(params.i)
    const response = await fetch('https://www.omdbapi.com/?' + queryString)
    const data = await response.json()
    console.log(data)
    checkData(data)
    // setImage(data.Poster)
  } catch (error) {
    console.log(error)
  }
}
function setImage(details) {
  image.src = details.Poster
  title.innerHTML = details.Title
}
function nextMovie() {
  getData()
  console.log('button clicked')
}
function checkData(data) {
  if (data.Poster == null || data.Poster == 'N/A') {
    getRandomMovie()
    return console.log('no movies')
  }
  setImage(data)
  setLoading(false)
}
function getRandomMovie() {
  setLoading(true)
  const randomNumber = Math.floor(Math.random() * 9999999) + 1
  params.i = 'tt' + randomNumber
  queryString = setQueryString()

  console.log('random movie :', params.i)
  getData()
}
function setQueryString() {
  return Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&')
}

getData()
