const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
] });
const GuildPrefix = require('./Guild')
const ToggleAntiSware = require('./Guild2')
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
        description: `This is T.B.T.D.A's web dashboard! Here you can controle the core features of the bot. Click on 'Login to access the dashboard' to get started! Need help with the bot? Click on 'Discord Server' to join our support server! THIS BOT IS IN BETA TESTING FOR VERSION 2.0, THE INVITE LINK WILL TAKE YOU TO THE WRONG BOT. Please join the support server for more info!`,
        baseUrl: 'https://tbtda.xyz', // Leave this if ur in local development
        port: process.env.PORT,
        noPortIncallbackUrl: true,
        secret: 'juH1-p1AUO7Yqi3PlVn6tDF73zhLXV53',
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
                
            }
                if (toggleSware.toggle == 'true'){
                    return true;
                } else{
                    return false;
            }}

    client.dashboard.addBooleanInput('Toggle sware detection', "Toggle the anti-swear on or off!", setToggle, getToggle);
        
        

    client.on('ready', async() => {
        console.log(`Logged in as ${client.user.tag}`)
        console.log(`The web dashboard is online and ready. Dashboard avalable at: https://tbtda.xyz`);
        await mongo()

    });

client.login(process.env.BOT_DASH_TOKEN);

})()
//http:localhost/auth/login
//https://tbtda.xyz/auth/login