
// Function to fetch weather data
function getWeather() {
    const city = document.getElementById(`city`).value;
    const apiUrl = 'http://localhost:3000/'+city;


    
fetch(apiUrl)
.then(response => response.json())
.then(data => {
    updateWeather(data);
})
.catch(error => {
    console.error('Fetch error:', error);
});
  
}

//Function to update the DOM
function updateWeather(data) {
    const city = data.location.city;
    const currentObservation = data.current_observation.condition.temperature;
    
document.getElementById('location').textContent = `${city}`;
document.getElementById('current_observation').textContent = `${currentObservation}`;
}
    



  



