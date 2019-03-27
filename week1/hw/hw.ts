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

// write your homework here

const objectively = () => {
	// Part 1
	console.log(console);
	// Part 2
	const whatAmI = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };
	// Part 3
	(async () => {
		let response = <[{
			name: string, score: number,
			spots: number, spotted: number, invalidated: number, unique: number,
			id: string
		}]>(await getDataFromAPI('https://spot.benc.me/?time=1549939921'))// sample call - delete before you submit

		const rankByUnique = (n: number) => {
			response.sort(
				function (a, b) {
					const comp = b.unique - a.unique
					if (comp !== 0) {
						return comp
					}
					return b.score - a.score
				})
			return response[n - 1]
		}
		// Testing

		//console.log("Leaderboard according to rankByUnique: ")
		//console.log(rankByUnique(1));
		//console.log(rankByUnique(2));
		//console.log(rankByUnique(3));
		//console.log(rankByUnique(4));
		//console.log(rankByUnique(5));
	})();
}
objectively();

const awry = () => {
	const docTester: number[] = [];
	for (let i = 0; i < 1000; i++) docTester[i] = Math.floor(Math.random() * 100);

	// Part 1
	let docTesterIndex: number[] = [];

	docTester.forEach((i, index) => docTesterIndex[index] = i + index);

	// Part 2
	docTester.map((i, index) => docTesterIndex[index] = i + index);

	// Part 3
	// console.log("Check sum: ");
	console.log(docTester.map((i, index) => docTesterIndex[index] = i + index).reduce((acc, i) => (acc += i), 0));

	// Part 4
	(async () => {
		let response = <[{
			name: string, score: number,
			spots: number, spotted: number, invalidated: number, unique: number,
			id: string
		}]>(await getDataFromAPI('https://spot.benc.me/?time=1549939921'))// sample call - delete before you submit

		const rankByUniqueAndFiltered = (n: number) => {
			let newresponse = response.filter(entry => entry.spotted >= 3 || entry.spotted == 0).sort(
				function (a, b) {
					const n = b.unique - a.unique
					if (n !== 0) {
						return n
					}
					return b.score - a.score
				})
			return newresponse[n - 1]
		}
		// Testing

		//console.log("Leaderboard according to rankByUniqueAndFiltered: ")
		//console.log(rankByUniqueAndFiltered(1));
		//console.log(rankByUniqueAndFiltered(2));
		//console.log(rankByUniqueAndFiltered(3));
		//console.log(rankByUniqueAndFiltered(4));
		//console.log(rankByUniqueAndFiltered(5));
	})();
}
awry();

