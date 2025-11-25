var townName = document.getElementById('town-id');
var degreeName = document.getElementById('degree-id');
var iconLink = document.getElementById('icon-id');
var todayName = document.getElementById('today-Name');
var todayNumber = document.getElementById('today-Number');
var monthName = document.getElementById('month-name');
var parName = document.getElementById('par-id');
var spanaName = document.getElementById('spana-id');
var spanbName = document.getElementById('spanb-id');
var spancName = document.getElementById('spanc-id');
var inputSearch = document.getElementById('Search-id');
// second and third day
var mySeconddayesdate = document.getElementsByClassName('my-date');
var maxDeg = document.getElementsByClassName('max-degree');
var minDeg = document.getElementsByClassName('min-degree');
var textNam = document.getElementsByClassName('text-Name');
var iconnSec = document.getElementsByClassName('icon-second');
// content page and home page
var Showhome = document.getElementById('Home-id');
var Showhomee = document.getElementById('Home2-id');
var Firstnavbar = document.getElementById('nav-id');
var Firstpage = document.getElementById('sec-id');
var Firstlast = document.getElementById('foot-id');
var Showcontent = document.getElementById('content-nav');
var Secondnavbar = document.getElementById('nav2-id');
var Secondpage = document.getElementById('sec2-id');
var Secondlast = document.getElementById('foot2-id');
Showhome.addEventListener('click', function () {
  Firstnavbar.classList.remove('d-none');
  Firstpage.classList.remove('d-none');
  Firstlast.classList.remove('d-none');
  Secondnavbar.classList.add('d-none');
  Secondpage.classList.add('d-none');
  Secondlast.classList.add('d-none');
});

Showhomee.addEventListener('click', function () {
  Firstnavbar.classList.remove('d-none');
  Firstpage.classList.remove('d-none');
  Firstlast.classList.remove('d-none');
  Secondnavbar.classList.add('d-none');
  Secondpage.classList.add('d-none');
  Secondlast.classList.add('d-none');
});

Showcontent.addEventListener('click', function () {
  Secondnavbar.classList.remove('d-none');
  Secondpage.classList.remove('d-none');
  Secondlast.classList.remove('d-none');
  Firstnavbar.classList.add('d-none');
  Firstpage.classList.add('d-none');
  Firstlast.classList.add('d-none');
});
//_________________________________________________ APIS____________________________________________________________
//  fetch APIS DATA
async function getweatherdata(cityName) {
  var weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e81b230c779d4acd935153638251711&q=${cityName}&days=3`
  );
  var weatherData = await weatherResponse.json();
  return weatherData;
}

// Display today Dtat
function displaytTodaydata(data) {
  var todayDate = new Date();
  todayName.innerHTML = todayDate.toLocaleDateString('en-US', {
    weekday: 'long',
  });
  todayNumber.innerHTML = todayDate.getDate();
  monthName.innerHTML = todayDate.toLocaleDateString('US', { month: 'long' });
  townName.innerHTML = data.location.name;
  degreeName.innerHTML = data.current.temp_c;
  iconLink.setAttribute('src', data.current.condition.icon);
  parName.innerHTML = data.current.condition.text;
  spanaName.innerHTML = data.current.humidity + ' %';
  spanbName.innerHTML = data.current.wind_kph + ' km/h';
  spancName.innerHTML = data.current.wind_dir;
}

// Display next Dayas Data

function displayNextdaysdata(data) {
  var forcasteData = data.forecast.forecastday;
  for (var i = 0; i < 2; i++) {
    var nextDayesdate = new Date(forcasteData[i + 1].date);
    mySeconddayesdate[i].innerHTML = nextDayesdate.toLocaleDateString('en-US', {
      weekday: 'long',
    });
    maxDeg[i].innerHTML = forcasteData[i + 1].day.maxtemp_c;
    minDeg[i].innerHTML = forcasteData[i + 1].day.mintemp_c;
    iconnSec[i].setAttribute('src', forcasteData[i + 1].day.condition.icon);
    textNam[i].innerHTML = forcasteData[i + 1].day.condition.text;
  }
}

// Start App
async function startCall(city = 'Cairo') {
  var weatherData = await getweatherdata(city);
  if (!weatherData.error) {
    displaytTodaydata(weatherData);
    displayNextdaysdata(weatherData);
  }
}
startCall();

// _____________________________________search_______________________________________________________

inputSearch.addEventListener('input', function () {
  startCall(inputSearch.value);
});
