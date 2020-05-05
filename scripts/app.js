// for DOM manipulation
const cityForm = document.forms['cityForm'];
const card = document.querySelector('.card');
const details = document.querySelector('.detail');
const time = document.querySelector('img.time'); 
const weatherIcon = document.querySelector('.icon img'); 

//update ui
const updateUI = (data) => {

    //logging obj
    console.log(data);


    // getting object properties and these properties are objects too.
    // const cityDets = data.cityObj;
    // const weatherDets = data.weatherObj;

    //or 

    //destructuring properties from the data object

    const { cityObj,weatherObj } = data

    // updating card detail
    details.innerHTML = 
    `<h5 class="my-3">${cityObj.EnglishName}</h5>
    <div class="my-3">${weatherObj.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weatherObj.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`;

    //displaying card
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }


    
    // setting time image
    // let img = null;
    // if (weatherObj.IsDayTime) {
    //     img = `img/day.svg`;
    // }else{
    //     img = `img/night.svg`;
    // }

    // or

    //turnery operator

    const img = weatherObj.IsDayTime ? `img/day.svg` : `img/night.svg`

    time.setAttribute('src',img)

    //setting weather icon

    let icon = `img/icons/${weatherObj.WeatherIcon}.svg`;

    weatherIcon.setAttribute('src',icon)
    window.scrollTo(0,200);

    

}


//update city and get function from forecast.js
const updateCity = async (city) => {

    const cityObj = await getCity(city);

    const weatherObj = await getWeather(cityObj.Key);

    // if (cityObj.status !== 200 && weatherObj.status !== 200  ) {
    //     throw new Error('could not fetch data')
    // }


    //object shorthand notation
    return {cityObj, weatherObj}

}

//add event to form
cityForm.addEventListener('submit', e => {

    //prevent Default behaviour of form
    e.preventDefault();

    //getting form input value
    const city = cityForm.city.value.trim();
    
    //reset the input field
    cityForm.reset();

    updateCity(city)
        .then(data => { updateUI(data) })
        .catch(err => { console.log(err.message)})
})