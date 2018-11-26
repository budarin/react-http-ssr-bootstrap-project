module.exports = {
    hooks: {
        'prepare-commit-msg': 'prun pre-commit',
        'pre-commit': 'pretty-quick --staged',
        'pre-push': 'prun pre-push',
        'post-checkout': 'check-dependencies --install',
        'post-merge': 'check-dependencies --install',
    },
};
