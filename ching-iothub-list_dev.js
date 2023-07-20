
const { IotHubClient } = require('@azure/arm-iothub');
const { ManagedIdentityCredential } = require("@azure/identity");

const SubscriptionId = '3a1b19c7-dbd9-4cb8-8ff6-aea349e8d233'; //365
const credential = new ManagedIdentityCredential();

const resourceGroupName = 'SGP-RG-SN5-Non-Prod';
const resourceName = 'azsgp-sn5-iot-dev';

const client = new IotHubClient(credential, SubscriptionId);
console.log(client.apiVersion);
console.log(client.$host);

client.certificates.listByIotHub(resourceGroupName, resourceName)
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.error(err)
    })
