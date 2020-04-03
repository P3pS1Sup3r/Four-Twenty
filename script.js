/**
 * @type {Array} Список времени (в виде строк (для тестирования))
 */
var time_list = [
	"2020-02-25T03:21:14.670028+00:00",
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
	
/**
 * @type {Array} Список дат (в формате Data (для временных расчетов))
 */
var date_list = [];
	
/**
 * @type {Array} Список грядущих 4:20 (меньше равно 1 часу (от 3:20 до 4:19))
 */
var soon_date_list = []; 
	
/**
 * @type {Array} Список текущих 4:20 (если они где-то есть вообще (стоит вообще убрать))
 */
var N_date_list = [];
	
/**
 * @type {Date} Искомая дата для пояса +0 (если время в +0 больше 16:20 то искомая дата становиться на 1 день больше)
 */
var need_timezone = new Date();

/**
 * @type {Array} Предполагаемые странны с 4:20
 */
var Country_Name = [];

/**
 * @type {Object} Объкт со страннами в нужном часовом поясе (поля: Название страны, Текущая дата, Разница до 4:20)
 */
var Foru_twenty_date =[];

/**
 * @type {Array} Странны с плохим часовым поясом (для отдельных расчетов)
 */
var Humful_Country = [];

window.onload = function() {
	
	Calculation_UTP();
		
	/**
	 * Конвертит строки дат в даты в формате Date и пушит все в массив (можно вообще убрать)
	 * @see Main
	 */
	function Time_to_Data() {
		time_list.forEach(cur => Data_push (cur));
		
		function Data_push (el) {
			datt = new Date (el.substr(0,16));
			date_list.push(datt);
		}
	}

	/**
	 * Выгружает с АПИ время по указанной стране
	 * @param {String} Старана (часовой пояс) 
	 * @see Main
	 * @returns {Date}
	 */
	function Get_date (elem) {
		
		var new_date;
		var reqestJson = "http://worldtimeapi.org/api/timezone/" + elem;
		var reqest = new XMLHttpRequest();
		reqest.open('GET', reqestJson);
		reqest.responseType = 'json';
		
		reqest.send()
		
		
		reqest.onload = function() {
			let ex = reqest.response;
			new_date = new Date (ex['datetime'].substr(0,16));
			
			console.log(new_date);


			return new_date;
		}
		
	}

	/**
	 * Проходиться по массиву дат [date_list] и заполнает массивы [soon_date_list] и [N_date_list]
	 * @see Main
	 */
	function Close_time () {
		let Foru_twenty = new Date(Foru_twenty_date[0].Time_now);
		Foru_twenty.setHours(4,20,00);
		Foru_twenty_date.forEach (cur => Calculation_Time(cur));

		console.log(N_date_list);
		console.log(soon_date_list);
		Html_forming();


		function Calculation_Time (el) {
			if (el.Time_now.getHours() == Foru_twenty.getHours() & el.Time_now.getMinutes() == Foru_twenty.getMinutes())
				N_date_list.push(el);
			else
			if ((el.Time_now.getHours() == 4 & el.Time_now.getMinutes()<20) | (el.Time_now.getHours() == 3 & el.Time_now.getMinutes() > 20)) {
				el.Dif_time = Math.floor((Foru_twenty - el.Time_now) / (1000*60))
				soon_date_list.push(el);
			}
		}
	}

	/**
	 * Расчитывает неоходимое смещение относительно +0 пояса
	 * @returns {Number} Смещение
	 * @see Main
	 */
	function Calculation_UTP () {
		
		var reqestJson = "http://worldtimeapi.org/api/timezone/africa/abidjan";
		var reqest = new XMLHttpRequest();
		reqest.open('GET', reqestJson);
		reqest.responseType = 'json';
		reqest.send();	
		
		reqest.onload = function() {
			var abidjan_time_s = reqest.response;
			
			var abidjan_time = new Date (abidjan_time_s['datetime'].substr(0,19));
			var need_hours=0;

			if (abidjan_time.getHours() == 15 & abidjan_time.getMinutes() <=20) Select_need_country(13);
			if (abidjan_time.getHours() == 14) Select_need_country(13);

			console.log ("abidjan_time");
			console.log (abidjan_time);
			
			need_timezone = new Date(abidjan_time);

			need_timezone.setHours(4,20,00);

			need_hours = need_timezone-abidjan_time;
			
			if ( abidjan_time.getHours() >= 16 ) {
				need_timezone.setDate(need_timezone.getDate() +1);
				need_hours= need_timezone - abidjan_time;
			}
			
			var abidjan_time = new Date();
			if (need_hours>=0)
				need_hours = Math.floor((need_hours) / (60*60*1000)-1)
			else
				need_hours = Math.floor((need_hours) / (60*60*1000)-1)
			
			
			Select_need_country(need_hours);
			Select_need_country(need_hours-1); // Я хз как иначе обходить летнее время
			Select_need_country(need_hours+1);
			
			return need_hours;
		}
	}	

	/**
	 * Заполнение массива [Country_name] странами по указанному отклонению от +0 часового пояса
	 * @param {Number} time Необходимое отклонение от +0 часового пояса
	 */
	function Select_need_country(time) {
		console.log(time);
		Country_Name = [];
		timezones.forEach (function(value,key) {
			if (Math.floor(Number(value))== time) {
				Country_Name.push(key)
			}
		});
		console.log(Country_Name);
		
		let i=0;
		while (Is_humful(Country_Name[i]) & i<Country_Name.length) {
			i++;
		}

		let normal_date = new Date();

		var reqestJson = "http://worldtimeapi.org/api/timezone/"+Country_Name[i];
		var reqest = new XMLHttpRequest();
		reqest.open('GET', reqestJson);
		reqest.responseType = 'json';
		reqest.send();	
		
		reqest.onload = function () {
			let req_r = reqest.response;

			normal_date = new Date (req_r['datetime'].substr(0,19));
			let srav_time = new Date (normal_date);
			srav_time.setHours(4,20);

			if ((normal_date-srav_time) / (60*60*1000)<-1 || (normal_date-srav_time) / (60*60*1000)>1) {
				// Ну тип обхожу летнее время
			}
			else {
				for (const con of Country_Name) {
					let ob = {};
					if (Is_humful(con)) {
						Humful_Country.push(con)
					}
					else {
						ob.Country = con;
						ob.Time_now = normal_date;
						Foru_twenty_date.push(ob);
					}
				}
				console.log(Foru_twenty_date);
				console.log("hhH",Humful_Country);
				
				Close_time();
			}
		}
	}

	

	/**
	 * Заполнает массив [date_list] датами стран содержащихся в массиве [Country_name]
	 * 
	 */
	function Date_forming() {
		let i=0;
		while (Is_humful(Country_Name[i]) & i<Country_Name.length) {
			i++;
		}

		let normal_date = new Date();

		var reqestJson = "http://worldtimeapi.org/api/timezone/"+Country_Name[i];
		var reqest = new XMLHttpRequest();
		reqest.open('GET', reqestJson);
		reqest.responseType = 'json';
		reqest.send();	
		
		reqest.onload = function () {
			let req_r = reqest.response;
			
			normal_date = new Date (req_r['datetime'].substr(0,19));

			for (let index = 0; index < Country_Name.length; index++) {
				if (Is_humful(Country_Name[index])) {
					let D = new Promise (function (reject,error) {
						var Hum_json = "http://worldtimeapi.org/api/timezone/" + Country_Name[index];
						var Hum_req = new XMLHttpRequest();
						Hum_req.open('GET', Hum_json);
						Hum_req.responseType = 'json';
						
						Hum_req.send()
						
						
						Hum_req.onload = function() {
							let ex = Hum_req.response;
							let new_d = new Date (ex['datetime'].substr(0,16));
							
							console.log("hum",Country_Name[index]);
							
							
							Foru_twenty_date[index] = {
								"Country" : Country_Name[index],
								"Time_now" : new_d
							}
	
							reject(new_d);
						}
					});
					D.then (
						res => console.log(res)
					)
				}
				else {
					Foru_twenty_date[index] = {
						"Country" : Country_Name[index],
						"Time_now" : normal_date
					}
				}
			}

			Close_time ();
		}
	}
	
	/**
	 * Являеться ли выбранная страна плохой
	 * @param {String} Country Проверяемая странна
	 * @returns {Boolean} Да/Нет
	 */
	function Is_humful(Country) {
		
		let rly = false;
		Harmful_timezone.forEach(element => {
			if (Country == element)
				rly = true;
		});
		return rly;
	}
	/**
	 * Просто пушим инфу на страницу
	 */
	function Html_forming() {
		var spisok = document.getElementById("spis");
		
		for (let i=0;i<soon_date_list.length;i++) {
			let elem = document.createElement("p");
			let strok = "Регион " + soon_date_list[i].Country + " Время " + soon_date_list[i].Time_now.toString().substr(4,20) + " Осталось (" +soon_date_list[i].Dif_time + " минут)";
			elem.textContent=strok;
			spisok.appendChild(elem);
		}
	}

}
