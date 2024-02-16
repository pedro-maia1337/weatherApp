const cityInput = document.querySelector('.city-input')
const searchButton = document.querySelector('.search')
const weatherInfos = document.querySelector('.weather-infos')

const cityName = document.querySelector('.city-name')
const weatherIcon = document.querySelector('.weather-icon')
const temp = document.querySelector('.temperature span')
const desc = document.querySelector('.description')
const warningMessage = document.querySelector('.warning-message')

const umidity = document.querySelector('#umidity span') 
const wind = document.querySelector('#wind span')
const tempMax = document.querySelector('#temp-max span')
const tempMin = document.querySelector('#temp-min span')


const apiKey = '2936133140c74070effccbc9721bf5bc'
const apiURL = `https://api.openweathermap.org/data/2.5/weather?`

const getWeatherData = async (city) => {
    try{
        const apiWeatherUrl = `${apiURL}q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    
        const response = await fetch(apiWeatherUrl)
        const data = await response.json()
        
        if(data.cod === "404"){
            throw new Error 
        }

        showInfos(data)

    } catch {
        ShowWarningMessage()
    }
}

const showInfos = (infos) => {
    cityName.innerHTML = infos.name
    temp.innerHTML = parseInt(`${infos.main.temp}`)
    desc.innerHTML = infos.weather[0].description
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${infos.weather[0].icon}.png`)

    umidity.innerHTML = `${infos.main.humidity}%`
    wind.innerHTML = `${infos.wind.speed}km/h`
    tempMax.innerHTML = parseInt(infos.main.temp_max)
    tempMin.innerHTML = parseInt(infos.main.temp_min)

    weatherInfos.classList.remove("hide")
    warningMessage.classList.add("hide")
}

const ShowWarningMessage = () => {
    warningMessage.classList.remove("hide")
}

document.addEventListener('click', (e) =>{
    const el = e.target

    if(el.classList.contains('search')){
        const city = cityInput.value.trim()

        getWeatherData(city)
    }
})

cityInput.addEventListener('keyup', (e) =>{
    if(e.code === "Enter"){
        const city = e.target.value.trim()

        getWeatherData(city)
    }
})








