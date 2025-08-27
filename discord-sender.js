const { EmbedBuilder } = require('discord.js');
const { formatLogMessage, getLogColor } = require('./log-formatter');
const config = require('./config');
const { error } = require('../../console-log');
const { t } = require('./lang-helper');

const currentFile = 'discord-sender.js';

function sendLogToDiscord(channel, logLine) {
    const logData = formatLogMessage(logLine);
    
    const embed = new EmbedBuilder()
        .setColor(getLogColor(logData.type))
        .setDescription(`\`${logData.formatted}\``);

    const messageOptions = { embeds: [embed] };
    
    if (config.silence) {
        messageOptions.flags = ['SuppressNotifications'];
    }

    return channel.send(messageOptions)
        .catch(err => {
            error(currentFile, t('errors.sendToDiscordFailed', { error: err.message }));
        });
}

function sendLogsToDiscord(channel, logs) {
    if (!channel || logs.length === 0) {
        return;
    }

    logs.forEach(logLine => {
        sendLogToDiscord(channel, logLine);
    });
}

module.exports = {
    sendLogToDiscord,
    sendLogsToDiscord
};