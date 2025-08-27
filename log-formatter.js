const { t } = require('./lang-helper');

function formatLogMessage(logLine) {
    const match = logLine.match(/\[.*?\] \[(\w+)\] (.+?): (.+)/);
    if (match) {
        const logType = match[1].toLowerCase();
        const fileName = match[2];
        const message = match[3];
        return {
            type: logType,
            fileName: fileName,
            message: message,
            formatted: `${fileName}:${message}`
        };
    }
    return {
        type: 'info',
        fileName: t('logs.unknown'),
        message: logLine,
        formatted: logLine
    };
}

function getLogColor(logType) {
    const colors = {
        'info': 0x00FF00,
        'error': 0xFF0000,
        'warn': 0xFFFF00,
        'warning': 0xFFFF00,
        'debug': 0x0000FF,
        'success': 0x00FF00
    };
    return colors[logType] || 0x808080;
}

module.exports = {
    formatLogMessage,
    getLogColor
};