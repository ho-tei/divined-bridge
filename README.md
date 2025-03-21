# Hypixel Discord Chat Bridge

Forked from https://github.com/DuckySoLucky/hypixel-discord-chat-bridge, Modified to fix issues & customized to guilds liking

guild discord: discord.gg/PFrA8kjQ4P

A two-way chat bridge between [Hypixel](https://hypixel.net/) guild chat and a [Discord](https://discord.com/) channel. The application utilizes [discord.js v14](https://github.com/discordjs/discord.js) for communicating with Discord, and [mineflayer](https://github.com/PrismarineJS/mineflayer) for communicating with Hypixel.

> [!WARNING]
> This software allows access to Hypixel using Mineflayer, a non-standard Minecraft client. Using this application carries the risk of your Minecraft account being banned from Hypixel. Therefore, use it at your own discretion. I hold no responsibility for any bans resulting from its usage.

<hr>


## Table of Content

- [Commands](#commands-2)
- [Configuration](#configuration)

## Configuration

#### Minecraft

#### Bot

The `bot` section contains configuration options for the minecraft bot, including the `prefix`, `messageFormat`, and `messageRepeatBypassLength`.

The prefix option determines the command prefix used for minecraft commands. By default, this is set to `!`.

The messageFormat option is a format for the chat message on the minecraft side, this can be customized to whatever you want, default format is `{username} » {message}`, some of the popular formats are `{username} > {message}` and `{username}: {message}`.

> Possible options for this are `{username}` and `{message}`.

The messageRepeatBypassLength option is a number value that determines the length of a string that will be sent after message in case `You cannot say the same message twice!` occurs.

### Frag Bot

> [!NOTE]  
> Please be aware that this feature is now obsolete, as the Hypixel's [August Patch](https://hypixel.net/threads/august-3rd-skyblock-patch-notes.5450046/) has introduced support for solo dungeons.

The fragBot section contains options for the bot's fragBot feature, which manages a whitelist and blacklist of users.

The `enabled` option determines whether the fragBot is enabled. By default, this is set to true.

The `whitelist` option determines whether the whitelist feature is enabled. By default, this is set to false.

The `whitelisted` option is an array of user usernames or UUIDs that will be added to the whitelist which already includes Guild members. By default, this is set to an empty array.

The `blacklist` option determines whether the blacklist feature is enabled. By default, this is set to false.

The `blacklisted` option is an array of user usernames or UUIDs, blacklisted played won't be able to use fragBot. By default, this is set to an empty array.

### Guild

The guild section contains options related to the Hypixel guild.

The `guildExp` option is a number value required for the `!gexp` command, which is used to check how much more guild experience a user needs to collect to meet the guild's requirements. By default, this is set to 50,000.

### API

The API options include information about APIs which are being used, the only values which needs to be changed are `hypixelAPIkey` and `imgurAPIkey`.

You can receive Hypixel API key by going to [Hypixel Developer Dashboard](https://developer.hypixel.net/dashboard/) and creating new application.

> Hypixel API is used for most of stats related commands.

Imgur API can be generated [Here](https://api.imgur.com/oauth2/addclient). For `Authorization type` you should select `Anonymous usage without user authorization`. Once you have created the application, you can find the `Client ID` and `Client Secret` on the application page and you can use the `Client ID` as the `imgurAPIkey`.

> Imgur API is used for rendering commands like `!armor`, `!pet`, `!equipment` etc.

### guildRequirements

The `guildRequirements` section contains options related to the Hypixel Guild's requirements.

The `enabled` option determines whether guild requirements are enabled. By default, this is set to false.

The `autoAccept` option determines whether guild invites should be automatically accepted if the user meets the guild's requirements. By default, this is set to false.

The requirements option is an object containing various requirements for joining the guild, including `bedwarsStars`, `bedwarsStarsWithFKDR`, `bedwarsFKDR`, `skywarsStars`, `skywarsStarsWithKDR`, `skywarsKDR`, `duelsWins`, `duelsWinsWithWLR`, `duelsWLR`, `senitherWeight`, `lilyWeight`, and `skyblockLevel`. By default, all of these requirements are set to 0.

### skyblockEventsNotifications

The bot also has a feature called event notifier. It lets you send messages in the guild chat before an event starts. By default, all events are turned on.

The `skyblockEventsNotifications` object contains the settings related to Skyblock events notifications.

The `enabled` property determines whether the feature is enabled or not. If it's set to true, the bot will send a message to the Guild chat 5 minutes and moment before the event starts.

The `notifiers` object contains a list of events that the bot will notify for, and whether each event is enabled or not. By default, all events are enabled. You can disable an event by setting its value to false.

Here's a list of the supported events:

- BANK_INTEREST: When bank interest is given to players.
- DARK_AUCTION: When the Dark Auction event starts.
- ELECTION_BOOTH_OPENS: When the election booth opens.
- ELECTION_OVER: When the election is over and the results are announced.
- FALLEN_STAR_CULT: When the Fallen Star Cult event starts.
- FEAR_MONGERER: When the Fear Mongerer event starts.
- JACOBS_CONTEST: When the Jacob's Contest event starts.
- JERRYS_WORKSHOP: When Jerry's Workshop event starts.
- NEW_YEAR_CELEBRATION: When the New Year's Celebration event starts.
- SEASON_OF_JERRY: When the Season of Jerry event starts.
- SPOOKY_FESTIVAL: When the Spooky Festival event starts.
- TRAVELING_ZOO: When the Traveling Zoo event starts.

The `customTime` is object that has key with minute amount and value with events which will be sent key minutes before event occurs. For example `"10": ["JACOBS_CONTEST"]` will send message 10 minutes before Jacob's Contest event starts

Preview

> ![image](https://github.com/DuckySoLucky/hypixel-discord-chat-bridge/assets/75372052/0fc99431-3213-40fa-949b-6acca62ef63c)

### hypixelUpdates

This configuration enables Hypixel updates and includes settings for Hypixel news, status updates, and skyblock version changes.

The `enabled` property determines whether the feature is enabled or not. If it's set to true, the bot will send a message to the Guild chat when a new Hypixel news article is posted, when Hypixel's status changes, and when the Skyblock version changes.

The `hypixelNews` property determines whether the bot should send a message when a new Hypixel news article is posted.

The `statusUpdates` property determines whether the bot should send a message when new incident occurs or update regarding it is posted.

The `skyblockVersion` property determines whether the bot should send a message when the Skyblock version changes.

### Commands

The `commands` object contains the settings related to the bot's commands.

The `normal` property determines whether the normal commands are enabled or not. If it's set to true, the bot will listen for commands in the guild chat.

The `soopy` property determines whether the Soopy commands are enabled or not. If it's set to true, the bot will listen for commands in the guild chat.

#### Discord

### Bot

The `bot` options include the `token`, and `serverID` options.

The `token` is the Discord application token, if you don't already have a Discord App, you can [create a new app](https://discordapp.com/developers), then convert the app to a Discord bot, and then get your Discord bot token on the "Bot" page.

The `serverID` is the ID of the server. You can get it by right clicking on server and clicking on Copy ID. You need to enable Developer Mode in Discord to do this, You can enable it by going to `Settings > App > Advanced > Developer Mode`.

### Channels

The `guildChatChannel` is the ID of the text channel where the bot is gonna send messages from Guild Chat.

The `officerChannel` is the ID of the text channel where the bot is gonna send messages from Officer Chat.

The `loggingChannel` is the ID of the text channel where the bot is gonna send guild logs, for example guild kicks, invites, mutes etc.

The `debugMode` is a boolean setting which is an ability to toggle `debugChannel`

The `debugChannel` is the ID of text channel the bot should be linked with for the chat, the bot will send every single minecraft message here, anyone can send and execute commands from this channel and it will be executed in minecraft. This is useful for debugging and testing purposes.

The `allowedBots` is a list of discord bot IDs which are allowed to send messages in the guild chat, their messages will not be blocked.

### Commands

The `checkPerms` is ability to toggle checking permissions for commands, if it's set to `true` the bot will check if user has required role to execute the command.

The `commandRole` is the ID of any role on the server , any user with the role will be able to run all the Discord commands built into the bot, like `/kick` and `/promote`.

The `users` is a list of user IDs which are allowed to run all the Discord commands, this is an alternative to the `commandRole` option.

### Other

The `messageMode` can either be `bot`, `webhook` or `minecraft`. This selects how the messages should be displayed when sent from Minecraft to Discord. If webhook mode is selected the bot requires the `Manage Webhooks` permission in the channel it's running in. The bot always requires the `Send Messages` and `View Channel` permissions in the channel you're using it in.

- Webhook Example

  > ![image](https://github.com/DuckySoLucky/hypixel-discord-chat-bridge/assets/75372052/f53e46d0-fae5-49f5-bdda-c6f6520e1921)

- Bot Example

  > ![image](https://github.com/DuckySoLucky/hypixel-discord-chat-bridge/assets/75372052/7e693926-1408-4f7c-8da8-5f4984fd6ac2)

- Minecraft Example (Default)
  > ![image](https://cdn.discordapp.com/attachments/1072863636596465726/1152304997824999554/Qwack_Bot.png)

> Note - The Discord rate limit for webhooks is 30 requests every 60 seconds, where as for bot and minecraft messages it's 5 messages every 5 seconds. Using webhooks effectively halves the number of messages the bot can send per minute which may cause issues in an active guild.

The messageFormat option is a format for the chat message on the discord side, this can be customized to whatever you want, default format is `{chatType} > {skin} {rank} {username} {guildRank}§f: {message}`.

> Possible options for this are `{chatType}`, `{skin}`, `{rank}`, `{username}`, `{guildRank}` and `{message}`. They're self explanation but here's in case you don't know what they are:
>
> - `{chatType}` - Type of chat message, the only possible cases are `Guild` and `Officer`
> - `{skin}` - Skin of the player who sent the message
> - `{rank}` - Hypixel Rank of the player who sent the message
> - `{username}` - Username of the player who sent the message
> - `{guildRank}` - Guild rank of the player who sent the message
> - `{message}` - Message sent by the player

The filterMessage is ability to toggle filtering messages. This should be set to `true` otherwise bot might get banned.

The joinMessage is ability to toggle join and leave message being sent to the discord channel.

The autoLimbo is ability to toggle if the bot is sent to Limbo or stays in public lobbies.

### Commands

`< >` = Required arguments, `[ ]` = Optional arguments

`Discord`

| Command   | Description                                      | Syntax                      | Example                             | Response                           |
| --------- | ------------------------------------------------ | --------------------------- | ----------------------------------- | ---------------------------------- |
| blacklist | Blacklists specified user from using bot.        | `/blacklist [arg] [player]` | `/blacklist add DuckySoSkilled`     | ![](https://imgur.com/Ybaj9wj.png) |
| demote    | Demotes the given user by one guild rank.        | `/demote [player]`          | `/demote DuckySoSkilled`            | ![](https://imgur.com/liHDaOW.png) |
| guildtop  | Top 10 members with the most guild xp.           | `/guildtop [number]`        | `/guildtop 5`                       | ![](https://imgur.com/7oV77ey.png) |
| help      | Shows help menu.                                 | `/help`                     | `/help`                             | ![](https://imgur.com/CLka3pQ.png) |
| info      | Shows information about bot.                     | `/info`                     | `/info`                             | ![](https://imgur.com/pRONsiE.png) |
| invite    | Invites the specified user to the guild.         | `/invite [player]`          | `/invite DuckySoSkilled`            | ![](https://imgur.com/DIfzSS7.png) |
| kick      | Kicks the specified user from the guild.         | `/kick [player] [reason]`   | `/kick DuckySoSkilled`              | ![](https://imgur.com/auMbSD9.png) |
| mute      | Mutes the given user for a given amount of time. | `/mute [player] [time]`     | `/mute DuckySoSkilled 1h`           | ![](https://imgur.com/fQxoyHv.png) |
| online    | View online player in the guild.                 | `/online`                   | `/online`                           | ![](https://imgur.com/Ny4vTRQ.png) |
| execute   | Executes commands as the minecraft bot.          | `/execute [command]`        | `/execute /g unmute DuckySoSkilled` | ![](https://imgur.com/fBi2Bv2.png) |
| ping      | Shows the latency of the bot.                    | `/ping`                     | `/ping`                             | ![](https://imgur.com/9sHFgGT.png) |
| promote   | Promotes the specified user by 1 rank.           | `/promote [player]`         | `/promote DuckySoSkilled`           | ![](https://imgur.com/wmMWP5b.png) |
| restart   | Restarts the bot.                                | `/restart`                  | `/restart`                          | ![](https://imgur.com/Zn1xnBc.png) |
| unmute    | Unmutes the given user.                          | `/unmute [player]`          | `/unmute DuckySoSkilled`            | ![](https://imgur.com/nlu8lo6.png) |
| uptime    | Shows the uptime of the bot.                     | `/uptime`                   | `/uptime`                           | ![](https://imgur.com/R1cnJfn.png) |

`Minecraft`

| Command      | Description                                 | Syntax                         | Example                    | Response                                                                                                                                                                                                                     |
| ------------ | ------------------------------------------- | ------------------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8ball        | Ask an 8ball a question.                    | `!8ball <question>`            | `!8ball Is this bot good?` | `Yes definitely.`                                                                                                                                                                                                            |
| accessories  | Accessories of specified user.              | `!accessories [player]`        | `!accessories Refraction`  | `Refraction's Accessories » 98 Recombobulated » 97 Enriched » 43` & `Refraction's Accessories » Common - 0 Uncommon - 16 Rare - 13 Epic - 26 Legendary - 16 Special - 0  Very Special - 2`                                   |
| armor        | Renders armor of specified user.            | `!armor [player]`              | `!armor DeathStreeks`      | `DeathStreeks's armor » https://i.imgur.com/JdijFmo.png https://i.imgur.com/8uBpRrY.png https://i.imgur.com/oVQl6WV.png https://i.imgur.com/x7wlfnk.png`                                                                     |
| auction      | Active Auctions of specified user.          | `!auction [player]`            | `!auction DuckySoSkilled`  | `DuckySoSkilled's Active Auctions » https://i.imgur.com/9Jw8zCK.png`                                                                                                                                                         |
| bedwars      | BedWars stats of specified user.            | `!bedwars [player]`            | `!bedwars Refraction`      | `[13✫] Refraction FK: 358 FKDR: 7.31 Wins: 83 WLR: 1.54 BB: 216 BLR: 3.09 WS: 3`                                                                                                                                             |
| catacombs    | Skyblock Dungeons Stats of specified user.  | `!catacombs [player]`          | `!catacombs DeathStreeks`  | `DeathStreeks's Catacombs: 62.29 Class Average: 50 Secrets Found: 279,088 (8.50 SPR) Classes: H - 50 M - 50 B - 50 A - 50 T - 50`                                                                                            |
| duels        | Duel stats of specified user.               | `!duels [player]`              | `!duels DuckySoSkilled`    | `[Duels] [Godlike II] DuckySoSkilled Wins: 27044 CWS: 6 BWS: 536 WLR: 4.95`                                                                                                                                                  |
| equipment    | Renders equipment of specified user.        | `!equipment [name]`            | `!equipment Refraction`    | `Refraction's Equipment » https://i.imgur.com/QOU2r0O.png https://i.imgur.com/dUrotYa.png https://i.imgur.com/0Fxnkjd.png https://i.imgur.com/wIEcrZX.png`                                                                   |
| fairysouls   | Fairy Souls of specified user.              | `!fairysouls [player]`         | `!fairysouls DeathStreeks` | `DeathStreeks's Fairy Souls: 238/238  Progress: 100.00%`                                                                                                                                                                     |
| fetchur      | Information about an item for Fetchur.      | `!fetchur [item]`              | `!fetchur`                 | `Fetchur Requests » 1x Superboom TNT Description: This item can be purchased from the Auction House or found in dungeons`                                                                                                    |
| guildexp     | Guilds experience of specified user.        | `!guildexp [player]`           | `!guildexp DuckySoSkilled` | `Your Weekly Guild Experience » 1,495`                                                                                                                                                                                       |
| help         | Shows help menu.                            | `!help`                        | `!help`                    | `https://imgur.com/BQBQXwN.png`                                                                                                                                                                                              |
| kitty        | Random image of cute cat.                   | `!kitty`                       | `!kitty`                   | `https://i.imgur.com/jgUI7KO.jpg`                                                                                                                                                                                            |
| level        | Skyblock Level of specified user.           | `level [player]`               | `!level DeathStreeks`      | `DeathStreek's Skyblock Level » 354.59`                                                                                                                                                                                      |
| math         | Calculate any kind of math problem.         | `!math <calculation>`          | `!math 6 * 9 + 6 + 9`      | `6*9+6+9 = 69`                                                                                                                                                                                                               |
| monthly      | Get monthly stats of specified user.        | `!monthly [player]`            | `!monthly DuckySoSkilled`  | `DuckySoSkilled has gained 0 karma and gained 0.1 levels in the last month.`                                                                                                                                                 |
| networth     | Networth of specified user.                 | `!networth [player]`           | `!networth Refraction`     | `Refraction's Networth is 114 B Unsoulbound Networth: 61.9 B Purse: 3.56 B Bank: 1.07 B`                                                                                                                                     |
| pet          | Renders active pet of specified user.       | `!pet [player]`                | `!pet Refraction`          | `Refraction's Active Pet » https://i.imgur.com/FVuLQk4.png`                                                                                                                                                                  |
| render       | Renders item of specified user.             | `!render [player] [slot]`      | `!render DuckySoSkilled`   | `DuckySoSkilled's item at slot 1 » https://i.imgur.com/U2dIcSc.png`                                                                                                                                                          |
| skills       | Skills and Skill Average of specified user. | `!skills [player]`             | `!skills DuckySoSkilled`   | `Skill Average » 54.44 Farming - 60.00 Mining - 60.00 Combat - 60.00 Enchanting - 60.00 Fishing - 50.00 Foraging - 50.00 Alchemy - 50.00 Taming - 50.00 Carpentry - 50.00`                                                   |
| skywars      | Skywars stats of specified user.            | `!skywars [player]`            | `!skywars DuckySoSkilled`  | `[38✫] Refraction KDR: 6.04 WLR: 1.01 WS: 0`                                                                                                                                                                                 |
| skyblock     | Skyblock Stats of specified user.           | `!skyblock [player]`           | `!skyblock DeathStreeks`   | `DeathStreeks's Level » 354.59 Senither Weight » 44,455 Lily Weight » 39,268 Skill Average » 54.4 Slayer » 7,918,100 Catacombs » 62 Class Average » 50 Networth » 133 B Accessories » 98 Recombobulated » 97 Enriched » 44`  |
| personalbest | View Best times of a user's dungeon runs.   | `!pb [player] [floor] [score]` | `!pb For_Science51 F7 S+`  | `For_Science51's PB on F7 woth S+ score is 4:57`                                                                                                                                                                             |
| slayer       | Slayer of specified user.                   | `!slayer [player] [type]`      | `!slayer DeathStreeks`     | `DeathStreeks's Slayer -  Zombie: Level: 9 Experience: 3,165,000 Spider: Level: 9 Experience: 1,000,625 Wolf: Level: 9 Experience: 1,002,000 Enderman: Level: 9 Experience: 1,715,475 Blaze: Level: 9 Experience: 1,035,000` |
| UHC          | UHC Stats of specified user.                | `!UHC [player]`                | `!UHC DuckySoSkilled`      | `[6✫] Refraction KDR: 2.54 WLR: 69 Heads: 578`                                                                                                                                                                               |
| weight       | Skyblock Stats of specified user.           | `!weight [player]`             | `!weight DuckySoSkilled`   | `Refraction's Senither Weight » 27721.82 Skills: 12991.95 Dungeons: 11353.90` & `Refraction's Lily Weight » 28342.24 Skills » 12310.84 Slayer » 4476.85 Dungeons » 11554.55`                                                 |
| woolwars     | WoolWars stats of specified user.           | `!woolwars [player]`           | `!woolwars DuckySoSkilled` | `[2✫] DuckySoSkilled » W: 5 WLR: 0.5 KDR: 1.19 BB: 37 WP: 45`                                                                                                                                                                |

### Soopy V2 Commands

Bot also supports Soopy V2 commands, prefix is same as mod's prefix.

> ![image](https://github.com/DuckySoLucky/hypixel-discord-chat-bridge/assets/75372052/7de05d26-6b2d-4c42-b5d1-1ef0da7edafa)

#### Web

The web section contains configuration options for the web server, including the enabled, port, token, and WebSocket functionality.

The enabled option determines whether the web server is enabled. By default, this is set to false.

The port option is the port the web server will listen on. By default, this is set to 1439.

The token option is the token required to access the web server.

The web server also supports WebSocket connections for third-party applications to listen to chat messages. This is achieved by connecting to the `/chat` endpoint. Through this endpoint, clients can receive real-time updates on messages sent in the chat.

Additionally, there's an `/uptime` endpoint available to check the server's uptime. This endpoint can be accessed to verify if the WebSocket server is running and to retrieve information about its uptime.

An example of how to connect to the WebSocket server using JavaScript:

```javascript
// Import WebSocket module
const WebSocket = require("ws");

// Create a new WebSocket connection
const ws = new WebSocket("ws://localhost:1439/message");

// Event listener for when the connection is established
ws.on("open", () => {
  console.log("Connected");
});

// Event listener for when the connection is closed
ws.on("close", () => {
  console.log("Disconnected");
});

// Event listener for incoming messages
ws.on("message", (data) => {
  console.log(`Received: ${data}`);
});

// Send a message to the server
new Promise((resolve) => {
  if (ws.readyState === ws.OPEN) {
    resolve();
  }
}).then(() => {
  // Define the message to be sent
  const send = {
    type: "message",
    data: "/gc Example message",
    token: "WEBSOCKET_TOKEN",
  };

  // Send the message
  ws.send(JSON.stringify(send));
});
```

### Verification

The verification section contains configuration options for the verification system. These options include a full global toggle, verfied role, guild member role, auto updater, custom usernames and ranks.

The `enabled` option determines whether the verification system is enabled. By default, this is set to false.

The `verifiedRole` option determines what role user will receive upon successful verification. 

The `guildMemberRole` option determines what role user will receive upon being member of the guild.

The `autoUpdater` option allows you to toggle the auto updating of all verified users. This option is set to `true` by default.

The `autoUpdaterInterval` allows you to change how often the autoUpdater runs. By default this option is set to `24` making the autoUpdater run every 24 hours.

The `name` option lets you set what a verfied user has there nickname set to in the server. By default its set to `{username}` Below are all the variables that are supported.

<details>
<summary>Name Option Variables</summary>

`{bedwarsStar}` - Player's BedWars Stars

`{bedwarsTokens}` - Player's BedWars Tokens

`{bedwarsKills}` - Player's BedWars Kills

`{bedwarsDeaths}` - Player's BedWars Deaths

`{bedwarsKDRatio}` - Player's BedWars KDRatio

`{bedwarsFinalKills}` - Player's BedWars Final Kills

`{bedwarsFinalDeathss}` - Player's BedWars Final Deaths

`{bedwarsFinalKDRatio}` - Player's BedWars Final KDRatio

`{bedwarsWins}` - Player's BedWars Wins

`{bedwarsLosses}` - Player's BedWars Losses

`{bedwarsWLRatio}` - Player's BedWars WLRatio

`{bedwarsBedsBroken}` - Player's BedWars Beds Broken

`{bedwarsBedsLost}` - Player's BedWars Beds Lost

`{bedwarsBedsBLRatio}` - Player's BedWars Beds BLRatio

`{bedwarsPlayedGames}` - Player's BedWars Played Games

`{skywarsStar}` - Player's SkyWars Star

`{skywarsCoins}` - Player's SkyWars Coins

`{skywarsTokens}` - Player's SkyWars Tokens

`{skywarsSouls}` - Player's SkyWars Souls

`{skywarsOpals}` - Player's SkyWars Opals

`{skywarsKills}` - Player's SkyWars Kills

`{skywarsDeaths}` - Player's SkyWars Deaths

`{skywarsKDRatio}` - Player's SkyWars KDRatio

`{skywarsWins}` - Player's SkyWars Wins

`{skywarsLosses}` - Player's SkyWars Losses

`{skywarsWLRatio}` - Player's SkyWars WLRatio

`{skywarsPlayedGames}` - Player's SkyWars Played Games

`{duelsTitle}` - Player's Duels Title 

`{duelsKills}` - Player's Duels Kills

`{duelsDeaths}` - Player's Duels Deaths

`{duelsKDRatio}` - Player's Duels KDRatio

`{duelsWins}` - Player's Duels Wins

`{duelsLosses}` - Player's Duels Losses

`{duelsWLRatio}` - Player's Duels WLRatio

`{duelsPlayedGames}` - Player's Duels Played Games

`{level}` - Player's Hypixel Level

`{rank}` - Player's Hypixel Rank

`{karma}` - Player's Hypixel Rank

`{achievementPoints}` - Player's Hypixel Achievement Points

`{username}` - Player's Username

`{guildRank}` - Player's Guild Rank

`{guildName}` - Player's Guild Name

</details>
<br>

The `ranks` option is an array that takes in an object like the following example, this allows ingame ranks to have a synced discord role.
```json
{
    "name": "Sweat",
    "role": "987936050649391194"
}
```


### Chat Triggers Module

If you think that message format is boring, you can check out my repository for ChatTriggers module which changes the way messages from Bot look like. [Click Here](https://github.com/DuckySoLucky/Hypixel-Guild-Chat-Format)

> [!IMPORTANT]  
> This CTJS module has been deprecated and is no longer maintained.


## Credits

- [Hypixel API Reborn](https://github.com/Hypixel-API-Reborn/hypixel-api-reborn)
- [SkyHelper API](https://github.com/Altpapier/SkyHelperAPI)
- [Mowojang API](https://mowojang.matdoes.dev/)
- [Hypixel API](http://api.hypixel.net/)
- [LilyWeight](https://github.com/Antonio32A/lilyweight)
- [Altpapier](https://github.com/altpapier/hypixel-discord-guild-bridge/)
- [SkyCrypt](https://github.com/SkyCryptWebsite/SkyCrypt)
- [Senither](https://github.com/Senither)
- [Pixelicc](https://github.com/Pixelicc)
- [DawJaw](https://dawjaw.net/jacobs)
- [Soopy](https://soopy.dev/)
