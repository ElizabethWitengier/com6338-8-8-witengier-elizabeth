var weatherURL = "https://api.openweathermap.org/data/2.5/weather"
var queryString = "?units=imperial&appid=0a1fa303002be15765aacd2cd1522ee6" + userQuery
var fetchURL = weatherURL + queryString


var weatherSection = document.getElementById('weather')
var form = document.querySelector('form')




form.onsubmit = function(e) {
  e.preventDefault()
  var userQuery = this.search.value
  fetch(fetchURL)
  .then(function(res) {
    return res.json()
  })
  .then(function(data) {
    console.log(data)
  })
}
  

var date = new Date(/* milliseconds go here */)
var timeString = date.toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: '2-digit'
})