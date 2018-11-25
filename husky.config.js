module.exports = {
    hooks: {
        'prepare-commit-msg': './tools/git-commit-message.sh',
        'pre-commit': 'pretty-quick --staged',
        'pre-push': './tools/preventPushToMaster.sh && npm test',
        'post-checkout': 'check-dependencies --install',
        'post-merge': 'check-dependencies --install',
    },
};
