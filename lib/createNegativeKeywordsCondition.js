const fs = require('fs');
const { filterWithExtensions } = require('./filterWithExtensions');

module.exports = {
    createNegativeKeywordsCondition: (keywords) => (filePaths) => {
        const sourceCodePaths = filterWithExtensions(filePaths, ['.h', '.cpp']);
        return keywords.map(keyword => {
            if (sourceCodePaths.some(sourceCodePath => {
                const sourceCode = fs.readFileSync(sourceCodePath);
                return sourceCode.includes(keyword);
            }))
                return `キーワードあり：${keyword}`;
            return null;
        }).filter(message => !!message);
    }
};