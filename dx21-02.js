const {
    check,
    defaultConditions,
    filterWithExtensions,
    createKeywordsCondition,
} = require('./lib');

const conditions = [
    ...defaultConditions,
    createKeywordsCondition(['WinMain', 'CreateWindowEx', 'WndProc']),
    (filePaths) => {
        const sourceCodePaths = filterWithExtensions(filePaths, ['.cpp']);
        return sourceCodePaths.length > 1 ? '複数のcppファイルを検出' : null;
    },
];

check(conditions);