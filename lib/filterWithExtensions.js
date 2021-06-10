module.exports = {
    filterWithExtensions: (filePaths, exts) => {
        return filePaths.filter(filePath => exts.some(ext => filePath.endsWith(ext)))
    },
};