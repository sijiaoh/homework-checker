const { filterWithExtensions } = require('./filterWithExtensions');

module.exports = {
    defaultConditions: [
        filePaths => {
            if (!filterWithExtensions(filePaths, ['.exe']).length)
                return 'EXEなし';
            return null;
        },
        filePaths => {
            const sourceCodeExtensions = ['.h', '.cpp'];
            if (!filterWithExtensions(filePaths, sourceCodeExtensions).length)
                return 'ソースコードなし';
            return null;
        },
    ],
};