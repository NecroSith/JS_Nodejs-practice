console.log('Before');
getUser(1, (user) => {
    console.log('User', user);
    getRepositories(user.githubUsername, (repos) => { // Beginning of Callback hell
        console.log(repos);
    });
});
console.log('After');


function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, githubUsername: 'NecroSith' });
        // This will not work
        // return { id: id, githubUsername: 'NecroSith' }
    }, 2000);
}

function getRepositories(name, callback) {
    setTimeout(() => {
        console.log('Getting user repositories...');
        callback({ name: name, repos: ['repo1', 'repo2', 'repo3'] });
    }, 2000)
}