const Encoding = require('./encoding-japanese/src/index');

module.exports = {
    sjisToUtf8: (str) => {
        return Encoding.convert(str, {
            from: 'SJIS',
            to: 'UNICODE',
            type: 'string',
        });
    },
};