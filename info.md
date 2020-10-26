# GuildScript
A discord.js-like client for Guilded.

**WARNING:** GuildScript is in an early beta right now and as such features might be missing, incomplete, not documented and/or changed.

Guilded's api is also not public so things might break unexpectedly.

## Installation
*as of right now GuildScript is not published and as such you cannot use it*

to install GuildScript run 
```bash
yarn add guildscript
# or
npm install guildscript
```
## Usage
**Note:** Usage might change as this is in early development.
```js
const Guilded = require('guildscript');
const client = new Guilded.Client();

client.on('ready' () => {
    console.log(`Logged in as ${client.user.name}.`);
});

client.on('message' () => {
    // TODO: finish this when we finish the content loader.
});

client.login('email', 'username');
```