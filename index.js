//DOM elements
var weatherContainer = document.getElementById('weather')
var form = document.querySelector('form')
var inputE1 = document.querySelector('input')


form.onsubmit = function(e) {
  //prevent page from refreshing
  e.preventDefault()

  //caputure user's input from form field
  var userInput = inputE1.value.trim()

  //abort API call if the user enters no value
  if (!userInput) return

  //call API and update the page
  getWeather(userInput)
    .then(displayWeatherInfo)
    .catch(displayNotFound)

  //reset form field to a blank state
  inputE1.value = ""
}

//call the OpenWeather API and return an object of weather info
function getWeather(query) {
  //default search to USA
  if(!query.includes(",")) query += ',us'

  //return fetch call which returns a promise
  //allows us to call .then on this function
  return fetch(
  'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&appid=0a1fa303002be15765aacd2cd1522ee6'
  )
  .then(function(res){
    return res.json()
  })
  .then(function(data){
    //location is not found, throw err/reject promise
    if(data.cod === "404") throw new Error('location not found')

    //create weather icon URL
    var iconUrl = "https://openweathermap.org/img/wn/" + 
    data.weather[0].icon +
    '@2x.png'

    var description = data.weather[0].description
    var actualTemp = data.main.temp
    var feelsLikeTemp = data. main.feels_like
    var place = data.name + ", " + data.sys.country

    //creat JS date object from Unix
    var updatedAt = new Date(data.dt * 1000)

    //this object is use by displayWeatherInfo to update the HTML
    return{
      coords: data.coord.lat + "," + data.coord.lon,
      description: description,
      iconUrl: iconUrl,
      actualTemp: actualTemp,
      feelsLikeTemp: feelsLikeTemp,
      place: place,
      updatedAt: updatedAt
    }
  })
}

//show error message when location is not found
function displayNotFound(){
  //clear any previous weather information
  weatherContainer.innerHTML = "";

  //create h2, add error message, and add to page
  var errMessage = document.createElement('h2')
  errMessage.textContent = "Location not found"
  weatherContainer.appendChild(errMessage)
}

//update HTML to display weather info
function displayWeatherInfo(weatherObj){
  //clears previous weather info
  weatherContainer.innerHTML = "";

  //insert linebreak
  function addBreak(){
    weatherContainer.appendChild(document.createElement('br'))
  }

  //weather location element
  var placeName = document.createElement('h2')
  placeName.textContent = weatherObj.place
  weatherContainer.appendChild(placeName)

  //link element for location
  var whereLink = document.createElement('a')
  whereLink.textContent = "Click to view map"
  whereLink.href = "https://www.google.com/maps/search/?api=1&query=" + weatherObj.coords
  whereLink.target = "__BLANK"
  weatherContainer.appendChild(whereLink)

  //weather icon img
  var icon = document.createElement('img')
  icon.src = weatherObj.iconUrl
  weatherContainer.appendChild(icon)

  //weather description
  var description = document.createElement('p')
  description.textContent = weatherObj.description
  description.style.textTransform = 'capitalize'
  weatherContainer.appendChild(description)
  
  addBreak()

  //current temperature
  var currentTemp = document.createElement('p')
  currentTemp.textContent = "Current: " + weatherObj.actualTemp + "° F"
  weatherContainer.appendChild(currentTemp)   

  //feels like temperature
  var feelsLikeTemp = document.createElement('p')
  feelsLikeTemp.textContent = "Feels like: " + weatherObj.feelsLikeTemp + "° F"
  weatherContainer.appendChild(feelsLikeTemp)   

  addBreak()

  //time weather was last updated
  var updatedAt = document.createElement('p')
  updatedAt.textContent = "Last updated: " + weatherObj.updatedAt.toLocaleTimeString(
    'en-US',
    {
      hour: 'numeric',
      minute: '2-digit'
    }
  )
  weatherContainer.appendChild(updatedAt)
}
   

