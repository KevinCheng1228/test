const { CertificateClient } = require('@azure/keyvault-certificates');
const { ManagedIdentityCredential } = require('@azure/identity');

async function main() {
    const url = 'https://azsgp-sn5-kv-dev.vault.azure.net/';
    const credential = new ManagedIdentityCredential();

    const client = new CertificateClient(url, credential);

    for await (const certificate of client.listPropertiesOfCertificates({ includePending: true })) {
        const certObj = await client.getCertificate(certificate.name);
        console.log(certObj);
        // const PEMFormattedCER = [
        //     '-----BEGIN CERTIFICATE-----',
        //     certObj.cer.toString('base64'),
        //     '-----END CERTIFICATE-----'
        // ].join('\n');
        // console.log('PEMFormattedCER', PEMFormattedCER)
    }
}

main().catch((error) => {
    console.error('An error occurred:', error);
    process.exit(1);
});

module.exports = { main };
