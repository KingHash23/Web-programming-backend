
// promise.js
import fsPromises from 'fs/promises';

function fetchDataPromise() {
    return fsPromises.readFile('sample2.json', 'utf8')
        .then(data => JSON.parse(data))
        .catch(err => {
            console.error('Error reading file:', err);
            throw err;
        });
}

export default fetchDataPromise;
