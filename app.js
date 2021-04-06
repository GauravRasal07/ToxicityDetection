const Discord = require('discord.js');
const client  = new Discord.Client();
require("dotenv").config();

const file    = require("./secretes");

require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');

const threshold = 0.9;

let model;

client.on('ready', async () => {
  model = await toxicity.load(threshold);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if(msg.author.bot){
      return;
    }

    let message = msg.content;
    let predictions = await model.classify(message);

    predictions.forEach(prediction => {
      if(prediction.results[0].match){
          let label = prediction.label;
          msg.reply(`Warning!!! ${label} Detected, Please Delete the message.`);
      }
  });
});

client.login(process.env.CLIENT_ID);