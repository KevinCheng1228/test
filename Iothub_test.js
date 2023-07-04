'use strict';

var Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;
var Protocol = require('azure-iot-device-mqtt').MqttWs;

var connectionString = 'HostName=azsgp-sn5-iot-dev.azure-devices.net;DeviceId=5e36ae0d-20ae-4623-8db7-b68a48dd7613;SharedAccessKey=ismWPNVvv2DQP4DBma9wYtfEOrK8e1WA4fERS3mL4mA=';

var client = Client.fromConnectionString(connectionString, Protocol);

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

var connectCallback = function (err) {
  if (err) {
    console.log('Could not connect: ' + err + "\n");
  } else {
    console.log('Client connected');

    // Create a message and send it to the IoT Hub every second
    setInterval(function(){
        var temperature = 20 + (Math.random() * 15);
        var humidity = 60 + (Math.random() * 20);            
        var data = JSON.stringify({ deviceId: '6C302AF83FD9', temperature: temperature, humidity: humidity });
        var message = new Message(data);
        message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');
        message.properties.add('tp', 'Advantech/6C302AF83FD9/data');
        console.log("Sending message: " + message.getData());
        client.sendEvent(message, printResultFor('send'));
    }, 3000);
  }
};

client.open(connectCallback);

