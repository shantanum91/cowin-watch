const https = require('https');

const now = new Date();
const DATE = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
const AGE_LIMIT = 45;
const DIST_ID = 379;
const PIN_FILTER = null;//[411014];
const EXCLUDE_PINS = [];

const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${DIST_ID}&date=${DATE}`;

console.log(`Scanning for week: ${DATE} | Age Limit: ${AGE_LIMIT} | ` + `Dist: ${DIST_ID}` + ` | PinFilter: ${PIN_FILTER}`+ ` | ExcludePins: ${EXCLUDE_PINS}`);


setInterval(function () {
    run();
}, 1000 * 10);

function run() {
    process.stdout.write('.');

    fetch(url).then(data => {
        let resp = JSON.parse(data);
        const avl = isAvailable(resp, AGE_LIMIT);
        if (avl && avl.length) {
            console.log('\n' + new Date().toLocaleString(), `*********** Slots available for ${AGE_LIMIT}+ ***********`);
            for (let node of avl) {
                const c = node.center, s=node.session;
                console.log(`${c.name} | ${c.block_name}-${c.pincode} | AGE: ${s.min_age_limit} DATE:${s.date}`);
            }
            process.stdout.write('\u0007');
            process.stdout.write('\u0007');
            process.stdout.write('\u0007');
            process.stdout.write('\u0007');
        }
    }).catch(e => {
        console.log(e);
    });
}

function isAvailable(resp, ageLimit) {
    if (!resp || !resp.centers) return;

    let results = [];

    for (let center of resp.centers) {
        for (let session of center.sessions) {
            if (session.available_capacity && session.min_age_limit <= ageLimit) {
                if ((!PIN_FILTER || PIN_FILTER.includes(center.pincode)) && !EXCLUDE_PINS.includes(center.pincode))
                    results.push({ center, session });
            }
        }
    }

    return results;
}

function fetch(urlStr) {
    return new Promise((resolve, reject) => {
        https.get(urlStr, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                resolve(data);
            });
        }).on("error", (err) => {
            reject(err);
        });
    });
}