
# Number-to-Words API

This RESTful API converts numbers into their word representations. For example, it converts `123` to `"one hundred twenty-three"`.

## Setup

Install dependencies:


   npm install
   

### Start the Server

To start the server, run the following command:

npm start


The server will start on port 3000 by default. You can specify a different port using the `PORT` environment variable:


PORT=4000 npm start

### Convert a Number to Words

Send a POST request to the `/convert` endpoint with a JSON payload containing the number to convert. For example:


curl -X POST http://localhost:3000/convert -H "Content-Type: application/json" -d '{"number": 123}'


Response:

{
  "status": "success",
  "words": "one hundred twenty-three"
}


## Testing

To run the test suite, use the following command:

npm test

This command will run both unit tests and integration tests.


### Valid Input


curl -X POST http://localhost:3000/convert -H "Content-Type: application/json" -d '{"number": 123}'

Response:

{
  "status": "success",
  "words": "one hundred twenty-three"
}


### Invalid Input

curl -X POST http://localhost:3000/convert -H "Content-Type: application/json" -d '{"number": -123}'

Response:

{
  "status": "error",
  "message": "Number must be an integer between 0 and 999"
}


---

This README provides instructions on how to set up, use, and test the API. It also includes examples of valid and invalid API calls.
