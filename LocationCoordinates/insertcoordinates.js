/*
 *Move attached CSV data into DB and fetch lat, Long coordinates for Location column using google map API.

a). Import data from CSV file to DB (VehicleDetails.csv File attached). b). Get Lat, Long coordinates for Location column in attached. CSV (you can use google map API) c). Create two columns in DB Lat, Long d). Add Lat, Long coordinates to Database for each Location in CSV.

Note: Make sure you don’t make same call to maps api for same location
 */
 
'use strict';
const fs  = require('fs'); 
const os  = require('os'); 
const csv = require('csvtojson');
const ng  = require('node-geocoder');
const async = require('async');

const db = require('./db.js');

const booksFile = './VehicleDetails.csv';

var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyB9NqWqTpN8ofRdU_18fa0KT9C78TCww3g', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = ng(options);

var decode = function (o, cb) {
	geocoder.geocode(o.Location, (err, res) => {
		if (err) {
			cb(err, null);
		} else {
			cb(null, res);
		}
	})
}
const converter = csv({
	delimiter: ',',
	trim: true,
	workerNum: os.cpus().length
})
.fromFile(booksFile)
.on('error', (err) => {
	console.error(err);
})
.on('end_parsed', (jsonArrObj) => {
	var count = 0;
	jsonArrObj.forEach((o) => {
		setTimeout(function() {
			decode(o, (err, res) => {
				if (err) {
					console.log(err);
					count += 1;
				} else {

					var q = 'insert into locations (location_name, latitude, longitude)'
						+ ' values (?, ?, ?)';

					var values = [
						res[0].formattedAddress,
						res[0].latitude,
						res[0].longitude
					]

					db.query(q, values, (err, res) => {
						if (err) {
							console.log(err);
						} else {
							count += 1;
							if (count === jsonArrObj.length) {
								process.exit(0);
							}
						}
					})
				}
			})
		}, 2000);
	})
})
.on('done', (msg) => {
	console.log(msg);
})
