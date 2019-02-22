const Discord = require('discord.js');
const client = new Discord.Client();

client.login("NTQ3OTU4NjU3NDE0MDcwMjc1.D0-V-A.i1KiB8_Qvvjm1Iva0QZ23tdNT1I");

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

var pregunta;
var respuesta;

var doc = new GoogleSpreadsheet('1XVJb2TxkEAhM2jH-t8NMjV1NNas7cQQcJW7soVpGPP0');


doc.useServiceAccountAuth(creds, function (err) {

	doc.getRows(1, function (err, rows) {

		pregunta=rows;

	});

	doc.getRows(2, function (err, rows) {

		respuesta=rows;

	});
});


client.on('message', msg => {

	if(msg.member.user.tag != "Bot de Prueba#6012"){

		console.log(msg.content)

		var comprobar = buscarPalabra(msg.content);

		if (comprobar != undefined){

			msg.reply(comprobar);

		}
	};
});


function buscarPalabra (mensaje){

	for (i = 0; i < pregunta.length; i++) {

		if (mensaje.includes(pregunta[i].leer)){

			return(pregunta[i].leer);
				
		}
	}
}