const {Client, GatewayIntentBits, ActivityType, ThreadAutoArchiveDuration} = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
] });
const GuildPrefix = require('./Guild');
const ToggleAntiSware = require('./Guild2');
const GuildWelcome = require('./Guild3');
const GuildWelcomeChannel = require('./Guild4');
const toggleMusic = require(`./Guild5`);
const toggleEco = require(`./Guild6`);
const LogChannel = require(`./Guild7`);
const toggleImage = require('./Guild8')
const mongo = require('./mongo');

(async () => {

    const favicon = await fetch('https://i.ibb.co/L8sZqxX/favImg.png');
    const arrayBuffer = await favicon.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    

    // Requires Dashboard class from discord-easy-dashboard
    const Dashboard = require("discord-easy-dashboard");

    // Initialise it
    const dashboard = new Dashboard(client, {
        name: 'T.B.T.D.A',
        description: `This is T.B.T.D.A's web dashboard! Here you can controle the core features of the bot. Click on 'Login' to access the dashboard and get started! Need help with the bot? Click on 'Discord Server' to join our support server! For full documentation, please visit https://docs.tbtda.xyz`,
        baseUrl: process.env.REDIRECT_URI, // Leave this if ur in local development
        port: process.env.PORT,
        noPortIncallbackUrl: true,
        secret: process.env.BOT_SECRET,
        theme: 'dark',
        faviconPath: buffer,
        serverUrl: 'https://discord.gg/3mkKSGw',
        permissions: ['ManageGuild']
        
    });
    client.dashboard = dashboard


    // We now have a dashboard property to access everywhere!


    const setToggle = async(discordClient, guild, value) => {
        await ToggleAntiSware.findOneAndUpdate({
            _id: guild.id
            },{
            _id: guild.id,
            toggle: value,
                
            },{
                upsert: true
            })
    }
    const getToggle = async(discordClient, guild) => {
        let returnswear
        const toggleSware = await ToggleAntiSware.findOne({_id: guild.id}).catch(error =>{
            console.log(`There was a error: ${error}`)
            })

            if(!toggleSware){
                await ToggleAntiSware.findOneAndUpdate({
                    _id: guild.id
                    },{
                    _id: guild.id,
                    toggle: false,
                        
                    },{
                        upsert: true
                    })
                returnswear = false
                return returnswear
            }
                if (toggleSware.toggle == 'true'){
                    return true;
                } else{
                    return false;
            }}

    client.dashboard.addBooleanInput('Toggle sware detection', "Toggle the anti-swear on or off!", setToggle, getToggle);

    const setMusic = async(discordClient, guild, value) => {
        await toggleMusic.findOneAndUpdate({
            _id: guild.id
            },{
            _id: guild.id,
            toggle: value,
                
            },{
                upsert: true
            })
    }
    const getMusic = async(discordClient, guild) => {
        let returnmusic
        const toggleMusicget = await toggleMusic.findOne({_id: guild.id}).catch(error =>{
            console.log(`There was a error: ${error}`)
            })

            if(!toggleMusicget){
                await toggleMusic.findOneAndUpdate({
                    _id: guild.id
                    },{
                    _id: guild.id,
                    toggle: true,
                        
                    },{
                        upsert: true
                    })
                    returnmusic = true
                    return returnmusic
                
            }
                if (toggleMusicget.toggle == 'true'){
                    return true;
                } else{
                    return false;
            }}

    client.dashboard.addBooleanInput('Toggle music plugin', 'Toggle music commands on or off, defult on.', setMusic, getMusic)

    const setEco = async(discordClient, guild, value) => {
        await toggleEco.findOneAndUpdate({
            _id: guild.id
            },{
            _id: guild.id,
            toggle: value,
                
            },{
                upsert: true
            })
    }
    const getEco = async(discordClient, guild) => {
        let returneco
        const toggleEcoget = await toggleEco.findOne({_id: guild.id}).catch(error =>{
            console.log(`There was a error: ${error}`)
            })

            if(!toggleEcoget){
                await toggleEco.findOneAndUpdate({
                    _id: guild.id
                    },{
                    _id: guild.id,
                    toggle: true,
                        
                    },{
                        upsert: true
                    })
                returneco = true
                return returneco
            }
                if (toggleEcoget.toggle == 'true'){
                    return true;
                } else{
                    return false;
            }}


    client.dashboard.addBooleanInput('Toggle economy plugin', 'Toggle economy commands on or off, defult on.', setEco, getEco)

    const setImg = async(discordClient, guild, value) => {
        await toggleImage.findOneAndUpdate({
            _id: guild.id
            },{
            _id: guild.id,
            toggle: value,
                
            },{
                upsert: true
            })
    }
    const getImg = async(discordClient, guild) => {
        let returneco
        const toggleImgGet = await toggleImage.findOne({_id: guild.id}).catch(error =>{
            console.log(`There was a error: ${error}`)
            })

            if(!toggleImgGet){
                await toggleImage.findOneAndUpdate({
                    _id: guild.id
                    },{
                    _id: guild.id,
                    toggle: true,
                        
                    },{
                        upsert: true
                    })
                returneco = true
                return returneco
            }
                if (toggleImgGet.toggle == 'true'){
                    return true;
                } else{
                    return false;
            }}


    client.dashboard.addBooleanInput('Toggle image plugin', 'Toggle image commands on or off, defult on.', setImg, getImg)


    const prefixValidator = (value) => value.length < 4

    const prefixGetter = async(discordClient, guild) =>{
        let returnwelcome
        const guildPrefix = await GuildPrefix.findOne({_id: guild.id}).catch(error =>{
            console.log(`There was a error: ${error}`)
            })
            if(!guildPrefix){
                await GuildPrefix.findOneAndUpdate({
                    _id: guild.id
                    },{
                    _id: guild.id,
                    prefix: '!',
                        
                    },{
                        upsert: true
                    })
                returnwelcome = '!'
                return returnwelcome
            }
            return guildPrefix.prefix
    }
    const prefixSetter = async(discordClient, guild, value) => {
        await GuildPrefix.findOneAndUpdate({
            _id: guild.id
            },{
            _id: guild.id,
            prefix: value,
                
            },{
                upsert: true
            })
    }


    client.dashboard.addTextInput('Guild prefix', "Set the desired legacy command prefix for your server. Max 3 characters.", prefixValidator, prefixSetter, prefixGetter)


    const msgvalidator = (value) => value.length < 200

    const msggetter = async(discordClient, guild) =>{
        let returnwelcome
        const guildWelcome = await GuildWelcome.findOne({_id: guild.id}).catch(error =>{
            console.log(`There was a error: ${error}`)
            })
            if(!guildWelcome){
                await GuildWelcome.findOneAndUpdate({
                    _id: guild.id
                    },{
                    _id: guild.id,
                    message: '',
                        
                    },{
                        upsert: true
                    })
                returnwelcome = ''
                return returnwelcome
            }
            return guildWelcome.message
    }
    const msgsetter = async(discordClient, guild, value) => {
        await GuildWelcome.findOneAndUpdate({
            _id: guild.id
            },{
            _id: guild.id,
            message: value,
                
            },{
                upsert: true
            })
    }


    client.dashboard.addTextInput('New member welcome message', "Send a welcome message when a new member joins your server, leave blank to disable. Max 200 characters, use {member} for username, and {ping-member} to ping the user.", msgvalidator, msgsetter, msggetter) 
      
    const channelvalidator = (value) => value.length < 30

    const channelgetter = async(discordClient, guild) =>{
        let returnwelcomechannel
        const guildWelcomechannel = await GuildWelcomeChannel.findOne({_id: guild.id}).catch(error =>{
            console.log(`There was a error: ${error}`)
            })
            if(!guildWelcomechannel){
                await GuildWelcomeChannel.findOneAndUpdate({
                    _id: guild.id
                    },{
                    _id: guild.id,
                    channel: '',
                        
                    },{
                        upsert: true
                    })
                returnwelcomechannel = ''
                return returnwelcomechannel
            }
            return guildWelcomechannel.channel
    }
    const channelsetter = async(discordClient, guild, value) => {
        await GuildWelcomeChannel.findOneAndUpdate({
            _id: guild.id
            },{
            _id: guild.id,
            channel: value,
                
            },{
                upsert: true
            })
    }


    client.dashboard.addTextInput('Welcome channel', "Enter the channel ID (e.g. 1234567891112131415) where T.B.T.D.A will send welcomes, leave blank to disable.", channelvalidator, channelsetter, channelgetter) 
 
    const channelvalidator2 = (value) => value.length < 30

    const channelgetter2 = async(discordClient, guild) =>{
        let returnlog;
        const logChannel = await LogChannel.findOne({_id: guild.id}).catch(error =>{
            console.log(`There was a error: ${error}`)
            })
            if(!logChannel){
                await LogChannel.findOneAndUpdate({
                    _id: guild.id
                    },{
                    _id: guild.id,
                    channel: '',
                        
                    },{
                        upsert: true
                    })
                returnlog = ''
                return returnlog
            }
            returnlog = logChannel.channel
            return returnlog
    }
    const channelsetter2 = async(discordClient, guild, value) => {
        await LogChannel.findOneAndUpdate({
            _id: guild.id
            },{
            _id: guild.id,
            channel: value,
                
            },{
                upsert: true
            })
    }


    client.dashboard.addTextInput('Log channel', "Enter the channel ID (e.g. 1234567891112131415) where T.B.T.D.A will send logs, leave blank to disable.", channelvalidator2, channelsetter2, channelgetter2) 
 

    client.on('ready', async() => {
        console.log(`Logged in as ${client.user.tag}`)
        console.log(`The web dashboard is online and ready. Dashboard avalable at: https://tbtda.xyz`);
        await mongo()
        //client.user?.setPresence({
            //status: 'idle',
            //activities: [
                //{
                    //name: "Under development",
                    //type: ActivityType.Playing,
                //}
            //]
        //})

    });

client.login(process.env.BOT_USER_TOKEN);

})()
// http:localhost/auth/login
// https://tbtda.xyz/auth/login
