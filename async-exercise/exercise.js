async function getData() {
    const customer = await getCustomer({
        id: 1,
        name: 'Mosh Hamedani',
        isGold: true,
        email: 'email'
    });
    console.log('Customer: ', customer.name);
    if (customer.isGold) {
        const movies = await getTopMovies(customer.id);
        console.log('Top movies: ', movies);
        const email = await sendEmail(customer.email);
    }
}

getData();

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Mosh Hamedani',
                isGold: true,
                email: 'email'
            });
        }, 4000);
    })
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 4000);
    });
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Email sent to', email);
            resolve();
        }, 4000);
    });
}