// let's look at the issue that a lot of you had on your homework.
import fetch from 'node-fetch';
import { SpotPerson } from '../../week1/hw/hw-solution';

const getDataFromAPI = (url: string): Promise<SpotPerson[]> =>
	new Promise((res, rej) => {
		fetch(url)
			.then(data => data.json())
			.then(json => {
				// the json variable here is just the stuff you see in the browser
				res(json);
			})
			.catch(err => rej(err));
	});

(async () => {
	const data = await getDataFromAPI('https://spot.benc.me/?time=1549939921');
	console.log(data); // cool, anything can be logged
	data.filter(el => el.unique > 1); // ruh roh

	// let's write the interface for https://nominatim.openstreetmap.org/search?q=Vanderbilt%20University&format=json

})();
