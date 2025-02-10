// callback.js
import fs from 'fs';

function fetchDataCallback(callback) {
    fs.readFile('sample2.json', 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            callback(null, jsonData);
        } catch (parseErr) {
            callback(parseErr, null);
        }
    });
}

export default fetchDataCallback;
