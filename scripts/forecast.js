//for interacting with the api


const key = 'KbRb2V8RMP5rzhWefvNGaP076KnD9fni';


//get weather

const getWeather = async (cityCode) => {
    
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityCode}?apikey=${key}`;

    const responce = await fetch(base + query);

    const data = await responce.json();

    //here i am putting index even after now i get the single element because to get the object instead of the array;
    return data[0];
    // console.log(data);
}

//get city
const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`

    const response = await fetch(base + query);
    if (response.status !== 200) {
        throw new Error('could not fetch data');
    }
    const data = await response.json();

    //the reponse will grab an array with many object and these object aur array's element are the matches of our search but we wabt only the first element 
    return data[0];
    // console.log(data);
}

// getCity('sukkur').then(data=>{
    // console.log(data);
//     return getWeather(data.Key)
// }).then(data=>{
//     console.log(data);
// }).catch(err=>{
//     console.log(err.message)
// })