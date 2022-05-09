const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
  const place = searchBox.getPlaces()[0]
  if (place == null) return
  const latitude = place.geometry.location.lat()
  const longitude = place.geometry.location.lng()
  fetch('/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude
    })
  }).then(res => res.json()).then(data => {
      console.log(data)
      setWeatherData(data, place.formatted_address)
  })
})

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const humidityElement = document.querySelector('[data-humidity]')
const windElement = document.querySelector('[data-wind]')
const backGround = document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + place +"')"

function setWeatherData(data, place){
    locationElement.textContent = place
    statusElement.textContent = data.description
    temperatureElement.textContent = data.temp + " F"
    humidityElement.textContent = data.humidity + "%"
    windElement.textContent = data.wind_speed + " mph"
    backGround = document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + place +"')"
}