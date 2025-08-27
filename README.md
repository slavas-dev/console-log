# Console Log to Discord Plugin

Discord bot plugin that automatically sends bot console logs to a Discord channel with colored embed messages.

## Version
**v1.0.0**

## Repository
[https://github.com/slavas-dev/discord-plugin-core](https://github.com/slavas-dev/discord-plugin-core)

## Features

- ✅ Automatically monitors `bot.log` file
- ✅ Sends colored embed messages to Discord channel
- ✅ Filters by time (last minute)
- ✅ Configurable silent messages
- ✅ Language support

## Configuration

```javascript
{
    channelId: 'DISCORD_CHANNEL_ID',
    checkInterval: 1000,     // Check interval in ms
    silence: true,           // Silent messages
    language: 'en'           // Language: English
}
```

## Color Schema

- 🔵 **DEBUG** - Blue
- 🟢 **INFO** - Green  
- 🟢 **SUCCESS** - Green
- 🟡 **WARN** - Yellow
- 🔴 **ERROR** - Red

## File Structure

```
console-log/
├── config.js           # Plugin configuration
├── index.js            # Main plugin logic
├── discord-sender.js   # Discord message handling
├── log-formatter.js    # Log formatting utilities
├── log-reader.js       # Log file reading
├── lang-helper.js      # Translation system
├── lang/               # Language files
│   └── en.js           # English translations
└── README.md           # This file
```

## Author
**slavas-dev**