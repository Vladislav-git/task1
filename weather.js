const data = document.querySelector('#data');
const button = document.querySelector('#btn');
const forecast = document.querySelector('#forecast');

const days_gen = (number, data) => ({
    clouds: `${data.list[number]['clouds']['all']}%`,
    date: data.list[number]['dt_txt'].slice(0, 10),
    humidity: `${data.list[number]['main']['humidity']}%`,
    pressure: `${data.list[number]['main']['pressure']} h/Pa`,
    temp: `${data.list[number]['main']['temp'].toFixed()} C`,
    weather: data.list[number]['weather'][0]['description'],
    wind_speed: `${data.list[number]['wind']['speed']} m/s`
});

// const a = ({a,b,c}) => {
// 	console.log(a,b,c);
// }


const forecast_gen = ({ date, weather, temp, humidity, clouds, pressure, wind_speed }) =>
    `
	<p>Date: ${date}</p>
	<p>${weather}</p>
	<p>Tempreture: ${temp}</p>
	<p>Humidity: ${humidity}</p>
	<p>Cloudiness: ${clouds}</p>
	<p>Pressure: ${pressure}</p>
	<p>Wind speed: ${wind_speed}</p>
`;


axios({
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': 'VaVKTbpKMiCYzsF4WjxWhVIlpXBIm2Axn4ugunjl',
            'X-Parse-Master-Key': 's2nVfQsgEDdl3bDY5patrAXpjwZlcQa5rdfuSeYl',
        },
        url: 'https://parseapi.back4app.com/classes/City?limit=5',
    })
    .then(({ data: { results } }) => {
        let optionList;
        results.forEach(({ name }) => {
            optionList +=
                `
				<option>${name}</option>
				`
        });
        data.innerHTML += optionList;
    });



button.addEventListener('click', (event) => {
    const city = data.value;
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=87cbeb5a6565932d7931e837401e2def`)
        .then(({ data }) => {

            const day1 = days_gen(0, data);
            const day2 = days_gen(7, data);
            const day3 = days_gen(15, data);

            const forecast_day1 = forecast_gen(day1);
            const forecast_day2 = forecast_gen(day2);
            const forecast_day3 = forecast_gen(day3);
            forecast.innerHTML = forecast_day1 + forecast_day2 + forecast_day3
        })
        .catch((error) => { alert('No data about this city') });

});