// asyncAwait.js
async function fetchDataAsync() {
    try {
        const data = await fsPromises.readFile('sample2.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        throw err;
    }
}

export default fetchDataAsync;