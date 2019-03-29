/* eslint-disable */ // just to prevent it from annoying us forever
import fetch from 'node-fetch';

// to call this function, you'll need to do two things
// 1st, the function that is called in must have the keyword "async" before the parameters
// 2nd when you call it, you must preface it with "await"
// like in the below example
const getDataFromAPI = (url: string) =>
	new Promise((res, rej) => {
		fetch(url)
			.then(data => data.json())
			.then(json => {
				// the json variable here is just the stuff you see in the browser
				res(json);
			})
			.catch(err => rej(err));
	});

<<<<<<< HEAD
=======
// all these parantheses and braces creates and instantly calls a function.
// This is known as an Instantly Invoked Function Expression (IIFE).
// It has a lot of uses but in this case, since await can only be used in async functions, it's needed
(async () => {
	console.log(await getDataFromAPI('https://spot.benc.me/?time=1549939921')); // sample call - delete before you submit
})();

>>>>>>> upstream/master
// write your homework here

const objectively = () => {
	// Part 1
	console.log(console);
	// Part 2
	const whatAmI = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };
	console.log(whatAmI);
	// Part 3
	(async () => {
		const response = (await getDataFromAPI('https://spot.benc.me/?time=1549939921')) as [
			{
				name: string;
				score: number;
				spots: number;
				spotted: number;
				invalidated: number;
				unique: number;
				id: string;
			}
		];
		const rankByUnique = (n: number) => {
			response.sort(function(a, b) {
				const comp = b.unique - a.unique;
				if (comp !== 0) {
					return comp;
				}
				return b.score - a.score;
			});
			return response[n - 1];
		};
		// Testing
		console.log('Leaderboard according to rankByUnique: ');
		console.log(rankByUnique(1));
		console.log(rankByUnique(2));
		console.log(rankByUnique(3));
		console.log(rankByUnique(4));
		console.log(rankByUnique(5));
	})();
};
objectively();

const awry = () => {
	const docTester: number[] = [];
	for (let i = 0; i < 1000; i++) docTester[i] = Math.floor(Math.random() * 100);

	// Part 1
	const docTesterIndex: number[] = [];

	docTester.forEach(function(i, index) {
		docTesterIndex[index] = i + index;
	});

	// Part 2
	// docTesterIndex.map(function(i, index) {
	//	return docTester[index] + index;
	// });

	// Part 3
	console.log('Check sum: ');
	console.log(
		docTesterIndex.map((i, index) => docTester[index] + index).reduce((acc, i) => (acc += i), 0)
	);

	// Part 4
	(async () => {
		const response = (await getDataFromAPI('https://spot.benc.me/?time=1549939921')) as [
			{
				name: string;
				score: number;
				spots: number;
				spotted: number;
				invalidated: number;
				unique: number;
				id: string;
			}
		];

		const rankByUniqueAndFiltered = (n: number) => {
			const newresponse = response
				.filter(entry => entry.spotted >= 3 || entry.spotted === 0)
				.sort(function(a, b) {
					const comp = b.unique - a.unique;
					if (comp !== 0) {
						return comp;
					}
					return b.score - a.score;
				});
			return newresponse[n - 1];
		};
		// Testing
		console.log('Leaderboard according to rankByUniqueAndFiltered: ');
		console.log(rankByUniqueAndFiltered(1));
		console.log(rankByUniqueAndFiltered(2));
		console.log(rankByUniqueAndFiltered(3));
		console.log(rankByUniqueAndFiltered(4));
		console.log(rankByUniqueAndFiltered(5));
	})();
};
awry();
