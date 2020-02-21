window.onload = function() {
	
	var time_list = [
	"2020-02-05T03:21:14.670028+00:00",
	"2020-02-05T12:19:14.662459+01:00",
	"2020-02-05T13:19:14.654707+02:00",
	"2020-02-05T04:19:14.654578+00:00",
	"2020-02-05T02:19:14.661080+01:00",
	"2020-02-05T11:19:14.659485+00:00",
	"2020-02-05T12:19:14.904159+01:00",
	"2020-02-05T13:19:14.921953+02:00",
	"2020-02-05T12:19:14.984199+01:00",
	"2020-02-05T14:19:14.987572+03:00",
	"2020-02-05T04:20:15.016105+02:00",
	"2020-02-05T12:19:15.009760+01:00",
	"2020-02-05T13:19:15.063263+02:00",
	"2020-02-05T11:19:15.080940+00:00",
	"2020-02-05T14:19:15.147984+03:00",
	];
	
	var date_list = [];
	
	var soon_date_list = [];
	
	var N_date_list = [];
	
	var need_timezone;
	
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
	
	//County_list.forEach (element => push_time (element));
	//console.log (time_list);
	
	Time_to_Data();
	console.log(date_list);
	Close_time();
	
	console.log ("420");
	console.log (N_date_list);
	console.log ("soon");
	console.log (soon_date_list);
	
	Calculation_UTP ();
	
	
	//console.log(timezones);
	
	function Time_to_Data() {
		time_list.forEach(cur => Data_push (cur));
		
		function Data_push (el) {
			datt = new Date (el.substr(0,16));
			date_list.push(datt);
		}
	}
	
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
	
	function Close_time () {
		var Foru_twenty = new Date();
		Foru_twenty.setHours(4,20,00);
		date_list[0].getHours();
		date_list.forEach (cur => Calculation_Time(cur));
		
		function Calculation_Time (el) {
			console.log(el.getHours());
			if (el.getHours() == Foru_twenty.getHours() & el.getMinutes() == Foru_twenty.getMinutes())
				N_date_list.push(el);
			else
			if ((el.getHours() == 4 & el.getMinutes()<20) | (el.getHours() == 3 & el.getMinutes() > 20))
				soon_date_list.push(el);
		}
	}

	function Calculation_UTP () {
		
		var reqestJson = "http://worldtimeapi.org/api/timezone/africa/abidjan";
		var reqest = new XMLHttpRequest();
		reqest.open('GET', reqestJson);
		reqest.responseType = 'json';
		reqest.send();	
		
		reqest.onload = function() {
			var abidjan_time_s = reqest.response;
			var abidjan_time = new Date (abidjan_time_s['datetime'].substr(0,16));
			need_timezone = 4-abidjan_time.getHours();
			console.log(need_timezone);
			timezones.forEach (function(value,key) {
				if (String(value)==String(need_timezone)) console.log(key);
			});
		}
	}	
	
	
}
