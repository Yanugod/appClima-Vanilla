'use strict'

console.clear()


let clima__container = document.querySelector(".clima__container");

let clima__ShowError = document.getElementById("clima__ShowError");
let select = document.getElementById("select")
let clima__containerDates = document.querySelector(".clima__container-dates");
let inputCityName = document.getElementById("inputCityName");
let inputSearch = document.querySelector(".clima__container-inputs");
let inputCountryName = document.querySelector(".inputCountryName");
let btnSearch = document.querySelector(".btnSearch");


inputSearch.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputCityName.value === "" && select.value === "") {
    showError("Debes insertar la ciudad");
  } else {
    callApi(inputCityName.value, inputCountryName.value);
  }
  
}); 

function showError(text){
    let pShowError = document.createElement("p")
    pShowError.innerHTML = text;
    pShowError.classList.add("showError")
    clima__container.appendChild(pShowError);

    setTimeout(() => {
      pShowError.remove()
    }, 3000);
}

async function callApi (cityName, countryName){

    let api = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=51e8605e93ccffcd7e7b39a7bbccd10c`
    );
    let data = await api.json();

    if(data.cod == 404){
      showError("Ciudad no encontrada...")
    }else{
      showWeather(data);
    }
}



let kelvinCentigrados = (temp) => parseInt(temp - 273.15)

function showWeather(data){
    const {temp,temp_min, temp_max} = data.main
    const {weather:[arr]} = data

    let tempInicial = kelvinCentigrados(temp)
    let tempMaximo = kelvinCentigrados(temp_max);
    let tempMinimo = kelvinCentigrados(temp_min);

    clima__containerDates.innerHTML = `
            <p>Clima en ${data.name}</p>
            <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
            <h1>${tempInicial}°C</h1>
            <h4>Max: ${tempMaximo}°C</h4>
            <h4>Min: ${tempMinimo}°C</h4>
`;
}





