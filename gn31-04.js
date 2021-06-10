const { check, defaultConditions, createKeywordsCondition, filterWithExtensions } = require('./lib');

const conditions = [
    ...defaultConditions,
    createKeywordsCondition([
        'main',
        'WSAStartup',
        'WSACleanup',
        'socket',
        'closesocket',
        'bind',
        'sendto',
        'recvfrom',
    ]),
    (filePaths) => {
        const exes = filterWithExtensions(filePaths, ['exe']);
        return exes.length != 2 ? 'exeの数が2でない' : null;
    },
    (filePaths) => {
        const cpps = filterWithExtensions(filePaths, ['cpp']);
        return cpps.length < 2 ? 'cppの数が2に満たない' : null;
    },
    (filePaths) => {
        const readme = filePaths.filter(filePath => filePath.includes('readme'));
        return !readme ? 'READMEなし' : null;
    },
];

check(conditions);