const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = true;
      if (success) {
        resolve("Operation successful!");
      } else {
        reject("Operation failed.");
      }
    }, 10000);
  });
  myPromise
  .then(result => {
    console.log(result);  // "Operation successful!"
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log("Promise completed!");
  });
  new Promise((resolve) => resolve(10))
  .then(num => num * 2)
  .then(num => num + 5)
  .then(console.log);  // Outputs: 25
  
async function fetchData() {
    try {
      let result = await myPromise;
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchData();
  