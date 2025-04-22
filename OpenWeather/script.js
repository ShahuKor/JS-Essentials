document.addEventListener('DOMContentLoaded', ()=>{
    const city = document.getElementById('city-input');
    const weatherbutton = document.getElementById('get-weather-btn');
    const weacontainer = document.getElementById('weather-info');
    const citytodisplay = document.getElementById('city-name');
    const temper = document.getElementById('temperature');
    const desc = document.getElementById('description');
    const errormsg = document.getElementById('error-message');
    const API_KEY = " ";

    weatherbutton.addEventListener('click', async  ()=>{
        let cityname = city.value.trim()
        if(cityname==="") return

        try {
            const weatherdata = await getweatherdata(cityname)
            displayweatherdata(weatherdata)
        } catch (error) {
            showError();
        }
   
})

async function getweatherdata(city){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    const datafetched = await fetch(url);
    if(!datafetched.ok){
        showError();
    }
    const data = datafetched.json()
    return data
}
function displayweatherdata(weadata){
    const {name, main, weather} = weadata
    weacontainer.classList.remove('hidden')
    citytodisplay.textContent = `City : ${name}`
    temper.textContent = `Temperature : ${main.temp}`
    desc.textContent = `Description : ${weather[0].description}`

}

function showError(){
    weacontainer.classList.add('hidden');
    errormsg.classList.remove('hidden');
}
})