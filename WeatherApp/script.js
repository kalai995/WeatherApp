const cityInput = document.querySelector(".city");
const getWeather = document.querySelector(".weatherForm");
const display = document.querySelector(".displayCard");
const apikey = "77fa1ac076163035cd6b7c56b9de7fdc";

getWeather.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  console.log(city)
  if (city) {
    try {
      const weatherData = await getCityName(city);
      getWeatherData(weatherData);

    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});
async function getCityName(city) {
                      
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const response = await fetch(apiUrl);
  console.log(response)

  if(!response.ok){
    throw new error ("Please enter a correct city")
  }
  return await response.json()
  // console.log(response);
}
function getWeatherData(data) {
  console.log(data);
   const{name:city,main:{temp,humidity},weather:[{description,id}]}=data


  
  display.textContent = "";
  display.style.display = "flex";
  const cityDisplay = document.createElement("h1");
  const temperature = document.createElement("p");
  const humitidy = document.createElement("p");
  const descriptionDisplay = document.createElement("p");
  const emoji = document.createElement("h1");
  cityDisplay.textContent = city;
  temperature.textContent = `Temperature:${(temp-273.15).toFixed(2)}°c`;
  humitidy.textContent=`Humitidy:${humidity}%`;
  descriptionDisplay.innerHTML = description;
  emoji.textContent = getEmoji(id);
 

  display.appendChild(cityDisplay);
  display.appendChild(temperature);
  display.appendChild(humitidy);
  display.appendChild(descriptionDisplay);
  display.appendChild(emoji);

}

function getEmoji(weatherId) 
{
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "🌩️";
    case weatherId >= 300 && weatherId < 400:
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "🌨️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800 :
      return "☀️";

    case weatherId >= 800 && weatherId <810:
      return "☁️";
      default:
        return "?"
  }




}
function displayError(meassage) {
  const errorDisplay = document.createElement("p");
  errorDisplay.innerHTML = meassage;
  errorDisplay.classList.add("error");
  display.textContent = "";
  display.style.display = "block";
  display.appendChild(errorDisplay);
}
