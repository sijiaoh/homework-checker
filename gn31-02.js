const { check, defaultConditions, createKeywordCondition } = require('./lib');

const conditions = [
    ...defaultConditions,
    createKeywordCondition(['WSAStartup', 'WSACleanup', 'gethostbyname']),
];

check(conditions);