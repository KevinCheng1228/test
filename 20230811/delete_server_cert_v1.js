const https = require('https');
const _axios = require('axios').default;
const jwt = require('jsonwebtoken');


(async function () {
    try {
        let username = ''
        let id = 1223
        let token = genJwtCertToken(username);
        
        let results = await deleteServerCertApi(id, token)
        console.log(results)
    } catch(error) {
        console.error(error)
    }

})()


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

function deleteServerCertApi(id, certTokenString) {
    return new Promise((resolve, reject) => {
        let url = 'https://localhost:3000/v1.0/cert/server/' + id;

        if (certTokenString && !certTokenString.startsWith('Bearer')) {
            certTokenString = 'Bearer ' + certTokenString;
        }

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        });

        _axios.delete(url, { headers: { 'X-Cert-Token': certTokenString }, httpsAgent: httpsAgent })
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                //console.log('deleteCert(): ' + type + ', ' + error.response.status + ',' + JSON.stringify(error.response.data));
                let msg = error.response.data.message || error.response.data.error || error.response.data.result;
                reject(new Error(msg))
            })
    })
}
