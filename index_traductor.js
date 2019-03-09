
var http = require('http')
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'})
	res.end('')
	console.log("-------------------------------------")
	console.log("----    Servidor Web Iniciado    ----")
	console.log("-------------------------------------")
}).listen(process.env.PORT || 5000)

const Discord = require('discord.js')
const client = new Discord.Client()

const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require('util')

var credentials
var url_token

if(process.env.service_account != undefined){

	credentials = JSON.parse(process.env.service_account)
	url_token = JSON.parse(process.env.url_token)
	
} else{

	credentials = require(`./no-borrar/service-account.json`)
	url_token = require('./no-borrar/url-token.json')

}


client.login(url_token.discord_token)


var rowes_respuestas
var inicio = true
var rowes_traductor
var mensajeAtraducir
var rows_while
var mensajeAresponder

async function accessSpreadsheet(cambiar, actualizar){
	const doc_respuestas = new GoogleSpreadsheet(url_token.SPREADSHEET_ID_RESPUESTAS)
	const doc_traductor = new GoogleSpreadsheet(url_token.SPREADSHEET_ID_TRADUCTOR)
	await promisify(doc_respuestas.useServiceAccountAuth)(credentials)
	await promisify(doc_traductor.useServiceAccountAuth)(credentials)
	const info_respuestas = await promisify(doc_respuestas.getInfo)()
	const sheet_respuestas = info_respuestas.worksheets[0]
	const info_traductor = await promisify(doc_respuestas.getInfo)()
	const sheet_traductor = info_respuestas.worksheets[0]


	if(inicio){

		console.log("-------------------------------------")
		console.log('----     Documento Respuestas    ----')
		console.log('----                             ----')
		console.log(`---- Nombre: ` + info_respuestas.title)
		console.log(`---- Cuenta: ` + info_respuestas.author.email)
		console.log(`---- Hoja 1: ` + sheet_respuestas.title)
		console.log(`---- Dimensiones: ` + sheet_respuestas.rowCount + `x` + sheet_respuestas.colCount)
		console.log("-------------------------------------")

		console.log('----     Documento Traductor     ----')
		console.log('----                             ----')
		console.log(`---- Nombre: ` + info_traductor.title)
		console.log(`---- Cuenta: ` + info_traductor.author.email)
		console.log(`---- Hoja 1: ` + sheet_traductor.title)
		console.log(`---- Dimensiones: ` + sheet_traductor.rowCount + `x` + sheet_traductor.colCount)
		console.log("-------------------------------------")

		inicio = false

	}
	
	if(actualizar == "respuestas"){

		console.log("-------------------------------------")
		console.log("------ Respuestas Actualizado -------")
		console.log("-------------------------------------")

		doc_respuestas.getRows(1, function (err, rows) {

			if(cambiar == true){

				rows = rowes_respuestas

				rows[rows.length - 1].save()

				accessSpreadsheet(false, "respuestas")

			}

			rowes_respuestas=rows;

		})
	}

	if(actualizar == "traductorLECTURA"){		
		
			doc_traductor.getRows(1, function (err, rows_t) {
rows_while = rows_t
	
		
		if(rows_while[1].respuesta != '=if(A3="","",GOOGLETRANSLATE(A3,C3,D3))')
		{
				mensajeAresponder.reply(rows_while[1].respuesta)
				
		}
		else{
			accessSpreadsheet(false, "traductorLECTURA")
		}
		})	
	}
	
	
	
	if(actualizar == "traductor"){	
		



		console.log("-------------------------------------")
		console.log("------ Traduccion Actualizado -------")
		console.log("-------------------------------------")
		
		
		
			doc_traductor.getRows(1, function (err, rows_t) {
rows_while = rows_t
rows_t[1].respuesta = '=if(A3="","",GOOGLETRANSLATE(A3,C3,D3))';
rows_t[1].pregunta = mensajeAtraducir
		rows_t[1].save()
		accessSpreadsheet(false, "traductorLECTURA")
		
		})	
	}
}




accessSpreadsheet(false, "respuestas")






/*client.on('message', msg => {
	mensajeConsola(msg.member.user.tag, msg.content)

	if(msg.member.user.tag != "Bot de Prueba#6012"){

	mensajeAtraducir = msg.content
	mensajeAresponder = msg
	accessSpreadsheet(false, "traductor")
	
	
	}
})
*/





client.on('message', msg => {

	mensajeConsola(msg.member.user.tag, msg.content)

	if(msg.member.user.tag != "Bot de Prueba#6012"){
var comprobar

		if(msg.content[0] == "/")
		{
			
			var textoSeparado = separarComando(msg.content)
			var comandoText = textoSeparado[0]
			if (comandoText == "tr" )
			{
				
				mensajeAtraducir = textoSeparado[1]
	mensajeAresponder = msg
	accessSpreadsheet(false, "traductor")
				
				
			}
			else if (comandoText == "aprender" )
			{
				comprobar = "PARA APRENDER"
			}	
		}
		else
		{
		comprobar =  buscarPalabra(msg.content)
		}
		if (comprobar != undefined){

			msg.reply(comprobar)

		}
	}
})


function dividirPorBarras(texto)
{
	var arrayDeTextos = [""]
	var actualPos = 0


	for (i = 0; i < texto.length; i++) {
		


if(texto[i] == "/")
{
	arrayDeTextos[actualPos]  =  limpiarEspacios(arrayDeTextos[actualPos])
	actualPos++
	arrayDeTextos[actualPos] = ""
	
}
else{
	arrayDeTextos[actualPos] += texto[i]
}
		}
		
arrayDeTextos[actualPos]  =  limpiarEspacios(arrayDeTextos[actualPos])
		console.log(arrayDeTextos)
	
}


function limpiarEspacios(mensaje2)
{
	var textoLimpio = ""
	var hayCaracter	= false
	
	for (c = 0; c < mensaje2.length; c++) {		
		
		
		
		if(mensaje2[c] == " ")
		{	
			if(hayCaracter == true)
			{
				
			textoLimpio += mensaje2[c]
			}
		}
		else{
			hayCaracter = true
			textoLimpio += mensaje2[c]
		}
		
	}
	
	
	var textoLimpio2 = ""
	var hayCaracter2 = false
	
	
		for (c = textoLimpio.length - 1; c > -1; c--) {		
		
		
		
		
		if(textoLimpio[c] == " ")
		{	
			if(hayCaracter2 == true)
			{
				
			textoLimpio2 += textoLimpio[c]
			}
		}
		else{
			hayCaracter2 = true
			textoLimpio2 += textoLimpio[c]
		}
		
	}
	
	
	
	return reverseString(textoLimpio2)
	
}


function reverseString(str) {
    return str.split("").reverse().join("");
}




function separarComando(texto)
{	
	

var chequeo = ["",""]
var posicion = 0

	for (i = 1; i < texto.length; i++){  // i = 1 borra la primera barra

		
		
		if(texto[i] == " " && posicion == 0)
		{
			posicion= 1
		}
		else
		{
			chequeo[posicion] = chequeo[posicion] + texto[i]
		}
		

	}
	return(chequeo)
	
}






















function buscarPalabra(mensaje){
	
	/*if(palabraIgual(mensaje,"/aprender")){	
		
		//APRENDER LA RESPUESTA
		
	}

	else*/{

		for (i = 0; i < rowes_respuestas.length; i++) {

			if (mensaje == rowes_respuestas[i].pregunta){

				return(rowes_respuestas[i].respuesta)

			}
		}

		for (i = 0; i < rowes_respuestas.length; i++) {

			if (mensaje.includes(rowes_respuestas[i].pregunta)){

				return(rowes_respuestas[i].respuesta)

			}
		}
	}
}

/*
function agregarRespuesta(mensaje){

	if(palabraIgual(mensaje,"/aprender")){

		var aprenderTexto = separarConBarras(mensaje, 9) // [0] pregunta - [1] respuesta

		if(aprenderTexto[0] != "" && aprenderTexto[1] != "" && aprenderTexto[0] != "undefined" && aprenderTexto[1] != "undefined"){

			rowes_respuestas[rowes_respuestas.length] = rowes_respuestas[rowes_respuestas.length - 1]
			rowes_respuestas[rowes_respuestas.length - 1].pregunta = aprenderTexto[0]
			rowes_respuestas[rowes_respuestas.length - 1].respuesta = aprenderTexto[1]

			accessSpreadsheet(true, "respuestas")

			mensajePreguntaNueva(aprenderTexto)
			return("Respuesta aprendida")

		}

		return("Escriba /aprender <pregunta> / <respuesta>")
		
	}

	return("El comando /aprender sirve para enseñarme respuestas. Escribe /aprender para mas informacion")
	
}

// Comprueba que palabara sea la primera palabra del texto
function palabraIgual(texto, palabra){

	var chequeo = ""

	for (i = 0; i < palabra.length; i++){

		chequeo = chequeo + texto[i]

	}

	if(chequeo == palabra){

		return(true)
		
	} else{

		return(false)
		
	}
}

function separarConBarras(mensaje, cantidadLetrasComando){

	var aprenderTexto = ["","",false]

	for (i = cantidadLetrasComando; i < mensaje.length; i++) {

		if(mensaje[i] == "/"){

			aprenderTexto[2] = true
		i++

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


*/



//=================================================================================================================================================================


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