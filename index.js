var weatherURL = "https://api.openweathermap.org/data/2.5/weather"
var queryString = "?units=imperial&appid=0a1fa303002be15765aacd2cd1522ee6" + userQuery
var fetchURL = weatherURL + queryString


var weatherSection = document.getElementById('weather')
var form = document.querySelector('form')


form.onsubmit = function(e) {
  e.preventDefault()
  var userQuery = this.search.value.trim()
  if (!userQuery) return
  form.search.value = ""
  fetch(fetchURL)
  .then(function(res) {
    if (res.status !== 200) {
      throw new Error("Location Not Found")
    }
    return res.json()
  })
  .then(renderWeather) 
  .catch(function(err) {
    weatherSection.innerHTML = err.message
  })
}
    
  function renderWeather(data) {
    weatherSection.innerHTML = ""
    var h2 = document.createElement('h2')
    h2.textContent = data.city + ", " + data.city.country
    weatherSection.appendChild(h2)

    var map = document.createElement('a')
    map.href = "tel:" + data.coord /* is coord correct? how am I using the long and lat?*/
    map.textContent = "Click to view map"
    weatherSection.appendChild(map)

    var icon = document.createElement('img')
    icon.src = /* dt and url or weather.icon??? */
    weatherSection.appendChild(icon)

    var description = document.createElement('p')
    description.textContent = data.weather.description.toUpperCase()
    weatherSection.appendChild(description)

    weatherSection.appendChild(document.createElement('br'))

    var currentTemp = document.createElement('p')
    currentTemp.textContent = 'Current:' + convertToF(data.main.temp) + 'F'
    weatherSection.appendChild(currentTemp)   

    var feelsLike = document.createElement('p')
    feelsLike.textContent = 'Feels like:' + convertToF(data.main.feels_like) + 'F'
    weatherSection.appendChild(feelsLike)

    var lastUpdated = document.createElement('p')
    var date = new Date(/* milliseconds go here */)
    var timeString = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    lastUpdated.textContent = 'Last updated:' + timeString
    weatherSection.appendChild(lastUpdated)
  }
}
  
function convertToF(kelvins) {
  return Math.round(((kelvins-273.15)*1.8)+32)
}


