console.log('Before');

async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.githubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch (err) {
        console.log(err.message);
    }

}

displayCommits();


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
            // resolve({ name: name, repos: ['repo1', 'repo2', 'repo3'] });
            reject(new Error("Couldn't get a repos"));
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