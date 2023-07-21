const https = require('https');
const _axios = require('axios').default;
const jwt = require('jsonwebtoken');

function genJwtCertToken(accountName) {
    const CLUSTER = ''
    const WORKSPACE = ''
    const NAMESPACE = ''
    const jwtSecret = JSON.stringify({ cluster: CLUSTER, workspace: WORKSPACE, namespace: NAMESPACE });
    let jwtUserInfo = {
        accountName: accountName
    }
    let jwtToken = jwt.sign(jwtUserInfo, jwtSecret, {
        expiresIn: 3 * 60 // 3 mins. unit: seconds
    })
    return jwtToken;
}

function createCertApi(params, certTokenString) {
    return new Promise((resolve, reject) => {
        let url = 'https://10.32.4.37:3000/v1.0/cert/root';

        if (certTokenString && !certTokenString.startsWith('Bearer')) {
            certTokenString = 'Bearer ' + certTokenString;
        }

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        });

        _axios.post(url, params, { headers: { 'X-Cert-Token': certTokenString }, httpsAgent: httpsAgent })
            .then(result => {
                console.log('create cert api result: ', result.data)
                resolve(result.data)
            })
            .catch(error => {
                console.log(error.response.data);
                let msg = error.response.data.message || error.response.data.error || error.response.data.result;
                reject(new Error(msg))
            })
    })
}

function deleteCertApi(no, certTokenString) {
    return new Promise((resolve, reject) => {
        let url = 'https://10.32.4.37:3000/v1.0/cert/root/' + no;

        if (certTokenString && !certTokenString.startsWith('Bearer')) {
            certTokenString = 'Bearer ' + certTokenString;
        }

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        });

        _axios.delete(url, { headers: { 'X-Cert-Token': certTokenString }, httpsAgent: httpsAgent })
            .then(result => {
                console.log('delete cert api result: ', result.data)
                resolve(result.data)
            })
            .catch(error => {
                //console.log('deleteCert(): ' + type + ', ' + error.response.status + ',' + JSON.stringify(error.response.data));
                let msg = error.response.data.message || error.response.data.error || error.response.data.result;
                reject(new Error(msg))
            })
    })
}

(async function() {
    try {
        let username = 'admin'
        let token = genJwtCertToken(username);
        let createResult = await createCertApi({}, token);
        let deleteResult = await deleteCertApi(createResult.id, token)
        
    } catch(error) {
        console.error(error)
    }

})()


