// 75fc371202728a324962f972cbd1b960 // this is the key of weather api








// Pre Loader of cloud and sun during the website is loading
window.onload = () => {
    document.getElementById('website').style.display = 'block'
    document.getElementById('pre_loader').style.display = 'none'
}

// Weather Find Button
let find = document.getElementById("find_weather");
// Display the weather in cards
find.addEventListener("click", () => {
    // Disable button of 'find' after clicking
    find.setAttribute('disabled', 'true')

    // Show the loading overlay
    let loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = "flex";

    
    // Input the location
    let city = document.getElementById("enter_city").value.toString().trim();
    let country = document.getElementById("enter_country").value.toString().trim();
    // final location by user
    let location = `${city},${country}`;

    // Weather information tags in HTML


    // Change the heading in DOM
    let heading = document.getElementById("city_name"); 
    heading.innerHTML = city.toUpperCase();

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=75fc371202728a324962f972cbd1b960&units=metric`
    )
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((data) => {


        //  Here I update the HTML tags with orignal data in "Temperature Section"

        document.getElementById("current_temp").innerHTML = data.main.temp; // current temperature updatad
        document.getElementById("feel_temp").innerHTML = data.main.feels_like; // feels like updataed
        document.getElementById("desc").innerHTML = data.weather[0]["main"]; // general weather updated like--clear sky
        document.getElementById("min_temp").innerHTML = data.main.temp_min; // updating minimum temp
        document.getElementById("max_temp").innerHTML = data.main.temp_max; // updating maximum temp 

        //  Here I update the HTML tags with orignal data in "Wind Section"
        document.getElementById("speed").innerHTML = data.wind.speed; // updating maximum temp
        // Function to get Direction of wind
        function getWindDirection(degrees = 0) {
            const directions = [
                "N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"
            ];
            // Divide by 45 to find the closest direction
            const index = Math.round(degrees / 45) % 8;
            return directions[index];
        }
        // Checking if the wind is not blowind then set the direction blank
        if (data.wind.speed === 0) {
            document.getElementById("direction").innerHTML = '_'
        } else {

            document.getElementById("direction").innerHTML = getWindDirection(data.wind.deg); // updating wind direction
        }
        document.getElementById("humidity").innerHTML = data.main.humidity; // updating humidity
        document.getElementById("pressure").innerHTML = data.main.pressure; // updating air pressure

        //  Here I update the HTML tags with orignal data in "Additional Data"
        document.getElementById('latitude').innerHTML = Number(data.coord.lat).toFixed(1)
        document.getElementById('longitude').innerHTML = Number(data.coord.lon).toFixed(1)
        document.getElementById('location_name').innerHTML = data.name
        document.getElementById('country').innerHTML = data.sys.country
        let date = new Date(data.sys.sunrise * 1000)
        let date2 = new Date(data.sys.sunset * 1000)
        document.getElementById('sunrise').innerHTML = date.toLocaleTimeString({
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // Set to false for 24-hour format
        })
        document.getElementById('sunset').innerHTML = date2.toLocaleTimeString({
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // Set to false for 24-hour format
        })



        console.log(data.weather[0].main);

    })
    .then(() => {

        // Resetting the values after putting data in cards 
        document.getElementById("enter_city").value = "";
        document.getElementById("enter_country").value = "";

    })
    .catch((error) => {

        // Ressetting the values after error 
        document.getElementById("enter_city").value = "";
        document.getElementById("enter_country").value = "";
        heading.innerHTML = ""; // reset the flower writing heading
        console.log(error);
        loadingOverlay.style.display = "none"; // removing overlay with logo if there is any error 
        alert("404 bad request or you are offline");
    })
    .finally(() => {
        find.removeAttribute("disabled");
        loadingOverlay.style.display = "none";
    });
});

///////@@@@@@@@@@@@@@/////////////////##########################///////////////@@@@@@@@@@@@@@/////////

// Display the weather in Table


//  Fetch the weather from API
async function getWeather(city) {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=75fc371202728a324962f972cbd1b960&units=metric`
        let response = await fetch(url)
        let data = await response.json()
        addWeather(data)

    }
    catch (error) {
        console.error(error.message) 

    }
}

function addWeather(data) {
    // console.log(data)
    let table_body = document.getElementById('table-body-data')
    // For changing the country code to real name in DOM
    let country = data.sys.country // get country code from api
    let show = '' // update to the full country name 
    switch (country) {
        case 'PK':
            show = 'Pakistan'
            break;

        case 'NZ':
            show = 'New Zealand'
            break;

        case 'ES':
            show = 'Spain'
            break;

        case 'US':
            show = 'America'
            break;

        case 'FR':
            show = 'France'
            break;

        case 'KE':
            show = 'Kenya'
            break;

        default:
            show = data.sys.country
            break;
    }
    city_weather_row = 
    `
        <tr>
            <td class="text-start">${data.name}</td>  
            <td>${data.main.temp}&deg;C</td>
            <td>${data.weather[0].main}</td>
            <td>${show}</td> 
            <td>
                <img src="https://flagcdn.com/32x24/${data.sys.country.toLowerCase()}.png" alt="img..." >
            </td> 
        </tr>
    `
    table_body.innerHTML += city_weather_row
}

window.onload = () => {
    // Remove the loading overlay 
    document.getElementById('website').style.display = 'block'
    document.getElementById('pre_loader').style.display = 'none'
    let cities = ['multan', 'canada', 'lahore', 'auckland', 'paris', 'Los Angeles', 'nairobi'] 
    cities.forEach(city => getWeather(city))
}