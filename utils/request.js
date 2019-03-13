const http = require("https");

function httpRequestCallback(resp, callback) {
    let data = '';
    if (resp.statusCode === 302) {
        get(response.headers.location);
    }
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        let result;
        try {
            result = JSON.parse(data);
        } catch (e) {
            console.log(data);
        }
        callback(result);
    });
}

function get(options, callback) {
    options.method = 'GET';
    return genericRequest(options, callback).end();
}

function post(options, data, callback) {
    options.headers = options.headers || {};
    options.method = 'POST';
    if (data) {
        options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(data));
    }
    const req = genericRequest(options, callback);
    req.write(JSON.stringify(data));
    req.end();
}

function genericRequest(options, callback) {
    return http.request(options, (resp) => httpRequestCallback(resp, callback))
        .on("error", (err) => {
            console.log("Error in request " + err.message);
        });
}

module.exports = {
    get: get,
    post: post
};