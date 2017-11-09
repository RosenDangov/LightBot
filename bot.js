
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var request = require('request');

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

            // case 'live':
            //     bot.sendMessage({
            //         to: channelID,
            //         message: GET https://api.twitch.tv/kraken/streams/<channel ID>
            //     });
            case 'online':
                var answer;
                var channel = args[0];
                request({
                    headers: {
                      'Client-ID': 'q11z4l9d4csrbq5wamigmk8ztq0jdq'
                    },
                    uri: 'https://api.twitch.tv/kraken/streams/' + channel,
                    method: 'GET'
                  }, function (err, res, body) {
                    answer = JSON.parse(body);
                    var isStreaming = answer.stream != null;
                    var toSend;
                    if(isStreaming){
                        toSend = channel + ' стриймва, беги да гледаш: ' + answer.stream.channel.url;
                    }
                    else{
                        toSend = 'сори, ' + channel + ' е офлайн';
                    }
                    bot.sendMessage({
                        to: channelID,
                        message: toSend
                    });
                    //it works!
                });   

                break;
            case 'soviet':
                bot.sendMessage({
                    to: channelID,
                    message: 'https://www.youtube.com/watch?v=U06jlgpMtQs'
                });
                break;
                
            // !sgp
            case 'sgp':
                bot.sendMessage({
                    to: channelID,
                    message: 'Follow Soviet Gaming Program on Twitch: <https://go.twitch.tv/sovietgamingprogram>\nSubscribe on YouTube: <https://www.youtube.com/channel/UCmrHMfXqMD0kYDHzfveXKQQ>'
                });
                break;
            // Just add any case commands if you want to..
         }
     }
    var lowerCase = message.toLowerCase();
    if(lowerCase.includes("lightside") || lowerCase.includes("росен")){
        bot.addReaction({
            channelID: channelID,
            messageID: evt.d.id,
            reaction: ':emojilightside:322041422847016970'
        });        
    }
    if(lowerCase.includes("castro") || lowerCase.includes("кастро")){
        bot.addReaction({
            channelID: channelID,
            messageID: evt.d.id,
            reaction: ':emojicastro:322041422607810572'
        });        
    }
    if(lowerCase.includes("михаил") || lowerCase.includes("mihail") || lowerCase.includes("мишо")){
        bot.addReaction({
            channelID: channelID,
            messageID: evt.d.id,
            reaction: ':emojimihail:322041422624849920'
        });        
    }
    if(lowerCase.includes("misa") || lowerCase.includes("миса")){
        bot.addReaction({
            channelID: channelID,
            messageID: evt.d.id,
            reaction: ':emojimisa:322041971827015682'
        });        
    }
    if(lowerCase.includes("fortnite") || lowerCase.includes("фортнайт")){
        bot.addReaction({
            channelID: channelID,
            messageID: evt.d.id,
            reaction: ':fortnite:375737892900962314'
        });        
    }
    if(lowerCase.includes("rocket league") || lowerCase.includes("рокет лийг")){
        bot.addReaction({
            channelID: channelID,
            messageID: evt.d.id,
            reaction: ':rocketleague:365579110606438410'
        });        
    }
    if(lowerCase.includes("prison architect") || lowerCase.includes("призън архитект")){
        bot.addReaction({
            channelID: channelID,
            messageID: evt.d.id,
            reaction: ':prisonarchitect:349831257930203138'
        });        
    }
    // hopefully in operator works
    if(lowerCase in ["space engineers", "space eng", "космически инженери"] || message.includes("SE")){
        bot.addReaction({
            channelID: channelID,
            messageID: evt.d.id,
            reaction: ':spaceeng:366902511782592513'
        });        
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
                    bot.addReaction()
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
