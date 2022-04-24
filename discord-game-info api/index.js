const express = require('express');
const app = express();
const http = require('http');
app.use(express.static('public'));
app.listen(3000)

const apiVersion = "v1"
const wikiPageURL = "https://github.com/kaanstfu/discord-api"

app.get('/', (request, response) => {
 response.json({wiki: wikiPageURL})
})

const random = require('random-text-faces');
app.get("/"+ apiVersion + '/random-text-faces', (request, response) => {
 response.json({response: random.get()})
})

const minecraftApi = require("minecraft-lookup");
app.get("/"+ apiVersion + '/minecraft/server/:ip', (request, response) => {
 var ip = request.params.ip
 minecraftApi.server(ip).then(data => response.json({response: data}));
})

app.get("/"+ apiVersion + '/minecraft/skin/:name', (request, response) => {
 var name = request.params.name
 minecraftApi.skin(name).then(data => response.json({response: data}));
})

app.get("/"+ apiVersion + '/minecraft/user/:name', (request, response) => {
 var name = request.params.name
 minecraftApi.user(name).then(data => response.json({response: data}));
})

app.get("/"+ apiVersion + '/minecraft/head/:name', (request, response) => {
 var name = request.params.name
 minecraftApi.head(name).then(data => response.json({response: data}));
})

app.get("/"+ apiVersion + '/minecraft/nameHistory/:name', (request, response) => {
 var name = request.params.name
 minecraftApi.nameHistory("username", name).then(data => response.json({response: data}));
})

app.get("/"+ apiVersion + '/minecraft/cape/:name', (request, response) => {
 var name = request.params.name
 minecraftApi.ofCape(name).then(data => response.json({response: data}));
})

const fivemApi = require('fivem-server-info');
  app.get("/"+ apiVersion + '/fivem/:ip', async (request, response) => {
 var ip = request.params.ip
 var data_connected_users = await fivemApi.connected_users(ip);
 var data_max_users = await fivemApi.max_users(ip);
 var data_user_list = await fivemApi.user_list(ip);
 response.json({response: data_connected_users, data_max_users, data_user_list});
})

const { Info } = require("userinfo-github")
const github = new Info();
app.get("/"+ apiVersion + '/github/:name', async (request, response) => {
 var name = request.params.name
 var data =  await github.fetchInfo(name)
 response.json({response: data});
})            