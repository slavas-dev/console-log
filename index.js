const config = require('./config');
const { info, error } = require('../../console-log');
const { readNewLogs, getRecentLogs, resetPosition } = require('./log-reader');
const { sendLogsToDiscord } = require('./discord-sender');
const { t } = require('./lang-helper');
const path = require('path');

const currentFile = path.basename(__filename);
let channel = null;

function initializeLogPosition() {
    resetPosition();
    
    if (channel) {
        const recentLogs = getRecentLogs();
        sendLogsToDiscord(channel, recentLogs);
    }
}

function monitorLogs() {
    if (!channel) {
        return;
    }

    const newLogs = readNewLogs();
    sendLogsToDiscord(channel, newLogs);
}

module.exports = function(client, colors) {
    client.once('clientReady', () => {
        channel = client.channels.cache.get(config.channelId);
        
        if (!channel) {
            error(currentFile, t('errors.channelNotFound', { channelId: config.channelId }));
            return;
        }

        if (!channel.isTextBased()) {
            error(currentFile, t('errors.notTextChannel'));
            return;
        }
        
        initializeLogPosition();
        
        const interval = setInterval(monitorLogs, config.checkInterval);
        
        process.on('SIGINT', () => {
            clearInterval(interval);
        });
        
        process.on('SIGTERM', () => {
            clearInterval(interval);
        });
    });

    client.on('error', (err) => {
        error(currentFile, t('errors.discordClientError', { error: err.message }));
    });
};