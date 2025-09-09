// Create the fetchMethod function
function fetchMethod(url, callback, method = "GET", data = null, token = null) { // will be used for the back end to display its information at the front end
// URL to which the HTTP request should be made,
// callback function to be executed when the response is received,
// HTTP method used in the request (default GET),
// data to be sent in the request body (default null),
// authorisation token (default null)
  	console.log("fetchMethod: ", url, method, data, token); // optional, logs it into the browser console

	// setting headers for the fetch() function later on
  	const headers = {}; // creates an empty object
  	if (data) { // if data is provided, it indicates that the request body contains JSON data, so sets the "Content-Type" to "application/json"
    	headers["Content-Type"] = "application/json";
  	}
  	if (token) { // if token is provided, sets the authorisation header to include the token in the request
    	headers["Authorization"] = "Bearer " + token;
  	}

	// creating options object for the fetch() fucntion after this
  	let options = {
   		method: method.toUpperCase(), // ensures HTTP method is in upper case (i.e. get => GET)
    	headers: headers,
  	};
  	if (method.toUpperCase() !== "GET" && data !== null) {
    	options.body = JSON.stringify(data);
  	}

	// making the fetch request
  	fetch(url, options) // passing the earlier objects as arguments
    .then((response) => { // .then() method is used to return a promise (in this case, the callback function that resolves to the response from the server)
      	if (response.status == 204) {
        	callback(response.status, {});
      	}
		else {
        	response.json().then((responseData) => callback(response.status, responseData));
      	}
    })
    .catch((error) => console.error(`Error from ${method} ${url}:`, error)); // .catch is specifically designed for handling errors
}