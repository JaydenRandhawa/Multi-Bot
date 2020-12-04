const Discord = require('discord.js');
const fs = require('fs');
const { stringify } = require('querystring');

const client = new Discord.Client();

let tokenHex = fs.readFileSync('token.json');
let token = JSON.parse(tokenHex)
let tokenString = stringify(token)

tokenArray = tokenString.split("=")

console.log(tokenString)
console.log(tokenArray);

var serversJoined = 0
var guildId = ""
var guildName = ""
var senderId = ""
var senderName = ""

var prefix = "!"

idleTime = 0

var nameVar = "for !commands"
var typeVar = "WATCHING"
var statusVar = "online"

let defaultProperties = {}

client.once('ready', () => {
    console.log('Started');
    console.log(client.guilds)
    client.user.setPresence({ activity: { name: nameVar, type: typeVar }, status: statusVar })
    });

client.on('message', rawMessage => {
    console.log(rawMessage.content);
    

    if (rawMessage.content.startsWith(prefix)){
        var mesArray = rawMessage.content.split(" ")
        var comLen = mesArray[0].length;
        var params = rawMessage.content.slice(comLen + 1)
        console.log(params)
    }

    if (!rawMessage.guild){
        guildId = NaN
        console.log(guildId)
    }

    else {
        guildId = rawMessage.guild.id
        guildName = rawMessage.guild.name
        console.log("Guild Id:" + guildId + " Guild Name:" + guildName)
    }

    senderId = rawMessage.author.id
    senderName = rawMessage.author.username
    console.log("User Id:" + senderId + " User Name:" + senderName)

    if (rawMessage.content.startsWith(prefix + "setStatus")){
        statusVar = params
        console.log(statusVar)
        client.user.setPresence({ activity: { name: nameVar, type: typeVar }, status: statusVar })
    }    

    if (rawMessage.content.startsWith(prefix + "setActivity")){
        nameVar = params
        console.log(nameVar)
        client.user.setPresence({ activity: { name: nameVar, type: typeVar }, status: statusVar })
    }
    
    if (rawMessage.content.startsWith(prefix + "setType")){
        typeVar = params.toUpperCase()
        console.log(typeVar)
        client.user.setPresence({ activity: { name: nameVar, type: typeVar }, status: statusVar })
    }
    if (rawMessage.content.startsWith(prefix + "roll")){
        var range = parseInt(params)
        var randNum = Math.ceil(Math.random() * (range))
        console.log(randNum)
        rawMessage.channel.send(randNum)
    }

    if(rawMessage.content.startsWith(prefix + "say")){
        rawMessage.channel.send(params)
    }

    if(rawMessage.content.startsWith(prefix + "setPrefix")){
        prefix = params
        rawMessage.channel.send("The new prefix is:" + prefix)
    }

    if (rawMessage.content.startsWith(prefix + "commands")){
        const commandsMessage = new Discord.MessageEmbed()
        .setColor("#008CE2")
        .setTitle("Multi Bot Commands")
        .setThumbnail("https://i.imgur.com/G3ufqux.png")
        .addFields(
            {name: prefix + "setPrefix [new prefix]", value: "Used to change the prefix. the current prefix is: " + prefix},
            {name: prefix + "setStatus [new status]", value: "Set online, idle or dnd status"},
            {name: prefix + "setActivity [new activity]", value: "Set the status message"},
            {name: prefix + "setType [type of activity]", value: "Set if the robot is playing, watching, streaming, competing or listening"},
            {name: prefix + "roll [integer]", value: "Used to generate a random number"},
            {name: prefix + "say [string]", value: "Make the bot send something to chat."},
            {name: prefix + "commands", value: "Shows this embed message listing all commands"}
        )
        rawMessage.channel.send(commandsMessage);
    }
});

client.on('guildCreate', guild =>{
    console.log(guild.id)
    
    defaultProperties = {
        id: guild.id,
        name: guild.name,
        prefix: "!"
    }

    let data = JSON.stringify(defaultProperties);
    fs.writeFileSync("Guild\ Properties/" + guild.id + ".json", data)


});

client.on('guildMemberAdd', member =>{

});

client.login(tokenArray[1]);