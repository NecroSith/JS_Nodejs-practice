console.log('Before');
getUser(1, getRepositories);
console.log('After');

function getRepositories(user) {
    getRepositories(user.githubUsername, getCommits);
}

function getCommits(repo) {
    getCommits(repo, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

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

// Don't do that - it's a bad practice