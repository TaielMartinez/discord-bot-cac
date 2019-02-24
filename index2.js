const Discord = require('discord.js');
const client = new Discord.Client();

const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require('util')

const credentials = require(`./service-account.json`);
const url_token = require('./url-token.json');

client.login(url_token.discord_token);


var rowes;

async function accessSpreadsheet(cambiar) {
  const doc = new GoogleSpreadsheet(url_token.SPREADSHEET_ID)
  await promisify(doc.useServiceAccountAuth)(credentials)
  const info = await promisify(doc.getInfo)()
  console.log(`Loaded doc: ` + info.title + ` by ` + info.author.email)
  const sheet = info.worksheets[0]
  console.log(`sheet 1: ` + sheet.title + ` ` + sheet.rowCount + `x` + sheet.colCount)

doc.getRows(1, function (err, rows) {
	
	
if(cambiar == true)
		{
			rows = rowes;
			
		    rows[rows.length - 1].save(); // this is async
  accessSpreadsheet()
		}
		
		rowes=rows;
		console.log("---- Google Sheet conectado ----");

		
		
		 

	});
	
	
	
	

  

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

});


function agregarRespuesta(mensaje)
{
	
	var chequeo = "";
	
		for (i = 0; i < 9; i++) {

		chequeo = chequeo + mensaje[i];
	}
	
	if(chequeo == "/aprender")
	{
		
		
		
		
		
		var pregunta = ""
		var respuesta = ""
		var preguntaLista = false
		for (i = 9; i < mensaje.length; i++) {


if(mensaje[i] == "/")
{
preguntaLista = true;	
i++;
}

if(preguntaLista == false)
{
		if(mensaje[i] != " ")
		{
			
			
			pregunta = pregunta + mensaje[i]
		}
		else if (pregunta != "")
		{
			
			pregunta = pregunta + mensaje[i]
			
		}
}
else{


if(mensaje[i] != " ")
		{			
			respuesta = respuesta + mensaje[i]
		}
		else if (respuesta != "")
		{
			
			respuesta = respuesta + mensaje[i]
			
		}

}		
	}
	if(pregunta != "" && respuesta != "" && pregunta != "undefined" && respuesta != "undefined")
	{
	console.log("La pregunta es: " + pregunta + " Y la respuesta es: " + respuesta);
	
	rowes[rowes.length] = rowes[rowes.length - 1];
	rowes[rowes.length - 1].pregunta = pregunta;
	rowes[rowes.length - 1].respuesta = respuesta
		
			accessSpreadsheet(true)
	return ("Aprendido");
	}
	}
	

	
}



function buscarPalabra (mensaje){
	
	if(mensaje.includes("/aprender"))
	{			
		return(agregarRespuesta(mensaje));
		
		
	}
	else{

	for (i = 0; i < rowes.length; i++) {

		if (mensaje.includes(rowes[i].pregunta)){

			return(rowes[i].respuesta);

		}
	}
	}
};


function mensajeConsola(usuario, mensaje){

	console.log(" ___________________________________");
	if(usuario != "Bot de Prueba#6012"){console.log("----------- mensaje recibido -------")
	}else{console.log("------------ bot mensaje -----------");}
	console.log(" ");
	if(usuario != "Bot de Prueba#6012"){console.log("   usuario: "+ usuario)};
	console.log("   mensaje: "+ mensaje);
	console.log(" ___________________________________");

}; 