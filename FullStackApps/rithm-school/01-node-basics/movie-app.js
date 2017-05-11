/*
 For this exercise, we are going to build a simple command line tool which allows us to make
 a request to an API and store the data in a text file! We will be using the following modules:
 
 fs - for reading and writing to a file
 process - for gathering arguments from the command line
 request - for making API requests (this is an external module)
 
 This application should accept a command line argument using process.argv. The command line argument
 should be the name of a movie and your application should make an API request to the omdb API and
 output the plot of the movie.
 
 Your program should also save the name of the movie to a file called results.txt.
 
 Bonus
 
 Use the prompt module to ask a user for some input instead of having to pass in an argument from the command line.
 
 Your program should accept a command line argument called leaderboard. If that command line argument is passed in,
 your application should return the most popular search based on how many times it appears in results.txt
 
 todo:
 1. make a request to the omdb api, store result in text file
 2. app must accept cli args using process.arv
 3. commands should be the title of a movie
 4. output should be movie plot
 5. save the name of the movie to results.txt
 
 References
 [1] https://www.omdbapi.com/ (docs and examples)
 [2] https://github.com/flatiron/prompt (prompt module docs)
 
 */
'use strict';
const fs = require('fs');
const path = require('path');
const request = require('request');
const prompt = require('prompt');

const baseUrl = 'http://www.omdbapi.com/?';
const plot = '&plot=full';

// enter movie title within quotes, last element in 3 element array

// prompt user for movie title
console.log('Enter the title of your favourite movie:');
prompt.start();
prompt.get(['title'], (err, result)=>{
	if(err) return console.error('Input failed');
	// console.log('Movie title:', result.title);
	
	const encodedTitle = encodeURIComponent(result.title);
	const url = `${baseUrl}t=${encodedTitle}${plot}`;

	// make the api request
	request(url, (err, res, body)=>{
		if(!err && res.statusCode === 200) {
			let movie = JSON.parse(body);
			if(movie.Response === 'False'){
				console.log('Movie not found');
			} else {
				const result = {
					title: movie.Title,
					year: movie.Year,
					actors: movie.Actors,
					plot: movie.Plot
				};
				let jsonString = JSON.stringify(result);
				fs.writeFileSync(path.join(__dirname, 'results.txt'), jsonString);
				console.log(movie.Title);
			}
		}
		else
			console.err('unable to fetch movie data', err.message);
	});
});

