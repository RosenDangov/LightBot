
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
     if(message.substring(0,9) == "LightBot,"){
        var question = message.substring(9);
        if(question == " кой е най-якият?"){
            switch(user){
                case 'Follower_Misa':
                    bot.sendMessage({
                        to: channelID,
                        message: 'ти мн ясно'
                    });
                    break;
                case 'Lightside':
                    bot.sendMessage({
                        to: channelID,
                        message: 'който кажеш'
                    });
                    break;
                case 'castrowilde':
                    bot.sendMessage({
                        to: channelID,
                        message: 'Lightside, най-красивият, умният, забавният, невероятният Lightside.'
                    })
                    break;

                case 'mihail95':
                    bot.sendMessage({
                        to: channelID,
                        message: 'METAL4ETOOOO'
                    })
                    break;
                default :
                    bot.sendMessage({
                        to: channelID,
                        message: 'Default Response, така че Lightside например'
                    })
                    break;  
            }
            return;
        }
        bot.sendMessage({
            to: channelID,
            message: ':thinking: ?'
        })
     }
});