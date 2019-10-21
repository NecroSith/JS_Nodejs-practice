const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Calling API 1...');
        resolve(1);
        // reject(new Error('something failed'));
    }, 2000);
});

const p2 = new Promise(resolve => {
    setTimeout(() => {
        console.log('Calling API 2...');
        resolve(2);
    }, 2000)
});


// To make all promises concurrent Promise.all is used
// If any of promises in Promise.all is rejected the whole object Promise.all
// is considered rejected as well
Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log(err));

// Promise.race is used when you don't want to wait until all promises are fullfilled
// So it is called when the first promise is fullfiled
Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log(err));