const moment = require('moment');

const formatMessage = (user, msg) => {
    return {
        user,
        msg,
        timestamp: moment().format('h:mm a')
    }
}

module.exports = formatMessage;