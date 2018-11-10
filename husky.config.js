module.exports = {
    hooks: {
        'pre-commit': 'lint-staged',
        'pre-push': 'npm test',
        'post-checkout': 'check-dependencies --install && npm audit fix',
        'post-merge': 'check-dependencies --install',
    },
};
