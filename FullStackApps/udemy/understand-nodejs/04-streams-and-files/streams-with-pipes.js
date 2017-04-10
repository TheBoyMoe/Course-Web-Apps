'use strict';

const fs = require('fs');
const zlib = require('zlib');

const readable = fs.createReadStream(`${__dirname}/largeFile.txt`);
const writable = fs.createWriteStream(`${__dirname}/largeFileCopy2.txt`);
const compressed = fs.createWriteStream(`${__dirname}/file.txt.gz`);

// create a transform stream - readable, writeable and transform the data in some way
const gzip = zlib.createGzip();

// output of one, becomes the input of the other
// pipe() automatically sets up the 'data' listener
readable.pipe(writable);

// read the file contents, pipe to gzip, the output of which is piped to
// another writable stream - the gzip stream is both readable and writable
readable.pipe(gzip).pipe(compressed);
