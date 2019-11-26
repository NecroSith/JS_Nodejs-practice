const bcrypt = require('bcryptjs');

// For better security we need to add salt
// salt is random string at the beginning or end of password
// which makes is nearly impossible to hack using reverse hashing

// the argument is number of rounds for algorithm to go through to generate salt
// the higher the number the more complex salt will be
// Default is 10

async function run() {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234', salt);
    console.log(salt);
    console.log(hashed);


}

run();