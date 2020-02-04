window.onload = function() {
	
	var time_list = [];
	/*var reqestJson = "http://worldtimeapi.org/api/timezone/America/Argentina/Salta";
	var reqest = new XMLHttpRequest();
	reqest.open('GET', reqestJson);
	reqest.responseType = 'json';
	reqest.send();
	
	reqest.onload = function() {
		var superHeroes = reqest.response;
		console.log(superHeroes);
		alert(superHeroes['datetime']);
	} */
	
	County_list.forEach (element => push_time (element));
	console.log (time_list);
	
	function push_time (elem) {
		
		var reqestJson = "http://worldtimeapi.org/api/timezone/" + elem;
		var reqest = new XMLHttpRequest();
		reqest.open('GET', reqestJson);
		reqest.responseType = 'json';
		
		reqest.send()
		
		
		reqest.onload = function() {
			var ex = reqest.response;
			time_list.push(ex['datetime']);
		}
	}
	
}