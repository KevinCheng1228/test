
const { IotHubClient } = require('@azure/arm-iothub');
const { DefaultAzureCredential } = require("@azure/identity");


const SubscriptionId = '8bbf121e-2305-44c0-b969-89038d6924ee';
const credential = new DefaultAzureCredential();

const resourceGroupName = 'SGP-RG-SN5-Prod';
const resourceName = 'azsgp-sn5-iot-2p';


const client = new IotHubClient(credential, SubscriptionId);
console.log(client.apiVersion);



const certName = '20230908'
const eTagName = ''


client.certificates.delete(resourceGroupName, resourceName, certName, eTagName)
  .then(result => {
    console.log('certificates.delete(): ' + result);
  })
  .catch(err => {
    console.error('createOrUpdate(): ' + err);
  })



