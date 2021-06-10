module.exports = {
    ...require('./sjisToUtf8'),
    ...require('./filterWithExtensions'),
    ...require('./defaultConditions'),
    ...require('./createKeywordsCondition'),
    ...require('./createNegativeKeywordsCondition'),
    ...require('./check'),
}