const request = require('request');
import { Response } from 'request'; // I hate myself everytime I type this
//if (process.env.NODE_ENV !== 'production') 
require('dotenv').config();

interface WeatherUpdate {
	location: string; // i.e. "Vanderbilt University"
	weather: string; // the format specified in the README
	lat: number;
	lon: number;
	name: string; // your name - use this from process.env
}

interface OpenStreetMapArray {
	place_id: number;
	licence: string;
	osm_type: string;
	osm_id: number;
	boundingbox: string[];
	lat: string;
	lon: string;
	display_name: string;
	class: string;
	type: string;
	importance: number;
	icon: string;
}

interface WeatherArray {
	latitude: number;
	longitude: number;
	timezone: string;
	currently: CurrentlyArray;
	minutely: Object;
	hourly: Object;
	daily: Object;
	flags: Object;
	offset: number;
}

interface CurrentlyArray {
	time: number;
	summary: string;
	icon: string;
	nearestStormDistance: number;
	nearestStormBearin: number;
	precipIntensity: number;
	precipProbability: number;
	temperature: number;
	apparentTemperature: number;
	dewPoint: number;
	humidity: number;
	pressure: number;
	windSpeed: number;
	windGust: number;
	windBearing: number;
	cloudCover: number;
	uvIndex: number;
	visibility: number;
	ozone: number;
}

const callbacks = (
	location: string,
	slackUsername: string,
	callback: (body: any) => void
): void => {
	request(
		// this is just the first call to request. You'll need multiple
		`https://nominatim.openstreetmap.org/?format=json&q=${location}&format=json&limit=3&email=${process.env.EMAIL}`,
		(error: Error, response: Response, mapbody: any): void => {
			if (error) {
				console.log(error);
			} else {
				const coordbody = JSON.parse(mapbody) as OpenStreetMapArray[];
				request(
					// this is just the first call to request. You'll need multiple
					`https://api.darksky.net/forecast/${process.env.DARK_SKY_TOKEN}/${coordbody[0].lat},${coordbody[0].lon}`,
					(error: Error, response: Response, weatherbody: any): void => {
						if (error) {
							console.log(error);
						} else {
							const weather = JSON.parse(weatherbody) as WeatherArray;
							const curWeather = `It's ${weather.currently.summary} and it's ${weather.currently.temperature} degrees.`;
							request(
								// this is just the first call to request. You'll need multiple
								`https://send-to-slack-nfp4cc31q.now.sh/?user=C9S0DF3BR&data=${curWeather}`,
								(error: Error, response: Response, weatherbody: any): void => {
									if (error) {
										console.log(error);
									} else {
										console.log("Success");
									}
								}
							);
						}
					}
				);
			}
		}
	);
};
//callbacks("Seattle, WA", "Austin Wei", request);

// change Promise<object> to Promise<TheTypeThatYouAreMaking> for both functions
const promises = (location: string, slackUsername: string): void => {
	new Promise((resolve, reject) => {
		request(
			// this is just the first call to request. You'll need multiple
			`https://nominatim.openstreetmap.org/?format=json&q=${location}&format=json&limit=3&email=${process.env.EMAIL}`,
			(error: Error, response: Response, mapbody: any): void => {
				if (error) {
					console.log(error);
				} else {
					const coordbody = JSON.parse(mapbody) as OpenStreetMapArray[];
				}
			})
	}
	).then(() => {
		request(
			// this is just the first call to request. You'll need multiple
			`https://api.darksky.net/forecast/${process.env.DARK_SKY_TOKEN}/${coordbody[0].lat},${coordbody[0].lon}`,
			(error: Error, response: Response, weatherbody: any): void => {
				if (error) {
					console.log(error);
				} else {
					const weather = JSON.parse(weatherbody) as WeatherArray;
					const curWeather = `It's ${weather.currently.summary} and it's ${weather.currently.temperature} degrees.`;
				}
			}
		)
	}).then(() => {
		request(
			// this is just the first call to request. You'll need multiple
			`https://send-to-slack-nfp4cc31q.now.sh/?user=C9S0DF3BR&data=${curWeather}`,
			(error: Error, response: Response, weatherbody: any): void => {
				if (error) {
					console.log(error);
				} else {
					console.log("Success");
				}
			}
		);
	})
};

promises("Seattle, WA", "Austin Wei");


/*export const asyncAwait = async (location: string, slackUsername: string): Promise<object> => {
	// use fetch
};

// all the console.logs should log what the send-to-slack API returns
callbacks('Vanderbilt University', 'YOUR_SLACK_USER_ID', body => {
	console.log(body);
}); // feel free to change the place. It'll be more interesting if everyone's not doing the same place.
promises('Vanderbilt University', 'D44FTVCHJ').then(data => console.log(data));

(async () => {
	console.log(await asyncAwait('Vanderbilt University', 'D44FTVCHJ'));
})();*/
