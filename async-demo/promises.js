console.log('Before');

getUser(1)
    .then(user => getRepositories(user.githubUsername))
    .then(repo => getCommits(repo[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error: ', err));

console.log('After');


// Now there is no callback
// because return object is wrapped in resolve
function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, githubUsername: 'NecroSith' });
        }, 2000);
    })

}

function getRepositories(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting user repositories...');
            resolve({ name: name, repos: ['repo1', 'repo2', 'repo3'] });
        }, 2000);
    })
}

function getCommits(repos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting user commits...');
            resolve({ repos: repos, repos: ['repo1', 'repo2', 'repo3'] });
        }, 2000);
    })
}