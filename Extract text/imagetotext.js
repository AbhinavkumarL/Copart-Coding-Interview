'use strict';

const textract = require('textract');

textract.fromFileWithPath('./texas_title.jpeg', function( err, text ) {
	if (err) {
		console.log(err);
	} else {
		console.log(text);
	}
})
