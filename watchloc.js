/*
0. choose locations
1. list airliner names
2. list airport codes and airline codes
3. select airport codes
4. list schedules for each plane flight with airline codes and landing
5. meetup destinations
6. shipment tracker
*/
function airportSrch(city){
	const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport?query='+city;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
	}
};
fetch(url, options).then(response=>{
	return response.json()
}).then(result=>{
	res(JSON.stringify(result['data']))
}).catch(error=>{
	console.error(error);
})
}
function sameLoc(country, state, city, region){
 return new Promise((res)=>{
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fb3a8799a1msh7d51c652e251487p1f9c8ajsncd7fa90e29de',
		'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
	}
}

fetch('https://countries-cities.p.rapidapi.com/location/country/list', options).then(response => response.json()).then((response)=>{
	console.log(response)
	let country = response.filter((str)=>{
	  return str.toLowerCase() === (country)
	})
	
	if(country.length == 1){
	const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fb3a8799a1msh7d51c652e251487p1f9c8ajsncd7fa90e29de',
		'X-RapidAPI-Host': 'us-states.p.rapidapi.com'
	}
};
if(country === 'United States of America'){
fetch('https://us-states.p.rapidapi.com/name/'+state, options)
	.then(response => response.json())
	.then(response =>{
	cityCon(country, city, 100)
	}).catch(err => console.error(err))
	}else if((typeof country).toLowerCase() === 'string'){
	   cityCon(country, city, 100)
	}
	}
function cityCon(country, city, num){
// num results per page
  let cntryCityObj = JSON.parse(Promise.resolve(hasCity(country, city, num)))[0]
			  let [cityDataObj, cityStr, bool] = cityData
if(bool === true){
		res(JSON.stringify(cityData))
}else{
       rej('not valid city! city might not Exist!')
}}
	function hasCity(country,cityStr,n=1){
	  return new Promise((res)=>{
	  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fb3a8799a1msh7d51c652e251487p1f9c8ajsncd7fa90e29de',
		'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
	}
};

fetch('https://countries-cities.p.rapidapi.com/location/country/'+country+'/city/list?page='+n+'&per_page=20', options)
	.then(response =>{return response.json()}).then(response =>{
	let [link, page, per_page, total_pages, total_cities,cities,country_code, status] = response
	  let cityBool = false
	let hasCity = cities.filter((obj)=>{
	 let {geoName, pop, name, latitude,longitude} = obj
	  return cityStr.toLowerCase() === name.toLowerCase()
	})
	if(hasCity.length < 1){
	hasCity(country, city, n+=1)
	 res(JSON.stringify([response]))
	 }else{
	 cityBool = true
	 let cityObj = Promise.resolve(hasCity(country, city, n))

	 let {geoName,population, name, latitude, longitude, country, division} = cityObj
	 let resObj = Object.create({})
	 resObj['cityObj'] = cityObj
	 let code = ((division['code'].slice(2, 6)).includes('US'))? (division['country'].code):division['code'].slice(0, 2)
	 resObj['city'] = city+', '+code
	  resObj['bool'] = cityBool
	 res(JSON.stringify([resObj]))
	 }
	}).catch(err => console.error(err))
	  })
	}
}).catch(err => console.error(err))
})
 }
function aircraftList(){
  	
}
(function newTrack(){
	let trailList = allDivs(document.body)['trail-list']
	let codeInpt = allDivs(trailList)['code-inpt']
	let ciElm = Array.from(codeInpt.getElementsByTagName('*'))
	let [code, timestamp, addBtn, clrBtn]= ciElm
	addBtn.onclick = (e) =>{
		let newTrail = Promise.resolve(getTrail(code, timestamp))
		newTrail.then(v=>{
			let track = JSON.parse(v)
			track.forEach((locObj)=>{
				let newTrailDiv = trailList.children[0]
				let trailMap = newTrailDiv.children[1]
				
				let {lat, lon, alt, spd, vert, head, squawk, timestamp} = locObj
				let {feet, meters} = alt
				let {kmh, kts, mph} = spd
				styleElm(newTrailDiv, {display: 'block'})
				trailList.appendChild(newTrailDiv)
				geoLoc([lat, lon], 'loc:'+lat+','+lon+'/n'+'speed:'+mph+'mph,'+knh+'kmh', trailMap)
			})
		}).catch(e=>{console.log(e.name, e.message)})
	}
})()
function getTrail(flightId, timestamp){
	return new Promise((res)=>{
		const url = 'https://flight-radar1.p.rapidapi.com/flights/get-playback?flightId='+flightId+'&timestamp='+timestamp;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
	}
};
fetch(url, options).then(response=>{
return response.json()
}).then(result =>{
	res(JSON.stringify(extractProp('track',result)))
}).catch((error)=>{
	console.error(error);
})
	})
}
function geoLoc(coords, lbl, map){
		 	     var map = L.map(map.getAttributeNode('id').value).setView(coords, 4);
	setTile(map)
	setMarker(coords, lbl, map)
}
function setTile(the_map){
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ''
}).addTo(the_map);
 }
 function setMarker(coords, label, map, type){
	
	L.marker([coords[0], coords[1]]).addTo(map)
    .bindPopup(label)
    .openPopup();

 }
 function allDivs(div, sel){
let elm = (div === undefined)? document.body.getElementsByTagName('*') : div.getElementsByTagName('*')
 return elm
}
 (function wrld_map(){
	 let usCrd = [37, -95]
	 let mapElm  = allDivs(document.body)['map']
      geoLoc(usCrd,'United States' ,mapElm)
 })()
 function addList(div){
	 let flightsDivs = Array.from(document.querySelectorAll('.flights-div'))
	 let [airlines, flightSrch, flightDet, airportSrch] = flightsDivs
	 flightsDivs.forEach((flightDiv)=>{
		 let elmArr = ['input', 'button', 'select']
		 elmArr.forEach((str)=>{
		 Object.defineProperty(flightDiv, str, {value: flightDiv.querySelector(str)})
		 })
	 })
	 let [airlineInpt, flightSrchInpt, flightDetailSrchInpt, airportSrchInpt] = flightsDivs.map((div)=>{
		 return  div.querySelector('input').value.trim().toLowerCase()
	 })
	 let detailsDiv = allDivs(document.body)['flight-details']
	 //airport search from 
	 airportSrch['button'].onclick = (e)=>{
		Promise.resolve(airportSrch(airportSrchInpt)).then(v=>{
			let airports = JSON.parse(v)
			clrDiv(airportSrch['select'])
			airports.forEach((obj)=>{
				genOpts(airportSrch['select'], obj, 'no_function')
			})
		})
	 }
	 //allows user to choose the airline code
	 airlines['button'].onclick = (e) =>{
		 Promise.resolve(airlinerList()).then(v=>{
			 let airlines = JSON.parse(v)
			 let simAirlines =airlines.filter((obj)=>{
				 return obj.name.toLowerCase().includes(airlineInpt) || obj.iata.toLowerCase().includes(airlineInpt)
			 })
			 			clrDiv(airportSrch['select'])
			 simAirlines.forEach((obj)=>{
				 genOpts(airliners['select'], obj)
				 })
			 }).catch(e=>{console.log(e.name, e.message)})
		 }
//search for flights and return schedual to airport arrival and departures 
	 flightSrch['button'].onclick = (e) =>{
		 //(city1, city2, date)<(o)>(city1, city2, date)
//	/*[{"sourceAirportCode":"BOS","destinationAirportCode":"LON","date":"2023-10-18"},{"sourceAirportCode":"LON","destinationAirportCode":"BOS","date":"2023-10-26"},{"sourceAirportCode":"LON","destinationAirportCode":"ELS,"date":"2023-10-26"}]*/
		 let flightSrchArr = flightSrchInpt.value.split('<(o)>').map((flight_str)=>{
			 let str = flight_str.replaceAll('(', '')
			 str = str.replaceAll(')', '')
			 let [srcAirport, destAirport, date] = str
			 let newObj = Object.create({})
			 newObj.sourceAirport = srcAirport
			 newObj.destinationAirport = destAirport
			 newObj.date = date
			 return newObj
		 })
		 let service = Array.from(flightDet.querySelectorAll('select'))[1]
		 Promise.resolve(multiFlights(flightSrchArr, service.value)).then(v=>{
			 let flights = JSON.parse(v)
			 			clrDiv(airportSrch['select'])
			 flights.forEach((obj)=>{
				genOpts(flightSrch['select'], obj)
				 opt.onclick = (e) =>{
					 let segments = extractProp('segments',obj)
					 segments = segments.map((obj)=>{
						 return obj.legs[0]
						 })
						 let dests = segments.map((obj)=>{
							 let propArr = ['originStationCode', 'destinationStationCode']
							 return propArr.map((str)=>{
								 return obj[str]
							 })
						 })
						 let destsArr = dests.map((arr)=>{
							 return arr
						 })
						 
					 geoLoc(obj.coords.split(','),obj.name, allDivs(document.body)['map'])
				 }
			 })
		 })
	 }
	
   flightDet['button'].onclick = (e) =>{
	   Promise.resolve(flightDetails(flightDetailSrchInpt)).then(v=>{
		   let detailArr = JSON.parse(v)
		   			clrDiv(airportSrch['select'])

		   detailArr.forEach((obj)=>{
			   let newDetails = detailsDiv.children[0].cloneNode(true)
			   let {id, status, aircraft, owner, airline, airport,time} = obj
		       let elmArr = ['h2', 'ul'].map((str)=>{
				   return newDetails.querySelector(str)
			   })
			   let [h2, ul] = elmArr
			   h2.innerText = extractProp('name', obj)
			   extractProp('', obj, ul)
			   newDetails.onclick = (e)=>{
				   delDiv(this)
			   }
			   detailsDiv.appendChild(newDetails)
		   })
	   })
	     opt.onclick = (e) =>{
					 let valObj = JSON.parse(this.value)[0]
					 let details = detailsDiv.chlidren[0].cloneNode(true)
					 let ul = details.children[1]
					 details.children[0].innerText = valObj.name
					 }
   }
	
	 flightsDiv.forEach((div)=>{
				 div.querySelector('input').onkeydown =(e)=>{
			this.previousElementSibling.click()
		 }
	 })

	function clrDiv(sel){
		let newOpt = sel.children[0].cloneNode(true)
		sel.innerHTML = ''
		sel.appendChild(newOpt)
	}	 
 }
 function delDiv(div){
	 let conDel = confirm('delete this')
	 if(conDel === true){
		div.remove() 
	 } }
 
 function genOpts(sel, obj, funct){
	 let opt = sel.children[0].cloneNode(true)
				 opt.innerText = obj.name
				 opt.value = JSON.stringify([obj])
				 styleElm(opt, {display: 'block'})
				 sel.appendChild(opt)
				 if(funct !== undefined){
					 opt.onclick = (e) =>{
						 let functCall = funct
					 }
				 }
 }
 function extractProp(str,responseObj, ul){ 
if(responseObj !== null || responseObj !== undefined){
   var valArr = isArr(responseObj)
      console.log('object',(typeof responseObj).toLowerCase(), valArr, responseObj)
let resArr = []
  let keys=Object.keys(responseObj) , itrtdKey 
  objKeyFunct(responseObj)
  if(ul !== undefined){
  return resArr[0]
  }
 function objKeyFunct(obj){
  if((typeof obj).toLowerCase() === 'object' ){

let objKeys = Object.keys(obj)
console.log(objKeys)

for(let ki = 0; ki < objKeys.length; ki++){
let itrtdKey = objKeys[ki]

let newKey = itrtdKey.trim()
  let valIsArr = isArr(obj[itrtdKey])
		  console.log('itrtdKeyObj',obj[itrtdKey])
 if(str === itrtdKey){
	 let liClne = ul.children[0].cloneNode(true)
 let newObj = Object.create({})
 newObj.propName = itrtdKey
 newObj.response = obj[itrtdKey]
 liClne.innerText = itrtdKey+' : '+obj[itrtdKey]
  let newArr = [newObj]
  resArr.push(newObj.response)
  ul.appendChild(liClne)
  console.log(resArr)
  break
//  return resArr[0]
	}else if((typeof obj[itrtdKey]).toLowerCase() === 'object' && valIsArr === false&&str !== itrtdKey){
			 objKeyFunct(obj[itrtdKey])
		
	}else if((typeof obj[itrtdKey]).toLowerCase() === 'object' && valIsArr === true&&str !== itrtdKey){
	     for(let i = 0; i < obj[itrtdKey].length; i++){
	    objKeyFunct(obj[itrtdKey][i])
		 }
	}
	console.log('loop',resArr)
	}
	}
  }
  }
  }
  function isArr(responseObj){
     var allNums = Object.keys(responseObj).map(function(s){
       return (typeof s === 'number')? parseInt(s, 10): s
     }).every(function(num){
       return (typeof num).toLowerCase() === 'number'
     })
	 return allNums
     }
 function objList(obj, ul){
	let hasObj = Object.keys(obj).map((prop)=>{
		return obj[prop]
	}).some((val)=>{return typeof val === 'object'})
	if(hasObj === true){
	 let objArr = []
	 	 for(let [key, val] in valObj){
			 if(typeof val !== 'object'){
				let li = ul.children[0].cloneNode(true)
				li.innerText = key+' : '+val
				styleElm(li, {display: ''})
				ul.appendChild(li)
			 }else{
				 objArr.push(val)
			 }
		}
		objArr.forEach((obj)=>{
			objList(obj, ul)			
		})
	}else{
		return obj
	}
 }
 function flightsInArea(coord){
	 new Promise((res)=>{
		 let boxObj = {
		  bl_lat: coord[0]-.02,
		  bl_lng: coord[1]-.02,
		  tr_lat: coord[0]+.02,
		  tr_lng: coord[1]+.02,
		 }
		 let {bl_lat, bl_lng, tr_lat, tr_lng} = boxObj
	 const url = 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary?bl_lat='+bl_lat+'&bl_lng='+bl_lng+'&tr_lat='+tr_lat+'&tr_lng='+tr_lng+'&limit=300';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
	}
};

fetch(url, options).then(response=>{
	return response.json();
}).then((result)=>{
	res(JSON.stringify(result))
}).catch((error)=>{
	console.error(error);
})
	 })
 }
 function airlinerList(){
	 const url = 'https://flight-radar1.p.rapidapi.com/aircrafts/list';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
	}
};
fetch(url, options).then(response=>{
	return response.json();
}).then(result=>{
	res(JSON.stringify(result['rows']))
}).catch ((error)=>{
	console.error(error);
})
 }
 function flightDetails(flightCode){
   return new Promise((res)=>{
	   const url = 'https://flight-radar1.p.rapidapi.com/flights/get-more-info?query='+flightCode+'&fetchBy=flight&page=1&limit=100';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
	}
};
fetch(url, options).then(result=>{
	return response.json()
	}).then(result=>{
	res(JSON.stringify(extractProp('data',result)))
}).catch((error)=>{
	console.error(error);
})
   })
 }
function flightRecord(code){
	return new Promise((res)=>{
	const url = 'https://flight-radar1.p.rapidapi.com/flights/detail?flight='+code;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
	}
};

 fetch(url, options).then(response=>{
	return response.json();
 }).then(result=>{
	res(JSON.stringify(extractProp('trail',result)))
}).catch((error)=>{ 
	console.error(error);
})
	})
}
function multiFlights(flightsArr, service){
	/*
" = %22
: = %3A
[] = %5B
{ = %7B
} = %7D
, = %2C
	*/
	/*[{"sourceAirportCode":"BOS","destinationAirportCode":"LON","date":"2023-10-18"},{"sourceAirportCode":"LON","destinationAirportCode":"BOS","date":"2023-10-26"},{"sourceAirportCode":"LON","destinationAirportCode":"ELS,"date":"2023-10-26"}]*/
	let flightObjStr = JSON.stringify(flightsArr)
	flightObjStr = flightObjStr.replaceAll('"', '%22')
	flightObjStr = flightObjStr.replaceAll(':', '%3A')
	flightObjStr = flightObjStr.replaceAll('[', '%5B')
	flightObjStr = flightObjStr.replaceAll(']', '%5B')
	flightObjStr = flightObjStr.replaceAll('{', '%7B')
	flightObjStr = flightObjStr.replaceAll('}', '%7D')
	flightObjStr = flightObjStr.replaceAll(',', '%2C')
	return new Promise((res)=>{
		const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlightsMultiCity?legs='+flightObjStr+'&classOfService='+service+'&sortOrder=DURATION&currencyCode=USD';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
	}
};

fetch(url, options).then(response=>{
return	response.json();
}).then((result)=>{
	res(JSON.stringify(result['flights']));
}).catch((error)=>{
	console.error(error);
})
	})
}
function locCoords(){
	let coordStrg = localStorage.getItem('coordStrg')
	coordStrg = (coordStrg === null)?[]: JSON.parse(coordStrg)
   return coordStrg
}
(function setLocs(){
	let coordList = locCoords()
	if(coordList.length >= 1){
	let coordInt = setInterval(()=>{
		let mapClne = allDivs(document.body)['map'].cloneNode(true)
		mapClne.remove()
		coordList.forEach((locObj)=>{
			let {coords, lbl, code} = locObj
			geoLoc(coords, lbl, allDivs(document.body)['map'])
		})
	}, 4000)
	}
})()
function crntDate(){
	 var t = new Date();
  var h2 = t.getHours();
    var meridian = (h2 > 12)? 'PM': 'AM';
    var hoursDiff = (meridian == 'PM')? ((t.getHours() - 12)+1) :(t.getHours() - 12)
  var hour = (t.getHours() > 12)?hoursDiff: t.getHours();
  var hour2 = (hour === 0)? 12 : hour;
  var minutes = (t.getMinutes() < 10)? '0' + t.getMinutes(): t.getMinutes();
  var year = t.getFullYear();
  var month = (t.getMonth() + 1 < 10)? '0'+ (t.getMonth()+1): (t.getMonth()+1);
  var day = t.getDate();
 var currentTime = parseInt(hour2) + ':' + minutes + ' ' + meridian + " " + year+"-"+month+"-"+((day < 10)? '0'+day: day);
  return currentTime;
}
function showPlanes(coord){
	let coordList = locCoords()
	Promise.resolve(flightsInArea(coord)).then(v=>{
		  let aircrafts = JSON.parse(v)[0]
		  aircrafts.forEach((infoArr)=>{
			  let [flightCode, dunno1, lat, lon, dunno2, dunno3,dunno4,dunno5, dunno6, dunno7, timestamp,airport,plane] = infoArr
		    let newObj = Object.create({})
			newObj.coords = [lat,lon]
			newObj.flightCode = flightCode+'/n'+plane
			newObj.label = flightCode
			coordList.push(newObj)
		  })
		 }).catch(e=>{console.log(e.name, e.message)})
}