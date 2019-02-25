console.log("-------------------------------------");
console.log("----      Servidor Iniciado      ----");
console.log("-------------------------------------");

const Discord = require('discord.js');
const client = new Discord.Client();

const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require('util')

const credentials = require(`./service-account.json`);
const url_token = require('./url-token.json');

client.login(url_token.discord_token);


var rowes;
var inicio = true;


async function accessSpreadsheet(cambiar){
  const doc = new GoogleSpreadsheet(url_token.SPREADSHEET_ID)
  await promisify(doc.useServiceAccountAuth)(credentials)
  const info = await promisify(doc.getInfo)()
	const sheet = info.worksheets[0]

	if(inicio){

		console.log('----      Documento Cargado      ----')
		console.log('----                             ----')
		console.log(`---- Nombre: ` + info.title)
		console.log(`---- Cuenta: ` + info.author.email)
		console.log(`---- Hoja 1: ` + sheet.title)
		console.log(`---- Dimenciones ` + sheet.rowCount + `x` + sheet.colCount)
		console.log("-------------------------------------")
		inicio = false;

	}
	

	doc.getRows(1, function (err, rows) {
		
		if(cambiar == true){

			rows = rowes;

			rows[rows.length - 1].save()

			accessSpreadsheet()

		}

		rowes=rows;

	})
}


accessSpreadsheet()


client.on('message', msg => {

	mensajeConsola(msg.member.user.tag, msg.content);

	if(msg.member.user.tag != "Bot de Prueba#6012"){

		var comprobar = buscarPalabra(msg.content);

		if (comprobar != undefined){

			msg.reply(comprobar);

		}
	}
})


function buscarPalabra(mensaje){
	
	if(mensaje.includes("/aprender")){
	
		return(agregarRespuesta(mensaje));		

	}

	else{

		for (i = 0; i < rowes.length; i++) {

			if (mensaje == rowes[i].pregunta){

				return(rowes[i].respuesta);

			}
		}

		for (i = 0; i < rowes.length; i++) {

			if (mensaje.includes(rowes[i].pregunta)){

				return(rowes[i].respuesta);

			}
		}
	}
}


function agregarRespuesta(mensaje){

	if(palabraIgual(mensaje,"/aprender")){

		var aprenderTexto = separarConBarras(mensaje); // [0] pregunta - [1] respuesta

		if(aprenderTexto[0] != "" && aprenderTexto[1] != "" && aprenderTexto[0] != "undefined" && aprenderTexto[1] != "undefined"){
			
			rowes[rowes.length] = rowes[rowes.length - 1];
			rowes[rowes.length - 1].pregunta = aprenderTexto[0];
			rowes[rowes.length - 1].respuesta = aprenderTexto[1];
	
			accessSpreadsheet(true)

			mensajePreguntaNueva(aprenderTexto)
			return("Respuesta aprendida")

		}

		return("Escriba /aprender <pregunta> / <respuesta>")
		
	}

	return("El comando /aprender sirve para enseñarme respuestas. Escribe /aprender para mas informacion")
	
}

// Comprueba que palabara sea la primera palabra del texto
function palabraIgual(texto, palabra){

	var chequeo = "";

	for (i = 0; i < palabra.length; i++){

		chequeo = chequeo + texto[i];

	}

	if(chequeo == palabra){

		return(true)
		
	} else{

		return(false)
		
	}
}

function separarConBarras(mensaje){

	var aprenderTexto = ["","",false]

	for (i = 9; i < mensaje.length; i++) {

		if(mensaje[i] == "/"){

			aprenderTexto[2] = true;	
		i++;

		}

		if(aprenderTexto[2] == false){

			if(mensaje[i] != " "){
					
				aprenderTexto[0] = aprenderTexto[0] + mensaje[i]

			}

			else if(aprenderTexto[0] != ""){
					
				aprenderTexto[0] = aprenderTexto[0] + mensaje[i]
					
			}
		}

		else{

			if(mensaje[i] != " "){			

				aprenderTexto[1] = aprenderTexto[1] + mensaje[i]

			}

			else if(aprenderTexto[1] != ""){
						
				aprenderTexto[1] = aprenderTexto[1] + mensaje[i]
						
			}
		}
	}

	return(aprenderTexto)

}

function mensajeConsola(usuario, mensaje){


	if(usuario != "Bot de Prueba#6012"){
	
		console.log("                                             _____________________________________")
		console.log("                                             ----------- Mensaje Recibido -------")
		console.log(" ")
		console.log("                                                Usuario: "+ usuario)
		console.log(" ")
		console.log("                                                Mensaje: "+ mensaje)
		console.log("                                             _____________________________________")

	}else{

		console.log("                                                                                          ------------ Bot Mensaje -----------")
		console.log(" ")
		console.log("                                                                                             Mensaje: "+ mensaje)
		console.log("                                                                                          _____________________________________")
	}

}

function mensajePreguntaNueva(aprenderTexto){
	console.log("-------------------------------------")
			console.log("----      Pregunta Guardada      ----")
			console.log("----                             ----")
			console.log("---- Pregunta: " + aprenderTexto[0])
			console.log("---- Respuesta: " + aprenderTexto[1])
			console.log("-------------------------------------")
}