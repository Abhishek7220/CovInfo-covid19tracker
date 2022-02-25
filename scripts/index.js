//########## Selecting all the Global Data Elements ############//

// Confirmed Global Data
const confirmedGlobal = document.getElementById("global-confirmed");
const newConfirmedGlobal = document.getElementById("global-confirmed-new");

// Recovered Global Data
const recoveredGlobal = document.getElementById("global-recovered");
const newRecoveredGlobal = document.getElementById("global-recovered-new");

// Active Global Data
const activeGlobal = document.getElementById("global-active");
const newActiveGlobal = document.getElementById("global-active-new");

// Deceased Global Data
const deceasedGlobal = document.getElementById("global-deceased");
const newDeceasedGlobal = document.getElementById("global-deceased-new");

// Critical Global Data
const criticalGlobal = document.getElementById("global-critical");
const newCriticalGlobal = document.getElementById("global-critical-new");
//########## End of Global Data Elements ############//

//############# Selecting Country Data Elements #############/

// country name heading
const countryName = document.querySelector(".heading-country");

// Population Country Data
const populationCountry = document.getElementById("country-population");

// Tests Country Data
const testCountry = document.getElementById("country-test");
const newTestCountry = document.getElementById("country-test-new");

// Confirmed Country Data
const confirmedCountry = document.getElementById("country-confirmed");
const newConfirmedCountry = document.getElementById("country-confirmed-new");

// Recovered Country Data
const recoveredCountry = document.getElementById("country-recovered");
const newRecoveredCountry = document.getElementById("country-recovered-new");

// Active Country Data
const activeCountry = document.getElementById("country-active");
const newActiveCountry = document.getElementById("country-active-new");

// Deceased Country Data
const deceasedCountry = document.getElementById("country-deceased");
const newDeceasedCountry = document.getElementById("country-deceased-new");

// Critical Country Data
const criticalCountry = document.getElementById("country-critical");
const newCriticalCountry = document.getElementById("country-critical-new");
//############# End of Country Data Elements #############/

//############# User Country Code for GeoLocation ################//

let userCountry;

const geoApi =
	"https://api.ipdata.co/?api-key=9227eec46ac82e07ca7fd8a06d4d4a0b453336c6579b0318fad86f48";

async function getLocation() {
	const res = await fetch(geoApi);
	const data = await res.json();
	userCountry = data.country_name;

	if (userCountry == "United States") {
		userCountry = "USA";
	}
}

getLocation();

console.log(userCountry);

//########### End of Country Code #############//

//############## API URL ##############//

const apiURL = "https://corona.lmao.ninja/v2/countries/";

// https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json

async function getCovidData() {
	const apiResponse = await fetch(apiURL);
	const data = await apiResponse.json();
	return data;
}

//############### World Data on Startup ###############//
async function worldData() {
	const response = await getCovidData();

	let worldCases = 0;
	let newWorldCases = 0;
	let worldRecovered = 0;
	let newWorldRecovered = 0;
	let worldActive = 0;
	let worldDeaths = 0;
	let newWorldDeaths = 0;
	let worldCritical = 0;
	let worldStats = "";

	for (const data of response) {
		worldStats = {
			cases: (worldCases += data.cases),
			newCases: (newWorldCases += data.todayCases),
			recovered: (worldRecovered += data.recovered),
			newRecovered: (newWorldRecovered += data.todayRecovered),
			active: (worldActive += data.active),
			deaths: (worldDeaths += data.deaths),
			newDeath: (newWorldDeaths += data.todayDeaths),
			critical: (worldCritical += data.critical),
		};
	}

	const options = {
		prefix: "+",
	};

	confirmedGlobal.innerHTML = worldStats.cases;
	var confirmedAnim = new countUp.CountUp(confirmedGlobal, worldStats.cases);
	confirmedAnim.start();
	console.log(`This is the Global Case: ${worldStats.cases}`);

	newConfirmedGlobal.innerHTML = worldStats.newCases;
	var newConfirmedAnim = new countUp.CountUp(
		newConfirmedGlobal,
		worldStats.newCases,
		options
	);
	newConfirmedAnim.start();

	recoveredGlobal.innerHTML = worldStats.recovered;
	var recoveredAnim = new countUp.CountUp(
		recoveredGlobal,
		worldStats.recovered
	);
	recoveredAnim.start();

	newRecoveredGlobal.innerHTML = worldStats.newRecovered;
	var newRecoveredAnim = new countUp.CountUp(
		newRecoveredGlobal,
		worldStats.newRecovered,
		options
	);
	newRecoveredAnim.start();

	activeGlobal.innerHTML = worldStats.active;
	var activeAnim = new countUp.CountUp(activeGlobal, worldStats.active);
	activeAnim.start();

	deceasedGlobal.innerHTML = worldStats.deaths;
	var deceasedAnim = new countUp.CountUp(deceasedGlobal, worldStats.deaths);
	deceasedAnim.start();

	newDeceasedGlobal.innerHTML = worldStats.newDeath;
	var newDeceasedAnim = new countUp.CountUp(
		newDeceasedGlobal,
		worldStats.newDeath,
		options
	);
	newDeceasedAnim.start();

	criticalGlobal.innerHTML = worldStats.critical;
	var criticalAnim = new countUp.CountUp(criticalGlobal, worldStats.critical);
	criticalAnim.start();

	// Ratio of Recovery //

	let rorValue = document.querySelector(".ror-value-global");
	let rorCircle = document.getElementById("circle-global");

	let ror = (worldStats.recovered / worldStats.cases) * 100;
	ror = ror.toFixed(2);
	console.log(`This is the Global Ratio of Recovery: ${ror}%`);

	rorValue.innerHTML = ror + "%";
	rorCircle.style.strokeDashoffset = `calc(400 - (400 * ${ror}) / 100)`;

	// End of Ratio of Recovery //
}
//############### End of the World Data on Startup ###############//

//############# Country Data Based on IP-Address ################//
async function countryData() {
	const response = await getCovidData();

	let countryPopulation = 0;
	let countryTest = 0;
	let countryCases = 0;
	let newCountryCases = 0;
	let countryRecovered = 0;
	let newCountryRecovered = 0;
	let countryActive = 0;
	let countryDeaths = 0;
	let newCountryDeaths = 0;
	let countryCritical = 0;
	let countryStats = "";

	for (const data of response) {
		if (data.country == userCountry) {
			countryStats = {
				population: (countryPopulation = data.population),
				test: (countryTest = data.tests),
				cases: (countryCases = data.cases),
				newCases: (newCountryCases = data.todayCases),
				recovered: (countryRecovered = data.recovered),
				newRecovered: (newCountryRecovered = data.todayRecovered),
				active: (countryActive = data.active),
				deaths: (countryDeaths = data.deaths),
				newDeath: (newCountryDeaths = data.todayDeaths),
				critical: (countryCritical = data.critical),
			};
		}
	}

	countryName.innerHTML =
		userCountry + `'s Statistics <sup>Live<i class="fad fa-circle"></i></sup>`;

	const options = {
		duration: 3,
		prefix: "+",
	};

	populationCountry.innerHTML = countryStats.population;
	var populationAnim = new countUp.CountUp(
		populationCountry,
		countryStats.population
	);
	populationAnim.start();

	testCountry.innerHTML = countryStats.test;
	var testAnim = new countUp.CountUp(testCountry, countryStats.test);
	testAnim.start();

	confirmedCountry.innerHTML = countryStats.cases;
	var confirmedAnim = new countUp.CountUp(confirmedCountry, countryStats.cases);
	confirmedAnim.start();
	console.log(`This is the ${userCountry}'s Case: ${countryStats.cases}`);

	newConfirmedCountry.innerHTML = +countryStats.newCases;
	var newConfirmedAnim = new countUp.CountUp(
		newConfirmedCountry,
		countryStats.newCases,
		options
	);
	newConfirmedAnim.start();

	recoveredCountry.innerHTML = countryStats.recovered;
	var recoveredAnim = new countUp.CountUp(
		recoveredCountry,
		countryStats.recovered
	);
	recoveredAnim.start();

	newRecoveredCountry.innerHTML = +countryStats.newRecovered;
	var newRecoveredAnim = new countUp.CountUp(
		newRecoveredCountry,
		countryStats.newRecovered,
		options
	);
	newRecoveredAnim.start();

	activeCountry.innerHTML = countryStats.active;
	var activeAnim = new countUp.CountUp(activeCountry, countryStats.active);
	activeAnim.start();

	deceasedCountry.innerHTML = countryStats.deaths;
	var deceasedAnim = new countUp.CountUp(deceasedCountry, countryStats.deaths);
	deceasedAnim.start();

	newDeceasedCountry.innerHTML = +countryStats.newDeath;
	var newDeceasedAnim = new countUp.CountUp(
		newDeceasedCountry,
		countryStats.newDeath,
		options
	);
	newDeceasedAnim.start();

	criticalCountry.innerHTML = countryStats.critical;
	var criticalAnim = new countUp.CountUp(
		criticalCountry,
		countryStats.critical
	);
	criticalAnim.start();

	// Ratio of Recovery //

	let rorValue = document.querySelector(".ror-value-country");
	let rorCircle = document.getElementById("circle-country");
	let rorHeading = document.getElementById("heading-ror-country");

	let ror = (countryStats.recovered / countryStats.cases) * 100;

	ror = ror.toFixed(2);
	console.log(`This is the ${userCountry}'s Ratio of Recovery: ${ror}%`);

	rorHeading.innerHTML = `Ratio of recovery (${userCountry})`;
	rorValue.innerHTML = ror + "%";

	rorCircle.style.strokeDashoffset = `calc(400 - (400 * ${ror}) / 100)`;

	// End of Ratio of Recovery //
}
//############# End of Country Data Based on IP-Address ################//

//########## Fetching Country Data based on Selection #############//

function fetchCountry(country) {
	userCountry = country;
	input.value = country;

	if (userCountry == "United States") {
		userCountry = "USA";
	}

	// Country Data Searching

	async function countryData() {
		const response = await getCovidData();

		let countryPopulation = 0;
		let countryTest = 0;
		let countryCases = 0;
		let newCountryCases = 0;
		let countryRecovered = 0;
		let newCountryRecovered = 0;
		let countryActive = 0;
		let countryDeaths = 0;
		let newCountryDeaths = 0;
		let countryCritical = 0;
		let countryStats = "";

		for (const data of response) {
			if (data.country == userCountry) {
				countryStats = {
					population: (countryPopulation = data.population),
					test: (countryTest = data.tests),
					cases: (countryCases = data.cases),
					newCases: (newCountryCases = data.todayCases),
					recovered: (countryRecovered = data.recovered),
					newRecovered: (newCountryRecovered = data.todayRecovered),
					active: (countryActive = data.active),
					deaths: (countryDeaths = data.deaths),
					newDeath: (newCountryDeaths = data.todayDeaths),
					critical: (countryCritical = data.critical),
				};
			}
		}

		countryName.innerHTML =
			userCountry +
			`'s Statistics <sup>Live<i class="fad fa-circle"></i></sup>`;

		const options = {
			duration: 3,
			prefix: "+",
		};

		populationCountry.innerHTML = countryStats.population;
		var populationAnim = new countUp.CountUp(
			populationCountry,
			countryStats.population
		);
		populationAnim.start();

		testCountry.innerHTML = countryStats.test;
		var testAnim = new countUp.CountUp(testCountry, countryStats.test);
		testAnim.start();

		confirmedCountry.innerHTML = countryStats.cases;
		var confirmedAnim = new countUp.CountUp(
			confirmedCountry,
			countryStats.cases
		);
		confirmedAnim.start();
		console.log(`This is the ${userCountry}'s Case: ${countryStats.cases}`);

		newConfirmedCountry.innerHTML = +countryStats.newCases;
		var newConfirmedAnim = new countUp.CountUp(
			newConfirmedCountry,
			countryStats.newCases,
			options
		);
		newConfirmedAnim.start();

		recoveredCountry.innerHTML = countryStats.recovered;
		var recoveredAnim = new countUp.CountUp(
			recoveredCountry,
			countryStats.recovered
		);
		recoveredAnim.start();

		newRecoveredCountry.innerHTML = +countryStats.newRecovered;
		var newRecoveredAnim = new countUp.CountUp(
			newRecoveredCountry,
			countryStats.newRecovered,
			options
		);
		newRecoveredAnim.start();

		activeCountry.innerHTML = countryStats.active;
		var activeAnim = new countUp.CountUp(activeCountry, countryStats.active);
		activeAnim.start();

		deceasedCountry.innerHTML = countryStats.deaths;
		var deceasedAnim = new countUp.CountUp(
			deceasedCountry,
			countryStats.deaths
		);
		deceasedAnim.start();

		newDeceasedCountry.innerHTML = +countryStats.newDeath;
		var newDeceasedAnim = new countUp.CountUp(
			newDeceasedCountry,
			countryStats.newDeath,
			options
		);
		newDeceasedAnim.start();

		criticalCountry.innerHTML = countryStats.critical;
		var criticalAnim = new countUp.CountUp(
			criticalCountry,
			countryStats.critical
		);
		criticalAnim.start();

		// Ratio of Recovery //

		let rorValue = document.querySelector(".ror-value-country");
		let rorCircle = document.getElementById("circle-country");
		let rorHeading = document.getElementById("heading-ror-country");

		let ror = (countryStats.recovered / countryStats.cases) * 100;

		ror = ror.toFixed(2);
		console.log(`This is the ${userCountry}'s Ratio of Recovery: ${ror}%`);

		rorHeading.innerHTML = `Ratio of recovery (${userCountry})`;
		rorValue.innerHTML = ror + "%";

		rorCircle.style.strokeDashoffset = `calc(400 - (400 * ${ror}) / 100)`;

		// End of Ratio of Recovery //
	}

	countryData();
}
//########## End of Fetching Country Data based on Selection #############//

worldData();
countryData();
