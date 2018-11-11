module.exports = {
    hooks: {
        'pre-commit': 'pretty-quick --staged',
        'pre-push': 'npm test',
        'post-checkout': 'check-dependencies --install',
        'post-merge': 'check-dependencies --install',
    },
};
