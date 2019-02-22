const Discord = require('discord.js');
const client = new Discord.Client();

client.login("NTQ3OTU4NjU3NDE0MDcwMjc1.D0-V-A.i1KiB8_Qvvjm1Iva0QZ23tdNT1I");

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

var rowes;
var respuesta;

var doc = new GoogleSpreadsheet('1XVJb2TxkEAhM2jH-t8NMjV1NNas7cQQcJW7soVpGPP0');


console.log("---- corriendo server ----");


doc.useServiceAccountAuth(creds, function (err) {

	doc.getRows(1, function (err, rows) {

		rowes=rows;
		console.log("---- google sheet conectado ----");

	});
});


client.on('message', msg => {

	mensajeConsola(msg.member.user.tag, msg.content);

	if(msg.member.user.tag != "Bot de Prueba#6012"){

		var comprobar = buscarPalabra(msg.content);

		if (comprobar != undefined){

			msg.reply(comprobar);

		}
	}
});


function buscarPalabra (mensaje){

	for (i = 0; i < rowes.length; i++) {

		if (mensaje.includes(rowes[i].leer)){

			return(rowes[i++].leer);
				
		}
	}
};


function mensajeConsola(usuario, mensaje){

	console.log(" ___________________________________");
	if(usuario != "Bot de Prueba#6012"){console.log("----------- mensaje recibido -------")
	}else{console.log("------------ bot mensaje -----------");}
	console.log(" ");
	if(usuario != "Bot de Prueba#6012"){console.log("   usuario: "+ mensaje)};
	console.log("   mensaje: "+ usuario);
	console.log(" ___________________________________");
	
};