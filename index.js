const Discord = require('discord.js');
const client = new Discord.Client();

client.login("NTQ3OTU4NjU3NDE0MDcwMjc1.D0-V-A.i1KiB8_Qvvjm1Iva0QZ23tdNT1I");

  
     
		  var rowes;
  
var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./client_secret.json');

 

// Create a document object using the ID of the spreadsheet - obtained from its URL.

var doc = new GoogleSpreadsheet('1XVJb2TxkEAhM2jH-t8NMjV1NNas7cQQcJW7soVpGPP0');





// Authenticate with the Google Spreadsheets API.

doc.useServiceAccountAuth(creds, function (err) {

 

  // Get all of the rows from the spreadsheet.

  doc.getRows(1, function (err, rows) {
rowes=rows;

  });

});





	client.on('message', msg => {
		


		
		
	if(msg.member.user.tag != "Bot de Prueba#6012")
	{
for (i = 0; i < rowes.length; i+=4) {
	if (msg.content.includes(rowes[i].leer))
	{
		msg.reply(rowes[i+2].leer);
	}
}
	
		
	
};

  });
  