var RiotRequest = require('riot-lol-api');
 
var riotRequest = new RiotRequest("RGAPI-3c935672-2185-46e5-931e-fe9ba3bd6cc9");
var idDelUser
riotRequest.request('la2', 'summoner', '/lol/summoner/v4/summoners/by-name/kurt44', function(err, data) {
	
	
	
	idDelUser = data.accountId
	console.log(data)
	leerMatches(iBFmCzoxCKVHStbVtkrQn8ByQdMQMFkmJit8_EKDJ5bwag)
	
	});
	
	function leerMatches(id)
	
	{
		
		var elEstring = "/lol/match/v4/matchlists/by-account/" + id
riotRequest.request('la2', 'summoner', elEstring, function(err, data) {
	
	
	
	console.log(data.matches[0].champion)
	
	
	});
	}