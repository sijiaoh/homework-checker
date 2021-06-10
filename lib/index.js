module.exports = {
    ...require('./sjisToUtf8'),
    ...require('./filterWithExtensions'),
    ...require('./defaultConditions'),
    ...require('./createKeywordCondition'),
    ...require('./check'),
}