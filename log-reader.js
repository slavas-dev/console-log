const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../../logs/bot.log');
let lastPosition = 0;

function readNewLogs() {
    if (!fs.existsSync(LOG_FILE)) {
        return [];
    }

    const stats = fs.statSync(LOG_FILE);
    if (stats.size <= lastPosition) {
        return [];
    }

    const fileContent = fs.readFileSync(LOG_FILE, 'utf8');
    const newContent = fileContent.slice(lastPosition);
    lastPosition = stats.size;

    return newContent.split('\n').filter(line => line.trim() !== '');
}

function getRecentLogs() {
    if (!fs.existsSync(LOG_FILE)) {
        return [];
    }

    const fileContent = fs.readFileSync(LOG_FILE, 'utf8');
    const lines = fileContent.split('\n');
    
    const currentTime = new Date();
    const sessionStartTime = new Date(currentTime.getTime() - 60000);
    
    const recentLogs = lines.filter(line => {
        if (line.trim() === '') return false;
        
        const timeMatch = line.match(/\[(.+?)\]/);
        if (timeMatch) {
            const logTime = new Date(timeMatch[1]);
            return logTime >= sessionStartTime;
        }
        return false;
    });

    const stats = fs.statSync(LOG_FILE);
    lastPosition = stats.size;
    
    return recentLogs;
}

function resetPosition() {
    lastPosition = 0;
}

module.exports = {
    readNewLogs,
    getRecentLogs,
    resetPosition
};