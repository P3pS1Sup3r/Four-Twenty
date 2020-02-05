wwindow.onload = function() {
	
	var time_list = [
	"2020-02-05T03:19:14.670028+00:00",
	"2020-02-05T12:19:14.662459+01:00",
	"2020-02-05T13:19:14.654707+02:00",
	"2020-02-05T04:19:14.654578+00:00",
	"2020-02-05T02:19:14.661080+01:00",
	"2020-02-05T11:19:14.659485+00:00",
	"2020-02-05T12:19:14.904159+01:00",
	"2020-02-05T13:19:14.921953+02:00",
	"2020-02-05T12:19:14.984199+01:00",
	"2020-02-05T14:19:14.987572+03:00",
	"2020-02-05T4:20:15.016105+02:00",
	"2020-02-05T12:19:15.009760+01:00",
	"2020-02-05T13:19:15.063263+02:00",
	"2020-02-05T11:19:15.080940+00:00",
	"2020-02-05T14:19:15.147984+03:00",
	];
	
	var date_list = [];
	
	var soon_date_list = [];
	
	var N_date_list = [];
	
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
	Close_time();
	
	console.log ("420");
	console.log (N_date_list);
	console.log ("soon");
	console.log (soon_date_list);
	
	function Time_to_Data() {
		time_list.forEach(cur => Data_push (cur));
		
		function Data_push (el) {
			datt = new Date (el.substring(0,19));
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
			if (date_list[el].getHours() == Foru_twenty.getHours() & date_list[el].getMinutes() == Foru_twenty.getMinutes())
				N_date_list.push(date_list[el]);
			else
			if (date_list[el].getHours() == Foru_twenty.getHours())
				soon_date_list.push(date_list[el]);
		}
	}
}
