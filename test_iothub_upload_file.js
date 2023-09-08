
const { IotHubClient , CertificateDescription } = require('@azure/arm-iothub');
const { DefaultAzureCredential } = require("@azure/identity");

const SubscriptionId = '8bbf121e-2305-44c0-b969-89038d6924ee';
const credential = new DefaultAzureCredential();

const resourceGroupName = 'SGP-RG-SN5-Prod';
const resourceName = 'azsgp-sn5-iot-2p';

const client = new IotHubClient(credential, SubscriptionId);
console.log(client.apiVersion);
console.log(client.$host);

const certName = '20230908'

const certDesc =
{
  "subject": "Azure IoT Hub Intermediate Cert Test Only",
  "expiry": "2025-07-16T09:19:36.000Z",
  "thumbprint": "961E10DF801EA1F48B2289455F00C4BCFD6E7CAD",
  "isVerified": true,
  "created": "2001-01-01T00:00:00.000Z",
  "certificate": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUZQRENDQXlTZ0F3SUJBZ0lCQVRBTkJna3Foa2lHOXcwQkFRc0ZBREFxTVNnd0pnWURWUVFEREI5QmVuVnkKWlNCSmIxUWdTSFZpSUVOQklFTmxjblFnVkdWemRDQlBibXg1TUI0WERUSXlNRGt4T1RBNU1Ua3pObG9YRFRJegpNRGN4TmpBNU1Ua3pObG93TkRFeU1EQUdBMVVFQXd3cFFYcDFjbVVnU1c5VUlFaDFZaUJKYm5SbGNtMWxaR2xoCmRHVWdRMlZ5ZENCVVpYTjBJRTl1Ykhrd2dnSWlNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0SUNEd0F3Z2dJS0FvSUMKQVFEYmdwRzQyOVp5RzYzTzU1RGVrcjUzWkhIK2JoS2ExZjNGZklQMTk5cHpZYys3ODNEbUpBU0lLaWJlNGdGZwp2akR2SXV5RktINXJ4dnp5dklZNDlNYjlTZFlYZ3FFajc2MFJRWGloT0t6Y1pSOENZYlhiN3cyM3grZmdxTS9LCnRqVE1sVXFoeURnTTU2NWRVRDBtdHREWUF5SDdiYlgzMFk1WStiWjJLcENmTGhUVnlranJvTUxONm5FaHNFRnEKM1pKdUgraE5PWUc3TW1zYzYxVWE3ZzdzT2ZPWlY2ZXY1NXVVMjYrbHRXVjUwYnl0dE9TSU05QXJueExJQjJFbgpiODhEWUhacE1rd0x6TlV2VldvMkh3aVRrbXBCNFBQbGZNeUMvSUYwTFpuSGNTWlloMnEydXF0dGJkYlN4OHZRCmpCNysyeEFhVm1jYlpoSUhUcC9iRStCS2VCUTNGdDdDWkRJelBER0lkLzlHSXdabjV3eDdhdHhTTnl2QXZreGUKQzJVUG1zbzl3K1VOaDVPMmxPbGdBYzNEVmF4S1B4dzAzYmxQbEVjYTdiTkM1b2UvOXZhRFp0L1MvZ21YVU8weQoxVHFPbDFzTzBxdW1QZ3hmekt5YUlWakQ3QlV6TDN3TDBLc2NmZDNOUFJPL2NwNit4V081aENiUTN1cmZPREhQClFCUjBIanF4QlVKaGZWWWRGUStPejVoS29pOW9PNHEzWWdqSjk2NnBmWjdvZ1ppMUJrK2pQSXo1aGw1QWp2QWUKbUMrbmZ6M0dGcC9mdkpvSjRYakczS09RbjE3TmhSTUJrYWRBY3JQMFMrSXltQnpKZUF1WXRaZitEMlc3UWhSMAphTnkwNG9lN3NDTG1FZGg2NHZsUHZhS3A2YjN6S1Q4WEFxRnFxZ21iRkFjbit3SURBUUFCbzJNd1lUQWRCZ05WCkhRNEVGZ1FVQnZsd0lLejFZWm5IWUhzR3VWZURvaUo0bzJJd0h3WURWUjBqQkJnd0ZvQVVPQXUvRWt3VVJGbjYKQUpqcER3OGFZTnljazhJd0R3WURWUjBUQVFIL0JBVXdBd0VCL3pBT0JnTlZIUThCQWY4RUJBTUNBWVl3RFFZSgpLb1pJaHZjTkFRRUxCUUFEZ2dJQkFDTlI5QkZxYnFyclliVHd4NVZLTWE0d0NBZ1pTRmg1VkZ1eEJpdXppb3BxCmlsbm9oSFY5WUg2TWxvNzFCakNwdlFMRG9QMnhnSzE5c0dRZERDcGE5VThxWGRYUjZUM0QrWmExWDVOc2xjVVoKRTNzeThUODAwUlhCUE1KaUk3S2kvc1Q0bysvMHdraG1PKzZueFYrbzNCeEVoOUpER2hHcE5jSk9HekNnMnVPSQp1YTdEaDZUcFRVcnFtMDE0VGdVYXlNMEo0T3JXeTNhaUNIcFRjcFdyNmVjalhHMjVnYmx0ckdEem0vajU0d1g4Ck1pQ2Jld3ExczZXblMzRjhvbEE4cXBhU1BNRGl4L2t3UzBPRTI1RDRxN21Zd29vWnJ5akwwSmV0dEVwSEhNcE0KZThLQ3llV1hpSU1jWkFhMW9ydTNFcUFCdk5UbXFJZUgvcTkzRkNuZHNhaG5zVUs0aTBTR1FKcjErTTl1UW1HYwo1OHYvSzg5aE5zeEt5cFJoZGZRQnJhYzUvVkRPWHRJdkVCa2RXV2tObkpVVXQvZUROSllGK0ZXSEFaaDlJUVN4Cm1OaTJKRDV6VmRraVUwTTMxNFE3eWdhWFF0L1ZRcTAwNUpuTGlUYXVubmVSNlFVU1lJZFR2Ry96UnFjTEdQdWMKeG5taVpvVnNFYXpoRVJZUmkrR0t0b2RZK0EwSWdSTHNOdnN5eC9zRjNKbzZZVUxQSlVuazhSZXFkd0NaT2tOTwo0bVhLZ3NoRytEZDJvck9XNjhGZktWU1hMdFlGMlRPVXRBckUrMzh3WlJjQ3NvdCtTRk81ejZzTmNQZ2dhNm1ICkdXeHlJRXAxelp4UktWU2sxZXQ0aEdzWmJ0cW96MlV2SlUzZW95Q280UHFIUWtvRzJldFpCRzY3eFdjSkpmTUoKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo="
}

client.certificates.createOrUpdate(resourceGroupName, resourceName, certName, {"properties": certDesc})
    .then(result => {
        console.log('createOrUpdate(): ' + JSON.stringify(result));
        return client.certificates.listByIotHub(resourceGroupName, resourceName)
    })
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.error('createOrUpdate(): ' + err);
    })



