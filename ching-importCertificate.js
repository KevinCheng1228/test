const fs = require('fs/promises');

const { CertificateClient, WellKnownIssuer } = require('@azure/keyvault-certificates');

const { ManagedIdentityCredential } = require('@azure/identity');

async function readPemCertFile() {
    let data;
    try {
        data = await fs.readFile('./iothub-device-00D0CD007999.keyvault.pem', { encoding: 'utf8' });
        console.log(data);
    } catch (err) {
        console.log(err);
    }

    return data;
}

async function main() {
    const url = 'https://azsgp-sn5-kv-dev.vault.azure.net/';
    const credential = new ManagedIdentityCredential();

    const client = new CertificateClient(url, credential);
    let samplePem = await readPemCertFile();
    let certName = `cert${Date.now()}`

    console.log(`Start to import cert: ${certName}`);
    console.log(`samplePem ${samplePem}`);

    let importedCertificate = await client.importCertificate(
        certName,
        samplePem,
        {
            policy: {
                contentType: 'application/x-pem-file',
                issuerName: WellKnownIssuer.Self,
                subject: 'CN=edge365.advantech.com',
                exportable: true
            }
        }
    );

    console.log('importedCertificate', importedCertificate);
}

main().catch((error) => {
    console.error('An error occurred:', error);
    process.exit(1);
});

module.exports = { main };
