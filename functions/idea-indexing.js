var AWS = require('aws-sdk');
var path = require('path');

var creds = new AWS.EnvironmentCredentials('AWS');
var esDomain = {
    endpoint: process.env.esURL,
    region: process.env.esRegion,
    index: 'test',
    doctype: 'order'
};

var endpoint =  new AWS.Endpoint(esDomain.endpoint);
exports.handler = (event, context, callback) => {
    event.Records.forEach(record => {
        postDocumentToES(record.dynamodb.NewImage, context);
    });
}

function postDocumentToES(doc, context) {
    var req = new AWS.HttpRequest(endpoint);
    req.method = 'POST';
    req.path = path.join('/', esDomain.index, esDomain.doctype);
    req.region = esDomain.region;
    req.body = JSON.stringify(doc);
    req.headers['presigned-expires'] = false;
    req.headers['Host'] = endpoint.host;
    // Sign the request (Sigv4)
    var signer = new AWS.Signers.V4(req, 'es');
    signer.addAuthorization(creds, new Date());
    // Post document to ES
    var send = new AWS.NodeHttpClient();
    send.handleRequest(req, null, function(httpResp) {
        var body = '';
        httpResp.on('data', chunk => body += chunk);
        httpResp.on('end', chunk => context.succeed());
    }, function(err) {
        console.log('Error: ' + err);
        context.fail();
    });
}