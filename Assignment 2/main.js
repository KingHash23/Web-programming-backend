
import fetchDataCallback from './callback.js';
import fetchDataPromise from './Promises.js';
import fetchDataAsync from './Asyncawait.js';

// Function to log output in both console and browser
function logOutput(message) {
    console.log(message);
    
    // Check if running in a browser
    if (typeof document !== 'undefined') {
        const outputDiv = document.getElementById('output');
        if (outputDiv) {
            const p = document.createElement('p');
            p.textContent = message;
            outputDiv.appendChild(p);
        }
    }
}

logOutput('Fetching data using Callback:');
fetchDataCallback((err, data) => {
    if (err) {
        logOutput(err);
    } else {
        logOutput(JSON.stringify(data, null, 2));
    }
});

logOutput('Fetching data using Promise:');
fetchDataPromise()
    .then(data => logOutput(JSON.stringify(data, null, 2)))
    .catch(err => logOutput(err));

logOutput('Fetching data using Async/Await:');
(async () => {
    try {
        const data = await fetchDataAsync();
        logOutput(JSON.stringify(data, null, 2));
    } catch (err) {
        logOutput(err);
    }
})();
