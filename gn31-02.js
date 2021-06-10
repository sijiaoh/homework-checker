const { check, defaultConditions, createKeywordsCondition } = require('./lib');

const conditions = [
    ...defaultConditions,
    createKeywordsCondition(['WSAStartup', 'WSACleanup', 'gethostbyname']),
];

check(conditions);