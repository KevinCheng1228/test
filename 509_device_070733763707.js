const fs = require('fs');
const mqtt = require('mqtt');
const path = require('path')

let HOST = '';
const PORT = 8883;
let macId = '';
let deviceId = '';

var caFile = fs.readFileSync(path.join(__dirname, "./ca.cert.pem"));
var certFile = fs.readFileSync(path.join(__dirname, `./rabbitmq-device-${macId}.cert.pem`));
var keyFile = fs.readFileSync(path.join(__dirname, `./rabbitmq-device-${macId}.key.pem`));

let options = {
  host: HOST,
  port: PORT,
  protocol: 'mqtts',
  //rejectUnauthorized: false, // 必須在 Cert檔案中加入Alternative Name: IP Address:40.83.93.152
  ca: [ caFile ],
  cert: certFile,
  key: keyFile,
}

//let client  = mqtt.connect(URL, opts);
const client = mqtt.connect(options)

client.on('connect', function () {
    console.log("connected");
    setInterval(() => {
        let topic = 'Advantech/' + deviceId + '/data';
        let jsonObj = {
            "name":"PC-4060",
            "macid": deviceId,
			"plus": getRandom(0, 999)/100,
            "ai1": getRandom(0, 999)/100,
            "ai2": getRandom(0, 499)/100,
            "di1": Boolean(getRandom(0, 1)),
            "do1": Boolean(getRandom(0, 1))

        };


        let msg = JSON.stringify(jsonObj);
        console.log(msg)
        //client.publish('presence', 'Hello mqtt', function (err) {
        client.publish(topic, msg, function (err) {
            if (err) {
                console.log("error: " + err);
            }

            console.log("publish ok");

            // client.end();
        });
    }, 3000);
});

client.on('error', function (err) {
    console.log("error: " + err);
    client.end(true); //true: force close client
});

client.on('reconnect', function (err) {
    console.log("reconnect: " + err);
    client.end(true); //true: force close client
});

function getRandom (min, max) {
    return Math.floor(Math.random()*(max-min+1))+min;
}

